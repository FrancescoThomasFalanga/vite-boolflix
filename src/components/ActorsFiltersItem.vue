<!-- THIS COMPONENT MANAGES ONLY THE CARDS FOR SHOW OR DON'T SHOW THE CASTS-->

<script>
import {store} from "../store.js";


export default {
    data() {
        return {

            store,

        }
    },

    props: {
        actor: Object,
    },
}
</script>


<!-- THIS COMPONENT MANAGES ONLY THE CARDS FOR SHOW OR DON'T SHOW THE CASTS-->

<template>
    <div class="actor-card" v-if="store.showCast">

        <div class="img-hover">
            <img v-if="!actor.poster_path == '' " :src="this.store.URLimg + actor.poster_path" alt="">
            <div v-else class="unknown">Immagine non disponibile</div>
        </div>

        <div>
            <span></span><strong> {{actor.title }} {{actor.name}}</strong>
        </div>


        <div class="cast">
            <strong>CAST: </strong>
            <span v-for="person in actor.cast">
                {{ person }}, 
            </span>
        </div>
        
    </div>
</template>

<!-- THIS COMPONENT MANAGES ONLY THE CARDS FOR SHOW OR DON'T SHOW THE CASTS-->

<style lang="scss" scoped>

    .actor-card {
        position: relative;
        display: flex;
        align-items: center;
        flex-flow: column wrap;
        gap: 20px;
        width: calc(20% - 30px);
        height: auto;
        cursor: pointer;
        background-color: rgba(56, 56, 56, 0.151);
        overflow: hidden;
        text-align: center;

        .cast {
            padding-bottom: 10px;
        }
        

        .unknown {
            text-align: center;
            font-size: 32px;
            margin-bottom: 30px;
        }

        img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

        strong {
            font-size: 20px;
        }
    }
    
</style>