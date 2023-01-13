<script>
    import axios from 'axios'
    import { store } from '../store'

    export default {
        name : 'AppCallComponent',
        data() {
            return {
                store,
            }
        },
    }
</script>

<template>
    <h1>{{ store.filmList[0] }}</h1>
</template>

<style lang="">
    
</style>