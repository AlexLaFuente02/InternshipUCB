<template>
  <div class="container">
    <div class="informacionInternship">
      <h1>Más información sobre <br />Internship by Cato</h1>
      <p>
        ¡Bienvenido a la sección de Instituciones en Internship by Cato! Aquí
        puedes explorar las empresas e instituciones que confían en nuestra
        plataforma para publicar oportunidades laborales y pasantías. Aunque
        esta vista está disponible para personas no registradas, ten en cuenta
        que para acceder a detalles completos y aplicar a las convocatorias, te
        recomendamos registrarte en nuestra plataforma.
      </p>
      <br />
    </div>
    <div class="informacionInternship">
      <h1>Empresas Destacadas</h1>
      <p>
        En Internship by Cato, colaboramos con una amplia gama de empresas de
        diversos sectores. A continuación, te presentamos algunas de las
        empresas destacadas que confían en nosotros para encontrar talento:
      </p>
      <div class="EmpresasDestacadas">
        <div class="company-cards-container">
          <!-- Card Component -->
        <CompanyCard 
        name="YPFB" 
        logoSrc="https://cdnimg.bnamericas.com/ZtQPjhTMJOHBSYHMhkDxwkavMSjolbsSvouWSdHvDobuPEcIOywZPBhuceAkhPhg.jpg" 
        description="YPFB es una empresa estatal de hidrocarburos de Bolivia. Es una de las empresas más grandes de Bolivia y es responsable de la exploración, explotación, refinación, transporte y comercialización de hidrocarburos en el país."
        />
        <CompanyCard 
        name="Banco Mercantil Santa Cruz"
        logoSrc="https://play-lh.googleusercontent.com/xmVUpHMpkci0tY46MtQkyfpz-HTnYp8E8SSjLulr5t97wI7Q-7RBpa46mWr_Zw4VNtrz" 
        description="Banco Mercantil Santa Cruz es una empresa financiera boliviana fundada en 1982. Es el banco más grande de Bolivia en términos de activos y patrimonio."
        />
        <CompanyCard
        name="Banco Nacional de Bolivia"
        logoSrc="https://debolivia.site/wp-content/uploads/classified-listing/2021/06/bnb-bolivia-2021-841x493.jpg"
        description="Banco Nacional de Bolivia es una empresa financiera boliviana fundada en 1871. Es el banco más antiguo de Bolivia y es el segundo banco más grande del país en términos de activos y patrimonio."
        />
        <CompanyCard
        name="Banco BISA"
        logoSrc="data:image/jpeg;base64,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"
        description="Banco BISA es una empresa financiera boliviana fundada en 1963. Es el tercer banco más grande de Bolivia en términos de activos y patrimonio."
        />
        <CompanyCard
        name="Banco Ganadero"
        logoSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABvFBMVEUCTAH///8ATQEATwAAAAADSwH//f8AUQAAPAABTAMAQAADSgMARwAANQAANwD8//8AQwAALQAAJgAAOgD2//8AEwAAMAAALAAAGwD/+f8AGAAAEQAAIQAAxAAAIwAAyADu//8GvwAACwAAHgAASRUASwrj//+AdXZOT0oMzwsADQAPRgYFdwgEbwQIig8PsQwGlw0CXAEZihghligWrxUF1wgiZThQk21OkXQ+hWMvcUxBhGs3cVIAUREmcElGhnI0fVVsmYESVyhvooNelnFbjnNOfmEfVzAoZUgLWiksXk0IXDUfWT0ETzAta0EJZgN1lYXC6de828qi1ril1MHL++LS5t3Y9usvWzWs4M1lhm7V//xJblR0qYCM0b7K+u7j29+4rq/Fy8zj1t2woqeIrp53fW9TZFeWoY7n6OTWxs735vASoBNjZmOorKG2wbcFRhyimpSHo58rHyM6Nzg2QTofSTCIh4Gev5/G6OEhJBdTRERKdGDb39CMkYVmpXJuuaKswa4AMRx5c2l9cntca2C11dEdeUWUxrq1wcSj6tBFkWRrhn5/yapUXFducXPAq7M5XFckNSBINzKy34P0AAAMeklEQVR4nO2Y+19TRxbAM3Nz388kN08IuQFuIEYMWBSw4AoI+GoxmPWKLwgFlZRnVwV160qpFreWdt1/eM/cm/BQ20/3s/2hn/2cr49MJnNn5jxnzg2FEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBECTEf9T4/0GVOY6jJZWqiiarvCrL/8ts1OeP2tsfgwy7Cqkcb4kne2IqpdwnxnA+v2u6P518sKUQz6tuTDyVL2ZPcVZJFT8x5k9omd8P5VVVFcu5XD6fzZV7FLfEfxSLss+nYpU16Ycdod8Rzg198YyDRz9+ig/GHPzffOS/SRcUhouxnnIum83ls9leUfp4jKYyji58dL3m5vxN8zL0BDIf7vz4nn13ONAEf+Ab9NckPLJQs3Fs9UNZPulonGZZfac/E3tzWbBiNt/fo3y0kBaTAEVRgglkHpoWa1NoKEwgaimWv6TFBvK+tFRToG3xR1elVLPgWa25FU3TLL7R0PyRvKb5H0FP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"
        description="Banco Ganadero es una empresa financiera boliviana fundada en 1994. Es el cuarto banco más grande de Bolivia en términos de activos y patrimonio."
        />
        <CompanyCard
        name="Entel"
        logoSrc="https://micuenta.entel.bo/ui/mc_imgs/gui/ico_entel.png"
        description="Entel es una empresa estatal de telecomunicaciones de Bolivia fundada en 1965. Es la empresa de telecomunicaciones más grande de Bolivia y es responsable de la provisión de servicios de telefonía móvil, telefonía fija, internet y televisión por cable en el país."
        />
        <CompanyCard
        name="Tigo"
        logoSrc="https://www.tigo.com.bo/assets/square-tigo.png"
        description="Tigo es una empresa de telecomunicaciones de Bolivia fundada en 1991. Es la segunda empresa de telecomunicaciones más grande de Bolivia y es responsable de la provisión de servicios de telefonía móvil, telefonía fija, internet y televisión por cable en el país."
        />
        <CompanyCard
        name="Viva"
        logoSrc="https://upload.wikimedia.org/wikipedia/commons/b/ba/VIVA2020.png"
        description="Viva es una empresa de telecomunicaciones de Bolivia fundada en 2013. Es la tercera empresa de telecomunicaciones más grande de Bolivia y es responsable de la provisión de servicios de telefonía móvil, telefonía fija, internet y televisión por cable en el país."
        />
        <CompanyCard
        name="Coca-Cola"
        logoSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Coca-Cola_bottle_cap.svg/800px-Coca-Cola_bottle_cap.svg.png"
        description="Coca-Cola es una empresa multinacional de bebidas fundada en 1892. Es la empresa de bebidas más grande del mundo y es responsable de la producción y distribución de bebidas en más de 200 países."
        />
        <!-- Add more companies as needed -->
        </div>
      </div>
      <br />
    </div>
    <div class="informacionInternship">
      <h1>Explora Más</h1>
      <p>
        Nuestra plataforma cuenta con una amplia variedad de empresas e
        instituciones esperando para conectarse contigo. ¿Quieres saber más?
        ¡Regístrate en Internship by Cato y descubre todas las oportunidades
        emocionantes que estas empresas tienen para ofrecer!
      </p>
      <br />
    </div>
    <div class="informacionInternship">
      <h1>Regístrate Ahora</h1>
      <p>
        Únete a Internship by Cato y desbloquea todas las funciones que nuestra
        plataforma tiene para ofrecer. Convierte tu búsqueda de pasantías y
        oportunidades laborales en una experiencia más fácil y efectiva.
        ¡Regístrate ahora y da el siguiente paso hacia tu futuro profesional!
      </p>
      <br />
    </div>
  </div>
</template>
<script>
import CompanyCard from '../../components/common/CompanyCard.vue';
export default {
  components: {
    CompanyCard,
  },
  data() {
    return {
      details: [false, false, false, false],
    };
  },
  methods: {
    toggleDetail(index) {
      this.details[index] = !this.details[index];
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
}
.informacionInternship {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f5f5f5;
  padding: 1rem; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 0.5rem;
  width: 100%;
}
.dark-theme .informacionInternship {
  background: #434b54;
}

.EmpresasDestacadas {
  display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.7rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin: 0.3rem;
    height: 500px;
    overflow: auto;
    overflow-x: scroll;
    
}
.ExploraMas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 0.5rem;
  width: 100%;
}
.RegístrateAhora {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 0.5rem;
  width: 100%;
}
.Institutions__Page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem; 
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  margin: 0.5rem;
  width: 100%;
}

.company-cards-container {
  display: inline-flex;
}
/*Media queries*/
@media screen and (max-width: 300px){
  .container{
    padding: 0.5rem;
  }
  .informacionInternship{
    padding: 0.5rem;
  }
  .EmpresasDestacadas{
    padding: 0.5rem;
    height: 420px;
  }

}



</style>
