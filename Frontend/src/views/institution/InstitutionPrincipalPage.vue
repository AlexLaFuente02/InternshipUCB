<template>
  <div class="institution-principal-page">
    <div class="institution-profile">
      <div class="profile-content-header">
        <div class="welcome-content">
          <div class="emoji">👋</div>
          <div class="institution-data">
            <span class="institution-welcome">
              Hola, {{ companyInformation.nombreinstitucion }}!
            </span>
            <span class="institution-sector">
              {{ companyInformation && companyInformation.sectorpertenencia ? companyInformation.sectorpertenencia.nombresectorpertenencia : '' }}
            </span>
          </div>
        </div>
        <div class="more-content">
          <router-link to="/institution/Settings">
            <button class="edit-profile-button bn23">
              <font-awesome-icon :icon="['fas', 'user-edit']" size="2xl" />
              <span class="edit-profile">Editar Perfil</span>
            </button>
          </router-link>
        </div>
      </div>
      <div class="summary">
        <span class="summary-title">
          Resumen general de tus convocatorias
        </span>
        <div class="summary-content">
          <span class="summary-content-number">
            {{ internshipsQuantities.ConvocatoriasActivas }}
            <span class="summary-content-text">activas</span>
          </span>
          <span class="summary-content-number">
            {{ internshipsQuantities.ConvocatoriasInactivas }}
            <span class="summary-content-text">inactivas</span>
          </span>
          <span class="summary-content-number">
            {{ allPostulationsByInstitution.length }}
            <span class="summary-content-text">total solicitudes</span>
          </span>
        </div>
      </div>
    </div>
    <div class="active-internships-by-institution">
      <h1>Tus pasant&iacute;as</h1>
      <div class="container__cards" v-if="companyInformationIsLoaded">
        <div class="container__little__nav">
          <InternshipsLittleNavBar @filter-internships="filterInternships" />
        </div>
        <div
          class="card"
          v-for="internship in filteredInternships"
          :key="internship.id"
        >
          <SimpleCard :key="internship.id" :internship="internship" />
        </div>
      </div>
    </div>
    <!-- <div class="requests-by-institution">
      <h1>Solicitudes a tus pasant&iacute;as</h1>
      <div class="container__requests" v-if="companyInformationIsLoaded">
        <div class="container__little__nav">
          <PostulationsLittleNavBar @filter-postulations="filterPostulations" />
        </div>
        <div class="container__Arrow">
          <ArrowCards
            :listRequests="allPostulationsByInstitution"
            :type="{
              id: 4,
              title: 'Todo',
              icon: '🌎',
              color: '#04befe',
            }"
            v-show="type == 'Todo'"
          />
          <ArrowCards
            :listRequests="requestsPending"
            :type="{
              id: 3,
              title: 'Pendiente',
              icon: '🤷',
              color: '#f15f0e',
            }"
            v-show="type == 'Pendiente'"
          />
          <ArrowCards
            :listRequests="requestsAccepted"
            :type="{
              id: 2,
              title: 'Aceptado',
              icon: '😁',
              color: '#36aeb3',
            }"
            v-show="type == 'Aceptado'"
            aria-hidden="true"
          />
        </div>
      </div>
    </div> -->
    <div class="container__header__page">
      <div class="container__header__description">
        <h1>¡Acción rápida!</h1>
        <div class="action-buttons">
          <router-link class="link" to="/institution/Convocatoria">
            <Button text="Tus Convocatorias" :color="2" :disabled="false" />
          </router-link>
          <router-link class="link" to="/institution/addConvocatoria">
            <Button text="Agregar Convocatoria" :color="3" :disabled="false" />
          </router-link>
          <router-link class="link" to="/institution/InternshipFilter">
            <Button text="Solicitudes" :color="4" :disabled="false" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/common/Button.vue";
