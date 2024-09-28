
<template>
    <div class="passwordContainer">
        <form class="formpass">
            <Password v-model="value"
            promptLabel="Ingrese su contraseña"
            toggleMask
            class="p-inputtext"
            @input="input2"
            id="register-password"
            :inputProps="{ autocomplete: 'onn' }"
            >
            <template #header>
                <h3 class="headerPanel">Contraseña</h3>
            </template>
            <template #footer>
                <p class="mt-2" id="password-help"
                >Requisitos</p>
                <ul class="pl-2 ml-2 mt-0" id="password-help-list" 
                style="line-height: 1.5">
                    <li>Mínimo 1 letra minúscula</li>
                    <li>Mínimo 1 letra mayúscula</li>
                    <li>Mínimo 1 número</li>
                    <li>Mínimo 8 caracteres</li>
                </ul>
            </template>
        </Password>
        </form>
    </div>
</template>
<script>
import Password from 'primevue/password';
export default {
    props: {
    },

    components:{
        Password
    },
    data(){
        return{
            value: '',

        }
    },
    methods: {
        input2() {
            this.$emit('input-emit', this.value)
        },
    },

}
</script>
<style scoped>
.formpass{
    width: 100%;
    display: flex;
    justify-content: center;
}
/*Quitar los estilos previos del input*/
.passwordContainer{
    width: 100%;
    display: flex;
    justify-content: center;
}
.p-inputtext{
    background: none;
    border: none;
    width: 100%;
    display: flex;
    padding: 0;
}
/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
  .headerPanel{
      font-size: 0.5rem;
  }
  #password-help{
      font-size: 0.5rem;
  }
    #password-help-list{
        font-size: 0.5rem;
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