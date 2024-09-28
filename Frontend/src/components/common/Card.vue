<template>
    <div class="card">
        <div class="container__card">
            <div class="header__card">
                <div class="time__card">
                    <font-awesome-icon :icon="['fas', 'calendar-xmark']" size="2xl" />
                    <h4>{{this.informationCard.fechaseleccionpasante}}</h4>
                </div>
                <div class="state_card" :class="getStateCardClass">
                    <h4>{{ this.informationCard.estadoconvocatoria.nombreestadoconvocatoria }}</h4>
                </div>
            </div>
            <div class="body__card">
                <div class="img__card">
                    <img src="https://pbs.twimg.com/profile_images/1026937398855389186/1fpmfMrK_400x400.jpg" alt="Imagen de la empresa">
                </div>
                <div class="description__card">
                    <div class="description__content">
                        <p>{{ this.informationCard.descripcionfunciones }}</p>
                    </div>
                </div>
            </div>
            <div class="footer__card">
                <div class="company__card">
                    <font-awesome-icon :icon="['fas', 'building']" size="xl"/>
                    <p>{{this.informationCard.institucion.nombreinstitucion}}</p>
                </div>
                <Button 
                    text="Más información" 
                    :color="0" 
                    :disabled="false"
                    @option-selected="moreInformation"
                    >
                </Button>
                
            </div>
        </div>
    </div>
</template>
<script>
import Button from "@/components/common/Button.vue";
export default {
    emits: ['more-information'],
    components: {
        Button,
    },
    data() {
        return {
            informationCard:[],
            informationCard: {
                estadoconvocatoria: {
                nombreestadoconvocatoria: "ACTIVA" 
                }
            }
        };
    },
    methods: {
        getData(){
            this.informationCard = this.internship;
        },
        moreInformation(){
            this.$emit('more-information', this.informationCard.id);
        }
    },
    props: {
        internship: {
            type: Object,
            required: true,
        },
    },
    created(){
        this.getData();
    },
    computed: {
        getStateCardClass() {
            return {
                state_card: true,
                'activa': this.informationCard.estadoconvocatoria.nombreestadoconvocatoria === 'ACTIVA',
                'inactiva': this.informationCard.estadoconvocatoria.nombreestadoconvocatoria === 'INACTIVA',
                'pendiente': this.informationCard.estadoconvocatoria.nombreestadoconvocatoria === 'PENDIENTE',
            };
        },
    },
}
</script>
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.card{
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    height: 500px;
}
    .img__card{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .img__card img{
        object-fit: cover;
        width: 150px!important;
        border-radius: 15px;
        box-shadow: 0 4px 10px #00000008,0 0 2px #0000000f,0 2px 6px #0000001f!important;
    }
    .container__card{
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #383838;
    }
    .container__card:hover{
        scale: 1.1;
        transition: 0.5s;
        letter-spacing: 1px;
    }
    .dark-theme .container__card{
        background-color: #434B54;
    }
    .header__card{
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .time__card{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .time__card h4{
        margin-left: 14px;
    }
    .state_card{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 0.5rem;
    }
    .activa{
        background: #C8E6C9;
        border-radius: 5px;
        color: #256029;
    }
    .inactiva{
        background: #FFCDD2;
        border-radius: 5px;
        color: #C62828;
    }
    .pendiente{
        background: #FFF9C4;
        border-radius: 5px;
        color: #F9A825;
    }


    .state_card h4{
        margin: 0;
    }
    
    .body__card{
        width: 100%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .description__card{
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

    }
    .description__content{
        height: 100px;
        overflow-y: auto;
    }
    .description__card p{
        font-size: 1rem!important;
        font-weight: 400;
        text-align: center;
    }
    .footer__card{
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .company__card{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .company__card p{
        margin-left: 14px;
        font-weight: bold;
    }
/* Estilos para dispositivos pequeños (teléfonos) */
@media only screen and (max-width: 600px) {
  /* Estilos específicos para dispositivos pequeños */
    .card{
        width: 100%;
        height: 350px;
        padding: 0.5rem;
    }
.img__card img{
    height: 100px;
    width: 100px!important;
}
.description__card p{
    font-size: 0.8rem!important;
}
.header__card{
    display: none;
}
.body__card{
    height: auto;
}
.footer__card{
    height: auto;
    flex-direction: column;
}
.container__card{
    padding: 0.5rem;
    
}
.container__card:hover{
    scale: 1;
    transition: none;
    letter-spacing: 0px;
}

}

/* Estilos para tabletas */
@media only screen and (min-width: 601px) and (max-width: 1024px) {
  /* Estilos específicos para tabletas */
    .card{
        width: 50%;
        height: 400px;
    }
    .header__card{
        height: auto;
    }
    .header__card h4{
        font-size: 0.6rem;
    }
    .img__card img{
        height: 100px;
        object-fit: cover;
        width: 150px!important;
    }
}

/* Estilos para dispositivos medianos */
@media only screen and (min-width: 1025px) and (max-width: 1440px) {
  /* Estilos específicos para dispositivos medianos */
    .card{
        width: 50%;
    }
}

/* Estilos para dispositivos grandes (pantallas de escritorio) */
@media only screen and (min-width: 1441px) {
  /* Estilos específicos para dispositivos grandes */

}
</style>