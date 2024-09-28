<template>
  <div class="main-container">
    
    <h1>EMPRESAS</h1>
    <h5>Te mostramos las empresas que forman parte de Internship By UCB.</h5>
    <div class="companies-container">
      <div class="company-information-grid" v-for="card in listInstitution" :key="card.id" v-if="everyInternshipsAreLoaded">
        <img
          :src="card.logoinstitucion || 'https://i.pinimg.com/564x/0f/76/1c/0f761c01d1fb284eb429061e577aa623.jpg'"
          alt="Logo de la Empresa"
        />
        <div class="information-grid" >
          <h4 class="information-title" >Detalles de la Empresa:</h4>
          <div class="c_details">
            <ul class="company-details">
              <li><strong>Nombre: </strong>{{card.nombreinstitucion}}</li>
              <li>
                <strong>Pertenece al sector: </strong>
                {{card.sectorpertenencia.nombresectorpertenencia}}
              </li>
              <li><strong>Descripción: </strong>{{card.reseniainstitucion}}</li>
              <li><strong>Nombre del Contacto: </strong>{{card.nombrecontacto}}</li>
              <li>
                <strong>Correo electr&oacute;nico: </strong>
                {{ card.correocontacto }}
              </li>
              <li>
                <strong>N&uacute;mero de celular: </strong>
                {{card.celularcontacto}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {UseUseiInstitutionStore }from "@/store/usei/UseiInstitutionStore";
import {useLoaderStore} from "@/store/common/loaderStore";
export default {
  data() {
        return {
            listInstitution:[],
           everyInternshipsAreLoaded: false,
        };
    },
    methods: {
        async getData(){
            useLoaderStore().activateLoader();
            await UseUseiInstitutionStore().LoadInstitutions();
            this.listInstitution = UseUseiInstitutionStore().InstitutionList.result;
            this.everyInternshipsAreLoaded = true;
            useLoaderStore().desactivateLoader();
            console.log(this.listInstitution);
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

.companies-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 2px solid black;
  padding-bottom: 2%;
  border-radius: 10px;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
     transition: 0.5s;
     background:rgb(255, 208, 0);
}

.company-information-grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 20% auto;
  align-items: center;
  margin: 2% auto 0;
  width: 92%;
  border-radius: 10px;
  border: 2px solid black;
   box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
   
     transition: 0.5s;
     background-color: rgb(255, 255, 255);
}

.dark-theme .company-information-grid {

     background-color: rgb(136, 100, 154);
}

.information-title {
  margin: 2% auto 0;
}

.c_details {
  width: 70%;
  margin: 2% auto;
}

.company-details {
  text-align: start;
  list-style: none;
}

@media screen and (max-width: 568px) {
  .companies-container,
  .company-information-grid {
    display: block;
  }

  .c_details {
    margin: 5% auto;
  }
}

/* DARK THEME */
.dark-theme .companies-container {
  background-color: rgb(86, 63, 100);


}

.dark-theme .companies-container {
  border: 2px solid white;
}

.dark-theme .company-information-grid {
  border: 2px solid white;
}
</style>
