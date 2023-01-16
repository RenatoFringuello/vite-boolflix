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
            },
            getStars(vote){
                vote /= 2;
                const stars =[];
                for (let i = 0; i < 5; i++) {
                    if(vote < 0.8){
                        //not full active
                        if(vote >= 0.3 ){
                            // 100% half
                            stars.push(0.5);
                        }
                        else{
                            // 100% disabled
                            stars.push(0);
                        }
                    }
                    else{
                        //100% active
                        stars.push(1);
                    }
                    vote --;
                }
                return stars;
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
                    <li class="rate-container">
                        <div v-for="star in getStars(film.vote_average)" class="star" :class= "(star=== 0.5)?'half':(star === 0)?'disabled':'' "></div>
                        {{ film.vote_average }}
                    </li>
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
                    <li class="rate-container">
                        <div v-for="star in getStars(tv.vote_average)" class="star" :class= "(star=== 0.5)?'half':(star === 0)?'disabled':'' "></div>
                        {{ tv.vote_average }}
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;
    .container{
        display: flex;

        div{
            flex-basis: 50%;
        }
        li.rate-container{
            display: inline-flex;
            align-items: flex-end;

            .star{
                width:  $star-size;
                height: $star-size;
                clip-path: polygon(50% 0%, 64% 33%, 98% 35%, 72% 57%, 79% 91%, 50% 70%, 21% 91%, 28% 57%, 2% 35%, 37% 33%);
                background: $star-active;
                margin-right:.25rem;
                
                &.half{
                    background: linear-gradient(90deg, $star-active 0%, $star-active 50%, $star-disabled 50%, $star-disabled 100%);
                }
                &.disabled{
                    background: $star-disabled;
                }
            }

        }

        

    }
</style>