import {reactive} from "vue";

export const store = reactive({

    films: [],

    APIcallTrending: "https://api.themoviedb.org/3/trending/all/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",

    APIcallFilm: "https://api.themoviedb.org/3/search/movie?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",

    APIcallSeries: "https://api.themoviedb.org/3/search/tv?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",

    APIquery: "&query=",

    filmName: "",

    URLimg: "http://image.tmdb.org/t/p/original",

});


// https://api.themoviedb.org/3/trending/movie/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT