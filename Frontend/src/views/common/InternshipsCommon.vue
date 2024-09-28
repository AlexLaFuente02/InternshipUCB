<template>
  <section class="details-container">
    <details open @click="toggleDetail(0)">
      <summary>Pasantías Disponibles <br />Internship by Cato</summary>
      <div class="conteiner">
        <div class="box1">
          <img src="https://derecho.udp.cl/wp-content/uploads/2019/07/IMG_6948-1024x683.jpg" alt="Carl Gustav Jung" />
       </div><div class="box1">
         <p> ¡Bienvenido a la sección de Pasantías en Internship by Cato! Aquí puedes
        explorar las pasantías disponibles en diversas empresas e instituciones
        sin necesidad de registrarte. Aunque para aplicar a estas pasantías
        deberás registrarte en nuestra plataforma, esta vista te permite obtener
        una vista previa de las oportunidades emocionantes que te esperan.</p>
      </div></div>
    </details>

    <details @click="toggleDetail(1)">
      <summary>Empresas Destacadas</summary>
      <div class="conteiner">
        <div class="box1">
          <img src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2023/09/INTI.jpg?resize=434%2C700&ssl=1" alt="Sigmund Freud" />
        </div><div class="box1">
       <p>Descubre algunas de las pasantías destacadas que están disponibles en
        Internship by Cato:</p>
      </div>
    </div>
    </details>

    <details @click="toggleDetail(2)">
      <summary>Explora Más</summary>
      <div class="conteiner">
        <div class="box1">
          <img src="https://tja.ucb.edu.bo/wp-content/uploads/2018/02/portada3-700x480.jpg" alt="Alfred Adler" />
        </div><div class="box1">
        <p> Si estás interesado en obtener más detalles sobre estas pasantías o
        aplicar a ellas, te invitamos a registrarte en Internship by Cato. La
        inscripción es rápida y sencilla, y te permitirá acceder a todas las
        funcionalidades de nuestra plataforma, incluyendo la aplicación a estas
        emocionantes oportunidades de pasantía.</p>
      </div>
    </div>
    </details>

    <details @click="toggleDetail(3)">
      <summary>Regístrate Ahora</summary>
      <div class="conteiner">
        <div class="box1">
        <img src="https://i0.wp.com/lpz.ucb.edu.bo/wp-content/uploads/2022/10/DSC_8443-copia.jpg?resize=700%2C467&ssl=1" alt="Alfred Adler" />
      </div><div class="box1">
        <p >  No te pierdas la oportunidad de dar el siguiente paso hacia tu futuro
        profesional. Regístrate en Internship by Cato y accede a todas las
        pasantías y oportunidades laborales que hemos preparado para ti.</p></div>
      </div>
    </details>
  </section>
</template>

<script>
export default {
  methods: {
    toggleDetail(index) {
      const details = this.$el.querySelectorAll('details');
      for (let i = 0; i < details.length; i++) {
        if (i !== index) {
          details[i].removeAttribute('open');
        }
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Karla|Space+Mono");

:root {
  --contentHeight: 10%;
  --sectionWidth: 700px;
}

* {
  outline: 0;
  box-sizing: border-box;
}
img{
  width: auto;
  height: 200px;
}
.box1,
  .box2,
  .box3 {
    padding: 5%;
    border: none;
    flex: 1;
    min-width: 300px; /* Ancho mínimo para evitar que se colapsen completamente */
  }
  /* Media query para responsividad */
  @media (max-width: 600px) {
    .profile {
      flex-direction: column;
    }
    .box1,
    .box2,
    .box3 {
    
      width: calc(100% - 20px);
    }
  }
.conteiner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Ajusta la altura según tus necesidades */
    left: 100px;
  }
body {
  background-color: #000;
}

section {
  max-width: var(--sectionWidth);
  margin: 40px auto;
  width: 97%;
}

summary {
  display: block;
  cursor: pointer;
  padding: 10px;
  font-size: 22px;
  transition: .3s;
  border-bottom: 2px solid;
  user-select: none;
}

details > div {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  height: 100%;
  user-select: none;
  padding: 0 20px;
  line-height: 1.5;
}

details > div > img {
  align-self: flex-start;
  max-width: 100%;
  margin-top: 20px;
}

details > div > p {
  flex: 1;
}

details[open] > summary {
   color: rgb(0, 191, 255);
}

@media (min-width: 768px) {
  details[open] > div > p {
    opacity: 0;
    animation-name: showContent;
    animation-duration: 0.6s;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
    margin: 0;
    padding-left: 20px;
  }

  details[open] > div {
    animation-name: slideDown;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  details[open] > div > img {
    opacity: 0;
    height: 100%;
    margin: 0;
    animation-name: showImage;
    animation-duration: 0.3s;
    animation-delay: 0.15s;
    animation-fill-mode: forwards;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    height: 0;
    padding: 0;
  }

  to {
    opacity: 1;
    height: var(--contentHeight);
    padding: 20px;
  }
}

@keyframes showImage {
  from {
    opacity: 0;
    clip-path: inset(50% 0 50% 0);
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
}

@keyframes showContent {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>