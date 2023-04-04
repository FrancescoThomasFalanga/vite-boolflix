<!-- THIS COMPONENT MANAGES ONLY THE TV FILMS CARD -->

<script>
import {store} from "../store.js";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default {
    data() {
        return {
            store,
            stars: 5,
        }
    },

    props: {
        film: Object,
    },

    methods: {

        // function for obtain the different country flags
        flagEmoji() {

            let language = this.film.original_language;

            if (language == "en") {
                language = "gb";
            } else if(language == "") {
                language = "Sconosciuta";
            } else if(language == "ja") {
                language = "jp";
            } else if(language == "ko") {
                language = "kr";
            } else if(language == "hi") {
                language = "in"
            }

            return language;
        },

        // function for obtain the average vote with the start from 1 to 5
        showStars() {

            let newVote = Math.min(Math.max(Math.ceil(this.film.vote_average / 2), 1), 5);

            let starsToColor = Array(newVote).fill(1);
            let starsToEmpty = Array(this.stars - newVote).fill(0);

            return starsToColor.concat(starsToEmpty);
        },
    },
}
</script>


<template>

    <!-- FILMS CARD -->
    <div class="card" v-if="film.genre_ids.includes(store.filterGenre) || store.filterGenre == '' ">

        <!-- SHOWS IMAGE -->
        <div class="img-hover">
            <img v-if="!film.poster_path == '' " :src="this.store.URLimg + film.poster_path" alt="">
            <div v-else class="unknown">Immagine non disponibile</div>
        </div>
        <!-- /SHOWS IMAGE -->


        <!-- SHOW ONLY WHEN IN HOVER -->
        <div class="hidden">

             <!-- original title -->
            <div>
                <span v-if="film.original_title !== film.title"><strong>Titolo Originale:</strong> {{film.original_title}} {{ film.original_name }}</span>
            </div>
             <!-- /original title -->
            

            <!-- alternative title -->
            <div>
                <span><strong>Titolo:</strong> {{film.title }} {{film.name}}</span>
            </div>
            <!-- /alternative title -->
    

            <!-- original language -->
            <div>
                <span><strong>Lingua Originale: </strong> <span :class="`fi fi-${flagEmoji()} fis`"> </span></span>
            </div>
            <!-- /original language -->
    

            <!-- STARS -->
            <div class="stars">
                <strong>Voto:</strong>
                <i v-for="star in showStars()" class="fa-solid fa-star" :class="star ? 'yellow' : '' "></i>
            </div>
            <!-- /STARS -->


            <!-- DESCRIPTION -->
            <div class="overview">
                <span v-if="!film.overview == '' "><strong>Descrizione:</strong> {{ film.overview }} </span>
                <span v-else><strong>Descrizione:</strong> Non disponibile</span>
            </div>
            <!-- /DESCRIPTION -->

        </div>
        <!-- /SHOW ONLY WHEN IN HOVER -->

    </div> 
    <!-- /FILMS CARD -->

</template>


<style lang="scss" scoped>
    
    .card {
        position: relative;
        display: flex;
        flex-flow: column wrap;
        width: calc(20% - 30px);
        gap: 20px;
        background-color: rgba(56, 56, 56, 0.151);
    }

    .unknown {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .card:hover .unknown {
        opacity: 0;
        transition: 1s linear all;
    }

    .img-hover:hover {
        position: relative;
        z-index: 2;
        opacity: .2;
        transition: 1s linear all;
        transform: scale(1.2);
    }

    .hidden {
        display: none;

        .card:hover & {
            display: flex;
            flex-flow: column wrap;
            gap: 20px;
            position: absolute;
            padding: 20px;
        }
    }

    img {
        width: 100%;
        min-height: 500px;
        object-fit: cover;
    }

    .stars {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .yellow {
        color: yellow;
    }

    .overview {
        position: relative;
        padding-top: 30px;
        height: 250px;
        overflow-y: hidden;
        text-overflow: ellipsis;
    }

</style>