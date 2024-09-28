<template>
  <div class="main-container">
    <h1>BANDEJA DE SOLICITUDES</h1>
    <h5>
      Te mostramos los estudiantes/graduados que est&aacute;n solicitando tu
      pasant&iacute;a <br />
      "<i> Desarrollo Web Backend con Spring en Jala Soft </i>".
    </h5>
    <div class="students-container">
      <table class="studentsRequests-table" v-if="pendingPostulationsAreLoaded">
        <tr class="request-table-row">
          <th class="request-table-head">Nombre</th>
          <th class="request-table-head">Carrera</th>
          <th class="request-table-head">Curriculum Vitae</th>
          <th class="request-table-head">Carnet de Identidad</th>
          <th class="request-table-head">Correo electr&oacute;nico</th>
          <th class="request-table-head">Graduado</th>
          <th class="request-table-head">A&ntilde;o de graduaci&oacute;n</th>
          <th class="request-table-head">Sede</th>
          <th class="request-table-head">Acciones</th>
        </tr>
        <tr
          class="request-table-row"
          v-for="pendingPostulation in pendingPostulations"
          :key="pendingPostulation.id"
        >
          <td class="request-table-cell">
            {{
              pendingPostulation.estudiante_id.nombres +
              " " +
              pendingPostulation.estudiante_id.apellidopaterno +
              " " +
              pendingPostulation.estudiante_id.apellidomaterno
            }}
          </td>
          <td class="request-table-cell">
            {{
              pendingPostulation.estudiante_id.carrera_id
                .nombreestadopostulacion
            }}
          </td>
          <td class="request-table-cell">
            <a :href="pendingPostulation.estudiante_id.linkcurriculumvitae">
              {{ pendingPostulation.estudiante_id.linkcurriculumvitae }}
            </a>
          </td>
          <td class="request-table-cell">
            {{ pendingPostulation.estudiante_id.carnetidentidad }}
          </td>
          <td class="request-table-cell">
            {{ pendingPostulation.estudiante_id.correoelectronico }}
          </td>
          <td class="request-table-cell">
            {{ isTheStudentGraduated(pendingPostulation) }}
          </td>
          <td
            class="request-table-cell"
            v-if="pendingPostulation.estudiante_id.graduado"
          >
            {{ pendingPostulation.estudiante_id.aniograduacion }}
          </td>
          <td class="request-table-cell">
            {{
              pendingPostulation.estudiante_id.sede_id.nombreestadopostulacion
            }}
          </td>
          <td class="request-table-cell">
            <div class="postulation-buttons">
              <div class="student-profile-button">
                <Button
                  text="Ver perfil"
                  :color="3"
                  @option-selected="
                    goToApplicationStudentProfile(
                      pendingPostulation.estudiante_id.id
                    )
                  "
                ></Button>
              </div>
              <button
                type="button"
                class="accept-postulation-request"
                @click="handleAcceptPostulation(pendingPostulation)"
              ></button>
              <button
                type="button"
                class="reject-postulation-request"
                @click="handleRejectPostulation(pendingPostulation)"
              ></button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="comments-container">
      <h2>Comentarios</h2>
      <section class="comment">
        <div class="user-information">
          <div class="comment-icon">
            <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" />
          </div>
          <div class="student-information">
            <div class="student-name">
              <h4>Oscar Menacho Silva</h4>
            </div>
            <div class="student-details">
              <p><i>12345678</i></p>
              <p><i>LA PAZ</i></p>
              <p><i>INGENIERÍA DE SISTEMAS</i></p>
            </div>
          </div>
        </div>
        <div class="comment-container">
          <p>
            La pasantía fue muy interesante, provechosa y me abrirá muchas
            puertas con la experiencia que adquirí. ¡Muchas gracias! Lorem Ipsum
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </p>
        </div>
      </section>
      <section class="comment">
  <div class="user-information">
    <div class="comment-icon">
      <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" />
    </div>
    <div class="student-information">
      <div class="student-name">
        <h4>Maria González</h4>
      </div>
      <div class="student-details">
        <p><i>87654321</i></p>
        <p><i>COCHABAMBA</i></p>
        <p><i>ADMINISTRACIÓN DE EMPRESAS</i></p>
      </div>
    </div>
  </div>
  <div class="comment-container">
    <p>
      La pasantía superó mis expectativas. Aprendí mucho y me ayudó a aplicar mis conocimientos en un entorno profesional. ¡Gracias por la oportunidad!
    </p>
  </div>
