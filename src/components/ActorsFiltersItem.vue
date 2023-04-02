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


<template>
    <div class="actor-card" v-if="store.showCast">

        <div class="img-hover">
            <img v-if="!actor.poster_path == '' " :src="this.store.URLimg + actor.poster_path" alt="">
            <div v-else class="unknown">Immagine non disponibile</div>
        </div>

        <div>
            <span>CAST: </span><strong> {{actor.title }} {{actor.name}}</strong>
        </div>

        <div v-for="person in actor.cast">
            <div>{{ person }}</div>
        </div>
        
    </div>
</template>


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
            font-size: 22px;
        }
    }
    
</style>