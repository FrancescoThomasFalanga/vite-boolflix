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
    <div class="card" v-if="film.genre_ids.includes(store.filterGenre) || store.filterGenre == '' ">

        <div class="img-hover">
            <img v-if="!film.poster_path == '' " :src="this.store.URLimg + film.poster_path" alt="">
            <div v-else class="unknown">Immagine non disponibile</div>
        </div>


        <div class="hidden">
            <div>
                <span v-if="film.original_title !== film.title"><strong>Titolo Originale:</strong> {{film.original_title}} {{ film.original_name }}</span>
            </div>
            
            <div>
                <span><strong>Titolo:</strong> {{film.title }} {{film.name}}</span>
            </div>
    
            <div>
                <span><strong>Lingua Originale: </strong> <span :class="`fi fi-${flagEmoji()} fis`"> </span></span>
            </div>
    
            <div class="stars">
                <strong>Voto:</strong>
                <i v-for="star in showStars()" class="fa-solid fa-star" :class="star ? 'yellow' : '' "></i>
            </div>

            <div class="overview">
                <span v-if="!film.overview == '' "><strong>Descrizione:</strong> {{ film.overview }} </span>
                <span v-else><strong>Descrizione:</strong> Non disponibile</span>
            </div>
        </div>

    </div> 
</template>


<style lang="scss" scoped>
    
    .card {
        position: relative;
        display: flex;
        flex-flow: column wrap;
        gap: 20px;
        width: calc(20% - 30px);
        height: auto;
        cursor: pointer;
        background-color: rgba(56, 56, 56, 0.151);
        overflow: hidden;
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
        height: 100%;
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