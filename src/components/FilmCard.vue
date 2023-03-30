<script>
export default {
    data() {
        return {

        }
    },

    props: {
        film: Object,
    },
}
</script>


<template>
    <div class="card">

        <span>Titolo Originale Film: {{film.original_title}}</span>
        <strong>Titolo Film: {{film.title }}</strong>

        <span>Lingua Originale: {{ film.original_language }}</span>
        <strong>Voto: {{ film.vote_average }}</strong>

    </div>
</template>


<style lang="scss" scoped>
    
    .card {
        display: flex;
        flex-flow: column wrap;
        gap: 20px;
        width: 20%;
        height: 600px;
    }

</style>