<template>
  <div class="formVue10">
    <div class="form__tittle">
      <h1>SOLICITUD ADICI&Oacute;N NUEVA INSTITUCI&Oacute;N</h1>
    </div>
    <div class="form__description">
      <h5>Por favor complete el formulario a continuaci&oacute;n:</h5>
    </div>
    <div class="form__container">
      <div class="formVue100">
        <div class="form__tittle">
          <h1>Datos generales</h1>
        </div>
        <div class="container__field">
          <label for="institutionName"
            >Nombre de la Instituci&oacute;n <strong>*</strong>:</label
          >
          <input
            type="text"
            name="institutionName"
            id="institutionName"
            placeholder="Introduzca el nombre"
            v-model="institutionRegisterStore.nombreinstitucion"
          />
        </div>
        <div class="container__field">
          <label for="institutionDescription"
            >Reseña de la Instituci&oacute;n <strong>*</strong>:</label
          >
          <input
            type="text"
            name="institutionDescription"
            id="institutionDescription"
            placeholder="Introduzca su segundo apellido"
            v-model="institutionRegisterStore.reseniainstitucion"
          />
        </div>
        <div class="container__field2">
          <label for="institutionLogo"
            >Logo de la Instituci&oacute;n <strong>*</strong>:</label
          >
          <input
            type="file"
            name="institutionLogo"
            id="institutionLogo"
            @change="onFileChange"
            accept="image/*"
          />
        </div>
        <div class="container__field">
          <label for="institutionSector"
            >Sector al que pertenece <strong>*</strong>:</label
          >
          <Dropdown
            :options="this.sectorList"
            :selectedValue="sector"
            placeholderValue="Seleccione el sector de pertenencia de su empresa"
            @option-selected="updateSector"
          />
        </div>
      </div>
      <div class="formVue100">
        <div class="form__tittle">
          <h1>Datos de contacto</h1>
        </div>
        <div class="container__field">
          <label for="institutionContactName"
            >Nombre del contacto <strong>*</strong>:</label
          >
          <input
            type="text"
            name="institutionContactName"
            id="institutionContactName"
            placeholder="Introduzca el nombre del contacto"
            v-model="institutionRegisterStore.nombrecontacto"
          />
        </div>
        <div class="container__field">
          <label for="institutionContactEmail"
            >Correo electr&oacute;nico <strong>*</strong>:</label
          >
          <input
            type="text"
            name="institutionContactEmail"
            id="institutionContactEmail"
            placeholder="Introduzca el correo electronico"
            v-model="institutionRegisterStore.correocontacto"
          />
        </div>
        <div class="container__field">
          <label for="institutionContactCellphone"
            >Celular del contacto <strong>*</strong>:</label
          >
          <input
            type="text"
            name="institutionContactCellphone"
            id="institutionContactCellphone"
            placeholder="Introduzca el celular de contacto"
            v-model="institutionRegisterStore.celularcontacto"
          />
        </div>
      </div>
      <div class="register-message">
        <span v-text="institutionRegisterMessages.errorMessage"></span>
      </div>
      <div class="buttons-container10">
        <div class="button-left10">
          <Button
            text="Volver atrás"
            :color="0"
            :disabled="false"
            @option-selected="goBack"
          ></Button>
        </div>
        <div class="button-right10">
          <Button
            text="Enviar solicitud"
            :color="1"
            :disabled="false"
            @option-selected="sendRequest"
          ></Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from "@/components/common/Dropdown.vue";