import { useLoaderStore } from "@/store/common/loaderStore";
import SimpleCard from "@/components/common/SimpleCard.vue";
import ArrowCards from "@/components/common/ArrowCards.vue";
import InternshipsLittleNavBar from "@/components/institution/InternshipsLittleNavBar.vue";
import PostulationsLittleNavBar from "@/components/institution/PostulationsLittleNavBar.vue";
import { InstitutionByIdStore } from "@/store/institution/InstitutionByIdStore";
import { QuantityOfActiveNInactiveInternshipsStore } from "../../store/institution/QuantityOfActiveNInactiveInternshipsStore";
import { totalPostulationsByInstitutionIdStore } from "../../store/institution/TotalPostulationsByInstitutionIdStore";
import { activeInternshipsByInstitutionIdStore } from "../../store/institution/ActiveInternshipsByInstitutionIdStore";
import { pendingInternshipsByInstitutionIdStore } from "../../store/institution/PendingInternshipsByInstitutionIdStore";
import { inactiveInternshipsByInstitutionIdStore } from "../../store/institution/InactiveInternshipsByInstitutionIdStore";
import { internshipsByInstitutionIdStore } from "../../store/institution/InternshipsByInstitutionIdStore";
import { approvedPostulationsByInstitutionIdStore } from "../../store/institution/ApprovedPostulationsByInstitutionIdStore";
import { pendingPostulationsByInstitutionIdStore } from "../../store/institution/PendingPostulationsByInstitutionIdStore";
import { rejectedPostulationsByInstitutionIdStore } from "../../store/institution/RejectedPostulationsByInstitutionIdStore";
import { postulationsByInstitutionIdStore } from "../../store/institution/PostulationsByInstitutionIdStore";
export default {
  name: "InstitutionPrincipalPage",
  components: {
    Button,
    SimpleCard,
    ArrowCards,
    InternshipsLittleNavBar,
    PostulationsLittleNavBar,
  },
  data() {
    return {
      listInternships: [],
      internshipsType: "Pasantías activas",
      postulationsType: "Postulaciones aprobadas",
      companyInformationIsLoaded: false,
      institutionByIdStore: InstitutionByIdStore(),
      activeNInactiveInternshipsQuantityStore:
        QuantityOfActiveNInactiveInternshipsStore(),
      totalPostulationsByInstitutionIdStore: 
        totalPostulationsByInstitutionIdStore(),
      activeInternshipsByInstitutionIdStore:
        activeInternshipsByInstitutionIdStore(),
      pendingInternshipsByInstitutionIdStore:
        pendingInternshipsByInstitutionIdStore(),
      inactiveInternshipsByInstitutionIdStore:
        inactiveInternshipsByInstitutionIdStore(),
      allInternshipsByInstitutionIdStore: 
        internshipsByInstitutionIdStore(),
      approvedPostulationsByInstitutionIdStore:
        approvedPostulationsByInstitutionIdStore(),
      pendingPostulationsByInstitutionIdStore:
        pendingPostulationsByInstitutionIdStore(),
      rejectedPostulationsByInstitutionIdStore:
        rejectedPostulationsByInstitutionIdStore(),
      allPostulationsByInstitutionIdStore: 
        postulationsByInstitutionIdStore(),
      companyInformation: [],
      internshipsQuantities: [],
      postulationsQuantity: [],
      activeInternships: [],
      pendingInternships: [],
      inactiveInternships: [],
      allInternshipsByInstitution: [],
      approvedPostulations: [],
      pendingPostulations: [],
      rejectedPostulations: [],
      allPostulationsByInstitution: [],
    };
  },
  methods: {
    async getInstitutionData(institutionID) {
      useLoaderStore().activateLoader();
      await this.institutionByIdStore.loadInstitutionById(institutionID);
      this.companyInformation = this.institutionByIdStore.institution.result;
      await this.activeNInactiveInternshipsQuantityStore.loadQuantitiesOfInternships(institutionID);
      this.internshipsQuantities = this.activeNInactiveInternshipsQuantityStore.quantityResults.result;
      await this.totalPostulationsByInstitutionIdStore.loadTotalPostulationsByInstitutionId(institutionID);
      this.postulationsQuantity = this.totalPostulationsByInstitutionIdStore.totalPostulationsResult.result;
      await this.activeInternshipsByInstitutionIdStore.loadActiveInternshipsByInstitutionId(institutionID);
      this.activeInternships = this.activeInternshipsByInstitutionIdStore.internships.result;
      await this.pendingInternshipsByInstitutionIdStore.loadPendingInternshipsByInstitutionId(institutionID);
      this.pendingInternships = this.pendingInternshipsByInstitutionIdStore.pendingInternships.result;
      await this.inactiveInternshipsByInstitutionIdStore.loadInactiveInternshipsByInstitutionId(institutionID);
      this.inactiveInternships = this.inactiveInternshipsByInstitutionIdStore.inactiveInternships.result;
      await this.allInternshipsByInstitutionIdStore.loadInternshipsByInstitutionId(institutionID);
      this.allInternshipsByInstitution = this.allInternshipsByInstitutionIdStore.internships.result;
      await this.approvedPostulationsByInstitutionIdStore.loadApprovedPostulationsByInstitutionId(institutionID);
      this.approvedPostulations = this.approvedPostulationsByInstitutionIdStore.approvedPostulations.result;
      await this.pendingPostulationsByInstitutionIdStore.loadPendingPostulationsByInstitutionId(institutionID);
      this.pendingPostulations = this.pendingInternshipsByInstitutionIdStore.pendingInternships.result;
      await this.rejectedPostulationsByInstitutionIdStore.loadRejectedPostulationsByInstitutionId(institutionID);
      this.rejectedPostulations = this.rejectedPostulationsByInstitutionIdStore.rejectedPostulations.result;
      await this.allPostulationsByInstitutionIdStore.loadPostulationsByInstitutionId(institutionID);
      this.allPostulationsByInstitution = this.allPostulationsByInstitutionIdStore.postulations.result;
      console.log("Información de la empresa:", this.companyInformation);
      console.log("Cantidades de pasantías activas e inactivas:", this.internshipsQuantities);
      console.log("Total de postulaciones:", this.postulationsQuantity);
      console.log("Pasantías activas:", this.activeInternships);
      console.log("Pasantías pendientes:", this.pendingInternships);
      console.log("Pasantías inactivas:", this.inactiveInternships);
      console.log("Todas las pasantías:", this.allInternshipsByInstitution);
      console.log("Postulaciones aprobadas:", this.approvedPostulations);
      console.log("Postulaciones pendientes:", this.pendingPostulations);
      console.log("Postulaciones rechazadas:", this.rejectedPostulations);
      console.log("Todas las postulaciones:", this.allPostulationsByInstitution);
      this.companyInformationIsLoaded = true;
      useLoaderStore().desactivateLoader();
    },
    filterInternships(key) {
      // Puedes mapear las claves con el nombre del estado si difieren
      const statusMap = {
        'Pasantías activas': 'ACTIVAS',
        'Pasantías pendientes': 'PENDIENTES',
        'Pasantías inactivas': 'INACTIVAS',
        'Todo': 'TODAS'
      };

      console.log(`${statusMap[key]} fue seleccionado`);

      // Filtra y muestra las pasantías basado en el botón que fue presionado
      switch(statusMap[key]) {
        case 'PENDIENTES':
          this.showPendingInternships();
          break;
        case 'ACTIVAS':
          this.showActiveInternships();
          break;
        case 'INACTIVAS':
          this.showInactiveInternships();
          break;
        case 'TODAS':
          this.showAllInternships();
          break;
        default:
          this.showAllInternships();
      }
    },
    filterPostulations(key) {
      // Puedes mapear las claves con el nombre del estado si difieren
      const statusMap = {
        'Postulaciones aprobadas': 'APROBADAS',
        'Postulaciones pendientes': 'PENDIENTES',
        'Postulaciones rechazadas': 'RECHAZADAS',
        'Todo': 'TODAS'
      };

      console.log(`${statusMap[key]} fue seleccionado`);

      // Filtra y muestra las pasantías basado en el botón que fue presionado
      switch(statusMap[key]) {
        case 'APROBADAS':
          this.showApprovedPostulations();
          break;
        case 'PENDIENTES':
          this.showPendingPostulations();
          break;
        case 'RECHAZADAS':
          this.showRejectedPostulations();
          break;
        case 'TODAS':
          this.showAllPostulations();
          break;
        default:
          this.showAllPostulations();
      }
    },
    showPendingInternships() {
      this.internshipsType = 'PENDIENTES';
    },
    showActiveInternships() {
      this.internshipsType = 'ACTIVAS';
    },
    showInactiveInternships() {
      this.internshipsType = 'INACTIVAS';
    },
    showAllInternships() {
      this.internshipsType = 'TODAS';
    },
    showApprovedPostulations() {
      this.postulationsType = 'APROBADAS';
    },
    showPendingPostulations() {
      this.postulationsType = 'PENDIENTES';
    },
    showRejectedPostulations() {
      this.postulationsType = 'RECHAZADAS';
    },
  },
  computed: {
    listRequestsComputed() {
      return this.listRequests;
    },
    internshipTypeComputed() {
      return this.internshipsType;
    },
    postulationsTypeComputed() {
      return this.postulationsType;
    },
    filteredInternships() {
      // Aquí es donde realmente filtras las pasantías basado en internshipsType
      switch(this.internshipsType) {
        case 'PENDIENTES':
          return this.pendingInternships;
        case 'ACTIVAS':
          return this.activeInternships;
        case 'INACTIVAS':
          return this.inactiveInternships;
        case 'TODAS':
          return this.allInternshipsByInstitution;
        default:
          return [];
      }
    },
  },
  created() {
    this.getInstitutionData($cookies.get("institutionID"));
  },
};
</script>
<style scoped>
.institution-principal-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.student__content__internship {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/*Estilos para el perfil del estudiante*/
.institution-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0 0 1.5rem 0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dark-theme .institution-profile {
  background-color: #434b54;
}
.profile-content-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.welcome-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.emoji {
  font-size: 2rem;
}
.institution-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 4% 0;
}
.institution-welcome {
  font-size: 1.5rem;
  font-weight: 700;
}
.institution-sector {
  font-size: 1rem;
  font-weight: 400;
}
.more-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
}
.edit-profile-button {
  padding: 0.9rem;
  margin: 0.5rem;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.edit-profile-button:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.edit-profile-button:focus {
  outline: none;
}

.edit-profile-button.bn23 {
  background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.dark-theme .edit-profile-button.bn23 {
  background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

.see_vitae {
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.5rem;
}
.edit-profile {
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.5rem;
}
.summary {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  margin: 0 auto;
}
.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
}
.summary-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
}
.summary-content-number {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  font-size: 3rem;
  font-weight: 700;
}
.summary-content-text {
  font-size: 1rem;
  font-weight: 700;
  margin-left: 0.5rem;
}

.container__header__page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin: 0 0 1rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.container__header__description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3% 7%;
}
.container__header__description {
  font-size: 1.5rem;
  text-align: center;
}
.container__header__description p {
  font-size: 1rem;
  text-align: center;
}
.container__header__description Button {
  margin-top: 25%;
}

