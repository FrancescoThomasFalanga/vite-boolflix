import {reactive} from "vue";

export const store = reactive({
    
    // navbar index for links and add the ACTIVE class
    isHome: 0,


    // navbar links
    links: ["Home", "Serie TV", "Film", "Nuovi e Popolari", "La mia lista", "Sfoglia per lingua"],


    // input V-MODEL string
    filmName: "",


    // films and tvseries
    films: [],


    // only films
    onlyFilms: [],


    // only tvseries
    series: [],


    // API call for films and tvseries trending (week)
    APIcallTrending: "https://api.themoviedb.org/3/trending/all/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",


    // API call only for films trending (day)
    APIcallTrendingMoviesDay: "https://api.themoviedb.org/3/trending/movie/day?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",


    // API call only for series trending (day)
    APIcallTrendingSeriesDay: "https://api.themoviedb.org/3/trending/tv/day?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",


    // API call for search button (it shows movies)
    APIcallFilm: "https://api.themoviedb.org/3/search/movie?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",


    // API call for search button (it shows tvseries)
    APIcallSeries: "https://api.themoviedb.org/3/search/tv?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",



    // filter genres by a SELECT in nav-bar index == 1 and index == 2
    filterGenre: "",

    // API call for search different genres (it shows movies)
    APIcallGenreMovies: "https://api.themoviedb.org/3/genre/movie/list?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",

    // populate this array with ID and GENRE title (it shows movies)
    genreFilms: [],


    // API call for search different genres (it shows tvseries)
    APIcallGenreSeries: "https://api.themoviedb.org/3/genre/tv/list?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT",

    // populate this array with ID and GENRE title (it shows tvseries)
    genreSeries: [],


    APIquery: "&query=",


    // URL for show the image (not completed)
    URLimg: "http://image.tmdb.org/t/p/original",


    // 1/2 APIcall for search the different casts members
    uncompletedApiCallCredits: "https://api.themoviedb.org/3/movie/",

    // 2/2 APIcall for search the different casts members
    toCompleteApiCallCredits: "/credits?api_key=6529eb99a13649a95432918926d0d7ce",

    // populate array with actors name (it shows movies and tvseries)
    actors: [],

    // populate array with actors name (it shows movies)
    filmActors: [],

    // populate array with actors name (it shows tvseries)
    seriesActors: [],

    // populate this array with ALL ACTORS NAME
    actorName: [],
    


    // show / do not show the casts card
    showCast: true,

    // show / do not show the trending movies and series
    showTrending: true,

    // show / do not show the films
    doNotShowFilm: true,

    // show / do not show the tvseries
    doNotShowSeries: true,

});


// https://api.themoviedb.org/3/trending/movie/week?api_key=6529eb99a13649a95432918926d0d7ce&language=it-IT ||||


// CREDITI DEI FILM 
// https://api.themoviedb.org/3/movie/76600/credits?api_key=6529eb99a13649a95432918926d0d7ce ||||



// GENERI DEI FILM (per le serie tv sostituire movie con tv)
// https://api.themoviedb.org/3/genre/movie/list?api_key=6529eb99a13649a95432918926d0d7ce


// https://api.themoviedb.org/3/trending/movie/day?api_key=6529eb99a13649a95432918926d0d7ce