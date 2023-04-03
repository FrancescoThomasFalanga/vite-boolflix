<script>
import {store} from "../store.js";
import axios from "axios";
import SearchItem from "./SearchItem.vue";
import AllCard from "./AllCard.vue";
import FilmCard from "./FilmCard.vue";
import SeriesCard from "./SeriesCard.vue";
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
        AllCard,
        FilmCard,
        SeriesCard,
        ActorsFiltersItem,
    },

    created() {

        axios.get(this.store.APIcallTrending).then((res) => {
            
            this.store.showCast = false;
            this.showTrendingText = true;
            this.store.films = res.data.results;

        });

        this.trendingMovies();
        this.trendingSeries();

    },

    props: {
    },

    methods: {

        search() {

            this.store.showTrending = false;
            this.store.showCast = false;

            let newFilmApiString = this.store.APIcallFilm;

            if (!this.store.filmName == "" && store.isHome == 0) {

                newFilmApiString += `${this.store.APIquery}${this.store.filmName}`;

                this.callApi(newFilmApiString);

                this.store.APIcallTrending = "";

            } else {

                this.store.APIcallTrending = "https://api.themoviedb.org/3/trending/all/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT";

                newFilmApiString = this.store.APIcallTrending;

                this.callApi(newFilmApiString);

            };


            let newSeriesApiString = this.store.APIcallSeries;

            if (!this.store.filmName == "" && store.isHome == 0) {

                newSeriesApiString += `${this.store.APIquery}${this.store.filmName}`;

                axios.get(newSeriesApiString).then((res) => {
    
                    res.data.results.forEach(result => {
                        this.store.series = result;
                        this.store.films.push(store.series);
                    })
    
                });

                this.store.APIcallTrending = "";

            };



            if (!this.store.filmName == "" && store.isHome == 2) {

                this.store.doNotShowFilm = false;

                let newOnlyFilmApiString = this.store.APIcallFilm;

                newOnlyFilmApiString += `${this.store.APIquery}${this.store.filmName}`;

                axios.get(newOnlyFilmApiString).then((res) => {

                    this.store.onlyFilms = res.data.results;

                });

            } else {

                this.store.doNotShowFilm = true;

                let newFilmApiString = this.store.APIcallTrendingMoviesDay;

                axios.get(newFilmApiString).then((res) => {

                    this.store.onlyFilms = res.data.results;

                })

            };



            if (!this.store.filmName == "" && store.isHome == 1) {

                this.store.doNotShowSeries = false;
                let newOnlySeriesApiString = this.store.APIcallSeries;

                newOnlySeriesApiString += `${this.store.APIquery}${this.store.filmName}`;

                axios.get(newOnlySeriesApiString).then((res) => {

                    this.store.series = res.data.results;

                });

            } else {

                this.store.doNotShowSeries = true;
                let newSeriesApiString = this.store.APIcallTrendingSeriesDay;

                axios.get(newSeriesApiString).then((res) => {

                    this.store.series = res.data.results;

                });

            };

        },

        callApi(string) {

            axios.get(string).then((res) => {

                this.store.films = res.data.results;
                console.log(this.store.films);

            });

        },

        actorFilters() {

            let uncompletedAPI = this.store.uncompletedApiCallCredits;
            let newArray = [];

            this.store.showCast = true;


            if (store.isHome == 0) {

                uncompletedAPI = this.store.uncompletedApiCallCredits;
                newArray = [];

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
                
            };


            if (store.isHome == 1 || store.isHome == 0) {

                uncompletedAPI = this.store.uncompletedApiCallCredits;
                newArray = [];

                this.store.onlyFilms.forEach((element) => {

                    this.store.actorName.push(element.id);

                    newArray.push(uncompletedAPI +  element.id + this.store.toCompleteApiCallCredits);

                    element.cast = [];

                    
                });

                for (let i = 0; i < newArray.length; i++) {
                    
                    axios.get(newArray[i]).then((res) => {
                        
                        res.data.cast.splice(5)
                        
                        let actors = res.data.cast.map(actor => actor.name);
                        
                        this.store.onlyFilms[i].cast = actors;
                        this.store.filmActors.push(actors);

                        
                    });
                };

            };


            if (store.isHome == 2 || store.isHome == 0) {

                uncompletedAPI = "https://api.themoviedb.org/3/tv/";
                newArray = [];

                this.store.series.forEach((element) => {

                    this.store.actorName.push(element.id);

                    newArray.push(uncompletedAPI +  element.id + this.store.toCompleteApiCallCredits);

                    element.cast = [];
                    
                });

                for (let i = 0; i < newArray.length; i++) {

                    
                    axios.get(newArray[i]).then((res) => {
                        
                        res.data.cast.splice(5)
                        
                        let actorSeries = res.data.cast.map(actor => actor.name);
                        
                        this.store.series[i].cast = actorSeries;
                        this.store.seriesActors.push(actorSeries);

                        
                    });
                };

            };

    

            

            console.log(this.store.actors);
        },

        scrolll() {
            var left= document.querySelector(".scroll-images");
            left.scrollBy(-350, 0)
        },

        scrollr() {
            var left= document.querySelector(".scroll-images");
            left.scrollBy(350, 0)
        },

        trendingMovies() {

            this.store.showCast = false;
            let newFilmApiString = this.store.APIcallTrendingMoviesDay;

            axios.get(newFilmApiString).then((res) => {
                this.store.onlyFilms = res.data.results;
            });

        },

        trendingSeries() {

            this.store.showCast = false;
            let newFilmApiString = this.store.APIcallTrendingSeriesDay;

            axios.get(newFilmApiString).then((res) => {
                this.store.series = res.data.results;
            });

        },

    },
}
</script>


