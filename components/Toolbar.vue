<template>
    <v-toolbar app color="primary">
            <v-toolbar-title class="white--text">Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
        <v-btn outline class="white--text" v-on:click="logout()">Logout</v-btn>
    </v-toolbar>
</template>

<script>

    export default {
        name: 'Toolbar',
        methods: {

            logout() {
                this.$firebase.auth().signOut()
                .then(() => {

                    this.$store.commit('logUserOut')
                    this.$router.replace({path: '/'})
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss">

</style>

