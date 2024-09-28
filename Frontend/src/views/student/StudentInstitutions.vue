<template>
    <div class="containerList">

      <div class="containerList__header">
            <div class="containerList__title">
                <h1>Instituciones</h1>
            </div>
            <div class="dataview__options">
                <div class="search__view">
                    <input
                    class="search__input"
                    type="text" 
                    placeholder="Buscar por institución" 
                    v-model="searchTerms"
                    @input="handleSearch"
                    />
                    <div class="search__image">
                        <font-awesome-icon :icon="['fas', 'search']" size="2xl"/>
                    </div>
                </div>
                <div class="dropdown__view">
                    <DropdownVue
                    :options="options"
                    :selectedValue="selected"
                    placeholderValue="Seleccione un sector"
                    @option-selected="updateSector"
                    />
                </div>
            </div>
    </div>
    <div class="container__cards">
      <div class="card" v-for="card in listInstitutionsComputed" :key="card.id">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <img src="https://pbs.twimg.com/profile_images/1026937398855389186/1fpmfMrK_400x400.jpg" alt="Imagen de la empresa" style="width: 100px; height: 100px;">
              <strong>
                {{ card.nombreinstitucion }}
              </strong>
            </div>
          </div>
          <div class="front">
            
            <div class="img">
              <div class="circle">
              </div>
              <div class="circle" id="right">
              </div>
              <div class="circle" id="bottom">
              </div>
            </div>

            <div class="front-content">
              <div class="description">
                <div class="title">
                  <p class="title">
                    <strong>
                      {{ card.sectorpertenencia.nombresectorpertenencia }}
                    </strong>
                  </p>
                  <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode: normal" text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg>
                </div>
              </div>
              <!--Boton de más informacion-->
              <button @click="showMoreInfo(card.id)"
              class="more-info-button">Más información</button>
              <div class="badge">
                <strong>
                  {{ card.nombreinstitucion }}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import DropdownVue from '../../components/common/Dropdown.vue';
import {useSectorStore} from '@/store/common/sectorStore';
import {useLoaderStore} from '@/store/common/loaderStore';
import {useInstitutionsByIDSectorStore} from '@/store/student/institutionsByIDSectorStore';
export default {
    components: {
        DropdownVue,
    },
    data() {
        return {
            searchTerms: '',
            options: [],
            selected: null,
            sectors: [],
            listInstitutions: [],

        }
    },
    methods: {
        async getSectors() {
            await useSectorStore().loadSectors();
            this.sectors = useSectorStore().sectors.result;
        },
        async getInstitutions() {
            await useInstitutionsByIDSectorStore().loadInstitutions();
            this.listInstitutions = useInstitutionsByIDSectorStore().institutions.result;
        },
        async updateSector(option) {
            this.selected = option.label;
            if (option.id === 0) {
                await useInstitutionsByIDSectorStore().loadInstitutions();
                this.listInstitutions = useInstitutionsByIDSectorStore().institutions.result;
            } else {
                await useInstitutionsByIDSectorStore().loadInstitutionsByIdSector(option.id);
                this.listInstitutions = useInstitutionsByIDSectorStore().institutions;
            }
        },
        handleSearch() {
            this.listInstitutions = useInstitutionsByIDSectorStore().institutions.result.filter((institution) => {
                return institution.nombreinstitucion.toLowerCase().includes(this.searchTerms.toLowerCase());
            });
        },
        showMoreInfo(idInstitution) {
          this.$router.push(`/student/instistutions/${idInstitution}`);
        }

    },
    async mounted() {
        useLoaderStore().activateLoader() ;
        await this.getSectors();
        await this.getInstitutions();
        this.options = this.sectors.map((sector) => {
            return {
                id: sector.id,
                label: sector.nombresectorpertenencia,
            }
        });
        //Aumentar el valor de la variable para que se muestren todos los sectores
        this.options.unshift({
            id: 0,
            label: 'Todos los sectores',
        });
        useLoaderStore().desactivateLoader() ;
    },
    computed: {
        listInstitutionsComputed() {
            return this.listInstitutions;
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans:900');
body {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  font-family: sans-serif;
  margin: 0;
  background: #6D6027;
  background: -webkit-linear-gradient(left, #D3CBB8, #6D6027);
  background: -o-linear-gradient(left, #D3CBB8, #6D6027);
  background: linear-gradient(to right, #D3CBB8, #6D6027);
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.containerList{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
}

.containerList__header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    flex: 1 1 auto;

}
.dark-theme .containerList__header{
    background-color: #434B54;
}
.containerList__title{
    display: flex;
    margin-bottom: 1rem;
}
.dataview__options{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.search__view{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.search__input{
    flex: 1 1 90%;
}
.search__image{
  flex: 1 1 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-left: 0.2rem;
}
.container__cards{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    padding: 1rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dark-theme .container__cards{
    background-color: #434B54;
}
.card {
  overflow: visible;
  width: 200px;
  height: 264px;
  padding: 0.5rem;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 300ms;
  box-shadow: 0px 0px 10px 1px rgba(33, 33, 77, 0.8);
  border-radius: 5px;
}

.front, .back {
  background-color: #004d98;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.back::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #ffbb66, #ffbb66, #ffbb66, #ffbb66, transparent);
  animation: rotation_481 5000ms infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  background-color: #004d98;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10px;
}
.back-content::before {
  position: absolute;
  content: ' ';
  display: block;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px);
  opacity: 0.1;
}

.card:hover .content {
  transform: rotateY(180deg);
}

.card.flipped .content {
  transform: rotateY(180deg);
}
/*voltear tarjeta luego de hacer click en el front de la tarjeta*/
@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}

.front {
  transform: rotateY(180deg);
  color: white;
}

.front .front-content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.front-content .badge {
  background-color: #ba0b25;
  padding: 2px 10px;
  border-radius: 10px;
  width: fit-content;
}

.description {
  box-shadow: 0px 0px 10px 5px #004d98;
  width: 100%;
  padding: 10px;
  background-color: #096aca;
  backdrop-filter: blur(5px);
  border-radius: 5px;
}

.title {
  margin: 0;
  font-size: 11px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}

.title p {
  width: 50%;
  color: #fff;
}


.front .img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #e31937;
  position: relative;
  filter: blur(15px);
  animation: floating 2600ms infinite linear;
}

#bottom {
  background-color: #e31937;
  left: 50px;
  top: 0px;
  width: 150px;
  height: 150px;
  animation-delay: -800ms;
}

#right {
  background-color: #ff2233;
  left: 160px;
  top: -80px;
  width: 30px;
  height: 30px;
  animation-delay: -1800ms;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0px);
  }
}
.more-info-button {
    background-color: #4CAF50; /* Color de fondo del botón */
    color: white; /* Color del texto del botón */
    padding: 7px 12px; /* Espaciado interno del botón */
    border: none; /* Sin borde */
    border-radius: 5px; /* Borde redondeado */
    cursor: pointer; /* Cambiar el cursor al pasar el mouse */
}

.more-info-button:hover {
    background-color: #45a049; /* Cambiar el color de fondo al pasar el mouse */
}



/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  input{
    font-size: 0.50rem;
  }
  .search__image{
    font-size: 0.25rem;
  }
  .dataview__options{
    flex-direction: column;
    justify-content: center;

  }
  .search__view{
    margin-bottom: 1rem;
  }
}

/* Estilos para tabletas */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
  input{
    font-size: 0.75rem;
  }

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