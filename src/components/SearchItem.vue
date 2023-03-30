<script>
import {store} from "../store.js";

export default {
    data() {
        return {
            store,
        }
    },

}
</script>


<template>
    <div>

        <hr>
        
        <input type="text" placeholder="Digita il nome del Film" v-model="store.filmName" @keyup.enter="$emit('searchFilm')">
        <button @click="$emit('searchFilm')">Cerca</button>

        <hr>

    </div>
</template>


<style lang="scss" scoped>
    
    hr {
        margin: 20px;
    }

</style>