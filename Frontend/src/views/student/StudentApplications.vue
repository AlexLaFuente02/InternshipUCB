<template>
    <div class="inicio" v-if="isAllDataLoaded">
      <h1>TUS SOLICITUDES DE PASANTIAS</h1> 
      <div class="buttons-container">
        <button
        @click="showSection('aprobadas')" :class="{'active': section === 'aprobadas'}"
        >
          Aprobadas
        </button>
        <button
        @click="showSection('enEspera')" :class="{'active': section === 'enEspera'}"
        >
          En espera
        </button>
        <button
        @click="showSection('rechazadas')" :class="{'active': section === 'rechazadas'}"
        >
          Rechazadas
        </button>
      </div>
      <div class="card-inicio" v-show="section === 'aprobadas'"
      >
      <span class="text-a">PASANTIAS APROBADAS</span>
        <div class="card">
          <div v-for="card in requestsAccepted" :key="card.id" class="card-individual">
            <div class="content">
              <div class="image">
                <!--Imagen por defecto porque no se devuelve en el request-->
                <img src="https://img.freepik.com/vector-premium/cute-dibujos-animados-perro-pug-sentado-fondo-aislado_701683-46.jpg?w=996" alt="Card image" class="card-image">
                <!--<img :src="card.imageUrl" alt="Card image" class="card-image">-->
              </div>
              <div class="text-content">
                <div class="text-content2">
                  <div class="title">{{ card.convocatoria_id.areapasantia }}</div>
                  <button class="book-btn" @click="goToDetails(card.id)"
                  style="background-image: none;"
                  >Mas informacion</button>
                </div>
                
                <div class="description">{{ card.convocatoria_id.descripcionfunciones }}</div>
                <div class="info">
                  <div class="price"> Fecha de postulación:
                    {{ card.fechapostulacion }}</div>
                  <div class="price">Horario de pasantia:
                    {{ card.convocatoria_id.horario_inicio }} - {{ card.convocatoria_id.horario_fin }}</div>
                  </div>
                  <div class="price">
                    Fecha final de postulación: {{ card.convocatoria_id.fechaseleccionpasante }}</div>
                  </div>

                </div>
              </div>
            </div>
      </div>
      <div class="card-inicio" v-show="section === 'enEspera'"

      >
          <span class="text-p">PASANTIAS EN ESPERA</span>
        <div class="card">
          <div v-for="card in requestsPending"
          :key="card.id" class="card-individual">
            <div class="content">
              <div class="image">
                <!--Imagen por defecto porque no se devuelve en el request-->
                <img src="https://img.freepik.com/vector-premium/cute-dibujos-animados-perro-pug-sentado-fondo-aislado_701683-46.jpg?w=996" alt="Card image" class="card-image">
                <!--<img :src="card.imageUrl" alt="Card image" class="card-image">-->
              </div>
              <div class="text-content">
                <div class="text-content2">
                  <div class="title">{{ card.convocatoria_id.areapasantia }}</div>
                  <button @click="goToDetails(card.id)" 
                  style="background-image: none;"
                  class="book-btn">Mas informacion</button>
                </div>
                
                <div class="description">{{ card.convocatoria_id.descripcionfunciones }}</div>
                <div class="info">
                  <div class="price"> Fecha de postulación:
                    {{ card.fechapostulacion }}</div>
                  <div class="price"> Horario de pasantia:
                    {{ card.convocatoria_id.horario_inicio }} - {{ card.convocatoria_id.horario_fin }}</div>
                  </div>
                  <div class="price">
                    Fecha final de postulación: {{ card.convocatoria_id.fechaseleccionpasante }}</div>
                  </div>

                </div>
              </div>
        </div>
      </div>
      <div class="card-inicio" v-show="section === 'rechazadas'"
      >
          <span class="text-r">PASANTIAS RECHAZADAS</span>
        <div class="card">
          <div v-for="card in requestsRejected" :key="card.id" class="card-individual">
            <div class="content">
              <div class="image">
                <!--Imagen por defecto porque no se devuelve en el request-->
                <img src="https://img.freepik.com/vector-premium/cute-dibujos-animados-perro-pug-sentado-fondo-aislado_701683-46.jpg?w=996" alt="Card image" class="card-image">
                <!--<img :src="card.imageUrl" alt="Card image" class="card-image">-->
              </div>
              <div class="text-content">
                <div class="text-content2">
                  <div class="title">{{ card.convocatoria_id.areapasantia }}</div>
                  <button @click="goToDetails(card.id)" class="book-btn"
                  style="background-image: none;"
                  >Mas informacion</button>
                </div>
                
                <div class="description">{{ card.convocatoria_id.descripcionfunciones }}</div>
                <div class="info">
                  <div class="price"> Fecha de postulación:
                    {{ card.fechapostulacion }}</div>
                  <div class="price"> Horario de pasantia:
                    {{ card.convocatoria_id.horario_inicio }} - {{ card.convocatoria_id.horario_fin }}</div>
                  </div>
                  <div class="price">
                    Fecha final de postulación: {{ card.convocatoria_id.fechaseleccionpasante }}</div>
                  </div>

                </div>
              </div>
        </div>
      </div>
    </div>

        
       
    </template>
    
    
    <script>
