<script>
    import {store} from '../store'
    export default {
        data() {
            return {
                store,
                movieToSearch:'',
                tvToSearch:'',

                activeIndex:0,
                links:['Home','Serie TV', 'Film', 'Nuovi e popolari', 'La mia lista', 'Sfoglia per lingua'],
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
            <!-- <input  @keyup.enter="sendResearch('search/movie', this.movieToSearch)" placeholder="type a movie..." type="text" v-model.trim="movieToSearch">
            <button @click="sendResearch('search/movie', this.movieToSearch)">Search</button>
            <input  @keyup.enter="sendResearch('search/tv', this.tvToSearch)" placeholder="type a tv sereis..." type="text" v-model.trim="tvToSearch">
            <button @click="sendResearch('search/tv', this.tvToSearch)">Search</button> -->
        <div class="container">
            <nav class="left">
                <a href="" class="logo"></a>
                <ul>
                    <li v-for="link,i in links" :class="activeIndex === i? 'active': ''">{{link}}</li>
                </ul>
            </nav>
            <nav class="right">
                <ul>
                    <li><img src="../assets/searchIcon.svg"></li>
                    <li>Bambini</li>
                    <li><img src="../assets/bellIcon.svg"></li>
                    <li class="profile-container">
                        <img class="profile-pic" src="http://occ-0-2943-784.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdJytl2ojXAfeEIVmbBHOjIWVE0u5jGoIEZ6NaPYYPDCCA3pO_25YEcUXsCtpQ4SkID1EsY-cXAAICNEh0KOo7WipEDB-40.png?r=4ef" alt="John Doe">
                        <div class="triangle"></div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;


    header{
        position: fixed;
        width: 100%;
        background-image: linear-gradient(#000b 10%,#0000);
        padding: 1.7rem 0;
        font-weight: 100;
        font-size: .9rem;
        
        a{
            text-decoration: none;
        }

        .container{
            display: flex;
            justify-content: space-between;

            nav{
                display: flex;
                align-items: center;

                a{
                    margin-right: 5px;
                    line-height: 1;
                    &.logo::before{
                        font-family: nf-icon;
                        color: $netflix-red;
                        font-size: 1.8rem;
                        content: "\e5d0";
                    }
                }
                ul{
                    display: flex;
                    align-items: center;
                    margin-left: 18px;
                    li{
                        cursor: pointer;
                        line-height: 0;
                        margin-left: 1.5rem;
                        &.active{
                            font-weight: 500;
                        }
                        &:not(.active){
                            transition: all .5s;
                            opacity: 1;
                            &:hover{
                                opacity: .7;
                            }
                        }
                        
                        &.profile-container{
                            display: inline-flex;
                            align-items: center;
                            img.profile-pic{
                                width: 32px;
                                height: 32px;
                                border-radius: 5px;
                            }
                            div.triangle{
                                width: 10px;
                                height: 10px;
                                margin-left: 10px;
                                clip-path: polygon(50% 100%, 0 50%, 100% 50%);
                                background-color: #fff;
                                transition: all .25s;
                            }

                            &:hover div.triangle{
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
            }
        }
    }
    </style>