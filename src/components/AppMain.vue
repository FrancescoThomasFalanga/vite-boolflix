<script>
import {store} from "../store.js";
import axios from "axios";
import SearchItem from "./SearchItem.vue";
import FilmCard from "./FilmCard.vue";
import ActorsFiltersItem from "./ActorsFiltersItem.vue";

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
        ActorsFiltersItem,
    },

    created() {

        axios.get(this.store.APIcallTrending).then((res) => {
            
            
            this.store.showCast = false;
            this.showTrendingText = true;
            this.store.films = res.data.results;


        });

    },

    props: {
    },

    methods: {

        search() {

            this.store.showCast = false;

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

            };


        },

        callApi(string) {

            axios.get(string).then((res) => {

                this.store.films = res.data.results;
                console.log(this.store.films);

            });

        },

        actorFilters() {

            this.store.showCast = true;

            let uncompletedAPI = this.store.uncompletedApiCallCredits;
            let newArray = [];

            this.store.films.forEach((element) => {

                this.store.actorName.push(element.id);

                newArray.push(uncompletedAPI +  element.id + this.store.toCompleteApiCallCredits);

                element.cast = [];

                
            });

            for (let i = 0; i < newArray.length; i++) {
                
                axios.get(newArray[i]).then((res) => {
                    
                    res.data.cast.splice(5)
                    
                    let actors = res.data.cast.map(actor => actor.name);
                    
                    this.store.films[i].cast = actors;
                    
                    this.store.actors.push(actors);
                    
                });
            };
            

            console.log(this.store.actors);
        },





    },
}
</script>


<template>

    <div class="nav-bar">
        <SearchItem @searchFilm="search()" @actorFilters="actorFilters()"></SearchItem>
    </div>

    
    <div class="film-container">
        <div class="trending">
            In Tendenza Questa Settimana
        </div>

        <div class="flex" :class="store.showCast ? 'no-all' : 'no-all' ">
            <FilmCard v-for="film in store.films" :film="film" v-if="!store.showCast"></FilmCard>
        </div>

        <div class="flex">
            <ActorsFiltersItem v-for="actor in store.films" :actor="actor"></ActorsFiltersItem>
        </div>

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
        flex-wrap:  wrap;
        flex-direction: column;
        gap: 20px;
        margin: -100px 40px 50px;

        .flex {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            
        }

        .trending {
            width: 100%;
            padding-left: 30px;
            font-size: 26px;
            font-weight: bold;
        }

        .no-all {
            margin-top: 110px;
        }

    }
</style>