import {useRequestsByIDStore} from '@/store/student/requestsByIDStore';
import {useLoaderStore} from "@/store/common/loaderStore";
import {useUserByIdStore} from "@/store/common/dataUserStore";

    export default {
      data() {
        return {
          requestsAccepted:[],
          requestsPending:[],
          requestsRejected:[],
          dataUserStore: useUserByIdStore(),
          dataUser: {},
          isAllDataLoaded: false,
          section: 'enEspera'
          
        };
      },
      methods: {
        async getRequestsAccepted(){
          await useRequestsByIDStore().loadRequestsByEstatus(this.dataUser.id,1);
          this.requestsAccepted = useRequestsByIDStore().requestsAccepted;
        },
        async getRequestsPending(){
          await useRequestsByIDStore().loadRequestsByEstatus(this.dataUser.id,2);
          this.requestsPending = useRequestsByIDStore().requestsPending;
          console.log(this.requestsPending);
        },
        async getRequestsRejected(){
          await useRequestsByIDStore().loadRequestsByEstatus(this.dataUser.id,3);
          this.requestsRejected = useRequestsByIDStore().requestsRejected;
        },
        async getUser(){
          await this.dataUserStore.getUserByIdUsuario( $cookies.get("id"));
          this.dataUser = this.dataUserStore.user;
        },
        goToDetails(id){
          this.$router.push(`/student/applications/PostulationStatus/${id}`);
        },
        showSection(section){
          this.section = section;
        }
      },
      async mounted() {
        useLoaderStore().activateLoader();
        await this.getUser();
        await this.getRequestsAccepted();
        await this.getRequestsPending();
        await this.getRequestsRejected();
        this.isAllDataLoaded = true;
        useLoaderStore().desactivateLoader();
      }
    };
  
</script>
    
    <style scoped>