</section>
<section class="comment">
  <div class="user-information">
    <div class="comment-icon">
      <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" />
    </div>
    <div class="student-information">
      <div class="student-name">
        <h4>Juan Pérez</h4>
      </div>
      <div class="student-details">
        <p><i>98765432</i></p>
        <p><i>SANTA CRUZ</i></p>
        <p><i>MARKETING</i></p>
      </div>
    </div>
  </div>
  <div class="comment-container">
    <p>
      Mi experiencia en la pasantía fue enriquecedora. Agradezco la oportunidad de aplicar mis conocimientos teóricos en situaciones prácticas.
    </p>
  </div>
</section>
<section class="comment">
  <div class="user-information">
    <div class="comment-icon">
      <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" />
    </div>
    <div class="student-information">
      <div class="student-name">
        <h4>Laura Torres</h4>
      </div>
      <div class="student-details">
        <p><i>65432198</i></p>
        <p><i>TARIJA</i></p>
        <p><i>DERECHO</i></p>
      </div>
    </div>
  </div>
  <div class="comment-container">
    <p>
      La pasantía me permitió adquirir nuevas habilidades y conocer de cerca el funcionamiento del área legal. ¡Una experiencia inolvidable!
    </p>
  </div>
</section>
<section class="comment">
  <div class="user-information">
    <div class="comment-icon">
      <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" />
    </div>
    <div class="student-information">
      <div class="student-name">
        <h4>Ricardo Mendoza</h4>
      </div>
      <div class="student-details">
        <p><i>76543210</i></p>
        <p><i>POTOSÍ</i></p>
        <p><i>INGENIERÍA CIVIL</i></p>
      </div>
    </div>
  </div>
  <div class="comment-container">
    <p>
      Agradezco la oportunidad de participar en la pasantía. Contribuyó significativamente a mi formación profesional. ¡Gracias por la experiencia!
    </p>
  </div>
</section>
      <section class="comment">
        <div class="institution-information">
          <div class="comment-image">
            <img
              src="https://scontent.flpb3-1.fna.fbcdn.net/v/t39.30808-6/326368094_757490342424242_7018585822248141862_n.png?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=WfdIui_eHdEAX9zQT4r&_nc_ht=scontent.flpb3-1.fna&oh=00_AfDM_JVOy-AF5Vu_ARORTUJC6wAM9ywFDS2EdGAOzlRL1A&oe=65742FF4"
              alt="Logo de la Empresa"
            />
          </div>
          <div class="institution">
            <h4>Tú - Mojix</h4>
          </div>
        </div>
        <div class="institution-comment-container">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </section>
      <section class="comment" v-for="comment in comments" :key="comment.id">
        <div class="user-information">
          <div class="comment-icon">
            <font-awesome-icon :icon="['fas', 'user-circle']" size="3x" />
          </div>
          <div class="student-information">
            <div class="student-name">
              <h4> {{ comment.postulacion.estudiante.nombres }}  {{ comment.postulacion.estudiante.apellidopaterno }}  {{ comment.postulacion.estudiante.apellidomaterno }}
                </h4>
            </div>
            <div class="student-details">
              <p><i>{{ comment.fecha }}</i></p>
              <p><i>{{ comment.postulacion.estudiante.correoelectronico }}</i></p>
              <p><i>{{ comment.postulacion.estudiante.celularcontacto }}</i></p>
            </div>
          </div>
        </div>
        <div class="comment-container">
          <p>{{ comment.comentario }}
          </p>
        </div>
      </section>
      <div class="comment-textarea-container">
        <label for="InternshipCommentField">Ingresa tu comentario:</label>
        <textarea
          name="InternshipCommentField"
          id="InternshipCommentField"
          cols="100"
          rows="5"
          placeholder="Tu Comentario..."
        ></textarea>
      </div>
      <div class="postComment-button-container">
        <Button
          text="Publicar Comentario"
          :color="0"
          :disabled="false"

          @option-selected="sendComment"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import {useLoaderStore} from "@/store/common/loaderStore";

