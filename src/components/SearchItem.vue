<script>
import axios, { all } from "axios";
import {store} from "../store.js";

export default {
    data() {
        return {
            store,
        }
    },

    methods: {

        filterForGenres() {

            axios.get(store.APIcallGenres).then((res) => {

                console.log(res.data.genres);

                this.store.genres = res.data.genres;

            });
            

        },

    },

}
</script>


<template>
    <div class="flex-main">

        <div class="flex">
            <a href=""><img src="/img/netflix-logo.png" alt=""></a>

            <div>
                <ul>
                    <li v-for="(link, index) in store.links" @click="store.isHome = index" :class="index == store.isHome ? 'active' : '' ">
                         <a href="#">
                            {{ link }}
                        </a> 
                    </li>
                </ul>
            </div>

        </div>
        

        <div class="flex right">

            <div class="actors">
                <button class="search-bar left cast" @click="$emit('actorFilters')">Cast</button>
                <button class="search-bar left cast" @click="store.showCast = false">No Cast</button>
            </div>

            <div class="actors select" @click="filterForGenres()">
                Filtra per genere:
                <select name="filtra per:" id="select" class=" left" v-model="store.filterGenre">
                    <option value=""></option>
                    <option v-for="genre in store.genres" :value="genre.id"> {{ genre.name }}</option>
                </select>
            </div>

            <div class="flex">
                <input class="search-bar left" type="text" placeholder="Digita il nome del Film/Serie" v-model="store.filmName" @keyup.enter="$emit('searchFilm')">
                <button class="search-bar right" @click="$emit('searchFilm')"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>

            <div class="flex right">
                <a href="#">Bambini</a>
                <i class="fa-regular fa-bell"></i>
                <div class="square"></div>
                <i class="fa-solid fa-sort-down"></i>
            </div>


        </div>

    </div>
</template>


<style lang="scss" scoped>

    .active {
        font-weight: bold;
    }


    
    .flex-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 50px;

        .actors {
            margin-right: 10px;

            #select {
                cursor: pointer;
                background-color: rgba(255, 0, 0, 0);
                color: black;
            }
        }


        .flex {
            display: flex;
            justify-content: flex-start;
            align-items: center;
    
            img {
                width: 100px;
            }

            .search-bar {
                padding: 6px 10px;
                background-color: rgba(255, 0, 0, 0.555);
            }
            .left {
                border: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            .cast {
                cursor: pointer;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.466);
                }
            }

            .right {
                border: none;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                cursor: pointer;
            }

            .right {
                gap: 6px;

                a {
                    padding-left: 20px;
                    color: white;
                    text-decoration: none;

                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
    
        ul {
            display: flex;
            gap: 15px;
            list-style-type: none;
    
            li {
                margin-bottom: 6px;
    
                a {
                    color: white;
                    text-decoration: none;
        
                    &:hover {
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .select {
        padding: 2px 10px;
        background-color: rgba(255, 0, 0, 0.555);
    }


</style>