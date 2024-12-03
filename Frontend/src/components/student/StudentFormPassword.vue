<template>
    <div class="formVue">
        <div class="form__tittle">
            <h1>
                Crear Contraseña
            </h1>
        </div>
        <div class="form__description">
            <p>
                Ingrese su nueva contraseña.
            </p>
        </div>
        <div class="form__container">
            <div class="container__field">
                <label for="password">Contraseña *:</label>
                <InputPassword
                @input-emit="password"
                >
                </InputPassword>
            </div>
            <div class="container__field">
                <label for="password">Confirmar Contraseña *:</label>
                <InputPassword
                @input-emit="confirmPassword"
                >
                </InputPassword>
            </div>
            <div class="form__button">
                <Button 
                    text="Confirmar contraseña"
                    :color="0"
                    :disabled="false"
                    @option-selected="newPassword"
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
import InputPassword from "../common/InputPassword.vue";
export default {
    components: {
        Button,
        InputPassword
    },
    data() {
        return {
            formStore: useFormRegisterStore(),
            loaderStore: useLoaderStore(),
            passwordlabel: '',
            confirmPasswordlabel: '',
            blacklist: [] // Aquí guardaremos las contraseñas débiles
        };
    },
    mounted() {
    fetch("/blacklist.txt")
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo cargar la lista de contraseñas débiles.");
            }
            return response.text();
        })
        .then((data) => {
            this.blacklist = data
                .split("\n")
                .map((item) => item.trim())
                .filter((item) => item.length > 0); // Elimina líneas vacías o entradas no válidas
        })
        .catch((error) => {
            console.error("Error al cargar la lista de contraseñas débiles:", error);
        });
    },
    methods: {
        password(value) {
            this.passwordlabel = value;
        },
        confirmPassword(value) {
            this.confirmPasswordlabel = value;
        },
        async newPassword() {
            this.formStore.updatePassword.contrasenia = this.passwordlabel;

            if (this.passwordlabel === this.confirmPasswordlabel) {
                if (
                    this.passwordlabel.length >= 8 &&
                    this.passwordlabel.match(/[a-z]/g) &&
                    this.passwordlabel.match(/[A-Z]/g) &&
                    this.passwordlabel.match(/[0-9]/g) &&
                    this.passwordlabel.match(/[_!@#$%^&*(),.?":{}|<>]/g)
                ) {
                    // Validar que la contraseña no esté en la lista negra
                    const normalizedPassword = this.passwordlabel.trim().toLowerCase();
                    const isBlacklisted = this.blacklist.some(item => 
                        normalizedPassword.includes(item.toLowerCase())
                    );
                    
                    if (isBlacklisted) {
                        alert("La contraseña ingresada es demasiado genérica. Por favor, elija otra.");
                        return;
                    }

                    this.loaderStore.activateLoader();
                    const result = await this.formStore.putStudent();
                    this.loaderStore.desactivateLoader();
                    if (result) {
                        this.$emit("nextPage", true);
                    }
                } else {
                    alert(
                        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
                    );
                }
            } else {
                alert("Las contraseñas no coinciden");
            }
        },

    },
}
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