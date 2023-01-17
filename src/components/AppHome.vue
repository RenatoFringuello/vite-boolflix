<script>
    import {store} from '../store'
    export default {
        name:'AppHome',
        data() {
            return {
                store,
                isMovieFlipped : -1,
                isTvFlipped : -1,
                sliderMovieIndex : 0,
                sliderTvIndex : 0,
            }
        },
        methods: {

            changeSlide(slider, direction, listLength){
                listLength /= 4;
                if(slider === 0){
                    //movie slider
                    this.sliderMovieIndex += direction;
                    this.sliderMovieIndex = (this.sliderMovieIndex < 0) ? listLength-1 : (this.sliderMovieIndex >= listLength) ? 0 : this.sliderMovieIndex;
                }
                else {
                    //tv slider
                    this.sliderTvIndex += direction;
                    this.sliderTvIndex = (this.sliderTvIndex < 0) ? listLength-1 : (this.sliderTvIndex >= listLength) ? 0 : this.sliderTvIndex;
                }
            },
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
            <img :src="store.configData.images.secure_base_url + store.configData.images.backdrop_sizes[3] + store.filmData.data[0].backdrop_path"
                 :alt="store.filmData.data[0].title  + '\'s poster'">
            <section class="container">
                <h1>{{ store.filmData.data[0].title }}</h1>
                <p>{{ store.filmData.data[0].overview }}</p>
            </section>
        </div>
        <!-- movies -->
        <section class="first slider-container">
            <h1 class="container">Film</h1>
            <div class="cards-container d-flex">
                <div v-for="film,i in store.filmData.data" class="scene"
                     v-show="Math.floor(i / 4) === sliderMovieIndex"
                     @mouseenter="isMovieFlipped = i" 
                     @mouseleave="isMovieFlipped = -1">
                    <div class="card" :class="isMovieFlipped === i ? 'isFlipped': ''">
                        <div class="card-face card-front">
                            <img :src="store.configData.images.secure_base_url + store.configData.images.poster_sizes[3] + film.poster_path"
                            :alt="film.title  + '\'s poster'">
                        </div>
                        <div class="card-face card-back">
                            <ul class="d-flex">
                                <li><h4>{{i}}TITOLO:</h4>{{ film.title }}</li>
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
            <button class="btn btn-prev" @click="changeSlide(0,-1, store.filmData.data.length)"></button>
            <button class="btn btn-next" @click="changeSlide(0, 1, store.filmData.data.length)"></button>
        </section>
        <!-- tv series -->
        <section class="slider-container">
            <h1 class="container">Serie TV</h1>
            <div class="cards-container d-flex">
                <div v-for="tv,i in store.tvData.data" class="scene" 
                     v-show="Math.floor(i / 4) === sliderTvIndex"
                     @mouseenter="isTvFlipped = i" 
                     @mouseleave="isTvFlipped = -1">
                    <div class="card" :class="isTvFlipped === i ? 'isFlipped': ''" >
                        <div class="card-face card-front">
                            <img :src="store.configData.images.secure_base_url + store.configData.images.poster_sizes[3] + tv.poster_path"
                            :alt="tv.name  + '\'s poster'">
                        </div>
                        <div class="card-face card-back">
                            <ul class="d-flex">
                                <li><h4>{{i}}TITOLO:</h4>{{ tv.name }}</li>
                                <li><h4>TITOLO ORIGINALE:</h4> {{ tv.original_name }}</li>
                                <li class="overview"><h4>OVERVIEW:</h4> {{ tv.overview }}</li>
                                <!-- <li><img :src="`https://flagsapi.com/${this.getFlagCode(tv.original_language)}/flat/32.png`"
                                    :alt="this.getFlagCode(tv.original_language)">
                                </li> -->
                                <li class="rate-container">
                                    <h4>VOTO:</h4> 
                                    <div v-for="star in getStars(tv.vote_average)" class="star" :class= "(star=== 0.5)?'half':(star === 0)?'disabled':'' "></div>
                                    {{ tv.vote_average }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-prev" @click="changeSlide(1,-1, store.filmData.data.length)"></button>
            <button class="btn btn-next" @click="changeSlide(1, 1, store.filmData.data.length)"></button>
        </section>
    </main>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;

    main{
        padding-bottom: 2rem;
        .jumbotron{
            height: 70vh;
            position: relative;
            img{
                width: 100%;
                height: 90vh;
                object-fit: cover;
                object-position: top;
                opacity: .7;
            }
            section{
                position: absolute;
                width: 50%;
                transform: translateY(-50%);
                top:65%;
                left:0;
                h1{
                    font-size: 3rem;
                    text-shadow: 3px 5px 0px $netflix-red;
                }
                p{
                    font-size: 1.5rem;
                }
            }
        }
        section {
            &.first{
                position: relative;
                background-image: linear-gradient(#0000,#141414b3 30%);
                z-index: 2;
            }
            &.slider-container{
                position: relative;
                
                h1{
                    font-size: 2.5rem;
                    margin: 1rem 0;
                }
                //slider
                .cards-container{
                    padding:0 .5rem;
                    //flip-card
                    .scene{
                        perspective: 600px;
                        margin:0 .5rem;
                        
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
                                img{
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                }
                                
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
                                        li.rate-container{
                                            display: inline-flex;
                                            align-items: flex-end;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                button{
                    cursor: pointer;
                    border:0;
                    background-color: #000b;
                    color:#fff;
                    opacity: .3;
                    width: 60px;
                    height: $card-height-3;
                    
                    &:hover{
                        opacity: 1;
                    }
                    &.btn{
                        font-family: nf-icon;
                        font-size: 1.8rem;
                        content: "\e5d0";
                        position: absolute;
                        bottom:0;
                        
                        &.btn-prev{
                            left:0;
                            &::before{
                                content: "\e868";
                            }
                        }
                        &.btn-next{
                            right: 0;
                            &::before{
                                content: "\e867";
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
    }
</style>