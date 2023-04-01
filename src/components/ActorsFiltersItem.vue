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
        <div class="actor-card">

            <div>
                <strong>{{actor.title }} {{actor.name}}</strong>
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
        padding: 20px;
        flex-flow: column wrap;
        gap: 20px;
        width: calc(20% - 30px);
        height: auto;
        cursor: pointer;
        background-color: rgba(56, 56, 56, 0.151);
        overflow: hidden;
        text-align: center;

        strong {
            font-size: 22px;
        }
    }
    
</style>