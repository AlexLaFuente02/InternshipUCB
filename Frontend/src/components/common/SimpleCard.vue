<template>
                <div class="member" @click="moreInformation">
                    <div class="thumb">
                        <img src="https://pbs.twimg.com/profile_images/1026937398855389186/1fpmfMrK_400x400.jpg" alt="Imagen de la empresa">
                    </div>
                    <div class="description" @click="">
                        <h3 class="name__institucion">{{ this.Cardinternship.institucion.nombreinstitucion}}</h3>
                        <p>
                            Hora de inicio: {{ this.Cardinternship.horario_inicio }} <br>
                            Hora de finalización: {{ this.Cardinternship.horario_fin }} <br>
                        </p>
                    </div>
                </div>
</template>
<script>
export default {
    name: "SimpleCard",
    emits: ['more-information'],
    props: {
        internship: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            Cardinternship: [],
        };
    },
    methods: {
        getData(){
            this.Cardinternship = this.internship;
        },
        moreInformation(){
            this.$emit('more-information', this.Cardinternship.id);
        }
    },
    created(){
        this.getData();
    }
}
</script>
<style>
  @import url("https://fonts.googleapis.com/css?family=Lato:400,700&display=swap");
:root {
    --yellow: #ffdd40;
    --dark: #2f313a;
    --deg: -86deg;
    --trans: all 0.4s ease 0s;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    font-family: "Lato", Arial, Helvetica, serif;
    background: linear-gradient(90deg, #131417, var(--dark) 35% 65%, #131417);
    font-size: 1em;
  }
  
  body *,
  body *:before,
  body *:after {
    box-sizing: border-box;
  }
  
  
  h2 {
    text-align: center;
  }
  
  .team {
    padding: 2em 0 2em 2.5em;
    margin: 0;
  }
  
  .member {
    margin: 1.5em 0 0.5em;
    padding: 0.73em;
    background: linear-gradient(83deg, var(--yellow) 0 97%, #fff0 calc(97% + 1px) 100%);
    position: relative;
    list-style: none;
    display: inline-block;
    transform: scale(0.85);
    transition: var(--trans);
  }
  
  .even {
    text-align: right;
    background: linear-gradient(-83deg, var(--yellow) 0 97%, #fff0 calc(97% + 1px) 100%);
  }
  
  .thumb {
    width: 13vmin;
    height: 13vmin;
    float: left;
    margin-right: 1.25em;
    background: linear-gradient(var(--deg), var(--dark) 0 70%, var(--yellow) 0% 100%);
    transform: rotate(-4deg);
    transition: var(--trans);
    border-radius: 0.25em;
    overflow: hidden;
    padding: 0.5em;
  }
  
  .even .thumb {
    --deg: 86deg;
    float: right;
    margin-left: 2em;
    margin-right: -3em;
    transform: rotate(4deg);
  }
  
  .thumb img {
    width: 100%;
    height: 100%;
    border-radius: 0.25em;
    filter: grayscale(1);
    background: var(--dark);
  }
  
  .member:hover {
    transform: scale(1);
    transition: var(--trans);
    filter: drop-shadow(0px 20px 10px #0008);
  }
  
  .member:hover .thumb {
    padding: 0.1em;
    transition: var(--trans);
    transform: rotate(-1deg);
    --deg: -89deg;
  }
  
  .even:hover .thumb {
    --deg: 91deg;
  }
  
  .member:hover .thumb img {
    filter: none;
    transition: var(--trans);
    z-index: 1;
  }
  
  .description {
    padding-top: 1vmin;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .description p {
    color: var(--dark);
    padding: 3rem 2em;
  }
  
  .name__institucion {
    background: linear-gradient(182deg,  var(--dark) 0 100%);
    display: inline;
    transform: rotate(-2deg);
    position: absolute;
    margin: 0!important;
    margin-top: -2.25em!important;
    left: 9vmin;
    padding: 0.5em 0.75em;
    color: var(--yellow);
    border-radius: 0.25em;
    font-size: 1.35em;
    transform-origin: left bottom;
    margin-bottom: 0.5em !important;
  }
  
  .even .name__institucion {
    left: inherit;
    right: 9vmin;
    transform: rotate(2deg);
    transform-origin: right bottom;
    background: linear-gradient(-182deg, var(--dark) 0 100%);
  }
  
  .member:hover .name__institucion {
    transition: var(--trans);
    transform: rotate(0deg);
    background: linear-gradient(180deg, var(--dark) 0 100%);
  }
  
  .co-funder:after {
    content: "CO-FUNDER";
    font-size: 0.75em;
    position: absolute;
    top: -1.5em;
    background: var(--yellow);
    right: 4em;
    transform: rotate(3deg);
    padding: 0.35em 0.75em 0.5em;
    border-radius: 0.25em;
    color: var(--dark);
    font-weight: bold;
  }
  
  .even:after {
    right: inherit;
    left: 4em;
    transform: rotate(-3deg);
  }
  
  .description p a {
    display: inline-block;
    margin: 0.5em 0 0 0;
    background: var(--dark);
    color: var(--yellow);
    padding: 0.1em 0.5em 0.35em;
    border-radius: 0.5em;
    text-decoration: none;
    transition: var(--trans);
  }
  
  .description p a:hover {
    transition: var(--trans);
    color: var(--dark);
    background: var(--yellow);
    font-weight: bold;
  }
  
  .description p a img {
    float: left;
    width: 22px;
    filter: invert(1);
    border-radius: 0.15em;
    padding: 2px;
    background: #fff;
    margin-right: 2px;
  }

  /* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  .name__institucion {
    left: 0;
    right: 0;
    transform: rotate(0deg);
    transform-origin: right bottom;
    background: linear-gradient(180deg, var(--dark) 0 100%);
  }
  .thumb{
    margin-left: 0;
    margin-top: 2rem;
  }
  .description p{
    padding-left: 0.2rem;; 
    padding-right: 0.2rem;
    padding-top: 1.5rem;
    padding-bottom: 0;
    margin-top: 0.6rem;
  }
}

/* Estilos para tabletas */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}
  </style>