.link {
  text-decoration: none;
  margin-right: 6%;
}

.action-buttons {
  display: flex;
  align-items: center;
}

/*Estilos para las pasantías del estudiante*/
/*Estilos para las pasantías activas del estudiante*/
.active-internships-by-institution {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0 0 1.5rem 0;
  height: 500px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dark-theme .active-internships-by-institution {
  background-color: #434b54;
}
.active-internships-by-institution h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 1rem;
}
.container__cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 100%;
  width: 80%;
}
/*Estilos para las solicitudes del estudiante*/

.requests-by-institution {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0 0 1.5rem 0;
  height: 500px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.container__requests {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.dark-theme .requests-by-institution {
  background-color: #434b54;
}

.dark-theme .container__header__page {
  background-color: #434b54;
}

.container__little__nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.container__Arrow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}

/* Estilos para dispositivos pequeños (teléfonos) */

@media screen and (max-width: 1250px) {
  .container__header__page {
    flex-direction: column;
  }
  .container__header__description {
    padding: 3% 7%;
  }

  .action-buttons {
    display: block;
  }

  .link {
    margin: 0;
  }
}

@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  .institution-principal-page {
    padding: 0.5rem;
  }
  .profile-content-header {
    flex-direction: column;
  }
  .welcome-content {
    width: 100%;
    margin-bottom: 0.3rem;
  }
  .more-content {
    width: 100%;
  }
  .edit-profile-button {
    margin: 0.2rem;
    padding: 0.5rem;
    font-size: 0.4rem;
  }
  .edit-profile-button span {
    font-size: 0.6rem;
  }
  .summary-content {
    flex-wrap: wrap;
  }
  .summary-title {
    font-size: 1rem;
    font-weight: 700;
  }
  .summary-content-number {
    font-size: 1.2rem;
  }
  .summary-content-text {
    font-size: 0.6rem;
  }
}

/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
  .institution-principal-page {
    padding: 1rem;
  }
  .profile-content-header {
    flex-direction: column;
  }
  .welcome-content {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .more-content {
    width: 100%;
  }
  .edit-profile-button {
    margin: 0.3rem 0.3rem;
    padding: 0.8rem;
    font-size: 0.6rem;
  }
  .edit-profile-button span {
    font-size: 0.8rem;
  }
  .summary-content {
    flex-wrap: wrap;
  }
  .summary-title {
    font-size: 1.3rem;
    font-weight: 700;
  }
  .summary-content-number {
    font-size: 1.5rem;
  }
  .summary-content-text {
    font-size: 0.8rem;
  }
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
  .institution-principal-page {
    padding: 1.5rem;
  }
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}
</style>
