<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/help">Hilfe</router-link>
    </nav>
</template>

<script>
</script>

<style scoped lang="scss">
    nav {
        display: flex;
        flex-direction: row;
        background: #eee;
        padding: 10px;

        > a {
            padding-right: 10px;
            color: #333;

            &:last-child {
                padding-right: 0;
            }
        }
    }
</style>