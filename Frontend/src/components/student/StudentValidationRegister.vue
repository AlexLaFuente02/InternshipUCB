
<template>
    <div class="formVue">
        <div class="form__tittle">
            <h1>REGISTRO DE ESTUDIANTE</h1>
        </div>
        <div class="form__description">
            <p>¡Bienvenido a Internship by Cato! Antes de continuar con el registro, necesitamos verifcar que eres un
estudiante o graduado de la Universidad Católica Boliviana (UCB). Por favor, proporciona tu dirección de
correo electrónico de la UCB y confírmala.</p>
        </div>
        <div class="form__container">
            <div class="container__field">
                <label>Correo Electrónico</label>
                <input placeholder="Introduzca su correo UCB"
                
                v-model="formStore.student.correoelectronico" type="email" class="field"
                pattern=".*@ucb.edu.bo"
                title="El correo debe ser el institucional de la UCB" autocomplete="on"
                
                >
            </div>
            <br>
            <div class="form__button" v-if="send">
                <Button 
                    text="Enviar código" 
                    :color="5" 
                    :disabled="false"
                    @option-selected="sendEmail"
                    >
                </Button>
            </div>
            <h6 v-else>{{ this.seconds}} segundos para volver a enviar el código
                    </h6>
            <br>
            <div class="container__field">
                <label>Código de verificación</label>
                <input placeholder="Introduzca el código de verificación"
                v-model="formStore.codeVerification" type="number" class="field" pattern=".*">
            </div>
            <div class="form__button">
                <Button 
                    text="Verificar código" 
                    :color="5" 
                    :disabled="false"
                    @option-selected="verifyCode"
                    >
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
import { useFormRegisterStore } from "@/store/student/formRegisterStore";
import {useLoaderStore} from "@/store/common/loaderStore";
import Button from '@/components/common/Button.vue';
export default {
    components:{
        Button
    },
    data(){
        return{
            formStore: useFormRegisterStore(),
            send:true,
            seconds: 15,
            ucbEmailForm: '',
            codeForm: '',
            loader: useLoaderStore(),
        }
    },
    methods: {
        async sendEmail(){
            //Validar que el correo acabe en @ucb.edu.bo
            const testCorreo = /@ucb.edu.bo$/;
            if (!testCorreo.test(this.formStore.student.correoelectronico)) {
                alert("El correo debe ser el institucional de la UCB");
                return ;
            }
            this.loader.activateLoader();
            //Enviar código
            const result = await this.formStore.postCode();
            this.send = false;
            this.loader.desactivateLoader();
            //Contador
            let interval = setInterval(() => {
                this.seconds--;
                if(this.seconds === 0){
                    clearInterval(interval);
                    this.seconds = 60;
                    this.send = true;
                }
            }, 1000);
        },
        async verifyCode(){
            this.loader.activateLoader();
            //Verificar código
            const result = await this.formStore.verifyCode();
            this.loader.desactivateLoader();
            if (result){
                this.$emit('nextPage', true);
            }
        },
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@ucb\.edu\.bo$/;
      return emailRegex.test(email);
    },

    sendEmail() {
      if (this.validateEmail()) {
        // Enviar código aquí
        this.send = false;
        this.codeSent = true;
        let interval = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            clearInterval(interval);
            this.seconds = 15;
            this.send = true;
          }
        }, 1000);
      }
    },
};
</script>

<style scoped>
.formVue{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    padding: 5% 10%;
    border-radius: 10px;
    width: 100%;
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

.form__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
}
.form__button{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 1.2rem;
    
}
.container__field{
    display: flex;
    flex-direction: column;
}
.container__field label{
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 5px;
}
/*Media queries*/
@media screen and (max-width: 768px){
    .formVue{
        padding: 5% 5%;
    }
    .form__tittle h1{
        font-size: 1.25rem;
    }
    .form__description p{
        font-size: 0.8rem;
    }
    .container__field label{
        font-size: 1rem;
    }
    .field{
        font-size: 0.8rem;
    }
    .form__button button{
        font-size: 0.8rem;
    }
    .form__button h6{
        font-size: 0.8rem;
    }
}
@media screen and (max-width: 576px){
    .formVue{
        padding: 5% 5%;
    }
    .form__tittle h1{
        font-size: 0.75rem;
    }
    .form__description p{
        font-size: 0.7rem;
    }
    .container__field label{
        font-size: 0.7rem;
    }
    .field{
        font-size: 0.7rem;
    }
    .form__button button{
        font-size: 0.7rem;
    }
    .form__button h6{
        font-size: 0.7rem;
    }
}


    
</style>