<script>
    import {store} from '../store'
    export default {
        name:'AppHome',
        data() {
            return {
                store,
                isFlipped : -1,
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
        <div class="jumbotron">
            <img 
                 :src="store.configData.images.secure_base_url + store.configData.images.backdrop_sizes[3] + store.filmData.data[0].backdrop_path"
                 :alt="store.filmData.data[0].title  + '\'s poster'">
        </div>
        <section>
            <div class="container">
                <h1>Movies</h1>
                <div class="cards-container d-flex">
                    <div v-for="film,i in store.filmData.data" class="scene" 
                         @mouseenter="isFlipped = i" 
                         @mouseleave="isFlipped = -1">
                    <div class="card" :class="isFlipped === i ? 'isFlipped': ''" >
                        <div class="card-face card-front">
                            <img :src="store.configData.images.secure_base_url + store.configData.images.poster_sizes[3] + film.poster_path"
                            :alt="film.title  + '\'s poster'">
                        </div>
                        <div class="card-face card-back">
                            <ul class="d-flex">
                                <li><h4>TITOLO:</h4>{{ film.title }}</li>
                                <li><h4>TITOLO ORIGINALE:</h4> {{ film.original_title }}</li>
                                <li class="overview"><h4>OVERVIEW:</h4> {{ film.overview }}</li>
                                <!-- <li><img :src="`https://flagsapi.com/${this.getFlagCode(film.original_language)}/flat/32.png`"
                                    :alt="this.getFlagCode(film.original_language)">
                                </li> -->
                                <li class="rate-container">
                                    <h4>VOTO:</h4> 
                                    <div v-for="star in getStars(film.vote_average)" class="star" :class= "(star=== 0.5)?'half':(star === 0)?'disabled':'' "></div>
                                    {{ film.vote_average }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;

    .jumbotron{
        height: 70vh;
        img{
            width: 100%;
            height: 90vh;
            object-fit: cover;
            object-position: top;
        }
    }
    section {
        position: relative;
        background-image: linear-gradient(#0000,#141414b3 30%);
        z-index: 2;
        .container{
            
            li.rate-container{
                display: inline-flex;
                align-items: flex-end;
            }
            .cards-container{
                //flip-card
                .scene{
                    perspective: 600px;
                    margin-right: 1rem;
                    
                    .card{
                        width: $card-width-3;
                        height: $card-height-3;
                        position: relative;
                        transition: transform 1s;
                        transform-style: preserve-3d;
                        
                        &.isFlipped{
                            transform: rotateY(-180deg);
                        }
                        
                        .card-face{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            backface-visibility: hidden;
                            -webkit-backface-visibility: hidden;
                            
                            &.card-front{
                                background-color: red;
                            }
                            &.card-back{
                                background-color: $netflix-bg;
                                padding: 1rem;
                                border: 1px solid;
                                transform: rotateY( 180deg );
                                
                                ul{
                                    height: 100%;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    
                                    li.overview{
                                        background-color: #222;
                                        padding: .5rem;
                                        height: 100%;
                                        max-height: 50%;
                                        overflow-y: auto;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //star
        .star{
            width:  $star-size;
            height: $star-size;
            clip-path: polygon(50% 0%, 64% 33%, 98% 35%, 72% 57%, 79% 91%, 50% 70%, 21% 91%, 28% 57%, 2% 35%, 37% 33%);
            // background: $star-active;
            background: $netflix-red;
            margin-right:.25rem;
            
            &.half{
                background: linear-gradient(90deg, $netflix-red 0%, $netflix-red 50%, $star-disabled 50%, $star-disabled 100%);
            }
            &.disabled{
                background: $star-disabled;
            }
        }

        

    }
</style>