<template>
  <div class="inicio">
    <div v-if="institutionInformationIsLoaded">
      <div class="inicio2">
        <h1>
          <font-awesome-icon :icon="['fas', 'user-circle']" />
          PERFIL DE TU EMPRESA ¡{{ institutionInformation.nombreinstitucion }}!
        </h1>
      </div>
      <div class="container">
        <div class="profile">
          <div class="personal-description box1">
            <div class="description-header">
              <h2>ACERCA DE MI</h2>
            </div>
            <p>INFORMACI&Oacute;N SOBRE TU EMPRESA.</p>
            <ul class="company-details">
              <li>
                <strong>Nombre: </strong>
                {{ institutionInformation.nombreinstitucion }}
              </li>
              <li>
                <strong>Usuario: </strong>
                {{ institutionInformation.usuario.idusuario }}
              </li>
              <li>
                <strong>Pertenece al sector: </strong>
                {{
                  institutionInformation.sectorpertenencia
                    .nombresectorpertenencia
                }}
              </li>
              <li>
                <strong>Estado: </strong>{{ institutionInformation.estado }}
              </li>
            </ul>
          </div>
          <div class="social-media box2">
            <h2>Mi perfil</h2>
            <img
              :src="institutionInformation.logoinstitucion"
              alt="Foto de Perfil Institución"
              class="profile-picture"
            />
            <h5>{{ institutionInformation.reseniainstitucion }}</h5>
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
            <ul class="company-details">
              <li>
                <strong>Nombre del contacto: </strong>
                {{ institutionInformation.nombrecontacto }}
              </li>
              <li>
                <strong>Correo electr&oacute;nico: </strong>
                {{ institutionInformation.correocontacto }}
              </li>
              <li>
                <strong>N&uacute;mero de celular: </strong>
                {{ institutionInformation.celularcontacto }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLoaderStore } from "@/store/common/loaderStore";
import { InstitutionByIdStore } from "@/store/institution/InstitutionByIdStore";
export default {
  name: "InstitutionProfilePage",
  data() {
    return {
      institutionById: InstitutionByIdStore(),
      institutionInformationIsLoaded: false,
      institutionInformation: [],
    };
  },
  methods: {
    async getInstitutionData() {
      useLoaderStore().activateLoader();
      await this.institutionById.loadInstitutionById($cookies.get("institutionID"));
      this.institutionInformation = this.institutionById.institution.result;
      console.log(this.institutionInformation);
      this.institutionInformationIsLoaded = true;
      useLoaderStore().desactivateLoader();
    },
  },
  created() {
    this.getInstitutionData();
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

/**perfil */
.profile {
  background: linear-gradient(-45deg, #eb52ee, #b93ce7, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  border-radius: 10px; /* Añade bordes redondeados */
  display: flex;
  border: 2px dotted #000; /* Ancho del borde de 2px, estilo punteado y color negro (#000) */
  padding: 1rem;
  color: white;
}

.company-details {
  text-align: start;
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
  text-align: center;
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
</style>
