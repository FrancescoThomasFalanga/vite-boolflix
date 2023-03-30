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
    <div class="flex-main">

        <div class="flex">
            <a href=""><img src="/img/netflix-logo.png" alt=""></a>

            <div>
                <ul>
                    <li>
                        <a href="#"> Home </a>
                    </li>
                    <li>
                        <a href="#"> Serie TV </a>
                    </li>
                    <li>
                        <a href="#"> Film </a>
                    </li>
                    <li>
                        <a href="#"> Nuovi e Popolari </a>
                    </li>
                    <li>
                        <a href="#"> La mia lista </a>
                    </li>
                    <li>
                        <a href="#"> Sfoglia per lingua </a>
                    </li>
                </ul>
            </div>

        </div>
        

        <div class="flex right">

            <div class="flex">
                <input class="search-bar left" type="text" placeholder="Digita il nome del Film" v-model="store.filmName" @keyup.enter="$emit('searchFilm')">
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
    
    .flex-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 50px;

        .flex {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #000000;
    
            img {
                width: 100px;
            }

            .search-bar {
                padding: 6px 10px;
                background-color: rgba(255, 0, 0, 0.301);
            }
            .left {
                border: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
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


</style>