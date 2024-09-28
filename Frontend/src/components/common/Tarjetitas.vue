<template>
    <div class="company-card">
      <img src="https://cdn-icons-png.flaticon.com/512/1465/1465439.png" alt="Company Logo" class="company-logo" />
      <h2 class="company-name">{{ name }}</h2>
      <p class="company-description"><strong>Area: </strong>{{ description }}</p>
      <p class="company-description"><strong>Duracion: </strong>{{ a }}</p>
      <p class="company-description"><strong>Fecha de solicitud: </strong>{{ b }}</p>
      <p class="company-description"><strong>Fecha limite: </strong>{{ c }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
     
      description: {
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
    },
  };
  </script>
  
  <style scoped>
  .company-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgb(187, 217, 68);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin: 1.5rem;
    width: 250px;
    height: 380px;
    color: #000000;
    transition: all 0.3s ease-in-out;
  }
  .dark-theme .company-card {
    background: rgb(26, 127, 152);
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
        background: rgb(26, 127, 152);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        scale: 1.1;
        
    color: #ffffff;
    }
    .dark-theme .company-card:hover {
        background: rgb(192, 199, 65);
        color: #000000;
    }


/*Media queries*/
@media screen and (max-width: 380px){
    .company-card {
        width: 160px;
        height: 250px;
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