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

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    main{
        height: 100%;
    }
</style>