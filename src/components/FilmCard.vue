<script>
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default {
    data() {
        return {

        }
    },

    props: {
        film: Object,
    },

    methods: {

        flagEmoji() {

            let language = this.film.original_language;

            if (language == "en") {
                language = "gb";
            } else if(language == "") {
                language = "Sconosciuta";
            }

            return language;
        }

    },
}
</script>


<template>
    <div class="card">

        <span><strong>Titolo Originale:</strong> {{film.original_title}} {{ film.original_name }}</span>
        <span><strong>Titolo:</strong> {{film.title }} {{film.name}}</span>

        <span>Lingua Originale: <span :class="`fi fi-${flagEmoji()} fis`"></span></span>
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