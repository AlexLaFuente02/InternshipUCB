<template>
  <div class="main-container">
    <h1>PASANTÍAS</h1>
    <h5>Te mostramos las pasantías activas en la plataforma.</h5>
    <div class="internship-container">
      <div class="internship-information-grid" v-for="card in listInternship" :key="card.id" v-if="everyInternshipsAreLoaded">
        
        <img :src="card.imageUrl|| defaultImage" alt="Imagen de la Empresa" class="card-image">
        

        <div class="information-grid">
          <h4 class="information-title">Detalles de la Pasantía:</h4>
          <div class="i_details">
            <ul class="internship-details">
              <li><strong>Empresa: </strong>{{card.institucion.nombreinstitucion}}</li>
              <li><strong>Requisitos: </strong>{{card.requisitoscompetencias}}</li>
              <li><strong>Horas: </strong>{{card.tiempoacumplir.descripcion}}</li>
              <li><strong>Fecha de Inicio: </strong>{{card.fechasolicitud}}</li>
              <li>
                <strong>Fecha de Finalización: </strong>{{card.fechaseleccionpasante}}</li>
              <li>
                <strong>Duracion (meses):</strong> {{card.duracion}}
              </li>
              <li>
                <strong>Tipo de Pasantía: </strong>{{card.areapasantia}}</li>
      
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {UseUseiInternshipStore }from "@/store/usei/UseiInternshipStore";
import {useLoaderStore} from "@/store/common/loaderStore";
export default {
  data() {
        return {
            listInternship:[],
           everyInternshipsAreLoaded: false,
           defaultImage: "https://cdn-icons-png.flaticon.com/512/9715/9715942.png",
        };
    },
    methods: {
        async getData(){
            useLoaderStore().activateLoader();
            await UseUseiInternshipStore().LoadInternship();
            this.listInternship = UseUseiInternshipStore().InternshipList.result;
            this.everyInternshipsAreLoaded = true;
            useLoaderStore().desactivateLoader();
          
        },
    },
    created(){
        this.getData();
    },
};
</script>

<style scoped>
.main-container {
  margin: 3% auto;
  width: 90%;
}

img {
  width: 100%;
}

.internship-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 2px solid black;
  padding-bottom: 2%;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;
     background: #fdfdfd;
     color: black;
}

.internship-information-grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 20% auto;
  align-items: center;
  margin: 2% auto 0;
  width: 92%;
  border: 2px solid black;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;

     background: rgb(255, 226, 5);
}
.dark-theme .internship-information-grid{
  background: #82679d;
}

.information-title {
  margin: 2% auto 0;
}

.i_details {
  width: 70%;
  margin: 2% auto;
}

.internship-details {
  text-align: start;
  list-style: none;
}

@media screen and (max-width: 550px) {
  .internship-container,
  .internship-information-grid {
    display: block;
  }

  .i_details {
    margin: 5% auto;
  }
}

/* DARK THEME */
.dark-theme .internship-container {
  background-color: rgb(86, 63, 100);
}

.dark-theme .internship-container {
  border: 2px solid white;
}

.dark-theme .internship-information-grid {
  border: 2px solid white;
}
</style>
