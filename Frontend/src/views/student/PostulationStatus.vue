<template>
  <div class="main-container">
    <h1>ESTADO DE POSTULACIÓN</h1>
    <div class="internship-container" v-if="allDataIsLoaded">
      <div class="first-grid-container">
        <img v-if="srcLogo !== ''"
          src="https://www.cainco.org.bo/empresaydesarrollo/wp-content/uploads/2021/05/1550703145451.png"
          alt="Logo de la Empresa"
          class="company-logo"
        />
        <img v-else
          :src="srcLogo"
          alt="Logo de la Empresa"
          class="company-logo"
        />
      </div>
      <div class="second-grid-container">
        <div class="i_title">
          <h2>
            {{ institution.nombreinstitucion }}
          </h2>
        </div>
        <div class="i_description">
          <h4>Descripción de la Pasantía:</h4>
          <p>
            ¡Gracias por tu interés en la pasantía de {{
              institution.nombreinstitucion
            }}! Esta es una oportunidad emocionante para
            adentrarte en el mundo de 
            {{ institution.sectorpertenencia.nombresectorpertenencia }}!
          </p>
        </div>
        <div class="institution_name">
          <h4>Empresa:</h4>
          <p>{{ institution.nombreinstitucion }}</p>
        </div>
      </div>
      <div class="third-grid-container">
        <div class="internship-information-grid">
          <div class="first-information-grid">
            <div class="title-grid">
              <h4 class="title">Detalles</h4>
            </div>
            <div class="information-grid">
              <h4 class="information-title">Detalles de la Pasantía:</h4>
              <div class="i_details">
                <ul class="internship-details">
                  <li><strong>Empresa: </strong>{{ institution.nombreinstitucion }}</li>
                  <li>
                    <strong>
                      Fecha de Inicio para la selección:
                    </strong>
                    {{ postulation.convocatoria_id.fechasolicitud  }}
                  </li>
                  <li>
                    <strong>Fecha de Finalización para la selección: </strong>{{ this.postulation.convocatoria_id.fechaseleccionpasante  }}
                  </li>
                  <li>
                    <strong>Duracion de la pasntia en meses: </strong>{{ this.postulation.convocatoria_id.duracion  }}
                  </li>
                  <li>
                    <strong>Tipo de Pasantía: </strong>{{ this.postulation.estadopostulacion_id.nombreestadopostulacion  }}
                  </li>
                  <li>
                    <strong>
                      Hora de Inicio de la Pasantía: 
                    </strong>
                    {{ this.postulation.convocatoria_id.horario_inicio  }}
                  </li>
                  <li>
                    <strong>
                      Hora de Finalización de la Pasantía: 
                    </strong>
                    {{ this.postulation.convocatoria_id.horario_fin  }}
                  </li>
                </ul>
              </div>
              <!--<div class="download-internship">
                <p class="i_download"><strong>Descargar aplicativo:</strong></p>
                <Button text="Descargar" :color="0"></Button>
              </div>-->
            </div>
          </div>
          <div class="second-information-grid">
            <div class="title-grid">
              <h4 class="title">Requisitos</h4>
            </div>
            <div class="information-grid">
              <h4 class="information-title">Requisitos de Postulación:</h4>
              <div class="i_details">
                <div class="internship-details">
                  <p>
                    {{ this.postulation.convocatoria_id.requisitoscompetencias }}
                  </p>
                </div>
              </div>
              <h4 class="information-title">
                Áreas a la que va dirigida la pasantía:
              </h4>
              <div class="i_details">
                <div class="internship-details">
                  <p>
                    {{ this.postulation.convocatoria_id.areapasantia }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="third-information-grid">
            <div class="title-grid">
              <h4 class="title">Estado de Postulación</h4>
            </div>
            <div class="information-grid">
              <div
                class="postulation-status"
                v-if="postulationStatus.status === 'APROBADO'"
              >
                <h4 class="status approved-status">APROBADO</h4>
                <img
                  src="@/components/images/approved.png"
                  alt="Estado de Postulación"
                  class="status-image"
                />
                <p class="status-text">
                  Usted ha sido contratado. ¡Bienvenido! En los próximos días
                  nos estaremos contactando con usted.
                </p>
              </div>
              <div
                class="postulation-status"
                v-if="postulationStatus.status === 'PENDIENTE'"
              >
                <h4 class="status on-hold-status">EN ESPERA</h4>
                <img
                  src="@/components/images/onHold.png"
                  alt="Estado de Postulación"
                  class="status-image"
                />
                <p class="status-text">
                  Aun estamos procesando su postulación, vuelva mañana por
                  favor.
                </p>
              </div>
              <div
                class="postulation-status"
                v-if="postulationStatus.status === 'RECHAZADO'"
              >
                <h4 class="status rejected-status">RECHAZADO</h4>
                <img
                  src="@/components/images/rejected.png"
                  alt="Estado de Postulación"
                  class="status-image"
                />
                <p class="status-text">
                  Usted NO ha sido contratado, debido a que no cumple plenamente
                  con los requisitos de la pasantía.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="internship-information-grid">
          
          <div class="third-information-grif-comments">
            <div class="title-grid-comments">
              <h4 class="title">
                Comentarios
              </h4>
            </div>
            <div class="get-container-comments"
            v-for="comment in comments"
            :key="comment.id"
            >
              <div 
              class="comment-student"
              >
                <h4 class="comment-title">
                  {{ comment.postulacion.estudiante.nombres }}  {{ comment.postulacion.estudiante.apellidopaterno }}  {{ comment.postulacion.estudiante.apellidomaterno }}
                </h4>
                <h1 class="comment-information">
                  Estudiante - {{ comment.postulacion.estudiante.correoelectronico }} - {{ comment.postulacion.estudiante.celularcontacto }}
                </h1>
                <p class="comment-text">
                  {{ comment.comentario }}
                </p>
                <p class="comment-date">
                  {{ comment.fecha }}
                </p>
              </div>
            </div>
            <hr
            style="width: 90%; margin: 0 auto;"
            >

            <div
                class="submit-container-comments"
                v-if="postulationStatus.status === 'APROBADO'"
              >
              <p>
                Tenga en cuenta que los comentarios que realice serán visibles para todos los estudiantes que postulen a esta pasantía.
              </p>
                <textarea
                  name="userDescription"
                  id="userDescription"
                  cols="25"
                  rows="5"
                  placeholder="Comentario..."
                  v-model="comment"
                ></textarea>
                <Button 
                text="Enviar" 
                :color="3"
                :disabled="false"
                @option-selected="sendComment"


                ></Button>
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
import Button from "@/components/common/Button.vue";
import {useInstitutionsByIDSectorStore} from "@/store/student/institutionsByIDSectorStore";
import {useCommentsByIDInternshipStore} from "@/store/student/commentsByIDInternshipStore";
export default {
  name: "PostulationStatusPage",
  components: {
    Button,
  },
  data() {
    return {
      postulationStatus: {
        status: "APROBADO", // APROBADO | EN ESPERA | RECHAZADO
      },
      idPostulation: null,
      postulation: null,
      isPostulationLoaded: false,
      institution: null,
      allDataIsLoaded: false,
      srcLogo: "",
      comments: [

      ],
      comment: "",
    };
  },
  methods: {
    async getPostulationStatus() {
      await useRequestsByIDStore().loadRequestById(this.idPostulation);
      this.postulation = useRequestsByIDStore().request;
      this.isPostulationLoaded = true;
    },
    async getInstitution() {
      await useInstitutionsByIDSectorStore().loadInstitutionById(
        this.postulation.convocatoria_id.institucion
      );
      this.institution = useInstitutionsByIDSectorStore().institution;
    },
    async getComments(){
      await useCommentsByIDInternshipStore().loadCommentsByIdInternship(this.postulation.convocatoria_id.id);
      this.comments = useCommentsByIDInternshipStore().comments;
    },
    async sendComment(value){
      useLoaderStore().activateLoader();
      try{
        const response = await useCommentsByIDInternshipStore().postComment(this.comment,this.postulation.id, this.postulation.convocatoria_id.id);
        if(response)
        {
          await this.getComments();
          this.comment = "";
        }
        
      }catch(error){
        console.log(error);
      } finally{
        useLoaderStore().desactivateLoader();
      }
    }

  },
  async mounted() {
    useLoaderStore().activateLoader();
    await this.getPostulationStatus();
    await this.getInstitution();
    await this.getComments();
    this.postulationStatus.status = this.postulation.estadopostulacion_id.nombreestadopostulacion;
    this.srcLogo = this.institution.logoinstitucion;
    this.allDataIsLoaded = true;
    useLoaderStore().desactivateLoader();
  },
  created() {
    this.idPostulation = this.$route.params.id;
  },
};
</script>

<style scoped>
.main-container {
  margin: 3% auto;
  width: 90%;
}

.company-logo {
  width: 100%;
}
.status-image {
  width: 25%;
}

.internship-container {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 41% 1fr;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 2px solid black;
}

.first-information-grid,
.second-information-grid,
.third-information-grid {
  border: 1px solid black;
}

.third-grid-container {
  grid-column: span 2;
  border-top: 2px solid black;
}

.internship-information-grid {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(3, 1fr);
  margin: 2% auto;
  width: 92%;
  border: 1px solid black;
}

.title-grid {
  background-color: rgb(223, 255, 255);
  border-bottom: 2px solid black;
}
.third-information-grif-comments{
  grid-column: span 3;
  border-top: 2px solid black;

}
.title-grid-comments {
  background-color: rgb(0, 169, 169);
  border-bottom: 2px solid black;
  grid-column: span 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.get-container-comments{
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0 auto;
  width: 90%;
}
.comment-student {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto 0 0;
  border: 1px solid rgb(230, 226, 226);
  padding: 2%;
  border-radius: 5px;
  text-align: start;
  /*Bordes como de globo*/
  border-radius: 10px;
  border-top-left-radius: 0;
  background-color: cadetblue;
  color: white;

}
.comment-company {
  border: 1px solid cadetblue;
  
  margin: 0 0 0 auto;
  padding: 2%;
  border-radius: 5px;
  text-align: end;
  /*Bordes como de globo*/
  border-radius: 10px;
  border-top-right-radius: 0;
  background-color: rgb(230, 226, 226);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: auto;


}
.comment-title {
  margin: 0%;
  margin-top: 2%;
  font-size: 1.2em;

}
.comment-information {
  margin: 0%;
  margin-bottom: 2%;
  font-size: 0.8em;
}
.comment-date {
  margin-top: 2%;
  font-size: 1em;
}
.comment-text {
  margin-top: 2%;
  font-size: 1em;

}


.submit-container-comments{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.second-grid-container {
  margin: auto;
}

.i_description {
  width: 80%;
  margin: 0 auto;
}
.institution_name {
  margin-top: 2%;
}
textarea {
  width: 100%;
  margin-bottom: 2%;
  border: 1px solid cadetblue;
  resize: none;
}
.title {
  margin: 0;
  padding: 5% 0;
}

.information-title {
  margin: 4% auto;
}

.status-text,
.i_details {
  width: 90%;
  margin: 5% auto;
}

.internship-details {
  text-align: start;
  list-style: none;
}

.i_download {
  margin: 7% auto 5%;
}

.status {
  margin: 0;
  padding: 5% 0;
  font-size: 3em;
}

.approved-status {
  color: limegreen;
}

.on-hold-status {
  color: gold;
}

.rejected-status {
  color: red;
}

.download-internship,
.submit-container {
  margin-bottom: 5%;
}

#userDescription {
  border: 1px solid cadetblue;
  margin-bottom: 4%;
  resize: none;
}

@media screen and (max-width: 768px) {
  .internship-container,
  .internship-information-grid {
    display: block;
  }

  .second-grid-container {
    margin: 3% auto 8%;
  }

  .i_description {
    margin-bottom: 7%;
  }

  .status {
    font-size: 2.2em;
  }
}

/* DARK THEME */
.dark-theme .internship-container {
  background-color: #353e48;
}

.dark-theme .internship-container {
  border: 2px solid white;
}

.dark-theme .third-grid-container {
  border-top: 2px solid white;
}

.dark-theme .internship-information-grid,
.dark-theme .first-information-grid,
.dark-theme .second-information-grid,
.dark-theme .third-information-grid {
  border: 1px solid white;
}

.dark-theme .title-grid {
  background-color: rgb(0, 169, 169);
  border-bottom: 2px solid white;
}
</style>
