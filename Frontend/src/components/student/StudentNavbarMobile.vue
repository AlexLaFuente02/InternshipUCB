<template >
    <header class="container__header">
        <div class="container__menu">
            <div class="container__menu--profile">
                <font-awesome-icon :icon="['fas', 'bars']" @click="toggleMobileMenuL" size="2xl"/>
            </div>
        </div>
        <div class="container__logo">
            <router-link to="/student">
                <img
                src="../images/USEI.png"
                alt="Unidad de Servicios Estudiantiles Integrales"
            />
            </router-link>
        </div>
        <div class="container__menu">
            <div class="container__menu--profile" @click="toggleMobileMenuR" >
                <font-awesome-icon :icon="['fas', 'circle-user']" size="2xl"/>
            </div>
        </div>
    </header>
    <div class="menu__student" v-show="showMobileMenuLeft">
        <div class="container__logo">
            <router-link to="/student" @click="closeMobileMenu">
                <img
                src="../images/USEI.png"
                alt="Unidad de Servicios Estudiantiles Integrales"
            />
            </router-link>
        </div>
        <nav class="container__nav" >
                <ul class="nav__list" >
                    <li class="nav__item" @click="closeMobileMenu">
                        <router-link class="link" to="/student">
                            <font-awesome-icon :icon="['fas', 'house']" 
                            size="xl"
                            />
                            <span class="nav__name">Inicio</span>
                        </router-link>
                    </li>
                    <li class="nav__item" @click="closeMobileMenu">
                        <router-link class="link" to="/student/institutions">
                            <font-awesome-icon :icon="['fas', 'building']" size="xl"/>
                            <span class="nav__name">Instituciones</span>
                        </router-link>
                    </li>
                    <li class="nav__item" @click="closeMobileMenu">
                        <router-link class="link" to="/student/internships">
                            <font-awesome-icon :icon="['fas', 'briefcase']" size="xl"/>
                            <span class="nav__name">Pasantías</span>
                        </router-link>
                    </li>
                    <li class="nav__item" @click="closeMobileMenu">
                        <router-link class="link" to="/student/applications">
                            <font-awesome-icon :icon="['fas', 'file-alt']" size="xl"/>
                            <span class="nav__name">Solicitudes</span>
                        </router-link>
                    </li>
                </ul>
        </nav>
    </div>
    <div class="container__sidebar" v-show="showMobileMenuRight">
                <div class="container__sidebar--profile">
                    <div class="container__sidebar--profile__image">
                        <font-awesome-icon :icon="['fas', 'circle-user']" />
                    </div>
                    <div class="container__sidebar--profile__name">
                        <span>{{ this.username }}</span>
                    </div>
                </div>
                <div class="container__sidebar--options">
                    <ul class="container__menu--options"  >
                        <li class="container__menu--options__item" @click="closeMobileMenu">
                            <router-link class="link" to="/student/profile">
                                <font-awesome-icon :icon="['fas', 'user']" />
                                <span>Perfil</span>
                            </router-link>
                        </li>
                        <li class="container__menu--options__item" @click="closeMobileMenu">
                            <router-link class="link" to="/student/settings">
                                <font-awesome-icon :icon="['fas', 'gear']" />
                                <span>Configuración</span>
                            </router-link>
                        </li>
                        <!--Modo oscuro-->
                        <li class="container__menu--options__item" @click="toggleDarkMode" v-if="isDarkMode">
                            <div class="container__menu--options__item__dark-mode">
                                <font-awesome-icon :icon="['fas', 'moon']" />
                                <span>Modo oscuro</span>
                            </div>
                        </li>
                        <li class="container__menu--options__item" @click="toggleDarkMode" v-else>
                            <div class="container__menu--options__item__dark-mode">
                                <font-awesome-icon :icon="['fas', 'sun']" />
                                <span>Modo claro</span>
                            </div>
                        </li>
                        <li>
                            <div class="container__button">
                                <Button 
                                    text="Cerrar sesi&oacute;n" 
                                    :color="1" 
                                    :disabled="false"
                                    @option-selected="logoutA"
                                    >
                                </Button>
                            </div>
                        </li>
                
                    </ul>
                </div>
            </div>
</template>
<script>
import { useMobileMenuStore } from "../../store/common/mobileMenuStore";
import { useThemeStore } from "@/store/common/useThemeStore";
import { useLoginStore } from "@/store/common/loginStore";
import Button from "@/components/common/Button.vue";
import {logout} from "@/services/common";
export default {
    name: "NavbarCommonMobile",
    components: {
        Button,
    },
    data() {
        return {
            isDarkMode: false,
            username: "Estudiante",
        };
    },
    methods: {
        toggleMobileMenuL() {
            useMobileMenuStore().toggleMenuLeft();
            useMobileMenuStore().toggleMobileMenu();
        },
        toggleMobileMenuR() {
            useMobileMenuStore().toggleMenuRight();
            useMobileMenuStore().toggleMobileMenu();
        },
        closeMobileMenu() {
            useMobileMenuStore().closeMobileMenu();
        },
        createAccount(option) {
            if (option) {
                console.log("createAccount");
                this.$router.push("/UserRegister");
                this.closeMobileMenu();
            }
        },
        login(option) {
            if (option) {
                console.log("login");
                this.$router.push("/Login");
                this.closeMobileMenu();
            }
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            useThemeStore().toggleDarkMode();
        },
        async logoutA(){
            logout();
            /*Logout*/
            $cookies.remove("id");
            $cookies.remove("type");
            $cookies.remove("connect.sid");
            $cookies.remove("username");
            useLoginStore().setLogin(0);
            this.closeMobileMenu();
            await this.$router.push("/");
            await this.$router.go();
            
            /*Fin del logout*/
        },
    },
    computed: {
        showMobileMenuLeft() {
            return useMobileMenuStore().menuLeft;
        },
        showMobileMenuRight() {
            return useMobileMenuStore().menuRight;
        },

    },
}
</script>
<style scoped>
/*Estilos del header*/
.container__header{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  border-radius: 7px;
  box-shadow: 0 24px 64px -2px rgba(0, 0, 0, 0.02),
    0 6px 16px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease 0s;
  position: sticky;
  top: 0;
  background-color: #FDFEFF;
  color: #515c67;
  z-index: 1;
  justify-content: space-between;
}
/*Modo oscuro*/
.dark-theme header{
    background-color: #434B54;
    color: #CACFDB;
}
.container__header .container__logo img{
    width: 150px;
    height: auto;
    transition: all 0.3s ease 0s;
}
.dark-theme .container__logo{
    filter: invert(20%) sepia(100%) saturate(100%) hue-rotate(220deg);
}

