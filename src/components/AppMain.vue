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

        axios.get(this.store.APIcall).then((res) => {

            this.store.films = res.data.results;
            console.log(this.store.films);

        });

    },

    methods: {

        search() {

            let newApiString = this.store.APIcall;

            if (!this.store.filmName == "") {

                newApiString += `${this.store.APIquery}${this.store.filmName}`;

            };

            axios.get(newApiString).then((res) => {

                this.store.films = res.data.results;

            })

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

    }
</style>