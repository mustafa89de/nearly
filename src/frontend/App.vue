<template>
    <main>
        <nav-bar />
        <router-view />
    </main>
</template>

<script>
    import NavBar from './components/NavBar.vue';

    export default {
        components: {
            'nav-bar': NavBar
        }
    }
</script>

<style lang="scss">
    * {
        font-family: sans-serif;
        box-sizing: border-box;
    }

    body {
        padding: 0;
        margin: 0;
    }

    article {
        text-align: center;
    }
</style>