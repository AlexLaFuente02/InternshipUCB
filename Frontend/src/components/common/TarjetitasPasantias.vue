<template>
    <div class="company-card">
      <img src="https://cdn-icons-png.flaticon.com/512/9715/9715942.png" alt="Company Logo" class="company-logo" />
      <h2 class="company-name">{{ name }}</h2>
      <p class="company-description"><strong>Pertenece al sector:  </strong><br>{{ a }}</p>
      <p class="company-description"><strong>Nombre del Contacto:  </strong><br>{{ b }}</p>
      <p class="company-description"><strong>Correo electr&oacute;nico:  </strong><br>{{ c }}</p>
      <p class="company-description"><strong>N&uacute;mero de celular:  </strong><br>{{ d }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      a: {
        type: String,
        required: true,
      },
      b: {
        type: String,
        required: true,
      },
      c: {
        type: String,
        required: true,
      },
      d: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .company-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(23, 174, 166);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin: 1.5rem;
    width: 250px;
    height: 450px;
    color: #ffffff;
    transition: all 0.2s ease-in-out;

  }
  .dark-theme .company-card {
    background: rgb(141, 104, 166);
    color: #ffffff;
  }
  
  .company-logo {
    width: 100px; /* Adjust the size as needed */
    height: 100px; /* Adjust the size as needed */
    object-fit: contain;
  }
  
  .company-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .company-description {
    text-align: center;
  }
/*Estilos hover*/
    .company-card:hover {
        background: rgb(255, 236, 26);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        scale: 1.1;
        color: #000000;
    }
    .dark-theme .company-card:hover {
        background: rgb(59, 187, 168);
    }


/*Media queries*/
@media screen and (max-width: 380px){
    .company-card {
        width: 160px;
        height: 270px;
        
    }
    .company-logo {
        width: 50px;
        height: 50px;
    }
    .company-name {
        font-size: 0.6rem;
    }
    .company-description {
        font-size: 0.5rem;
    }

}
/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  .company-card {
        margin-top: 10%;
        margin-bottom: 12%;
    }
}

/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}



  </style>