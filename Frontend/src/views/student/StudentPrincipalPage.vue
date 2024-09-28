<template>
    <div class="student__principalPage">

            <div class="student__profile">
                <div class="profile__content__header">
                        <div class="content__welcome">
                            <div class="emoji">
                                👋
                            </div>
                            <div class="student__data">
                                <span class="welcome__student">
                                    Hola, {{ getNombre }}!
                                </span>
                                <span class="career__student">
                                    {{ getCorreo  }}
                                </span>
                            </div>
                        </div>
                        <div class="content__more">
                            <button class="profile__button bn23" @click="openResume">
                                <font-awesome-icon :icon="['fas', 'file-alt']" size="2xl" />
                                <span class="see_vitae">
                                    Hoja de vida
                                </span>
                            </button>
                            <button class="profile__button bn23">
                                <router-link class="link" to="/student/profile">
                                    <font-awesome-icon :icon="['fas', 'user-circle']" size="2xl" />
                                    <span class="edit__Profile">Ver Perfil</span>
                                </router-link>
                            </button>
                            <button class="profile__button bn23">
                                <router-link class="link" to="/student/settings">
                                    <font-awesome-icon :icon="['fas', 'user-edit']" size="2xl" />
                                    <span class="edit__Profile">Editar Perfil</span>
                                </router-link>
                            </button>
                        </div>
                </div>
                <div class="summary">
                    <span class="summary__title">
                        Resumen general de tus pasantías
                    </span>
                    <div class="summary__content">
                        <span class="summary__content__number">{{ requestsAccepted.length }}
                            <span class="summary__content__text">aprobado</span>
                        </span>
                        <span class="summary__content__number">{{ requestsPending.length }}
                            <span class="summary__content__text">pendiente</span>
                        </span>
                        <span class="summary__content__number">{{ requestsRejected.length }}
                            <span class="summary__content__text">rechazado</span>
                        </span>
                        <span class="summary__content__number">{{ allRequests}}
                            <span class="summary__content__text">Totales</span>
                        </span>
                    </div>
                </div>
            </div>
        <div class="sector">
            <div class="internship__active__by__student">
            <h1>Pasantías activas</h1>
            <div class="container__cards">
                <div class="card" v-for="internship in listInterships" v-if="everyInternshipsAreLoaded">
                    <SimpleCard 
                    :key="internship.id"
                    :internship="internship"
                    @more-information="moreInformation"
                    />
                </div>
            </div>
        </div>
        
        <div class="requests__by__student">
            <h1>Tus Solicitudes</h1>
            <div class="container__requests" 
            v-if="everyInternshipsAreLoaded"
            >
                <div class="container__little__nav">
                    <LittleNav 
                    @filter="filterRequests"
                    />
                </div>
                <div class="container__Arrow">
                    <ArrowCards
                    :listRequests="listRequests"
                    :type="{
                    id: 4,
                    title: 'Todo',
                    icon: '🌎',
                    color: '#04befe',
                }"
                    v-show="type=='Todo'"
                    />
                    <ArrowCards
                    :listRequests="requestsPending"
                    :type="{
                    id: 3,
                    title: 'Pendiente',
                    icon: '🤷',
                    color: '#f15f0e',
                }"
                    v-show="type=='Pendiente'"
                    />
                    <ArrowCards
                    :listRequests="requestsAccepted"
                    :type="{
                    id: 2,
                    title: 'Aceptado',
                    icon: '😁',
                    color: '#36aeb3',
                }"
                    v-show="type=='Aceptado'"
                    />
                    <ArrowCards
                    :listRequests="requestsRejected"
                    :type="{
                    id: 1,
                    title: 'Rechazado',
                    icon: '😞',
                    color: '#fc374e',
                }"
                    v-show="type=='Rechazado'"
                    />
                </div>
            </div>
        </div>

        </div>
        





        <div class="student__content__internship">
            <CardList 
            :list="popularInternships"
            :title="title"
            v-if="everyInternshipsAreLoaded"
            @more-information="moreInformation"
            />
        </div>
        <!--
            Sección de Pasantás de Estudiante
        -->
    </div>
