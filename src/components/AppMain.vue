<script>
    import {store} from '../store'
    export default {
        name:'AppMain',
        data() {
            return {
                store,
                searchText:'',
                location:'movie',
            }
        },
        methods: {
            sendResearch(){
                this.store.getData(this.location, this.searchText);
            }        
        },
        
    }
</script>

<template>
    <main>
        <div class="container">
            <input  @keyup.enter="sendResearch()" type="text" v-model="searchText">
            <button @click="sendResearch()">Search</button>
            <ul>
                <li>{{ store.filmList[0].title }}</li>
                <li>{{ store.filmList[0].original_title }}</li>
                <li>{{ store.filmList[0].original_language }}</li>
                <li>{{ store.filmList[0].vote_average }}</li>
            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    
</style>