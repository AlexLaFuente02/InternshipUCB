<template>
  <div class="main-container">
    <h1>INFORMACIÓN - PASANTÍA</h1>
    <div class="internship-container">
      <div class="first-grid-container">
        <img
          src="https://www.cainco.org.bo/empresaydesarrollo/wp-content/uploads/2021/05/1550703145451.png"
          alt="Logo de la Empresa"
        />
      </div>
      <div class="second-grid-container">
        <div class="i_title">
          <h2>Desarrollo Web Backend con Spring en Jala Soft</h2>
        </div>
        <div class="i_description">
          <h4>Descripción de la Pasantía:</h4>
          <p>
            ¡Gracias por tu interés en la pasantía de desarrollo web backend con
            Spring en Jala Soft! Esta es una oportunidad emocionante para
            adentrarte en el mundo del desarrollo web y trabajar en proyectos
            significativos con un equipo experimentado.
          </p>
        </div>
        <div class="institution_name">
          <h4>Empresa:</h4>
          <p>JALA SOFT</p>
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
                  <li><strong>Empresa: </strong>Jala Soft</li>
                  <li><strong>Ubicación: </strong>Ubicación de la empresa</li>
                  <li><strong>Duración: </strong>Duración de la pasantía</li>
                  <li><strong>Fecha de Inicio: </strong>Fecha de inicio</li>
                  <li>
                    <strong>Fecha de Finalización: </strong>Fecha de
                    finalización
                  </li>
                  <li>
                    <strong>Tipo de Pasantía: </strong>Pasantía de Desarrollo
                    Web Backend
                  </li>
                  <li><strong>Tecnologías: </strong>Spring, Java, SQL, etc.</li>
                  <li><strong>Ciudad: </strong>Cochabamba</li>
                </ul>
              </div>
              <div class="download-internship">
                <p class="i_download"><strong>Descargar aplicativo:</strong></p>
                <Button text="Descargar" :color="0"></Button>
              </div>
            </div>
          </div>
          <div class="second-information-grid">
            <div class="title-grid">
              <h4 class="title">Requisitos</h4>
            </div>
            <div class="information-grid">
              <h4 class="information-title">Requisitos de Postulación:</h4>
              <div class="i_details">
                <ul class="internship-details">
                  <li>Conocimiento básico de programación en Java.</li>
                  <li>Interés en el desarrollo web backend.</li>
                  <li>Habilidades de comunicación y trabajo en equipo.</li>
                </ul>
              </div>
              <h4 class="information-title">Carreras a las que va dirigida:</h4>
              <div class="i_details">
                <ul class="internship-details">
                  <li>
                    Estudiantes de carreras relacionadas con la informática o
                    desarrollo de software.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";
export default {
  name: "InternshipInformationPage",
  components: {
    Button,
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
  grid-template-rows: auto auto;
  grid-template-columns: 41% 1fr;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border: 2px solid black;
}

.first-information-grid,
.second-information-grid {
  border: 1px solid black;
}

.third-grid-container {
  grid-column: span 2;
  border-top: 2px solid black;
}

.internship-information-grid {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(2, 1fr);
  margin: 2% auto;
  width: 92%;
  border: 1px solid black;
}

.title-grid {
  background-color: rgb(223, 255, 255);
  border-bottom: 2px solid black;
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

.title {
  margin: 0;
  padding: 2% 0;
}

.information-title {
  margin: 4% auto 0;
}

.i_details {
  width: 70%;
  margin: 4% auto;
}

.internship-details {
  text-align: start;
  list-style: none;
}

.i_download {
  margin: 5% auto 4%;
}

.download-internship {
  margin-bottom: 5%;
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

  .i_download {
    margin: 8% auto 5%;
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
.dark-theme .second-information-grid {
  border: 1px solid white;
}

.dark-theme .title-grid {
  background-color: rgb(0, 169, 169);
  border-bottom: 2px solid white;
}
</style>