</template>
<script>
import {useInternshipsByIDStore } from "@/store/student/internshipsByIDStore";
import CardList from "@/components/common/CardList.vue";
import {useLoaderStore} from "@/store/common/loaderStore";
import SimpleCard from "@/components/common/SimpleCard.vue";
import ArrowCards from "@/components/common/ArrowCards.vue";
import LittleNav from "@/components/common/LittleNav.vue";
import {useRequestsByIDStore} from "@/store/student/requestsByIDStore";
import {useUserByIdStore} from "@/store/common/dataUserStore";
export default {
    data() {
        return {
            listInterships:[],
            title: "Pasantías Populares",
            everyInternshipsAreLoaded: false,
            listRequests: [],
            requestsAccepted: [],
            requestsRejected: [],
            requestsPending: [],
            type: "Pendiente",
            dataUserStore: useUserByIdStore(),
            dataUser:[],
            nombre: "",
            correo: "",
            popularInternships: [],
            allRequests: null,
        };
    },
    components: {
        CardList,
        SimpleCard,
        ArrowCards,
        LittleNav,
    },
    methods: {
        async getData(){
            useLoaderStore().activateLoader();
            const id = $cookies.get("id");
            await this.dataUserStore.getUserByIdUsuario(id);
            this.dataUser = this.dataUserStore.user;
            await useInternshipsByIDStore().loadActiveInternships();
            await useRequestsByIDStore().loadRequestsByIdStudent(this.dataUserStore.user.id);
            await useInternshipsByIDStore().loadPopularInternships();
            this.listInterships = useInternshipsByIDStore().activeInternships;
            this.listRequests = useRequestsByIDStore().requests;
            this.allRequests = useRequestsByIDStore().requests.length;
            this.popularInternships = useInternshipsByIDStore().popularInternships;
            if(this.listRequests != null){
                this.listRequests.forEach(element => {
                if(element.estadopostulacion_id.nombreestadopostulacion == "PENDIENTE"){
                    this.requestsPending.push(element);
                }
                else if(element.estadopostulacion_id.nombreestadopostulacion == "APROBADO"){
                    this.requestsAccepted.push(element);
                }
                else{
                    this.requestsRejected.push(element);
                }
                });
            }
            else{
                this.requestsAccepted = [];
                this.requestsRejected = [];
                this.requestsPending = [];
            }
            this.everyInternshipsAreLoaded = true;
            useLoaderStore().desactivateLoader();
        },
        filterRequests(key){
            if(key == "Todo"){
                this.listRequests = useRequestsByIDStore().requests;
                this.type = "Todo";
            }
            else if(key == "Pendiente"){
                this.listRequests = this.requestsPending;
                this.type = "Pendiente";
            }
            else if(key == "Aceptado"){
                this.listRequests = this.requestsAccepted;
                this.type = "Aceptado";
            }
            else if(key == "Rechazado"){
                this.listRequests = this.requestsRejected;
                this.type = "Rechazado";
            }
        },
        moreInformation(id){
            this.$router.push(`/student/ApplyForAnInternship/${id}`);
        },
        openResume(){
            const link = this.dataUserStore.user.linkcurriculumvitae;
            if(link == null || link == "")
                alert("No tienes una hoja de vida registrada, por favor registra una en la sección de editar perfil");
            else
                window.open(link, '_blank');
        }
    },
    computed: {
        getNombre(){
            //Obtener el primer nombre del estudiante del campo nombres
            try{
                this.nombre = this.dataUser.nombres.split(" ")[0];
            }
            catch{
                this.nombre = "";
            }
            return this.nombre;
        },
        getCorreo(){
            //Obtener el correo del estudiante
            this.correo = this.dataUser.correoelectronico;
            return this.correo;
        },
        
    },
    async mounted(){
        await this.getData();
    },
}
</script>
<style scoped>
.student__principalPage{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    
}
.link{
    text-decoration: none;
    color: #fff;
}
.student__content__internship{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}


