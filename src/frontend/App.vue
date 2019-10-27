<template>
    <main>        
        <router-view />
    </main>
</template>

<script>    
</script>

<style lang="scss">
    @import url(https://fonts.googleapis.com/css?family=Arimo|DM+Serif+Display|Poppins:700&display=swap);

    * {
        font-family: sans-serif;
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    body {
        margin: 0;
        min-height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    main{
        flex: 1;
        width: 100%;
        max-width: 500px;

        display: flex;
        flex-direction: column;
    }
</style>