<template>
    
    <!--Form de registro de Estudiantes-->
    <div class="formVue">
        
        <div class="form__tittle">
            <h1>REGISTRO DE ESTUDIANTE</h1>
        </div>
        <div class="form__description">
            <p>Estamos emocionados de ayudarte a encontrar oportunidades profesionales. Por favor,
completa el siguiente formulario para registrarte como estudiante o graduado.</p>
        </div>
        <div class="form__container">
            <div class="container__field">
                <label>Nombre *:</label>
                <input placeholder="Introduzca su nombre"
                
                v-model="formStore.student.nombres" type="text" class="field">
            </div>
            <div class="container__field">
                <label>Apellido paterno *:</label>
                <input placeholder="Introduzca su primer apellido"
                
                v-model="formStore.student.apellidopaterno" type="text" class="field">
            </div>
            <div class="container__field">
                <label>Apellido materno *:</label>
                <input placeholder="Introduzca su primer apellido"
                
                v-model="formStore.student.apellidomaterno" type="text" class="field">
            </div>
            <!--INPUT-->
            <div class="container__field">
                <label>Cédula de Identidad *:</label>
                <input placeholder="Introduzca su cédula de identidad"
                
                v-model="formStore.student.carnetidentidad" type="text" class="field">
            </div>
            <!--INPUT-->
            <div class="container__field">
                <label>Celular *:</label>
                <input placeholder="Introduzca su número de celular"
                
                v-model="formStore.student.celularcontacto" type="number" class="field">
            </div>
            <div class="container__">
                <label>Validación *:</label>
                <CheckBox 
                :options="checkboxOptions" 
                :initOption="selectedOption"
                
                @selected="handleSelectedOption"
                />
                <p>La opción seleccionada es: {{ selectedOption }}</p>
            </div>
            <div class="container__select">
                <label>Sede *:</label>
                <Dropdown :options="this.listCampus" :selectedValue="campus"
                placeholderValue="Seleccione una sede"
                @option-selected="updateCampus" />
            </div>
            <div class="container__select">
                <label>Carrera *:</label>
                <Dropdown :options="this.listCareers" :selectedValue="career"
                placeholderValue="Seleccione una carrera"
                @option-selected="updateCareer" />
            </div>
            <div class="container__select">
                <label>Semestre de ingreso *:</label>
                <Dropdown :options="this.listSemester" 
                :selectedValue="semester"
                placeholderValue="Seleccione un semestre"
                @option-selected="updateSemester" />
            </div>
            <div class="container__field" v-if="formStore.student.graduado">
                <label>Año de graduación *:</label>
                <input placeholder="Introduzca su año de graduación"
                    v-model="formStore.student.aniograduacion"
                    type="number" min="1900" max="2099" step="1" class="field">
            </div>
        </div>
    </div>
</template>
<script>
import { useFormRegisterStore } from "@/store/student/formRegisterStore";
import { useCampusStore } from "@/store/common/campusStore";
import { useCareersStore } from "@/store/common/careersStore";
import { useSemesterStore } from "@/store/common/semesterStore";
import {useLoaderStore} from "@/store/common/loaderStore";
import Dropdown from '../common/Dropdown.vue';
import CheckBox from '@/components/common/CheckBox.vue';
export default {
    components:{
        Dropdown,
        CheckBox,
    },
    data(){
        return{
            formStore: useFormRegisterStore(),
            campusStore: useCampusStore(),
            careerStore: useCareersStore(),
            semesterStore: useSemesterStore(),
            listCampus: [],
            listCareers: [],
            listSemester: [],
            checkboxOptions: ["Graduado", "Estudiante"],
            selectedOption: null,
            campus: "",
            career: "",
            semester: "",
        }
    },
    methods:{
        //Obtener todas las sedes
        async getCampus(){
            await this.campusStore.loadCampuse();
            this.listCampus= this.campusStore.campuses.result;
            //Convertir el array de sedes en un array de objetos con id y label
            this.listCampus = this.listCampus.map((campus) => {
                return {
                    id: campus.id,
                    label: campus.nombresede,
                };
            });
        },
        //Obtener todas las carreras
        async getCareers(){
            await this.careerStore.loadCareer();
            this.listCareers= this.careerStore.careers.result;
            //Convertir el array de carreras en un array de objetos con id y label
            this.listCareers = this.listCareers.map((career) => {
                return {
                    id: career.id,
                    label: career.nombrecarrera,
                };
            });
        },
        async getSemester(){
            await this.semesterStore.loadSemester();
            this.listSemester= this.semesterStore.semesters.result;
            //Convertir el array de carreras en un array de objetos con id y label
            this.listSemester = this.listSemester.map((semester) => {
                return {
                    id: semester.id,
                    label: semester.codigosemestre,
                };
            });
        },
        updateCampus (option) {
            this.formStore.student.sede.id = option.id;
            this.formStore.campus = option.label;
            this.campus = option.label;
        },
        updateCareer (option) {
            this.formStore.student.carrera.id = option.id;
            this.formStore.career= option.label;
            this.career = option.label;
        },
        updateSemester (option) {
            this.formStore.student.semestre.id = option.id;
            this.formStore.semester = option.label;
            this.semester = option.label;
        },
        handleSelectedOption(option) {
            this.selectedOption = option;
            if (option === "Graduado") {
                this.formStore.student.graduado = true;
            } else {
                this.formStore.student.graduado = false;
            }
        },
    },
    //Tercer paso, obtener todas las sedes cuando se crea el componente
    async mounted(){
        useLoaderStore().activateLoader();
        await this.getCampus();
        await this.getCareers();
        await this.getSemester();
        if(this.formStore.student.graduado){
            this.selectedOption = "Graduado";
        }else{
            this.selectedOption = "Estudiante";
        }
        this.campus = this.formStore.campus;
        this.career = this.formStore.career;
        this.semester = this.formStore.semester;

        useLoaderStore().desactivateLoader();
    }
    
}
</script>
<style scoped>
.formVue{
    display: flex;
    flex-direction: column;
    width: 100%;
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
/*Fin del css*/
.container__select{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
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