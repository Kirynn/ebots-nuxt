<template>
    <v-container fluid>
        <children></children>
    </v-container>
</template>

<script>
    import children from '~/components/dashboard-user/children'

    export default {
        name: 'Dashboard',
        layout: 'app',
        components: {
            children
        },
        data () {
            return {
                
            }
        },
        methods: {

        },
        created: function () {

            console.log(`Is logged in: ${this.$store.state.isLoggedIn}`)
            if (!this.$store.state.isLoggedIn) this.$router.replace('/')
        }
    }
</script>