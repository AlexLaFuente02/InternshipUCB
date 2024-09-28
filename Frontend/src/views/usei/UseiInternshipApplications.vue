<template>
  <div class="inicio">
    <h1>TUS SOLICITUDES DE PASANTIAS</h1>
    <p>Te mostramos tus solicitudes de pasantias de las empresas</p>
    <div class="card-inicio">
      <div class="card">
        <div v-for="card in listInternship" :key="card.id" v-if="everyInternshipsAreLoaded" class="card-individual">
          <div class="content">
            <div class="image">
              <img :src="card.imageUrl|| defaultImage" alt="Imagen de la Empresa" class="card-image">
            </div>
            <div class="text-content">
              <div class="button-container">
                <div class="button-group">
                  <button class="edit-btn" @click="editCard(card.id)">Aceptar</button>
                  <button class="edit-btn" @click="deleteCard(card.id)">Rechazar</button>
                </div>
              </div>
              <div class="title">{{ card.empresa }}</div>
              <div class="description"> <ul class="internship-details">
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
    
          </ul></div>
            </div>
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
      return{
        listInternship: [],
        everyInternshipsAreLoaded: false,
    defaultImage: "https://cdn-icons-png.flaticon.com/512/9715/9715942.png",
  };
},
methods: {
      async getData() {

  useLoaderStore().activateLoader();

  await UseUseiInternshipStore().LoadPendenInternship();
  // Asumiendo que LoadPendenInternship() actualiza InternshipList de manera similar a LoadInstitutions() en tu ejemplo.
  this.listInternship = UseUseiInternshipStore().InternshipList.result;

  this.everyInternshipsAreLoaded = true;
  useLoaderStore().desactivateLoader();

},

async editCard(internshipId) {
      try {
        const result = await UseUseiInternshipStore().ActivateInternship(internshipId);
        console.log('Institución activada correctamente', result);
        window.location.reload(true);
        // Aquí podrías llamar a getData() para refrescar la lista o quitar la tarjeta de la vista
      } catch (error) {
        console.error('Error al activar la institución', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    },
    async deleteCard(internshipId) {
        try {
        const result = await UseUseiInternshipStore().RechazarInternship(internshipId);
        console.log('Institución rechazada correctamente', result);
        window.location.reload(true);
        // Aquí podrías llamar a getData() para refrescar la lista o quitar la tarjeta de la vista
      } catch (error) {
        console.error('Error al rechazar la institución', error);
        // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
      },
},
created() {
  this.getData();
},
};
  </script>
  
  <style scoped>
  /* estilo eltra de titulo/
 
  
  /**iniiciooo  boton  */
  .text-content {
    position: relative;
    
  }
  .text-content2 {
    position: relative;

  }
  .text-content3 {
    position: relative;

  }
  @media (max-width: 585px) {
    .text-content2 {
    position: relative;
    margin-bottom:20%;
  }
  .text-a{
      margin-top: 30px;
     
  }
  .text-content {
    margin-bottom:20%;
  }
  }
  @media (max-width: 290px) {
    .text-content2 {
    margin-bottom:90%;
  
  }
  }
  @media (max-width: 380px) {
    .text-content2 {
    position: relative;
    margin-bottom:40%;
  }
 
  }
  @media (max-width: 290px) {
    .text-content2 {
    margin-bottom:60%;
  
  }
  }
  .content-text {
    margin-right: 10%; /* Ajusta el espacio para el botón de reserva */
  }
  
  .book-btn {
    position: absolute;
    top: 5%;
    right: 1%;
  }
  /**fin  boton  */
  .inicio{
    position: relative;
    top: 10px;
    left: 10px;
    margin-bottom: 30px;
  }
  /**colores de texto de si esta aporbado o no */
  

  .card {/**contenedore de indivialues */
    border: 0px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 30px;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 15px;
    color: #000;
    background: rgb(255, 255, 255);
  }
  .card-individual {
    border: 3px solid #000000;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
    background: rgb(116, 181, 203);
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;
  }
  .card-inicio{
    border: 3px solid #000000;
background:  #ffffff;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 15px;
    margin-right: 10%;
    margin-left: 1%;
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;
     /* Ajusta este valor según el espacio que desees */
  }

  .dark-theme .card {/**contenedore de indivialues */
    border: 0px solid #ccc;
    color: #ffffff;
    background: rgb(0, 0, 0);
  }
  .dark-theme .card-individual {
    border: 3px solid #ffffff;
    background: rgb(119, 129, 216);
  }
  .dark-theme .card-inicio{
    border: 3px solid #ffffff;
background:  #000000;
   
  }

  
  .content {
    display: flex;
  }
  
  .image {
    flex: 0 0 auto; /* Ancho fijo para la imagen */
  }
  
  .image .card-image {
    width: 200px; /* Tamaño fijo para la imagen */
    height: auto;
    border-radius: 8px;
  }
  
  .text-content {
    flex: 1;
    padding: 20px;
  }
  /* Estilos responsivos */
  @media (max-width: 880px) {
    .content {
      flex-direction: column;
    }
    .text-content {
      padding: 20px;
    }
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .description {
    margin-bottom: 15px;
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
    background-image: url("https://image.flaticon.com/icons/svg/148/148841.svg");
    background-size: contain;
    margin-right: 3px;
  }
  
  .review-count {
    color: #777;
  }

/* Estilos para los botones Editar y Borrar */
.edit-btn {
padding: 10px 20px;
background-color: rgb(3, 170, 14);
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
margin: 0 5px;
}

.delete-btn {
padding: 10px 20px;
background-color: #ff0000;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
margin: 0 5px;
}

/* Estilos para alinear botones a la derecha */
.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-bottom: 10px;
  --b: 5px;   /* the border thickness */
  --h: 1.8em; /* the height */
}



.button-container .edit-btn {
  --_c: #88C100;
  flex: calc(1.25 + var(--_s,0));
  min-width: 0;
  font-size: 20px;
  font-weight: bold;
  height: var(--h);
  cursor: pointer;
  color: var(--_c);
  border: var(--b) solid var(--_c);
  background: 
    conic-gradient(at calc(100% - 1.3*var(--b)) 0,var(--_c) 209deg, #0000 211deg) 
    border-box;
  clip-path: polygon(0 0,100% 0,calc(100% - 0.577*var(--h)) 100%,0 100%);
  padding: 0 calc(0.288*var(--h)) 0 0;
  margin: 0 calc(-0.288*var(--h)) 0 0;
  box-sizing: border-box;
  transition: flex .4s;
}
.button-container .edit-btn + .edit-btn {
  --_c: #FF003C;
  flex: calc(.75 + var(--_s,0));
  background: 
    conic-gradient(from -90deg at calc(1.3*var(--b)) 100%,var(--_c) 119deg, #0000 121deg) 
    border-box;
  clip-path: polygon(calc(0.577*var(--h)) 0,100% 0,100% 100%,0 100%);
  margin: 0 0 0 calc(-0.288*var(--h));
  padding: 0 0 0 calc(0.288*var(--h));
}
.button-container .edit-btn:focus-visible {
  outline-offset: calc(-2*var(--b));
  outline: calc(var(--b)/2) solid #000;
  background: none;
  clip-path: none;
  margin: 0;
  padding: 0;
}
.button-container .edit-btn:focus-visible + .edit-btn {
  background: none;
  clip-path: none;
  margin: 0;
  padding: 0;
}
.button-container .edit-btn:has(+ .edit-btn:focus-visible) {
  background: none;
  clip-path: none;
  margin: 0;
  padding: 0;
}
.edit-btn:hover,
.edit-btn:active:not(:focus-visible) {
  --_s: .75;
 
}




.edit-btn:active {
  box-shadow: inset 0 0 0 100vmax var(--_c);
  color: #fff;
}
.button-group{

  border:  inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      
     transition: 0.5s;
  border-radius: 10px;
  
}

</style>