.container__header .container__logo img:hover{
    transform: scale(1.1);
}
.container__header .container__menu--profile:hover{
    transform: scale(1.1);
}
.container__header .container__menu--profile svg{
    font-size: 1.7rem;
    font-weight: 700;
    color: #515c67;
}
.dark-theme .container__header .container__menu--profile svg{
    color: #CACFDB;
}
/*Fin del header*/
/*Sidebar de la izquierda*/
.menu__student{
    position: fixed;
    transition: all 0.3s ease 0s;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #FDFEFF;
    padding: 1rem;
    border-right: 1px solid rgba(255,255,255,.1);
    box-shadow: 0 24px 64px -2px rgba(0, 0, 0, 0.02),
    0 6px 16px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.08);
    
}
.dark-theme .menu__student{
    background-color: #434B54;
}
.menu__student .container__logo img{
    width: 150px;
    height: auto;
    transition: all 0.3s ease 0s;
}
.menu__student .container__logo img:hover{
    transform: scale(1.1);
}
.menu__student .container__nav{
    width: 100%;
    margin-top: 1rem;
    overflow: auto;
}
.menu__student .container__nav .nav__list{
    list-style: none;
    padding: 0;
    margin: 0;
}
.menu__student .container__nav .nav__item{
    width: 100%;
    padding: 0.5rem 0;
    border-radius: 7px;
}
.menu__student .container__nav .nav__item:hover{
    background-color: #CACFDB;
}
.dark-theme .menu__student .container__nav .nav__item:hover{
    background-color: #515c67;
}
.menu__student .container__nav .nav__item .link{
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 7px;
}
.link .nav__name{
    margin-left: 1rem;
    text-decoration: none;
    color: #515c67;
}
.dark-theme .link .nav__name{
    color: #CACFDB;
}

.menu__student .container__nav .nav__item .link svg{
    color: #515c67;
}
.dark-theme .menu__student .container__nav .nav__item .link svg{
    color: #CACFDB;
}
.menu__student .container__nav .nav__item .link svg:hover{
    color: #515c67;
}
/*Fin del sidebar de la izquierda*/
/*Sidebar de la derecha*/
.container__sidebar{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #FDFEFF;
    z-index: 3;
}
.dark-theme  .container__sidebar{
    background-color: #434B54;
}
 .container__sidebar .container__sidebar--profile{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
}
 .container__sidebar .container__sidebar--profile .container__sidebar--profile__image{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
}
 .container__sidebar .container__sidebar--profile .container__sidebar--profile__image svg{
    font-size: 2rem;
    font-weight: 700;
    color: #515c67;
}
.dark-theme  .container__sidebar .container__sidebar--profile .container__sidebar--profile__image svg{
    color: #CACFDB;
}
 .container__sidebar .container__sidebar--profile .container__sidebar--profile__name{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    

}
 .container__sidebar .container__sidebar--profile .container__sidebar--profile__name span{
    font-size: 1rem;
    font-weight: 700;
    color: #515c67;

}
.dark-theme .container__sidebar .container__sidebar--profile .container__sidebar--profile__name span{
    color: #CACFDB;
}
 .container__sidebar .container__sidebar--options{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem;
}
 .container__sidebar .container__sidebar--options .container__menu--options{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    list-style: none;
    padding: 0;
    margin: 0;
}

.container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}
 .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item:hover{
    transform: scale(1.1);
}
 .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item svg{
    font-size: 1.5rem;
    font-weight: 700;
    color: #515c67;
    margin-right: 1rem;
}
.dark-theme  .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item svg{
    color: #CACFDB;
}
 .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item span{
    font-size: 1rem;
    font-weight: 700;
    color: #515c67;
}
.dark-theme  .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item span{
    color: #CACFDB;
}
 .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link{
    text-decoration: none;
    color: #515c67;
}
.dark-theme .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link{
    color: #CACFDB;
}
 .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link:hover{
    text-decoration: underline;
}
 .container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link:active{
    text-decoration: underline;
}
.container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link:visited{
    text-decoration: underline;
}
.container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link:focus{
    text-decoration: underline;
}
.container__sidebar .container__sidebar--options .container__menu--options .container__menu--options__item .link:link{
    text-decoration: underline;
}
ul {
    list-style-type: none;
}
li {
    width: 100%;
}


.container__sidebar .container__sidebar--options .container__menu--options .container__button{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    width: 100%;
}
/*Fin del sidebar de la derecha*/
/*Media queries*/



</style>