<template>
  <div class="main-container">
    <h1>TUS CONVOCATORIAS</h1>
    <h5>Te mostramos tus convocatorias activas</h5>
    <div class="internship-container">
      <div v-if="internshipsAreLoaded">
        <div
          class="internship-information-grid"
          v-for="internship in activeInternshipsByInstitutionList"
          :key="internship.id"
        >
          <img :src="getRandomImage" alt="Internship image" />
          <div class="information-grid">
            <h4 class="information-title">Detalles de la Pasantía:</h4>
            <div class="i_details">
              <ul class="internship-details">
                <li class="title">ID: {{ internship.id }}</li>
                <li>
                  <strong>&Aacute;rea de la pasant&iacute;a:</strong>
                  {{ internship.areapasantia }}
                </li>
                <li>
                  <strong>Descripci&oacute;n funciones o actividades:</strong>
                  {{ internship.descripcionfunciones }}
                </li>
                <li>
                  <strong>Requisitos de la pasant&iacute;a:</strong>
                  {{ internship.requisitoscompetencias }}
                </li>
                <li>
                  <strong>Horario de inicio:</strong>
                  {{ internship.horario_inicio }}
                </li>
                <li>
                  <strong>Horario de fin:</strong> {{ internship.horario_fin }}
                </li>
                <li>
                  <strong>Fecha de solicitud:</strong>
                  {{ internship.fechasolicitud }}
                </li>
                <li>
                  <strong>Fecha de selecci&oacute;n del pasante:</strong>
                  {{ internship.fechaseleccionpasante }}
                </li>
                <li>
                  <strong>Duracion(meses):</strong>
                  {{ internship.duracion }}
                </li>
                <li>
                  <strong>Estado de la convocatoria:</strong>
                  {{ internship.nombreestadoconvocatoria }}
                </li>
                <li>
                  <strong>Tiempo a cumplir de la pasant&iacute;a:</strong>
                  {{ internship.tiempoacumplir }}
                </li>
              </ul>
            </div>
          </div>
          <div class="buttons-container">
            <div class="button-group">
              <button class="edit-btn" @click="editCard(internship.id)">
                Editar
              </button>
              <button class="delete-btn" @click="deleteCard(internship.id)">
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoaderStore } from "@/store/common/loaderStore";
import { activeInternshipsByInstitutionIdStore } from "../../store/institution/ActiveInternshipsByInstitutionIdStore";
import firstInternshipImage from "@/components/institution/staticImages/firstInternshipStaticImage.jpg";
import secondInternshipImage from "@/components/institution/staticImages/secondInternshipStaticImage.png";
import thirdInternshipImage from "@/components/institution/staticImages/thirdInternshipStaticImage.png";
import fourthInternshipImage from "@/components/institution/staticImages/fourthInternshipStaticImage.png";
import ButtonVue from "../../components/common/Button.vue";
export default {
  name: "institutionInternshipFilterPage",
  components: {
    ButtonVue,
  },
  data() {
    return {
      internshipsImages: [
        firstInternshipImage,
        secondInternshipImage,
        thirdInternshipImage,
        fourthInternshipImage,
      ],
      activeInternshipsByInstitutionIdStore: activeInternshipsByInstitutionIdStore(),
      internshipsAreLoaded: false,
      activeInternshipsByInstitutionList: [],
    };
  },
  methods: {
    async getActiveInternshipsByInstitution() {
      useLoaderStore().activateLoader();
      await this.activeInternshipsByInstitutionIdStore.loadActiveInternshipsByInstitutionId($cookies.get("institutionID"));
      this.activeInternshipsByInstitutionList = this.activeInternshipsByInstitutionIdStore.internships.result;
      this.activeInternshipsByInstitutionList = this.activeInternshipsByInstitutionList.map((internship) => {
        return {
          id: internship.id,
          areapasantia: internship.areapasantia,
          descripcionfunciones: internship.descripcionfunciones,
          requisitoscompetencias: internship.requisitoscompetencias,
          horario_inicio: internship.horario_inicio,
          horario_fin: internship.horario_fin,
          fechasolicitud: internship.fechasolicitud,
          fechaseleccionpasante: internship.fechaseleccionpasante,
          duracion: internship.duracion,
          nombreestadoconvocatoria: internship.estadoconvocatoria.nombreestadoconvocatoria,
          tiempoacumplir: internship.tiempoacumplir.descripcion,
        };
      });
      console.log(this.activeInternshipsByInstitutionList);
      this.internshipsAreLoaded = true;
      useLoaderStore().desactivateLoader();
    },
  },
  computed: {
    getRandomImage() {
      const randomImage = Math.floor(Math.random() * this.internshipsImages.length);
      return this.internshipsImages[randomImage];
    },
  },
  created() {
    this.getActiveInternshipsByInstitution();
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

.title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 2%;
}

.internship-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 2px solid black;
  padding-bottom: 2%;
}

.internship-information-grid {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 20% 55% auto;
  align-items: center;
  margin: 2% auto 0;
  width: 92%;
  border: 2px solid black;
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

@media screen and (max-width: 880px) {
  .main-container {
    text-align: center;
  }

  .internship-container,
  .internship-information-grid {
    display: block;
  }

  .i_details {
    margin: 5% auto;
  }

  .internship-details {
    padding: 0;
  }

  .buttons-container {
    margin-bottom: 5%;
  }
}

.edit-btn,
.delete-btn {
  padding: 10px 20px;
  background-color: #5a99dd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: auto 3%;
}

/* DARK THEME */
.dark-theme .internship-container {
  background-color: #353e48;
}

.dark-theme .internship-container {
  border: 2px solid white;
}

.dark-theme .internship-information-grid {
  border: 2px solid white;
}
</style>
