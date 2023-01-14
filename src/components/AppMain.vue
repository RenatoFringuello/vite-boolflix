<script>
    import {store} from '../store'
    export default {
        name:'AppMain',
        data() {
            return {
                store,
            }
        },
        methods: {
            getFlagCode(code){
                switch(code){
                    case 'cs':
                        code = 'cz';
                        break;
                    case 'en':
                        code = 'gb';
                        break;
                    case 'ja':
                        code = 'jp';
                    case 'ko':
                        code = 'kr';
                }
                return code.toUpperCase();
            }       
        }
    }
</script>

<template>
    <main>
        <div class="container">
            <div class="left">
                <h1>Movies</h1>
                <ul v-for="film in store.filmData.data" v-if="store.filmData.isLoaded" :class="(store.filmData.isImgLoaded)? 'd-block' : 'd-none'">
                    <li>{{ film.title }}</li>
                    <li>{{ film.original_title }}</li>
                    <li><img :src="`https://flagsapi.com/${this.getFlagCode(film.original_language)}/flat/32.png`"
                        :alt="film.original_language"
                        @load="store.filmData.isImgLoaded = true">
                    </li>
                    <li>{{ film.vote_average }}</li>
                </ul>
            </div>
            <div class="right">
                <h1>Tv Series</h1>
                <ul v-for="tv in store.tvData.data" v-if="store.tvData.isLoaded" :class="(store.tvData.isImgLoaded)? 'd-block' : 'd-none'">
                    <li>{{ tv.name }}</li>
                    <li>{{ tv.original_name }}</li>
                    <li><img :src="`https://flagsapi.com/${this.getFlagCode(tv.original_language)}/flat/32.png`"
                        :alt="tv.original_language"
                        @load="store.tvData.isImgLoaded = true">
                    </li>
                    <li>{{ tv.vote_average }}</li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .container{
        display: flex;

        div{
            flex-basis: 50%;
        }
    }
</style>