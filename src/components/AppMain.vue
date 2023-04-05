<script>
import { store } from "../store.js";
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

    // when the app starts it automatically shows 3 section in the homepage with trending movies and series for week and day
    created() {

        axios.get(this.store.APIcallTrending).then((res) => {

            this.store.showCast = false;
            this.showTrendingText = true;
            this.store.films = res.data.results;

        });

        this.trendingMovies();
        this.trendingSeries();

        // this.filtraGeneri();

    },

    methods: {

        // Avendo controllato per l'ultima volta oggi l'esercizio mi son reso conto che mancava un pezzo della Milestone 5
        // Ho aggiunto adesso questa funzione (visualizzare i generi al click del button "CAST") ma adesso per mancanza di tempo
        // Non son riuscito a stamparla in pagina ma funziona :D

        /* filtraGeneri() {

            axios.get(this.store.APIcallTrendingMoviesDay).then((elem) => {

                this.store.prendiIGeneri = elem.data.results;

                this.store.prendiIGeneri.forEach((genere) => {
    
                    this.store.generiDeiFilm.push(genere.genre_ids);
    
                });
            });

            axios.get(this.store.APIcallGenreMovies).then((genre) => {

                this.store.generiTotali = genre.data.genres;

                this.store.generiTotali.forEach((genere) => {
    
                    this.store.generiFull.push(genere);

                });

                const generiDeiFilmConNome = this.store.generiDeiFilm.map((idsFilm) => {
                    const nomiGeneri = idsFilm.map((id) => {
                        const genereCorrispondente = this.store.generiFull.find((g) => g.id === id);
                        return genereCorrispondente ? genereCorrispondente.name : '';
                    });
                    return nomiGeneri;
                });

            console.log(generiDeiFilmConNome);
                
            });
            
            console.log(this.store.generiFull);
            console.log(this.store.generiDeiFilm);

        }, */


        // main search for film or tv series name
        search() {

            this.store.showTrending = false;
            this.store.showCast = false;

            let newFilmApiString = this.store.APIcallFilm;
            let newSeriesApiString = this.store.APIcallSeries;

            // manages only the homepage
            if (!this.store.filmName == "" && store.isHome == 0) {

                newFilmApiString += `${this.store.APIquery}${this.store.filmName}`;

                this.callApi(newFilmApiString);

                this.store.APIcallTrending = "";

            } else {

                this.store.APIcallTrending = "https://api.themoviedb.org/3/trending/all/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT";

                newFilmApiString = this.store.APIcallTrending;

                this.callApi(newFilmApiString);

            };

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
            // /manages only the homepage


            // manages only the tvseries index
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
            // /manages only the tvseries index


            // manages only the films index
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
            // /manages only the films index

        },

        // APIcall for optimization
        callApi(string) {

            axios.get(string).then((res) => {

                this.store.films = res.data.results;
                console.log(this.store.films);

            });

        },

        // filter actor by pressing a button
        actorFilters() {

            let uncompletedAPI = this.store.uncompletedApiCallCredits;
            let newArray = [];

            this.store.showCast = true;

            if (store.isHome == 0) {

                uncompletedAPI = this.store.uncompletedApiCallCredits;
                newArray = [];

                this.store.films.forEach((element) => {

                    this.store.actorName.push(element.id);

                    newArray.push(uncompletedAPI + element.id + this.store.toCompleteApiCallCredits);

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


            if (store.isHome == 2 || store.isHome == 0) {

                uncompletedAPI = this.store.uncompletedApiCallCredits;
                newArray = [];

                this.store.onlyFilms.forEach((element) => {

                    this.store.actorName.push(element.id);

                    newArray.push(uncompletedAPI + element.id + this.store.toCompleteApiCallCredits);

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


            if (store.isHome == 1 || store.isHome == 0) {

                uncompletedAPI = "https://api.themoviedb.org/3/tv/";
                newArray = [];

                this.store.series.forEach((element) => {

                    this.store.actorName.push(element.id);

                    newArray.push(uncompletedAPI + element.id + this.store.toCompleteApiCallCredits);

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



        // functions for horizzontal scroll 
        scrolll(string) {
            var left = document.querySelector(string);
            left.scrollBy(-550, 0);
        },

        scrollr(string) {
            var left = document.querySelector(string);
            left.scrollBy(550, 0);
        },
        // /functions for horizzontal scroll



        // by created function shows trending Movies for days
        trendingMovies() {

            this.store.showCast = false;
            let newFilmApiString = this.store.APIcallTrendingMoviesDay;

            axios.get(newFilmApiString).then((res) => {
                this.store.onlyFilms = res.data.results;
            });

        },

        // by created function shows trending TV Series for days
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
    <!-- NAV-BAR WITH ALL LINKS AND SEARCH -->
    <div class="nav-bar">
        <SearchItem @searchFilm="search()" @actorFilters="actorFilters()"></SearchItem>
    </div>
    <!-- /NAV-BAR WITH ALL LINKS AND SEARCH -->



    <!-- COMMON CONTAINER FO ALL ELEMENTS -->
    <div class="film-container">

        <!-- SHOW FILM AND TV SERIES CASTS -->
        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all'"
            v-if="store.showCast && store.isHome == 0">
            <div>
                <button class="icon" @click="scrolll('.scroll-images')"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <ActorsFiltersItem v-for="actor in store.films" :actor="actor" class="child"></ActorsFiltersItem>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr('.scroll-images')"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>
        <!-- /SHOW FILM AND TV SERIES CASTS -->


        <!-- SHOW ONLY FILM CASTS -->
        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all'"
            v-if="store.showCast && store.isHome == 2 || store.showCast && store.isHome == 0 && store.filmName == ''">
            <div>
                <button class="icon" @click="scrolll('.scroll-images1')"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images1">
                    <ActorsFiltersItem v-for="actor in store.onlyFilms" :actor="actor" class="child"></ActorsFiltersItem>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr('.scroll-images1')"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>
        <!-- /SHOW ONLY FILM CASTS -->


        <!-- SHOW ONLY TV SERIES CASTS -->
        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all'"
            v-if="store.showCast && store.isHome == 1 || store.showCast && store.isHome == 0 && store.filmName == ''">
            <div>
                <button class="icon" @click="scrolll('.scroll-images2')"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images2">
                    <ActorsFiltersItem v-for="actor in store.series" :actor="actor" class="child"></ActorsFiltersItem>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr('.scroll-images2')"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>
        <!-- /SHOW ONLY TV SERIES CASTS -->


        <!-- SHOW TRENDING TEXT IN HOMEPAGE -->
        <div class="trending" v-if="!store.APIcallTrending == '' && !store.showCast">
            In Tendenza Questa Settimana
        </div>
        <!-- /SHOW TRENDING TEXT IN HOMEPAGE -->


        <!-- SHOW FILM AND TV SERIES TRENDING -->
        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all'"
            v-if="!store.showCast && store.isHome == 0">
            <div>
                <button class="icon" @click="scrolll('.scroll-images')"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <AllCard v-for="all in store.films" :all="all" class="child"></AllCard>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr('.scroll-images')"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>
        <!-- /SHOW FILM AND TV SERIES TRENDING -->


        <!-- SHOW ONLY FILM TRENDING FOR DAY -->
        <div v-if="store.isHome == 2 || store.isHome == 0" class="main-scroll-div"
            :class="store.isHome == 2 ? 'no-all-plus' : ''">

            <div class="main-scroll-div" :class="store.showCast ? 'some-margin' : 'some-margin'"
                v-if="!store.showCast && !store.APIcallTrending == ''">

                <div class="more" v-if="!store.APIcallTrending == ''">
                    <span v-if="store.doNotShowFilm">I film più visti al giorno</span>
                </div>
                <div>
                    <button class="icon" @click="scrolll('.scroll-images1')"> <i class="fas fa-angle-double-left"></i> </button>
                </div>
                <div class="cover">
                    <div class="scroll-images1">
                        <FilmCard v-for="film in store.onlyFilms" :film="film" class="child"></FilmCard>
                    </div>
                </div>
                <div>
                    <button class="icon" @click="scrollr('.scroll-images1')"> <i class="fas fa-angle-double-right"></i> </button>
                </div>
            </div>

        </div>
        <!-- /SHOW ONLY FILM TRENDING FOR DAY -->


        <!-- SHOW ONLY SERIES TRENDING FOR DAY -->
        <div v-if="store.isHome == 1 || store.isHome == 0" class="main-scroll-div">

            <div v-if="!store.showCast && !store.APIcallTrending == ''" class="main-scroll-div"
                :class="store.isHome == 1 ? 'no-all-plus' : ''">
                <div class="main-scroll-div" :class="store.showCast ? 'some-margin' : 'some-margin'"
                    v-if="!store.showCast && !store.APIcallTrending == ''">
                    <div class="more" v-if="!store.APIcallTrending == ''">
                        <span v-if="store.doNotShowSeries">Le Serie TV più viste al giorno</span>
                    </div>
                    <div>
                        <button class="icon" @click="scrolll('.scroll-images2')"> <i class="fas fa-angle-double-left"></i> </button>
                    </div>
                    <div class="cover">
                        <div class="scroll-images2">
                            <SeriesCard v-for="series in store.series" :series="series" class="child"></SeriesCard>
                        </div>
                    </div>
                    <div>
                        <button class="icon" @click="scrollr('.scroll-images2')"> <i class="fas fa-angle-double-right"></i> </button>
                    </div>
                </div>
            </div>

        </div>
        <!-- /SHOW ONLY SERIES TRENDING FOR DAY -->

    </div>
    <!-- /COMMON CONTAINER FO ALL ELEMENTS -->
</template>


<style lang="scss" scoped>
.nav-bar {
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;
    background-color: black;
}

// __________________________________________
.film-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    margin: -100px 40px 50px;

    // __________________________________________
    .flex {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;

    }

    // __________________________________________
    .trending {
        width: 100%;
        padding-left: 30px;
        font-size: 26px;
        font-weight: bold;
        margin-bottom: -180px;
    }

    // __________________________________________
    .no-all {
        margin-top: 180px;
    }

    // __________________________________________
    .no-all-plus {
        margin-top: 300px;
    }
}

// __________________________________________


.more {
    position: absolute;
    top: -50px;
    left: 0;
    padding-left: 30px;
    font-weight: bold;
    font-size: 26px;
}

// __________________________________________
.some-margin {
    margin-top: 80px;
}

// __________________________________________
.main-scroll-div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    // __________________________________________
    .cover {
        position: relative;
        width: 90%;
        height: 60%;

        // __________________________________________
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

        // __________________________________________
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

        // __________________________________________
        .scroll-images,
        .scroll-images1,
        .scroll-images2 {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: left;
            overflow: auto;
            position: relative;
            scroll-behavior: smooth;

            // __________________________________________
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

    // __________________________________________
    .scroll-images::-webkit-scrollbar,
    .scroll-images1::-webkit-scrollbar,
    .scroll-images2::-webkit-scrollbar {
        -webkit-appearance: none;
    }

    .child-img {
        width: 100%;
        height: 100%;
    }

    // __________________________________________
    .icon {
        color: white;
        background-color: black;
        font-size: 50px;
        outline: none;
        border: none;
        padding: 0px 20px;
        cursor: pointer;
    }
}</style>