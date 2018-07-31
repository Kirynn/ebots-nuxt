<template>
    <v-app>
        <navbar></navbar>
        <toolbar></toolbar>
        <v-content>
            <nuxt />
        </v-content>
    </v-app>
</template>

<script>

    import toolbar from '~/components/Toolbar.vue'
    import navbar from '~/components/Navbar.vue'

    export default {
     
        name: 'Layout-Dashboard',
        components: {
            toolbar,
            navbar
        }
    }
</script>