import Button from "@/components/common/Button.vue";
import { pendingPostulationsByInternshipIdStore } from "../../store/institution/PendingPostulationsByInternshipIdStore";
import { acceptOrRejectStudentPostulationStore } from "../../store/institution/AcceptOrRejectStudentPostulationStore";
import{ useCommentsByIDInternshipStoreinstitucion} from "@/store/institution/institutionComentario";
export default {
  name: "InstitutionInternshipApplicationTrayPage",
  components: {
    Button,
  },
  data() {
    return {
      pendingPostulationsByInternshipIdStore: pendingPostulationsByInternshipIdStore(),
      pendingPostulationsAreLoaded: false,
      pendingPostulations: [],
      acceptOrRejectStudentPostulationStore: acceptOrRejectStudentPostulationStore(),
      acceptedOrRejectedPostulationIsReady: false,
      postulationResult: [],
      //*jijiji
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
    async getPendingPostulationsByInternshipId(internshipID) {
      await this.pendingPostulationsByInternshipIdStore.loadPendingPostulationsByInternshipId(internshipID);
      this.pendingPostulations = this.pendingPostulationsByInternshipIdStore.pendingPostulations.result;
      this.pendingPostulationsAreLoaded = true;
      console.log(this.pendingPostulations);
    },
    isTheStudentGraduated(postulation) {
      if (postulation.estudiante_id.graduado) {
        return "✅";
      } else {
        return "❌";
      }
    },
    goToApplicationStudentProfile(student_id) {
      console.log(
        `Redirigiendo al Perfil del Estudiante con ID: ${student_id}`
      );
      this.$router.push(
        `/institution/InternshipApplicationTray/StudentProfile/${student_id}`
      );
    },
    async handleAcceptPostulation(postulation) {
      const sweetAlert = this.$swal.mixin({
        customClass: {
          confirmButton: "accept-confirm-button",
          cancelButton: "accept-cancel-button",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      sweetAlert
        .fire({
          title: "¿Está seguro?",
          text: "Esta acción aceptará la postulación y no podrá ser revertida.",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, aceptar",
          cancelButtonText: "No, cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            console.log(
              `Aceptando a ${
                postulation.estudiante_id.nombres +
                " " +
                postulation.estudiante_id.apellidopaterno +
                " " +
                postulation.estudiante_id.apellidomaterno
              } con postulación ID: ${postulation.id}`
            );
            await this.acceptOrRejectStudentPostulationStore.acceptPostulation(postulation.id);
            this.postulationResult = this.acceptOrRejectStudentPostulationStore.updatedPostulation;
            this.acceptedOrRejectedPostulationIsReady = true;
            console.log(this.postulationResult);
            await sweetAlert.fire(
              "Aceptado",
              `La postulación de ${postulation.estudiante_id.nombres} ha sido aceptada.`,
              "success"
            );
            location.reload();
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            sweetAlert.fire(
              "Cancelado",
              "La acción ha sido cancelada.",
              "error"
            );
          }
        });
    },
    async handleRejectPostulation(postulation) {
      const sweetAlert = this.$swal.mixin({
        customClass: {
          confirmButton: "reject-confirm-button",
          cancelButton: "reject-cancel-button",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      sweetAlert
        .fire({
          title: "¿Está seguro?",
          text: "Esta acción rechazará la postulación y no podrá ser revertida.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, rechazar",
          cancelButtonText: "No, cancelar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            console.log(
              `Rechazando a ${
                postulation.estudiante_id.nombres +
                " " +
                postulation.estudiante_id.apellidopaterno +
                " " +
                postulation.estudiante_id.apellidomaterno
              } con postulación ID: ${postulation.id}`
            );
            await this.acceptOrRejectStudentPostulationStore.rejectPostulation(postulation.id);
            this.postulationResult = this.acceptOrRejectStudentPostulationStore.updatedPostulation;
            this.acceptedOrRejectedPostulationIsReady = true;
            console.log(this.postulationResult);
            await sweetAlert.fire(
              "Rechazado",
              `La postulación de ${postulation.estudiante_id.nombres} ha sido rechazada.`,
              "success"
            );
            location.reload();
          } else if (result.dismiss === this.$swal.DismissReason.cancel) {
            sweetAlert.fire(
              "Cancelado",
              "La acción ha sido cancelada.",
              "error"
            );
          }
        });
    },
    async getComments(){
      await useCommentsByIDInternshipStoreinstitucion().loadCommentsByIdInternshipInstitution(this.postulation.convocatoria_id.id);
      this.comments = useCommentsByIDInternshipStoreinstitucion().comments;
    },
    async sendComment(value){
      useLoaderStore().activateLoader();
      try{
        const response = await useCommentsByIDInternshipStoreinstitucion().createcomentarioConvocatoria(this.comment,this.postulation.id, this.postulation.convocatoria_id.id);
        if(response)
        {
          await this.getComments();
          this.comment = "";
        }
      }catch(error){
        console.log(error);
      } finally{
        }
        useLoaderStore().desactivateLoader();
    }
  },
  async mounted() {
    useLoaderStore().activateLoader();

    //await this.getComments();
    
    
    this.getPendingPostulationsByInternshipId(this.$route.params.internshipId);
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
  text-align: center;
}

.students-container {
  background-color: rgb(255, 255, 255);
  border: 2px solid black;
  overflow-x: auto;
}

.studentsRequests-table {
  margin: 2% auto;
  border-collapse: collapse;
  width: 95%;
}

.request-table-head,
.request-table-cell {
  padding: 10px;
}

.student-profile-button {
  width: 40%;
}

tr:nth-child(even) {
  background-color: #e8e8e8;
}

tr:first-child {
  border-bottom: 2px solid black;
}

.postulation-buttons {
  display: flex;
  justify-content: space-between;
}

.accept-postulation-request {
  background-image: url("../../components//images/approved.png");
}

.reject-postulation-request {
  background-image: url("../../components//images/rejected.png");
}

.accept-postulation-request,
.reject-postulation-request {
  width: 18%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: transparent;
  cursor: pointer;
  margin: 0;
  border: none;
}

.accept-postulation-request:hover,
.reject-postulation-request:hover {
  transform: scale(1.2);
}

.comments-container {
  background-color: rgb(253, 255, 245);
  border: 2px solid rgb(168, 168, 235);
  border-radius: 50px;
  margin: 5% auto 0;
  width: 90%;
  padding: 2% 0;
}

.comment {
  background-color: white;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0 auto 2%;
  padding: 2% 0;
  width: 80%;
}

.user-information {
  display: flex;
  align-items: center;
}

.comment-icon,
.comment-image {
  margin: auto 2%;
}

.comment-image {
  width: 6%;
}

img {
  width: 100%;
}

.student-information {
  display: block;
  width: 38%;
}

.institution-information {
  display: flex;
  align-items: center;
}

.student-name {
  display: flex;
}

.student-details {
  display: flex;
  justify-content: space-between;
  margin: 2% auto auto;
}

.comment-container,
.institution-comment-container {
  width: 85%;
  text-align: start;
}

.comment-container {
  margin: 2% auto 0;
}

.institution-comment-container {
  margin: 1% auto 0;
}

h4,
p {
  margin: 0;
}

#InternshipCommentField {
  resize: none;
}

.postComment-button-container {
  width: 30%;
  margin: 1.5% auto 0;
}

/* DARK THEME */
.dark-theme .students-container {
  background-color: #353e48;
  border: 2px solid white;
}

.dark-theme tr:nth-child(even) {
  background-color: #4c5865;
}

.dark-theme tr:first-child {
  border-bottom: 2px solid white;
}

.dark-theme a {
  color: aqua;
}

.dark-theme .comments-container {
  background-color: #353e48;
}

.dark-theme .comment {
  background-color: #4c5865;
}

.dark-theme textarea {
  border: 1px solid rgb(103, 176, 153);
}

/* MEDIA QUERIES */
@media screen and (max-width: 880px) {
  .studentsRequests-table {
    margin: 3%;
  }

  .comment-image {
    width: 30%;
  }

  .comment {
    width: 90%;
    margin-bottom: 5%;
  }

  .comments-container {
    margin-top: 10%;
  }

  .comment-container,
  .institution-comment-container {
    margin-bottom: 4%;
  }

  .student-information,
  .institution-information {
    width: 100%;
  }

  .institution-information {
    justify-content: center;
  }

  .user-information,
  .institution-information {
    margin: 5% auto 8%;
  }

  .student-name,
  .student-details {
    display: block;
  }

  textarea {
    width: 90%;
  }
}
</style>
