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
                        this.store.series = result;
                        this.store.films.push(store.series);
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
                this.store.trendingMovies = res.data.results;
            });

        },

        trendingSeries() {

            this.store.showCast = false;
            let newFilmApiString = this.store.APIcallTrendingSeriesDay;

            axios.get(newFilmApiString).then((res) => {
                this.store.trendingSeries = res.data.results;
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

        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all' " v-if="store.showCast">
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


        <div class="trending" v-if="!store.APIcallTrending == '' && !store.showCast">
            In Tendenza Questa Settimana
        </div>

        <div class="main-scroll-div" :class="store.showCast ? 'no-all' : 'no-all' " v-if="!store.showCast && store.isHome == 0 ">
            <div>
                <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
            </div>
            <div class="cover">
                <div class="scroll-images">
                    <FilmCard v-for="film in store.films" :film="film" class="child"></FilmCard>
                </div>
            </div>
            <div>
                <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
            </div>
        </div>

        <div v-if="store.isHome == 2 || store.isHome == 0" class="main-scroll-div" :class="store.isHome == 2 ? 'no-all-plus' : '' ">

            <div class="main-scroll-div" :class="store.showCast ? 'some-margin' : 'some-margin' " v-if="!store.showCast && !store.APIcallTrending == ''">
                <div class="more" v-if="!store.APIcallTrending == '' ">
                    I film più visti (giornalmente)
                </div>
                <div>
                    <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
                </div>
                <div class="cover">
                    <div class="scroll-images">
                        <FilmCard v-for="film in store.trendingMovies" :film="film" class="child"></FilmCard>
                    </div>
                </div>
                <div>
                    <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
                </div>
            </div>

        </div>

        <div v-if="store.isHome == 1 || store.isHome == 0" class="main-scroll-div" :class="store.isHome == 1 ? 'no-all-plus' : '' ">

            <div class="main-scroll-div" :class="store.showCast ? 'some-margin' : 'some-margin' " v-if="!store.showCast && !store.APIcallTrending == ''">
                <div class="more" v-if="!store.APIcallTrending == '' ">
                    Le Serie TV più viste (giornalmente)
                </div>
                <div>
                    <button class="icon" @click="scrolll()"> <i class="fas fa-angle-double-left"></i> </button>
                </div>
                <div class="cover">
                    <div class="scroll-images">
                        <FilmCard v-for="film in store.trendingSeries" :film="film" class="child"></FilmCard>
                    </div>
                </div>
                <div>
                    <button class="icon" @click="scrollr()"> <i class="fas fa-angle-double-right"></i> </button>
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