<template>
    <div class="company-card">
      <img :src="logoSrc" alt="Company Logo" class="company-logo" />
      <h2 class="company-name">{{ name }}</h2>
      <p class="company-description">{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      logoSrc: {
        type: String,
        required: true,
      },
      description: {
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
    background: #460977;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin: 0.5rem;
    width: 250px;
    height: 400px;
    color: #fff;
    transition: all 0.3s ease-in-out;
  }
  .dark-theme .company-card {
    background: #310556;
  }
  
  .company-logo {
    width: 100px; /* Adjust the size as needed */
    height: 100px; /* Adjust the size as needed */
    object-fit: contain;
    margin-bottom: 1rem;
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
        background: #310556;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        scale: 1.1;
    }
    .dark-theme .company-card:hover {
        background: #460977;
    }


/*Media queries*/
@media screen and (max-width: 300px){
    .company-card {
        width: 160px;
        height: 300px;
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