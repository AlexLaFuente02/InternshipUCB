<template>
  <div class="inicio">
    <div class="inicio2">
      <h1>
        <font-awesome-icon :icon="['fas', 'user-circle']" />
        ¡Bienvenido, {{ dataUser.nombres }}!
      </h1>
    </div>
    <div class="container">
      <div class="profile">
        <div class="personal-description box1">
          <!-- Título y botón para editar -->
          <div class="description-header">
            <h2>Acerca de mí</h2>
          </div>
          <!-- Texto de ejemplo -->
          <p>
            Soy {{ dataUser.nombres }} {{ dataUser.apellidopaterno }}, un  {{ dataUser.graduado? 'graduado': 'estudiante' }} de la Universidad Católica Boliviana "San Pablo".
            Mi número de carnet es {{ dataUser.carnetidentidad }} y
            puedes contactarme a través de mi correo electrónico {{ dataUser.correoelectronico }} o
            mi número de celular {{ dataUser.celularcontacto }}.
          </p>
        </div>
        <!-- Sección "Mi Perfil" -->
        <div class="social-media box2">
          <h2>Mi perfil</h2>
          <!-- Imagen de perfil -->
          <img
            src="https://t2.ea.ltmcdn.com/es/razas/2/3/5/pug-o-carlino_532_0_orig.jpg"
            alt="Mi Foto de Perfil"
            class="profile-picture"
          />
          
        </div>
        <div class="user-details box3">
          <!-- Detalles del usuario -->
          <h2>Datos del usuario</h2>
          <p>Nombre: {{ dataUser.nombres }}</p>
          <p>Apellido: {{ dataUser.apellidopaterno }}</p>
          <p>Carnet: {{ dataUser.carnetidentidad }}</p>
          <p>Celular: {{ dataUser.celularcontacto }}</p>
          <a  class="profile__button bn23" @click="openResume">
            <font-awesome-icon :icon="['fas', 'file-alt']" size="2xl" />
            <span class="see_vitae"> Hoja de vida </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoaderStore } from "@/store/common/loaderStore";
import { useUserByIdStore } from "@/store/common/dataUserStore";
export default {
  data() {
    return {
      dataUserStore: useUserByIdStore(),
      dataUser: {},
    };
  },
  methods: {
    async getUser() {
      await this.dataUserStore.getUserByIdUsuario($cookies.get("id"));
      this.dataUser = this.dataUserStore.user;
    },
    openResume(){
            const link = this.dataUser.linkcurriculumvitae;
            if(link == null || link == "")
                alert("No tienes una hoja de vida registrada, por favor registra una en la sección de editar perfil");
            else
                window.open(link, '_blank');
        }
  },
  async mounted() {
    useLoaderStore().activateLoader();
    await this.getUser();
    console.log(this.dataUser);
    useLoaderStore().desactivateLoader();
  },
  
};
</script>

<style scoped>
/*contendores para ordenas*/
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
  flex: 1; /* Permite que los contenedores ocupen el mismo ancho */
  border: 100px dotted #000; /* Ancho del borde de 2px, estilo punteado y color negro (#000) */
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

a {
  text-decoration: none;
}

.profile__button {
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
.dark-theme .profile__button.bn23 {
  background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

/**perfil */
.profile {
  background: linear-gradient(-45deg, #eb52ee, #b93ce7, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  border-radius: 10px; /* Añade bordes redondeados */
  display: flex;
  border: 2px dotted #000; /* Ancho del borde de 2px, estilo punteado y color negro (#000) */
  padding: 1rem;
  color: #000;
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
  align-items: center;
  flex-direction: column;
  padding: 2rem;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%; /* Ajusta la altura según tus necesidades */
}

.profile-picture {
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 10px;
  right: 10%;
  border-radius: 50%;
}

/** */
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
  /* Ancho mínimo para evitar que se colapsen completamente */
}

/* Media query para responsividad */
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

  .profile__button {
    margin: 0.2rem;
    padding: 0.5rem;
    font-size: 0.4rem;
  }
  .profile__button span {
    font-size: 0.6rem;
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

  .profile__button {
    margin: 0.2rem;
    padding: 0.5rem;
    font-size: 0.4rem;
  }
  .profile__button span {
    font-size: 0.6rem;
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
