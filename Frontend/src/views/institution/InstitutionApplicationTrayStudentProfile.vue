<template>
  <div class="inicio">
    <div class="inicio2">
      <h1>
        <font-awesome-icon :icon="['fas', 'user-circle']" />
        Perfil del estudiante
        {{ studentInformation.nombres + " " + studentInformation.apellidopaterno + " " + studentInformation.apellidomaterno }}
      </h1>
    </div>
    <div class="container">
      <div class="profile" v-if="studentInformationIsLoaded">
        <div class="personal-description box1">
          <div class="description-header">
            <h2>ACERCA DE MI</h2>
          </div>
          <div class="student-information">
            <ul class="student-list">
              <li><strong>Nombre:</strong> {{ studentInformation.nombres }}</li>
              <li>
                <strong>Apellido:</strong> {{ studentInformation.apellidopaterno + " " + studentInformation.apellidomaterno }}
              </li>
              <li>
                <strong>Carnet de Identidad:</strong>
                {{ studentInformation.carnetidentidad }}
              </li>
              <li>
                <strong>Sede:</strong>
                {{ studentInformation.sede_id.nombresede }}
              </li>
              <li>
                <strong>Carrera:</strong>
                {{ studentInformation.carrera_id.nombrecarrera }}
              </li>
              <li>
                <strong>Graduado:</strong>
                {{ isTheStudentGraduated(studentInformation) }}
              </li>
              <li v-if="studentInformation.graduado">
                <strong> Año de graduaci&oacute;n: </strong>
                {{ studentInformation.aniograduacion }}
              </li>
            </ul>
          </div>
        </div>
        <div class="social-media box2">
          <h2>Mi perfil</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3175/3175575.png"
            alt="Foto de Perfil de estudiante"
            class="profile-picture"
          />
          <div class="links__pack">
            <a
              class="link"
              style="background-color: #3b5998"
              href="https://www.facebook.com/usei.lpz"
              role="button"
              ><font-awesome-icon :icon="['fab', 'facebook']"
            /></a>
            <a
              class="link"
              style="background-color: #55acee"
              href="https://twitter.com/UCBLaPaz"
              role="button"
              ><font-awesome-icon :icon="['fab', 'twitter']"
            /></a>
            <a
              class="link"
              style="background-color: #ac2bac"
              href="https://www.instagram.com/usei.lapaz/?fbclid=IwAR07aYlD7DflEtSJDuW6ERzw_r7DjawQAQVxbXcShM4RmZjLHQAUPensFyc"
              role="button"
              ><font-awesome-icon :icon="['fab', 'instagram']"
            /></a>
            <a
              class="link"
              style="background-color: #0082ca"
              href="https://www.linkedin.com/in/usei-la-paz-080327253/?originalSubdomain=bo"
              role="button"
              ><font-awesome-icon :icon="['fab', 'linkedin']"
            /></a>
          </div>
        </div>
        <div class="user-details box3">
          <h2>CONTACTO</h2>
          <div class="student-information">
            <ul class="student-list">
              <li>
                <strong>Celular:</strong>
                {{ studentInformation.celularcontacto }}
              </li>
              <li>
                <strong>Correo electr&oacute;nico:</strong>
                {{ studentInformation.correoelectronico }}
              </li>
            </ul>
            <a
              :href="studentInformation.linkcurriculumvitae"
              class="profile__button bn23"
            >
              <font-awesome-icon :icon="['fas', 'file-alt']" size="2xl" />
              <span class="see_vitae"> Hoja de vida </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoaderStore } from "@/store/common/loaderStore";
import { studentByIdInApplicationTrayStore } from "../../store/institution/StudentByIdInApplicationTrayStore";
export default {
  data() {
    return {
      studentByIdInApplicationTrayStore: studentByIdInApplicationTrayStore(),
      studentInformationIsLoaded: false,
      studentInformation: {},
    };
  },
  methods: {
    async getStudentInformation(studentID) {
      useLoaderStore().activateLoader();
      await this.studentByIdInApplicationTrayStore.loadStudentByIdInApplicationTray(studentID);
      this.studentInformation = this.studentByIdInApplicationTrayStore.student.result;
      this.studentInformationIsLoaded = true;
      console.log(this.studentInformation);
      useLoaderStore().desactivateLoader();
    },
    isTheStudentGraduated(student) {
      if (student.graduado) {
        return "✅";
      } else {
        return "❌";
      }
    },
  },
  mounted() {
    this.getStudentInformation(this.$route.params.studentId);
  },
};
</script>

<style scoped>
.personal-description,
.social-media,
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.links__pack {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 3% auto;
}

.link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease 0s;
}
.link:hover {
  transform: scale(1.1);
}
.link svg {
  width: 20px;
  height: 20px;
  color: #fff;
}

.student-list {
  list-style: none;
  text-align: start;
  margin-bottom: 15%;
}

.student-information {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
}

.profile__button {
  padding: 0.9rem;
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

.profile__button:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.profile__button:focus {
  outline: none;
}

.profile__button.bn23 {
  background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

/**perfil */
.profile {
  background: linear-gradient(-45deg, #eb52ee, #b93ce7, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  border-radius: 10px;
  display: flex;
  border: 2px dotted #000;
  padding: 1rem;
  color: white;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/**contenedor inicial */
.inicio {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
}

.profile-picture {
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 10px;
  right: 10%;
  border-radius: 50%;
}

.description-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

/* Estilos para los contenedores */
.profile {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  background-color: aqua;
}

.box1,
.box2,
.box3 {
  padding: 1rem;
  border: 1px solid #ccc;
  flex: 1;
}

/* Media query */
@media (max-width: 600px) {
  .profile {
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
  }
  .box1,
  .box2,
  .box3 {
    padding: 0.5rem;
  }
}

.footer__links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15%;
}
@media (max-width: 768px) {
  footer {
    flex-direction: column-reverse;
  }
  .footer__links {
    margin-top: 1rem;
  }
  img {
    width: 200px;
    height: auto;
  }
}
@media (max-width: 576px) {
  .footer__links {
    margin-top: 0.5rem;
  }
}
/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños (teléfonos) */
  .inicio {
    padding: 0.5rem;
  }
}

/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
  .inicio {
    padding: 1rem;
  }
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
  .inicio {
    padding: 1.5rem;
  }
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}

@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  .student__principalPage {
    padding: 0.5rem;
  }
  .profile__content__header {
    flex-direction: column;
  }
  .content__welcome {
    width: 100%;
    margin-bottom: 0.3rem;
  }
  .content__more {
    width: 100%;
  }

  .summary__content {
    flex-wrap: wrap;
  }
  .summary__title {
    font-size: 1rem;
    font-weight: 700;
  }
  .summary__content__number {
    font-size: 1.2rem;
  }
  .summary__content__text {
    font-size: 0.6rem;
  }
  .career__student {
    font-size: 0.5rem;
    font-weight: 400;
  }
}
</style>
