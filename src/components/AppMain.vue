<script>
import {store} from "../store.js";
import axios from "axios";
import SearchItem from "./SearchItem.vue";
import FilmCard from "./FilmCard.vue";

export default {
    data() {
        return {
            store,
        }
    },

    components: {
        SearchItem,
        FilmCard,
    },

    created() {

        axios.get(this.store.APIcallFilm).then((res) => {

            this.store.films = res.data.results;

        });

    },

    methods: {

        search() {

            let newFilmApiString = this.store.APIcallFilm;

            if (!this.store.filmName == "") {

                newFilmApiString += `${this.store.APIquery}${this.store.filmName}`;

            };

            axios.get(newFilmApiString).then((res) => {

                this.store.films = res.data.results;
                console.log(this.store.films);

            });

            let newSeriesApiString = this.store.APIcallSeries;

            if (!this.store.filmName == "") {

                newSeriesApiString += `${this.store.APIquery}${this.store.filmName}`;

            };

            axios.get(newSeriesApiString).then((res) => {

                res.data.results.forEach(result => {
                    this.store.films.push(result);
                })

            });

        },

    },
}
</script>


<template>

    <SearchItem @searchFilm="search()"></SearchItem>
    
    <div class="film-container">

        <FilmCard v-for="film in store.films" :film="film"></FilmCard>

    </div>
</template>


<style lang="scss" scoped>
    .film-container {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin: 50px 0;
    }
</style>