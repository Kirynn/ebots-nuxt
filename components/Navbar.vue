<template>
    <v-navigation-drawer app permanent>
        <v-toolbar flat>
            <v-toolbar-title>Welcome {{ this.$store.state.firstName }}</v-toolbar-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list class="pt-0">
            <v-list-tile
                v-for="item in items"
                v-bind:key="item.title"
                v-on:click="routeTo(item.route)"
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Navbar',
        props: {
        },
        data () {
            return {
                items: [
                    {
                        title: 'Dashboard',
                        icon: 'dashboard',
                        route: '/Dashboard'
                    },
                    {
                        title: 'Children',
                        icon: 'person',
                        route: '/'
                    },
                    {
                        title: 'Register',
                        icon: 'assignment'
                    }
                ]
            }
        },
        methods: {

            routeTo(route) {

                this.$router.push({path: route})
            }
        }
    }
</script>

<style lang="scss">

</style>

