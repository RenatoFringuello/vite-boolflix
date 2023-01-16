<script>
    import {store} from '../store'
    export default {
        data() {
            return {
                store,
                movieToSearch:'',
                tvToSearch:'',
            }
        },
        methods: {
            sendResearch(location, searchText){
                searchText = (searchText === '')?'A':searchText;
                this.store.getData(location, searchText);
            },
        },
        created(){
            // on created carica i best
            this.sendResearch('search/movie', 'a');
        }
    }
</script>

<template>
    <header>
        <div class="container">
            <input  @keyup.enter="sendResearch('search/movie', this.movieToSearch)" placeholder="type a movie..." type="text" v-model.trim="movieToSearch">
            <button @click="sendResearch('search/movie', this.movieToSearch)">Search</button>
            <input  @keyup.enter="sendResearch('search/tv', this.tvToSearch)" placeholder="type a tv sereis..." type="text" v-model.trim="tvToSearch">
            <button @click="sendResearch('search/tv', this.tvToSearch)">Search</button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    header{
        padding: 1rem 0;
    }
</style>