<template>

    <div class="nav-bar">
        <SearchItem @searchFilm="search()" @actorFilters="actorFilters()"></SearchItem>
    </div>


    <div class="film-container">

        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all' " v-if="store.showCast && store.isHome == 0">
            <div>
                <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <ActorsFiltersItem v-for="actor in store.films" :actor="actor" class="child"></ActorsFiltersItem>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>

        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all' " v-if="store.showCast && store.isHome == 2 || store.showCast && store.isHome == 0 && store.filmName == '' ">
            <div>
                <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <ActorsFiltersItem v-for="actor in store.onlyFilms" :actor="actor" class="child"></ActorsFiltersItem>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>

        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all' " v-if="store.showCast && store.isHome == 1 || store.showCast && store.isHome == 0 && store.filmName == '' ">
            <div>
                <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <ActorsFiltersItem v-for="actor in store.series" :actor="actor" class="child"></ActorsFiltersItem>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>




        <div class="trending" v-if="!store.APIcallTrending == '' && !store.showCast">
            In Tendenza Questa Settimana
        </div>

        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all' " v-if="!store.showCast && store.isHome == 0">
            <div>
                <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <AllCard v-for="all in store.films" :all="all" class="child"></AllCard>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>


        <div v-if="store.isHome == 2 || store.isHome == 0" class="main-scroll-div column" :class="store.isHome == 2 ? 'no-all-plus' : '' ">

            <div class="main-scroll-div" :class="store.showCast ? 'some-margin' : 'some-margin' " v-if="!store.showCast && !store.APIcallTrending == '' ">

                <div class="more" v-if="!store.APIcallTrending == '' ">
                    <span v-if="store.doNotShowFilm">I film più visti (giornalmente)</span>
                </div>
                <div>
                    <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
                </div>
                <div class="cover">
                    <div class="scroll-images">
                        <FilmCard v-for="film in store.onlyFilms" :film="film" class="child"></FilmCard>
                    </div>
                </div>
                <div>
                    <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
                </div>
            </div>

        </div>
        
        <div v-if="store.isHome == 1 || store.isHome == 0" class="main-scroll-div column">

            <div v-if="!store.showCast && !store.APIcallTrending == '' " class="main-scroll-div" :class="store.isHome == 1 ? 'no-all-plus' : '' ">
    
                <div class="main-scroll-div" :class="store.showCast ? 'some-margin' : 'some-margin' " v-if="!store.showCast && !store.APIcallTrending == ''">
                    <div class="more" v-if="!store.APIcallTrending == '' ">
                        <span v-if="store.doNotShowSeries">Le Serie TV più viste (giornalmente)</span>
                    </div>
                    <div>
                        <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
                    </div>
                    <div class="cover">
                        <div class="scroll-images">
                            <SeriesCard v-for="series in store.series" :series="series" class="child"></SeriesCard>
                        </div>
                    </div>
                    <div>
                        <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
                    </div>
                </div>
    
            </div>

        </div>

    </div>

</template>


<style lang="scss" scoped>

.more {
    position: absolute;
    top: -50px;
    left: 0;
    padding-left: 30px;
    font-weight: bold;
    font-size: 26px;
}

.some-margin {
    margin-top: 80px;
}

.column {
    flex-direction: column;
}

.main-scroll-div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cover {
    position: relative;
    width: 90%;
    height: 60%;
    
        &::before {
            position: absolute;
            content: "";
            left: 0;
            top: 0;
            z-index: 4;
            height: 100%;
            width: 60px;
            background-image: linear-gradient(90deg, black, transparent);
        }

        &::after {
            position: absolute;
            content: "";
            right: 0;
            top: 0;
            z-index: 4;
            height: 100%;
            width: 60px;
            background-image: linear-gradient(-90deg, black, transparent);
        }

        .scroll-images {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: left;
            overflow: auto;
            position: relative;
            scroll-behavior: smooth;
            .child {
                min-width: 300px;
                min-height: 450px;
                margin: 1px 10px;
                cursor: pointer;
                border: 1px solid white;
                overflow: hidden;
            }
        }
    
    }


    .scroll-images::-webkit-scrollbar {
        -webkit-appearance: none;
    }
    .child-img {
        width: 100%;
        height: 100%;
    }

    .icon {
        color: white;
        background-color: black;
        font-size: 50px;
        outline: none;
        border: none;
        padding: 0px 20px;
        cursor: pointer;
    }
}




    .nav-bar {
        position: fixed;
        top: 0;
        z-index: 5;
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
            margin-bottom: -180px;
        }

        .no-all {
            margin-top: 180px;
        }

        .no-all-plus {
            margin-top: 300px;
        }

    }
</style>