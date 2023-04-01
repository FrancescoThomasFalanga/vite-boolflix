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

            this.showTrendingText = true;
            this.store.films = res.data.results;


        });

    },

    props: {
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

                this.showTrendingText = true;

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

                this.showTrendingText = false;

            };


        },

        callApi(string) {

            axios.get(string).then((res) => {

                this.store.films = res.data.results;
                console.log(this.store.films);

            });

        },

        actorFilters() {

            this.showTrendingText = true;
            this.store.actors = [];
            this.store.actorName = [];

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
                    
                    this.showTrendingText = false;
                    
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

    
    <div class="film-container" :class="this.showTrendingText ? '' : 'no-trending' ">
        <div v-if="this.showTrendingText" class="trending">
            In Tendenza Questa Settimana
        </div>

        <div class="flex">
            <FilmCard v-for="film in store.films" :film="film" ></FilmCard>
        </div>

        <div class="flex">
            <ActorsFiltersItem v-for="actor in store.films" :actor="actor" v-if="!this.showTrendingText"></ActorsFiltersItem>
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

    }
    
    .no-trending {
        margin: 80px 40px;
    }
</style>