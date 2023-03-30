<script>
import {store} from "../store.js";
import axios from "axios";
import SearchItem from "./SearchItem.vue";
import FilmCard from "./FilmCard.vue";

export default {
    data() {
        return {
            store,
            showTrendingText: true,
        }
    },

    components: {
        SearchItem,
        FilmCard,
    },

    created() {

        axios.get(this.store.APIcallTrending).then((res) => {

            this.showTrendingText = true;
            this.store.films = res.data.results;


        });

    },

    methods: {

        search() {

            this.showTrendingText = false;

            let newFilmApiString = this.store.APIcallFilm;

            if (!this.store.filmName == "") {

                newFilmApiString += `${this.store.APIquery}${this.store.filmName}`;

                this.callApi(newFilmApiString);

                this.store.APIcallTrending = "";

            } else {

                this.store.APIcallTrending = "https://api.themoviedb.org/3/trending/all/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT";

                newFilmApiString = this.store.APIcallTrending;

                this.callApi(newFilmApiString);

            };


            let newSeriesApiString = this.store.APIcallSeries;

            if (!this.store.filmName == "") {

                newSeriesApiString += `${this.store.APIquery}${this.store.filmName}`;

                axios.get(newSeriesApiString).then((res) => {
    
                    res.data.results.forEach(result => {
                        this.store.films.push(result);
                    })
    
                });

                this.store.APIcallTrending = "";

            } else {

                this.store.APIcallTrending = "https://api.themoviedb.org/3/trending/all/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT";

                newSeriesApiString = this.store.APIcallTrending;

                this.showTrendingText = true;


                this.callApi(newSeriesApiString);

            }


        },

        callApi(string) {

            axios.get(string).then((res) => {

                this.store.films = res.data.results;
                console.log(this.store.films);

            });

        },

    },
}
</script>


<template>

    <div class="nav-bar">
        <SearchItem @searchFilm="search()"></SearchItem>
    </div>

    
    <div class="film-container" :class="this.showTrendingText ? '' : 'no-trending' ">
        <div v-if="this.showTrendingText" class="trending">
            In Tendenza Questa Settimana
        </div>

        <FilmCard v-for="film in store.films" :film="film"></FilmCard>
    </div>

</template>


<style lang="scss" scoped>
    .nav-bar {
        position: fixed;
        top: 0;
        z-index: 3;
        width: 100%;
        background-color: black;
    }

    .film-container {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
        margin: -100px 0 50px;

        .trending {
            width: 100%;
            padding-left: 30px;
            font-size: 26px;
            font-weight: bold;
        }

    }
    
    .no-trending {
        margin: 80px 0;
    }
</style>