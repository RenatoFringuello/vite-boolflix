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

                isSearchOpen:false,
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
        <div class="container d-flex">
            <nav class="left d-flex">
                <a href="" class="logo"></a>
                <ul class="d-flex">
                    <li v-for="link,i in links" :class="activeIndex === i? 'active': ''">{{link}}</li>
                </ul>
            </nav>
            <nav class="right d-flex">
                <ul class="d-flex">
                    <li @click="isSearchOpen = true" class="search-container d-flex" :class="isSearchOpen?'open':''">
                        <img src="../assets/searchIcon.svg">
                        <input :class="!isSearchOpen?'d-none':''" @keyup.enter="sendResearch('search/movie', this.movieToSearch)" placeholder="titoli, persone, generi" type="text" v-model.trim="movieToSearch">
                    </li>
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
        z-index: 2;
        
        a{
            text-decoration: none;
        }

        .container{
            justify-content: space-between;

            //.left & .right
            nav{
                align-items: center;

                a.logo{
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
                    align-items: center;
                    margin-left: 18px;
                    li{
                        cursor: pointer;
                        margin-left: 1.5rem;
                    }
                }
                &.left ul li{
                    //nav.left
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
                }
                &.right ul li{
                    //nav.right
                    //containers
                    &.search-container{
                        &.open{

                            min-width: 200px;
                            width: 100%;
                            background-color: #0009;
                            border: 1px solid #fff;
                            padding: .3rem;
                            align-items: center;
                        }

                        input,
                        input:focus{
                            width: 100%;
                            background-color: #0000;
                            border: 0;
                            outline: 0;
                            color: inherit;
                            margin-left: 1rem;
                            &::placeholder{
                                color: #fffe;
                                font-weight: 200;
                            }
                        }
                    }
                    &.profile-container{
                        display: inline-flex;
                        align-items: center;
                        img.profile-pic{
                            width:  $profile-pic-size;
                            height: $profile-pic-size;
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
    </style>