import Button from "@/components/common/Button.vue";
import { useLoaderStore } from "@/store/common/loaderStore";
import { InstitutionRegisterStore } from "../../store/institution/InstitutionRegisterStore";
import { useSectorStore } from "../../store/common/sectorStore";
export default {
  components: {
    Button,
    Dropdown,
  },
  data() {
    return {
      institutionRegisterStore: InstitutionRegisterStore(),
      institutionRegisterMessages: {
        errorMessage: "",
      },
      sectorStore: useSectorStore(),
      sectorList: [],
      sector: "",
    };
  },
  methods: {
    toggleDarkMode() {
      const darkModeStore = useThemeStore();
      this.isDarkMode = !this.isDarkMode;
      darkModeStore.toggleDarkMode();
      console.log(darkModeStore.$event);
    },
    goBack() {
      this.$router.push({ name: "PrincipalPage" });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.institutionRegisterStore.setLogoInstitucion(file);
      console.log(this.institutionRegisterStore.logoinstitucion);
    },
    async getBelongingSectors() {
      await this.sectorStore.loadSectors();
      this.sectorList = this.sectorStore.sectors.result;
      this.sectorList = this.sectorList.map((sector) => {
        return {
          id: sector.id,
          label: sector.nombresectorpertenencia,
        };
      });
      console.log(this.sectorList);
      console.log(this.sector);
    },
    async sendRequest() {
      if (this.institutionRegisterStore.$state.nombreinstitucion === "") {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese el nombre de la empresa por favor.";
      } else if (this.institutionRegisterStore.$state.reseniainstitucion === "") {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese la reseña de la empresa por favor.";
      } else if (this.institutionRegisterStore.$state.logoinstitucion === null) {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese el logo de la empresa por favor.";
      } else if (this.institutionRegisterStore.$state.sectorpertenencia.id === null) {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese el sector de pertenencia de la empresa por favor.";
      } else if (this.institutionRegisterStore.$state.nombrecontacto === "") {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese el nombre del contacto de la empresa por favor.";
      } else if (this.institutionRegisterStore.$state.correocontacto === "") {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese el correo electrónico del contacto de la empresa por favor.";
      } else if (this.institutionRegisterStore.$state.celularcontacto === "") {
        this.institutionRegisterMessages.errorMessage =
          "Error, ingrese el celular del contacto de la empresa por favor.";
      } else {
        this.institutionRegisterMessages.errorMessage = "";
        const response = await this.institutionRegisterStore.registerInstitution();
        console.log(response);
        if (response.code === "I-0000") {
          this.showMessage("¡Éxito!", response.message, "success");
        } else {
          this.showMessage("Error", response.message, "error");
        }
        this.goBack();
      }
    },
    showMessage(titleMessage, textMessage, iconMessage) {
      this.$swal({
        title: titleMessage,
        text: textMessage,
        icon: iconMessage,
        showConfirmButton: false,
        timer: 5000,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    },
    updateSector(option) {
      this.institutionRegisterStore.$state.sectorpertenencia.id = option.id;
      this.sector = option.label;
    },
  },
  async mounted() {
    useLoaderStore().activateLoader();
    await this.getBelongingSectors();
    useLoaderStore().desactivateLoader();
  },
};
</script>
<style scoped>
.form__tittle {
  text-align: center;
}

strong {
  color: red;
}

.formVue10 {
  margin: 2% 6%;
  padding: 4% 2%;
}

.formVue100 {
  padding: 3% 5%;
}

.formVue100:first-child {
  margin: 4% 5% 3%;
}

.formVue100:nth-child(2) {
  margin: 0 5% 4%;
}

.buttons-container10 {
  margin: 0 auto;
  justify-content: space-around;
}

.form__description {
  text-align: center;
}

.container__field {
  margin: 3% auto;
}

.register-message {
  font-size: large;
  color: red;
  text-align: center;
  margin-bottom: 3%;
}

/* .container__select {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.container__select label {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 5px;
} */

/* DARK THEME */
.dark-theme .formVue10 {
  background: rgb(56, 63, 72);
}

.dark-theme .formVue100 {
  background-color: rgb(66, 75, 86);
}

@media screen and (max-width: 880px) {
  .formVue100 {
    padding: 8%;
  }

  .formVue100:first-child {
    margin-bottom: 10%;
  }

  .formVue100:nth-child(2) {
    margin-bottom: 10%;
  }

  .form__description {
    padding: 0 10%;
  }
}
</style>
