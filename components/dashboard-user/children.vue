<template>
    <v-layout row wrap>
            <v-flex v-for="child in $store.state['children/list']" v-bind:key="child.id" xs3 class="child">
                <v-card>

                </v-card>
            </v-flex> 
            <v-flex xs3 class="child">
                <v-btn outline block small class="add"
                v-on:click="dialog = true"
                >
                    Add a child
                </v-btn>   
            </v-flex>
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="75vw">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add a child</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                            label="First Name"
                                            required
                                            v-model="form.firstName"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                            label="Last Name"
                                            required
                                            v-model="form.lastName"    
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-menu
                                            ref="menu"
                                            v-bind:close-on-content-click="false"
                                            v-model="menu"
                                            v-bind:nudge-right="40"
                                            lazy
                                            transition="slide-y-transition"
                                            offset-y
                                            full-width
                                        >
                                            <v-text-field
                                                slot="activator"
                                                v-model="form.date"
                                                label="Birthday date"
                                                readonly
                                            ></v-text-field>
                                            <v-date-picker
                                                ref="picker"
                                                v-model="form.date"
                                                v-bind:max="new Date().toISOString().substr(0, 10)"
                                                min="1950-01-01"
                                                v-on:change="save"
                                                class="birthdate"
                                                width="100%"
                                                min-width="100%"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-menu
                                            ref="menu1"
                                            v-bind:close-on-content-click="false"
                                            v-model="menu1"
                                            v-bind:nudge-right="40"
                                            lazy
                                            offset-y
                                            transition="slide-y-transition"
                                            full-width
                                        >
                                            <v-text-field
                                                slot="activator"
                                                label="Grade"
                                                type="number"
                                                mask="##"
                                                v-model="form.grade"
                                                readonly
                                            ></v-text-field>
                                            <v-list>
                                                <v-list-tile
                                                    v-for="i in Array.from({length: 10}, (x, i) => i + 3)"
                                                    v-bind:key=i
                                                    v-on:click="saveGrade(i)"
                                                >
                                                    <v-list-tile-title>{{ i }}</v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat v-on:click.native ="dialog = false">Close</v-btn>
                            <v-btn color="primary" flat v-on:click.native ="createChild()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
     </v-layout>
</template>

<script>
    export default {
        data: () => {
            return {

                dialog: false,
                date: null,
                menu: false,
                menu1: false,
                form: {
                    firstName: '',
                    lastName: '',
                    date: null,
                    grade: 0
                }
            }
        },
        async fetch({store}) {

            store.dispatch('children/getChildren')
        },
        computed: {
          
            children: function () {

                return this.$store.getters['children/list']
            }
        },
        watch: {
            menu(val) {

                val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
        methods: {

            createChild: function () {

                this.$store.dispatch('children/setChildren', {
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    date: this.form.date,
                    grade: this.form.grade,
                    id: this.$custom.uid()
                })
                this.dialog = false
            },

            save (date) {

                this.$refs.menu.save(date)
            },

            saveGrade(grade) {

                this.form.grade = grade
                this.$refs.menu1.save(grade)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .child {

        height: 25vh;
        background: red;

        .add {

            height: 100%;
            margin: 0;
        }
    }

    
    .birthdate {

        width: 100%;

        & > div {

            width: 100% !important;
        }
    }
</style>
