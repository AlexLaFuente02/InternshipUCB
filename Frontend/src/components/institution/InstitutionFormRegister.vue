<template>
  <!--Form de registro de Estudiantes-->
  <div class="formVue">
      <div class="form__tittle">
          <h1>SOLICITUD ADICION NUEVA INSTITUCION NOOOOOOOOOOOO</h1>
      </div>
      <div class="form__description">
          <p>Por favor complete el formulario a continuación:</p>
      </div>
      <div class="form__container">
          <div class="container__field">
              <label>Nombre de la Institucion *:</label>
              <input placeholder="Introduzca el nombre"
              v-model="formStore.nameInstitucion" type="text" class="field">
          </div>
      <div class="form__tittle">
          <h1>Datos generales</h1>
      </div>
          <div class="container__field">
              <label>Sector al que pertenece *:</label>
              <div class="dropdown__view">
                    <Dropdown
                    :options="options"
                    :selectedValue="selected"
                    placeholderValue="Seleccione un sector"
                    @option-selected="updateSector"
                    />
                </div>

          </div>
          <div class="container__field">
              <label>Reseña de la Institucion *:</label>
              <input placeholder="Introduzca su segundo apellido"
              
              v-model="formStore.resenia" type="text" class="field">
          </div>
          <div class="container__field2">
              <label>Logo de la Institucion *:</label>
              <input type="file" @change="onFileChange" accept="image/*">
              
          </div>
          <div class="form__tittle">
          <h1>Datos del contacto</h1>
      </div>
          <div class="container__field">
              <label>Nombre del contacto *:</label>
              <input placeholder="Introduzca el nombre del contacto"
              
              v-model="formStore.nameContac" type="text" class="field">
          </div>
          <div class="container__field">
              <label>Correo electronico *:</label>
              <input placeholder="Introduzca el correo electronico"
              
              v-model="formStore.correo" type="text" class="field">
          </div>
          <div class="container__field">
              <label>Celular del contacto *:</label>
              <input placeholder="Introduzca el correo electronico"
              v-model="formStore.phone" type="text" class="field">
          </div>
          <div class="buttons">
         
            <div class="buttons">
      <div class="button-left">
        <Button 
          text="Volver atras" 
          :color="0" 
          :disabled="false"
          @option-selected="inicio"
        ></Button>
      </div>
      <div class="button-right">
        <Button 
          text="Enviar solicitud" 
          :color="1" 
          :disabled="false"
          @option-selected="EnviarSolicitud"
        ></Button>
      </div>
    </div>
      </div>
      </div>
  </div>
</template>
<script>
import { useFormRegisterStore } from "@/store/student/formRegisterStore";
import {useInstitutionsByIDSectorStore} from '@/store/student/institutionsByIDSectorStore';
import {useSectorStore} from '@/store/common/sectorStore';
import {useLoaderStore} from '@/store/common/loaderStore';
import Dropdown from '../common/Dropdown.vue';
import Button from "@/components/common/Button.vue";
export default {
  components:{
    Button,
      Dropdown
  },
  methods: {
    toggleDarkMode() {
      const darkModeStore = useThemeStore();
      this.isDarkMode = !this.isDarkMode;
      darkModeStore.toggleDarkMode();
      console.log(darkModeStore.$event);
    },
    inicio(option) {
      if (option) {
        console.log("inicio");
        this.$router.push("/");
      }
    },
    EnviarSolicitud(option) {
      if (option) {
        console.log(":)");
        this.$router.push("/");
      }
    },
    updateSector(option) {
      if (option) {
        this.formStore.sector = option;
      }
    },
    async getSectors() {
            await useSectorStore().loadSectors();
            this.sectors = useSectorStore().sectors.result;
        },
  },
  data(){
      return{
          formStore: useFormRegisterStore(),      
          options: [],
          selected: null,
      }
  },
  async mounted() {
    useLoaderStore().activateLoader() ;
    await this.getSectors();
    this.options = this.sectors.map((sector) => {
      return {
        id: sector.id,
        label: sector.nombresectorpertenencia,
      };
    });
    useLoaderStore().desactivateLoader() ;
  },

  
  //subir archivo joijo
  onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        // Aquí puedes procesar el archivo
        // Por ejemplo, puedes mostrar una vista previa de la imagen seleccionada
        this.showPreview(file);
      }
    },
    showPreview(file) {
      // Lógica para mostrar una vista previa de la imagen
      // Podría ser asignar el archivo a una propiedad de datos y mostrar la vista previa en tu template
    }
  }
  

</script>
<style>
/* Tu estilo actual */

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.button-left,
.button-right {
  width: 48%; /* Establece un ancho para cada botón */
}

.button-left {
  float: left; /* Alinea el botón "Volver atrás" a la izquierda */
}

.button-right {
  float: right; /* Alinea el botón "Enviar solicitud" a la derecha */
}

.formVue{
  background-color: #FFF;
  padding: 5% 10%;
  border-radius: 10px;
}

/*Modo oscuro*/
.dark-theme .formVue{
  background-color: #434B54;
}

.form__tittle{
  display: flex;
  justify-content: center;
  align-items: center;
}
.form__tittle h1{
  font-size: 1.5rem;
  text-align: center;
}
.form__description{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
}

/*CSS del input*/
.container__field{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.container__field label{
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 5px;
}
.container__field2{
  display: flex;
  border: 0px solid #ccc;
  flex-direction: column;
  margin-bottom: 10px;
}
.container__field2 label{
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 5px;
}
/*Fin del css*/
.container__select{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.container__select label{
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 5px;
}
</style>