.inicio {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    /* align-content: center; */
    justify-content: center;
    align-items: center;
    padding: 2rem;
    
}
.buttons-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
button {
  padding: 0.9rem;
  margin: 0.5rem;
  color: #fff;
  cursor: pointer;
  text-align:center;
  border: 1px solid #fff;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );

}
button.active {
  background-image: linear-gradient(
    
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
}

button:hover {
  background-position: 100% 0;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

button:focus {
  outline: none;
}


    /** estilo eltra de titulo*/
    h1 {
      font-weight: 900;
      color: rgb(0, 4, 132);
      --x-offset: -0.0625em;
      --y-offset: 0.0625em;
      
      text-align: center;
      --stroke: 0.025em;
      text-shadow:
        var(--x-offset)
        var(--y-offset)
        0px
        var(--background-color), 
        
        calc( var(--x-offset) - var(--stroke) )
        calc( var(--y-offset) + var(--stroke) )
        0px
        var(--stroke-color);
      
    }
    
    .dark-theme h1 { 
      color: rgb(99, 63, 117);
    
    }
    /* for browsers that support spread, added in
    https://drafts.csswg.org/css-text-decor-4/#text-shadow-property
    currently: none browsers! none of them!
    I can't even find a test: 
    https://wpt.fyi/results/css/css-text-decor */
    @supports ( text-shadow: 1px 1px 1px 1px rgb(0, 0, 0) ) {
      h1 {
        text-shadow:
          
          var(--x-offset)
          var(--y-offset)
          0px
          0px
          var(--background-color), 
          
          var(--x-offset) 
          var(--y-offset)
          var(--stroke)
          0px
          var(--stroke-color);
        
      }
    }
    
    /**iniiciooo  boton  */
    .text-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      
    }
    .text-content2 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

    }
    .book-btn {
      padding: 10px 20px;
      background-color: #5a99dd;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }

    .text-a,.text-p,.text-r{
        font-size: 1.5rem;
        font-weight: 900;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem;
    }
    .text-a{
        color: #00c123;
    }
    .text-p {
        color: #fee900;
      }
    .text-r {
       color: #dc0c0c;
       }
    .card {/**contenedore de indivialues */
      border: 0px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }
    .card-individual {
      border: 3px solid #ccc;
      background-color:  #ffffff;
      border-radius: 8px;
      overflow: hidden;
      margin: 1rem;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;
      
    }
    .card-inicio{
      border: 3px solid #ffffff;
      background-color:  rgb(233, 180, 4);
      border-radius: 8px;
      overflow: hidden;
      margin: 1rem;
      width: 100%;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;
    }
    .dark-theme .card-inicio {
    
      background-color:  rgb(93, 61, 129);
    }
    .dark-theme .card-individual {
     
      background-color:  rgb(104, 81, 130);
    }
    
    .content {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
    
    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 250px;
      padding: 0.5rem;
    }
    
    .image .card-image {
      width: 200px; /* Tamaño fijo para la imagen */
      height: auto;
      border-radius: 8px;
    }
    
    .text-content {
      width: 100%;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;


    }

    .title {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 10px;
    }
    
    .description {
      margin-bottom: 10px;
    }
    
    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-size: 16px;
    }
    
    .book-btn {
      padding: 10px 20px;
      background-color: #5a99dd;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .disclaimer {
      font-size: 12px;
      color: #777;
      margin-top: 10px;
    }
    
    .star {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-size: contain;
      margin-right: 3px;
    }
    
    .review-count {
      color: #777;
    }
/* Estilos para dispositivos pequeños (teléfonos) */

@media only screen and (max-width: 600px) {
  .buttons-container{
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0%;
  }
  button{
    margin: 0.5rem;
    padding: 0.5rem;
  }
  .inicio{
    padding: 0.2rem;
  }
  /* Estilos específicos para dispositivos pequeños */
    h1{
        font-size: 1rem;
    }
    .text-a,.text-p,.text-r{
        font-size: 0.8rem;
    }
    .card-individual{
        margin: 0.4rem;
    }
    .card-inicio{
        padding: 0.2rem;
    }
    .content{
        flex-direction: column;
    }
    .image{
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    .image .card-image{
        width: 150px!important;
        height: auto!important;
    }
    .text-content{
        width: 100%;
        padding: 0.2rem;
    }
    .text-content2{
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .title{
        font-size: 0.8rem;
    }
    .description{
        font-size: 0.5rem;
    }
}

/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {

}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
  .student__principalPage{
        padding: 1.5rem;
  }
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}







    </style>
    