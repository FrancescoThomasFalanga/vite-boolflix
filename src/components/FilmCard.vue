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
            }

            return language;
        },

        showStars() {

            let newVote = Math.min(Math.max(Math.ceil(this.film.vote_average / 2), 1), 5);

            let starsToColor = Array(newVote).fill(1);
            let starsToEmpty = Array(this.stars - newVote).fill(0);

            return starsToColor.concat(starsToEmpty);
        }

    },
}
</script>


<template>
    <div class="card">

        <img v-if="!film.poster_path == '' " :src="this.store.URLimg + film.poster_path" alt="">
        <div v-else>Immagine non disponibile</div>

        <span><strong>Titolo Originale:</strong> {{film.original_title}} {{ film.original_name }}</span>
        <span><strong>Titolo:</strong> {{film.title }} {{film.name}}</span>

        <span>Lingua Originale: <span :class="`fi fi-${flagEmoji()} fis`"></span></span>
        <strong>Voto:</strong>

        <div class="stars">
            <i v-for="star in showStars()" class="fa-solid fa-star" :class="star ? 'yellow' : '' "></i>
        </div>

    </div> 
</template>


<style lang="scss" scoped>
    
    .card {
        display: flex;
        flex-flow: column wrap;
        gap: 20px;
        width: 20%;
        height: 600px;
        background-color: rgb(130, 132, 238);
    }

    img {
        width: 100%;
    }

    .stars {
        display: flex;
        gap: 4px;
    }

    .yellow {
        color: yellow;
    }

</style>


<!-- CLASSE PER AGGIUNGERE IN HTML LE STELLE FONT-AWESOME -->
<!-- <i class="fa-solid fa-star"></i> -->

<!-- {{ Math.min(Math.max(Math.ceil(film.vote_average / 2), 1), 5) }} -->