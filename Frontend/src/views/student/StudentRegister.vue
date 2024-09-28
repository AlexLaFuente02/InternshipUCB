<template>
    <div class="container">
      <div class="container__stepper">
        <div class="container__items">
            <div class="stepper__item" v-for="step in steps" :key="step.id" :class="{'active': currentStep === step.id}">  
              <div class="item__number">
                {{step.id}}
              </div>
              <div class="item__title">{{step.title}}</div>
            </div>
        </div>
    </div>
      <div class="container__content">
        <component 
        :is="steps[currentStep - 1].component"
        @nextPage="nextPage"
        ></component>
      </div>
      <div class="controls">
        <!--<div class="container__button">
            <Button 
                text="Anterior" 
                :color="0" 
                :disabled="false"
                @option-selected="prevStep"
                >
            </Button>
        </div>
        <div class="container__button" v-if="currentStep !== steps.length">
            <Button v-if="validation"
                text="Siguiente" 
                :color="0" 
                :disabled="false"
                @option-selected="nextStep"
                >
            </Button>
            <Button v-else
                text="Siguiente" 
                :color="0" 
                :disabled="true"
                >
            </Button>
        </div>-->
        <div class="container__button" v-if="currentStep === steps.length">
            <Button 
                text="Registrarse" 
                :color="0" 
                :disabled="false"
                @option-selected="register"
                >
            </Button>
        </div>
      </div>
    </div>
</template>

<script>
import StudentFormRegister from '@/components/student/StudentFormRegister.vue';
import StudentValidationRegister from '@/components/student/StudentValidationRegister.vue';
import { useFormRegisterStore } from "@/store/student/formRegisterStore";
import Button from '@/components/common/Button.vue';
import StudentFormPassword from '@/components/student/StudentFormPassword.vue';
export default {
    components:{
        StudentFormRegister,
        StudentValidationRegister,
        Button,
        StudentFormPassword
    },
    data(){
        return{
            formStore: useFormRegisterStore(),
            currentStep: 1,
            steps: [
                {
                    id: 1,
                    component: 'StudentValidationRegister',
                    title: 'Validación',
                },
                {
                    id: 2,
                    component: 'StudentFormPassword',
                    title: 'Contraseña',
                },
                {
                    id: 3,
                    component: 'StudentFormRegister',
                    title: 'Formulario',
                },
            ],
            validation: false,

        }
      },
    methods: {
        nextStep(){
            this.currentStep++;
        },
        prevStep(){
            this.currentStep--;
        },
        register(){
            try{
                const result = this.formStore.postStudent();
                if (result){
                    this.$router.push("/Login");
                }
            }catch(error){
            }
        },
        nextPage(boolean){
            if (boolean){
                this.nextStep();
                this.validation = true;
            } else{
                this.validation = false;
            }
        },

    },
}
</script>
<style scoped>
.container{
    padding: 5% 10%;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.container__stepper{
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: relative;
}
/*Estilos para el modo oscuro*/
.dark-theme .container__stepper{
    background: #434B54;
}
.container__items{
  padding: 0%;
  margin: 0%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 0;
}
.stepper__item{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 100%;
    position: relative;
    justify-content: center;
    flex: 1 1 auto;
}
.item__number{
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    border: 2px solid #000;
    border-radius: 100%;
    position: relative;
    transition: all 0.3s ease 0s;
}
.item__number :hover{
    transform: scale(1.1);
}

.stepper__item.active .item__number{
    color: #fff;
    background: #0d6efd;
}
/*Estilos para el item en modo oscuro*/
.dark-theme .stepper__item.active .item__number{
    color: #000;
    background: #Ffc107;
}
.controls{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 2%;
}
.container__content{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.container__button{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>

