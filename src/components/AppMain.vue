<script>
    import {store} from '../store'
    export default {
        name:'AppMain',
        data() {
            return {
                store,
                //size = /w342/ per esempio
            }
        },
        methods: {
            getFlagCode(code){
                switch(code){
                    case 'cs':
                        code = 'cz';
                        break;
                    case 'en':
                        code = 'us';
                        break;
                    case 'ja':
                        code = 'jp';
                        break;
                    case 'ko':
                        code = 'kr';
                        break;
                    case 'zh':
                        code = 'cn';
                        break;
                }
                return code.toUpperCase();
            }       
        },
        created() {
            this.store.getData('configuration', '');
        },
    }
</script>

<template>
    <main>
        <div class="container">
            <div class="left">
                <h1>Movies</h1>
                <ul v-for="film in store.filmData.data" v-if="store.filmData.isLoaded" :class="(store.filmData.isImgLoaded)? 'd-block' : 'd-none'">
                    <li><img :src="store.configData.images.secure_base_url + store.configData.images.poster_sizes[2] + film.poster_path"
                        :alt="film.title  + '\'s poster'"
                        @load="store.filmData.isImgLoaded = true">
                    </li>
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
                    <li><img :src="store.configData.images.secure_base_url + store.configData.images.poster_sizes[2] + tv.poster_path"
                        :alt="tv.name + '\'s poster'"
                        @load="store.filmData.isImgLoaded = true">
                    </li>
                    <li>{{ tv.name }}</li>
                    <li>{{ tv.original_name }}</li>
                    <li><img :src="`https://flagsapi.com/${this.getFlagCode(tv.original_language)}/flat/32.png`"
                        :alt="this.getFlagCode(tv.original_language)"
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