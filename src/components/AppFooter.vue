<script>
export default {
    data() {
        return {



        }
    }
}
</script>


<template>
    <div class="centered-container">
        
        <div class="social">

            <a href="#"> 
                <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#"> 
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#"> 
                <i class="fa-brands fa-twitter"></i>
            </a>
            <a href="#"> 
                <i class="fa-brands fa-youtube"></i>
            </a>

        </div>


        <div class="links">

            <ul>
                <li> 
                    <a href="#">Audiodescrizione</a>
                </li>
                <li> 
                    <a href="#">Rapporti con gli investitori</a>
                </li>
                <li> 
                    <a href="#">Note legali</a>
                </li>
            </ul>

            <ul>
                <li> 
                    <a href="#">Centro assistenza</a>
                </li>
                <li> 
                    <a href="#">Opportunità di lavoro</a>
                </li>
                <li> 
                    <a href="#">Preferenze per i cookie</a>
                </li>
            </ul>

            <ul>
                <li> 
                    <a href="#">Carte regalo</a>
                </li>
                <li> 
                    <a href="#">Condizioni di utilizzo</a>
                </li>
                <li> 
                    <a href="#">Informazioni sull'azienda</a>
                </li>
            </ul>

            <ul>
                <li> 
                    <a href="#">Media center</a>
                </li>
                <li> 
                    <a href="#">Privacy</a>
                </li>
                <li> 
                    <a href="#">Contattaci</a>
                </li>
            </ul>

        </div>


        <div class="service">
            <button>Codice di servizio</button>
        </div>


        <div class="fondation">
            @ 1997-2023 Netflix, Inc.
        </div>


    </div>
</template>


<style lang="scss" scoped>
    
    .centered-container {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        color: #808080;
        font-size: 14px;

        .social {
            display: flex;
            align-items: center;
            gap: 30px;
            font-size: 20px;
            margin-bottom: 20px;

            a {
                color: white;
            }
        }

        .links {
            display: flex;
            justify-content: space-between;
            
            ul {
                list-style-type: none;

                li {
                    margin: 8px 0;
                    font-size: 12px;

                    a {
                        text-decoration: none;
                        color: #808080;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

        .service {
            border: 1px solid #808080;
            width: fit-content;
            padding: 2px 5px;
            margin: 20px 0;

            button {
                background-color: black;
                border: none;
                color: #808080;
                font-size: 12px;
                cursor: pointer;

                &:hover {
                    color: white;
                }
            }
        }

        .fondation {
            font-size: 10px;
            margin-bottom: 20px;
        }
    }

</style>