/*Estilos para el perfil del estudiante*/
.student__profile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    margin: 0 0 1.5rem 0;
    border-radius: 10px;
    background-color: #Fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dark-theme .student__profile{
    background-color: #434B54;
}
.profile__content__header{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.content__welcome{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
}
.emoji{
    font-size: 2rem;
}
.student__data{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 1rem;
}
.welcome__student{
    font-size: 1.5rem;
    font-weight: 700;
}
.career__student{
    font-size: 1rem;
    font-weight: 400;
}
.content__more{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
}
.profile__button {
  padding: 0.9rem;
  margin: 0.5rem;
  color: #fff;
  cursor: pointer;
  text-align:center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.profile__button:hover {
  background-position: 100% 0;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;
}

.profile__button:focus {
  outline: none;
}

.profile__button.bn23 {
    background-image: linear-gradient(
    to right,
    #25aae1,
    #4481eb,
    #04befe,
    #3f86ed
  );
  box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}
.dark-theme .profile__button.bn23{
    background-image: linear-gradient(
    to right,
    #29323c,
    #485563,
    #2b5876,
    #4e4376
  );
  box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
}

.see_vitae{
    font-size: 1rem;
    font-weight: 700;
    margin-left: 0.5rem;
}
.edit__Profile{
    font-size: 1rem;
    font-weight: 700;
    margin-left: 0.5rem;
}
.summary{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem;
}
.summary__title{
    font-size: 1.5rem;
    font-weight: 700;
}
.summary__content{
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 1rem;
}
.summary__content__number{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    font-size: 3rem;
    font-weight: 700;
}
.summary__content__text{
    font-size: 1rem;
    font-weight: 700;
    margin-left: 0.5rem;
}
/*Estilos para las pasantías del estudiante*/
/*Estilos para las pasantías activas del estudiante*/
.internship__active__by__student{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    margin: 0 0.5rem 1.5rem 0;
    height: 500px; 
    border-radius: 10px;
    background-color: #Fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.dark-theme .internship__active__by__student{
    background-color: #434B54;
}

.container__cards{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
    height: 100%;
    width: 80%;
}
/*Estilos para las solicitudes del estudiante*/
.sector{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.requests__by__student{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    margin: 0 0 1.5rem 0.5rem;
    height: 500px; 
    border-radius: 10px;
    background-color: #Fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.container__requests{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.dark-theme .requests__by__student{
    background-color: #434B54;
}
.container__little__nav{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.container__Arrow{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
}



/* Estilos para dispositivos pequeños (teléfonos) */

@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
    .student__principalPage{
            padding: 0.5rem;
        
    }
    .profile__content__header{
        flex-direction: column;
  }
    .content__welcome{
        width: 100%;
        margin-bottom: 0.3rem;
    }
    .content__more{
        width: 100%;
    }
    .profile__button{
        margin: 0.2rem;
        padding: 0.5rem;
        font-size: 0.4rem;
    }
    .profile__button span{
        font-size: 0.6rem;
    }
    .summary__content{
        flex-wrap: wrap;
    }
    .summary__title{
        font-size: 1rem;
        font-weight: 700;
    }
    .summary__content__number{
        font-size: 1.2rem;
    }
    .summary__content__text{
        font-size: 0.6rem;
    }
    .career__student{
    font-size: 0.5rem;
    font-weight: 400;
}

    .sector{
        flex-direction: column;
    }
    .internship__active__by__student{
        flex:auto  ;
        margin: 0 0 1.5rem 0;
    }
    .requests__by__student{
        flex:auto  ;
        margin: 0 0 1.5rem 0;
    }





}

/* Estilos para tabletas */
@media only screen and (min-width: 600px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
  .student__principalPage{
        padding: 1rem;
    
  }
  .profile__content__header{
        flex-direction: column;
  }
    .content__welcome{
        width: 100%;
        margin-bottom: 0.5rem;
    }
    .content__more{
        width: 100%;
    }
    .profile__button{
        margin: 0.3rem 0.3rem;
        padding: 0.8rem;
        font-size: 0.6rem;
    }
    .profile__button span{
        font-size: 0.8rem;
    }
    .summary__content{
        flex-wrap: wrap;
    }
    .summary__title{
        font-size: 1.3rem;
        font-weight: 700;
    }
    .summary__content__number{
        font-size: 1.5rem;
    }
    .summary__content__text{
        font-size: 0.8rem;
    }
    .sector{
        flex-direction: column;
    }
    .internship__active__by__student{
        margin: 0 0 1.5rem 0;
        flex: auto;
    }
    .requests__by__student{
        margin: 0 0 1.5rem 0;
        flex: auto;
    }
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
  .student__principalPage{
        padding: 1.5rem;
  }
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */
}



</style>