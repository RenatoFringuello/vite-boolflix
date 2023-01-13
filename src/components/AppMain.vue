<script>
    import {store} from '../store'
    export default {
        name:'AppMain',
        data() {
            return {
                store,
                searchText:'',
                location:'movie',
                imgLoaded : false,
            }
        },
        methods: {
            sendResearch(location, searchText){
                this.imgLoaded = false;
                this.store.getData(location, searchText);
            },
            getFlagCode(code){
                switch(code){
                    case 'en':
                        code = 'gb';
                        break;
                    case 'ja':
                        code = 'jp';
                }
                return code.toUpperCase();
            }       
        },
        created(){
            this.sendResearch(this.location, 'a');
        }
        
    }
</script>

<template>
    <main>
        <div class="container">
            <input  @keyup.enter="sendResearch(this.location, this.searchText)" type="text" v-model.trim="searchText">
            <button @click="sendResearch(this.location, this.searchText)">Search</button>
            <ul v-if="store.isLoaded" :class="(imgLoaded)? 'd-block' : 'd-none'">
                <li>{{ store.filmList[0].title }}</li>
                <li>{{ store.filmList[0].original_title }}</li>
                <li><img :src="`https://flagsapi.com/${this.getFlagCode(this.store.filmList[0].original_language)}/flat/32.png`"
                         :alt="store.filmList[0].original_language"
                         @load="imgLoaded = true">
                </li>
                <li>{{ store.filmList[0].vote_average }}</li>
            </ul>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    
</style>