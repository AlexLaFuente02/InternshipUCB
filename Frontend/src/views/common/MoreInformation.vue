<template>
    <div class="container">
   
      <div class="card" >
        <div class="image">
          <img src="https://www.la-razon.com/wp-content/uploads/2022/07/26/13/Campus-U.C.B..jpg" alt="Descripción de la imagen">
        </div>
        <div class="story">
          <h3>Más información sobre <br>Internship by Cato</h3>
          <p>¡Bienvenido a Internship by Cato, la Bolsa de Trabajo de la Universidad Católica Boliviana "San Pablo" - Sede La Paz! ¿Por qué elegirnos? Te lo explicamos a continuación.</p>
                    
        </div>
      </div>


      <div class="card" >
        <div class="image">
          <img src="https://www.ucb.edu.bo/wp-content/uploads/2022/05/graduacion.cbba_.jpg" alt="Descripción de la imagen">
        </div>
        <div class="story">
          <h3>Conexión y Oportunidades</h3>
          <p>En el mundo de las prácticas pre profesionales y pasantías no
curriculares, la conexión adecuada es esencial. En Internship by Cato,
te ofrecemos una plataforma que agiliza el proceso de publicación de
convocatorias, lo que signifca que puedes acceder a oportunidades
más rápido que nunca. Además, nuestras herramientas de orientación
personalizan las publicaciones para adaptarse a tus necesidades,
asegurando que encuentres las ofertas que te interesan.</p>
        </div>
      </div>

      <div class="card">
        <div class="image">
          <img src="https://www.noticiasfides.com/images/news/2021/01/c-ucb1-407738-27D1.jpg" alt="Descripción de la imagen">
        </div>
        <div class="story">
          <h3> Interacción Simplifcada</h3>
          <p>Nuestra aplicación se basa en cinco actividades clave: registro de
datos, registro de convocatorias, aprobación de convocatorias,
respuesta a convocatorias y generación de reportes. Estas actividades
interactúan en tres procesos fundamentales, cada uno con su
propósito y tiempo de acción defnidos.</p>
        </div>
      </div>

      <div class="card">
        <div class="image">
          <img src="https://lpz.ucb.edu.bo/wp-content/uploads/2023/07/ucb-inscripciones-6-estudiamos-webucb-1.jpg" alt="Descripción de la imagen">
        </div>
        <div class="story">
          <h3>Contacto y Soporte</h3>
          <p>Para cualquier consulta o asistencia, no dudes en ponerte en contacto con la Unidad de Servicios Estudiantiles Integrales (USEI). Aquí tienes sus datos de contacto:
Unidad de Servicios Estudiantiles Integrales
	Bloque N, Subsuelo – Lado Unidad de Recursos Humanos
	Teléfono: 2782222 Interno 2723
	Directo: 2692723
	Celular: 76521445
En Internship by Cato, estamos comprometidos con brindarte las herramientas necesarias para impulsar tu futuro profesional. Únete a nosotros y descubre un mundo de oportunidades. ¡Comienza ahora!</p>
      
        </div>
      </div>

    </div>
  </template>
  
  <script>
  export default {
    
    
  };
  </script>
  
  <style scoped>
/* Estilos para el diseño de tarjetas y diseño responsivo */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10%;
}

.card {
  width: 300px;
  margin: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  position: relative;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  transform: rotate(0deg) scale(1) translateY(10px);
  z-index: 1000;
}

.image img {
  width: 100%;
  height: auto;
}

.story {
  padding: 15px;
}

h3 {
  text-align: center;
}

p {
  text-align: justify;
}

/* Media Queries para diseño responsive */
@media (max-width: 768px) {
  .card {
    width: 100%; /* Ocupar todo el ancho en pantallas más pequeñas */
    margin: 20px 0;
  }
}
</style>