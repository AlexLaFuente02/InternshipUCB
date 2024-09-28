<template>
   
 
         <div class="card-inicio">
         <div class="card">
           <h1>Solicitudes rechazadas de convocatorias</h1>
           <div class="EmpresasDestacadas">
            
             <div v-for="card in listInternship" :key="card.id" v-if="everyInternshipsAreLoaded" class="company-cards-container">
         
         <CardsSoli 
         :id="card.id"
         :b="card.institucion.nombreinstitucion" 
         :c="card.areapasantia "
         :a="card.tiempoacumplir.descripcion"
         :d="card.fechasolicitud"
         :e="card.fechaseleccionpasante"
         />
       
         </div>
        
       </div>
       <div class="container__button">
           <Button 
             text="Revisa tus convocatorias pendientes" 
             :color="1" 
             :disabled="false"
             @option-selected="Convocatorias">
           </Button>
         </div>
         </div>
       </div>
     
         
         <div class="card-inicio">
         <div class="card">
           <h1>Solicitudes rechazadas de empresas</h1>
           <div class="EmpresasDestacadas">
            
         <div v-for="card in listInstitution" :key="card.id" v-if="everyInternshipsAreLoaded" class="company-cards-container">
           
         <CardsEmpresa 
         :a="card.id "
         :b="card.nombreinstitucion "
         :c="card.nombrecontacto "
         :d="card.correocontacto "
         :e="card.celularcontacto "/>
         
         </div>
       
       </div>
       <div class="container__button">
           <Button 
             text="Revisa tus empresas pendientes " 
             :color="0" 
             :disabled="false"
             @option-selected="Empresas"
             >
           </Button>
         </div>
         </div>
       </div>
  
 
           
 
       
 
   </template>
   <script>
   import CardsEmpresa from "../../components/common/CardsEmpresa.vue";
   import CardsSoli from "@/components/common/CardsSoli.vue";
   import Carousel from "@/components/common/Carousel.vue";
   import Button from "@/components/common/Button.vue";
   import SimpleCard from "@/components/common/SimpleCard.vue";
   import { useLoaderStore } from "@/store/common/loaderStore";
   import {UseUseiInternshipStore }from "@/store/usei/UseiInternshipStore";
   import { UseUseiInstitutionStore } from "@/store/usei/UseiInstitutionStore";
   export default {
     components: {
       Carousel,
       SimpleCard,
       Button,
       CardsEmpresa,
       CardsSoli
       
     },
     data() {
       return {
         listInstitution: [],
         listInternship: [],
         everyInternshipsAreLoaded: false,
         PhotoService:[
         {
               itemImageSrc: 'https://www.animafestexperience.net/internshipsabroad/wp-content/uploads/2019/08/ANIMAFEST-PASANTIAS-REMUNERADAS-min-min-800x333.jpg',
               thumbnailImageSrc: 'https://www.animafestexperience.net/internshipsabroad/wp-content/uploads/2019/08/ANIMAFEST-PASANTIAS-REMUNERADAS-min-min-800x333.jpg',
               alt: 'Explota todas tus habilidades ¡Enhorabuena!',
               title: '¡Bienvenido al Mundo Laboral!'
             },
             {
               itemImageSrc: 'https://idiomasseif.com/wp-content/uploads/2019/04/importancia-del-ingles-en-el-mundo-laboral.jpg',
               thumbnailImageSrc: 'https://idiomasseif.com/wp-content/uploads/2019/04/importancia-del-ingles-en-el-mundo-laboral.jpg',
               alt: 'Renueva tu empresa con los mejores estudiantes del país.',
               title: '¡Como institución puedes contratar a estudiantes y graduados!'
             },
             {
               itemImageSrc: 'https://media.gq.com.mx/photos/642447f1c632255eae24a045/master/w_1920,c_limit/trabajo.jpg',
               thumbnailImageSrc: 'https://media.gq.com.mx/photos/642447f1c632255eae24a045/master/w_1920,c_limit/trabajo.jpg',
               alt: '¡Estamos seguros de que pronto encontraras tu lugar...!',
               title: '¡Muéstranos todo lo que sabes!'
             },
         ],
       };
     },
     methods: {
       createAccount(option) {
         if (option) {
           console.log("createAccount");
           this.$router.push("/UserRegister");
         }
       },
       Empresas(option) {
       if (option) {
         console.log("createAccount");
         this.$router.push("/usei/Business");
       }
     },
     Convocatorias(option) {
       if (option) {
         console.log("createAccount");
         this.$router.push("/usei/InternshipApp");
       }
     },
     async getData() {
      useLoaderStore().activateLoader();
      await UseUseiInternshipStore().LoadRechazadoInternship();
      this.listInternship = UseUseiInternshipStore().InternshipList.result;
       await UseUseiInstitutionStore().LoadRechazadoInstitutions();
        this.listInstitution = UseUseiInstitutionStore().InstitutionList.result;
        this.everyInternshipsAreLoaded = true;
      useLoaderStore().desactivateLoader();
    },
     },
     created() {
       this.getData();
     },
   };
 </script>
   <style scoped>
    
   
   @media screen and (max-width: 1250px) {
     .container__header__page{
       flex-direction: column;
     }
     .container__header__description{
       padding: 3% 7%;
     }
     .container__carrousel {
       width: 400px;
       height: 300px;
     }
     .container__problem{
       flex-direction: column-reverse;
     }
     .container__problem__description{
       padding: 3% 7%;
     }
     .container__problem__image{
       padding: 3% 7%;
     }
     .container__problem__image img{
       width: 300px;
       height: 200px;
     }
     .container__solution{
       flex-direction: column;
     }
     .container__solution__description{
       padding: 3% 7%;
     }
     .company-logo{
       height: 400px;
     }
     .student__profile{
       padding-bottom: 70%;
     }
   }
 
   @media screen and (max-width: 1025px) {
     
     .company-logo{
       height: 10%;
     }
   }
 
   @media screen and (max-width: 768px) {
     .container__header__page{
       flex-direction: column;
     }
     .container__header__description{
       padding: 3% 7%;
     }
     .container__carrousel {
       width: 300px;
       height: 200px;
     }
     .container__problem{
       flex-direction: column-reverse;
     }
     .container__problem__description{
       padding: 3% 7%;
     }
     .container__problem__image{
       padding: 3% 7%;
     }
     .container__problem__image img{
       width: 200px;
       height: 150px;
     }
     .container__solution{
       flex-direction: column;
     }
     .container__solution__description{
       padding: 3% 7%;
     }
   }
   @media screen and (max-width: 425px) {
     .container__header__page{
       flex-direction: column;
     }
     .container__header__description{
       padding: 3% 7%;
     }
     .container__carrousel {
       width: 200px;
       height: 150px;
     }
     .container__problem{
       flex-direction: column-reverse;
     }
     .container__problem__description{
       padding: 3% 7%;
     }
     .container__problem__image{
       padding: 3% 7%;
     }
     .container__problem__image img{
       width: 150px;
       height: 100px;
     }
     .container__solution{
       flex-direction: column;
     }
     .container__solution__description{
       padding: 3% 7%;
     }
   }
   @media screen and (max-width: 375px) {
     .container__header__page{
       flex-direction: column;
     }
     .container__header__description{
       padding: 3% 7%;
     }
     .container__carrousel {
       width: 200px;
       height: 150px;
     }
     .container__problem{
       flex-direction: column-reverse;
     }
     .container__problem__description{
       padding: 3% 7%;
     }
     .container__problem__image{
       padding: 3% 7%;
     }
     .container__problem__image img{
       width: 150px;
       height: 100px;
     }
     .container__solution{
       flex-direction: column;
     }
     .container__solution__description{
       padding: 3% 7%;
     }
   }
   /**ARREGLO0S   DE COSAS */
   
   /* Estilos para la página de inicio de sesión */
   @media (max-width: 480px) {
     .top-section {
       flex-direction: column;
       align-items: center;
     }
   
     .left-section {
       width: 100%;
     }
   
     .right-section {
       width: 100%;
       text-align: center;
     }
   
     .company-logo {
       margin-top: 15px;
     }
   }
     
     .company-logo {
       height: 100%;
     }
     
     
     h3 {
       font-size: 18px;
       color: #333;
       text-align: center;
       margin-bottom: 10px;
     }
     
 
     
     @media (max-width: 370px) {
       .company-logo {
       height: 70px;
      
     }}
   
     @media (max-width: 700px) {
       .company-logo {
       max-width:auto;
     }}
     @media (max-width: 275px) {
       .company-logo {
         margin-top: 50px;
      height: 50px;
     }
     
   }
 .h1{
   margin-top: 10%;
   margin-bottom: 10px;
 }
   /**prueba */
 
   .student__principalPage{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     padding: 2rem;
     
 }
 .card-inicio{
   padding: 1rem;
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
     justify-content: center;
     align-items: center;
     width: 100%;
     padding: 1rem;
     border-radius: 10px;
     background-color: #Fff;
     padding-top: 3%;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
 }
 
 .card{
   width: 100%;
     border-radius: 10px;
  padding:3% ;
     background-color: #Fff;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);}
 
 
 .dark-theme .card{
     background-color: #434B54;
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
     padding-bottom: 10%;
 }
 .profile__content__header1{
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     width: 100%;
     padding-bottom: 10%;
 }
 
 .content__welcome{
     display: flex;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     width: 50%;
 }
 
 .student__data{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     margin-left: 1rem;
 }
 .welcome__student{
     font-size: 1.5rem;
     font-weight: 700;
 }
 .career__student{
     font-size: 1rem;
     font-weight: 400;
     margin-top: 10px;
     margin-bottom: 30px;
     height: 20px;
 
 }
 .career__student1{
     font-size: 1rem;
     font-weight: 400;
     height:100px;
     width: 100%;
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
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 100%;
     padding: 0.5rem;
     margin: 0 0 1.5rem 0;
     height: 500px; 
     border-radius: 10px;
     background-color: #Fff;
     box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
 }
 .dark-theme .internship__active__by__student{
     background-color: #434B54;
 }
 .internship__active__by__student h1{
     font-size: 1.5rem;
     font-weight: 700;
     margin: 1rem;
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
 
 .requests__by__student{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     width: 100%;
     padding: 0.5rem;
     margin: 0 0 1.5rem 0;
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
 
 
 
 
 
 }
 
 @media only screen and (max-width: 480px) {
   /* Estilos específicos para dispositivos pequeños */
     .student__profile{
            flex-direction: column;
     }
     
 }
 @media only screen and (max-width: 451px) {
   /* Estilos específicos para dispositivos pequeños */
   .profile__content__header{
    
    padding-bottom: 20%;
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
 }
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
 
 .EmpresasDestacadas {
  border-radius: 10px;
     /*box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);*/
     background: #434B54;
     margin-bottom: 20px;
     padding: 10px;
    
 }
 .EmpresasDestacadas {
   background-color: #Fff;
     
 }
 
 .dark-theme .EmpresasDestacadas {
  background: #434B54;     
 }
 .company-cards-container {
   display:inline-flex;
 }
 .container__button{
   display: flex;
     flex-direction: row;
     align-items: center;
     text-decoration: none;
     justify-content: space-around;
 }
 .button{
   height: 50px;
 }
 
 
 @media screen and (max-width: 380px){
   
   .EmpresasDestacadas{
     padding: 0.5rem;
   }
 
 }
 @media screen and (max-width: 360px){
   
   .profile__content__header{
    
     padding-bottom: 20%;
 }
 
 }
 .dark-theme .company-logo{
   filter:invert(20%) sepia(100%) saturate(100%) hue-rotate(220deg);
 }
 @media screen and (max-width: 335px){
   
   .profile__content__header{
    
     padding-bottom: 30%;
 }
 
 }
 @media screen and (max-width: 300px){
   
   .profile__content__header{
    
     padding-bottom: 40%;
 }
 
 }
 
 
 
 @media screen and (max-width: 540px){
   
   .student__profile{
     padding-top: 10%;
       padding-bottom: 10%;
     }
 
 }
 
 
 </style>