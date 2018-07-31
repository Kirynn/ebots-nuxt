<template>
    <v-layout class="wrapper">
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-form ref="form">
                    <v-card-title primary-title>
                        <h3 class="headline mb-0" v-if="state == 0">Sign Up</h3>
                        <h3 class="headline mb-0" v-else>Login</h3>
                    </v-card-title>

                    <div class="pa-5">
                        <v-text-field
                            v-model="email"
                            label="Email"
                            v-bind:error-messages="emailErrors"
                            v-on:input="$v.email.$touch()"
                            v-on:blur="$v.email.$touch()"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Password"
                            v-bind:error-messages="passwordErrors"
                            v-on:input="$v.password.$touch()"
                            v-on:blur="$v.password.$touch()"
                            hint="At least 6 characters"
                            v-bind:append-icon="show ? 'visibility_off' : 'visibility'"
                            v-bind:type="show ? 'text' : 'password'"
                            v-on:click:append="show = !show"
                            required
                        ></v-text-field>

                        <v-container v-if="state == 0">
                            <v-layout row wrap>
                                <v-flex xs5 mx-3>
                                    <v-text-field
                                        v-model="firstName"
                                        label="First Name"
                                        v-bind:error-messages="firstNameErrors"
                                        v-on:input="$v.firstName.$touch()"
                                        v-on:blur="$v.firstName.$touch()"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs5 mx-3>
                                    <v-text-field
                                        v-model="lastName"
                                        label="Last Name"
                                        v-bind:error-messages="lastNameErrors"
                                        v-on:input="$v.lastName.$touch()"
                                        v-on:blur="$v.lastName.$touch()"
                                        required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>

                        <span v-if="state == 0">Already have an account? <v-btn outline v-on:click="state = 1">Login</v-btn></span>
                        <span v-else>Don't have an account? <v-btn outline v-on:click="state = 0">Sign up</v-btn></span>
                    </div>

                    <v-card-actions>
                        <v-btn v-if="state == 0" block color="blue" v-on:click="createUser()">Create Account</v-btn>
                        <v-btn v-else block color="blue" v-on:click="loginUser()">Login</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

import { required, requiredIf, email, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'index',
    data: function() {
        return {

            state: 1,                   // 0 == sign up || 1 == login
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            show: false
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        firstName: {
            requiredIf: requiredIf((vueInstance) => {
                console.log(vueInstance)
                return vueInstance.state == 0
            })
        },
        lastName: {
            requiredIf: requiredIf((vueInstance) => {
                return vueInstance.state == 0
            })
        }
    },
    computed: {

        emailErrors() {

            const errors = []

            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },

        passwordErrors() {

            const errors = []

            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            return errors
        },

        firstNameErrors() {

            const errors = []

            if (!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.required && errors.push('Your first name is required')
            return errors
        },

        lastNameErrors() {

            const errors = []

            if (!this.$v.lastName.$dirty) return errors
            !this.$v.lastName.required && errors.push('Your last name is required')
            return errors
        }
    },
    methods: {

        createUser() {

            this.$v.$touch()
            
            if (!this.$v.$invalid) {

                this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {

                    this.$firebase.db.ref(`users/${user.user.uid}`).set({

                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        admin: false,
                        id: this.$custom.uid(),
                        children: []
                    })

                    this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(user => {
                            
                            this.$router.push({path: '/Dashboard'})

                        }, err => {

                            alert(err)
                        })
                    })
                })
            }

            else {

                alert('failure')
            }
        },

        loginUser() {

            this.$v.$touch()

            if (!this.$v.$invalid) {

                this.$firebase.auth().setPersistence(this.$firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {

                    return this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        
                        this.$firebase.db.ref(`/users/${user.user.uid}`).once('value').then((s) => {
                            this.$store.commit('logUserIn', s.val())
                            this.$router.push({path: '/Dashboard'})
                        })
                    }, err => {

                        alert(err)
                    })
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(`${errorCode} : ${errorMessage}`)
                })
            }
        }
    },
    beforeCreate() {

        // Check if user is already logged in, if so save their info to vuex and push them to dashboard

        this.$firebase.auth().onAuthStateChanged(user => {

            if (user) {

                this.$firebase.db.ref(`/users/${user.uid}`).once('value').then((s) => {
                        
                    this.$store.commit('logUserIn', s.val())
                    this.$router.replace({path: '/Dashboard'})
                })
            }
        })
    }
}
</script>

<style lang="scss" scoped>

    .wrapper {

        margin-top: 5em;
    }
</style>


