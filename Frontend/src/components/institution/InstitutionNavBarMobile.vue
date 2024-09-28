<template>
  <header class="header-container">
    <div class="container__menu">
      <div class="container__menu--profile">
        <font-awesome-icon
          :icon="['fas', 'bars']"
          @click="toggleMobileMenuL"
          size="2xl"
        />
      </div>
    </div>
    <div class="logo-container">
      <router-link to="/institution/home">
        <img
          src="../images/USEI.png"
          alt="Unidad de Servicios Estudiantiles Integrales"
        />
      </router-link>
    </div>
    <div class="container__menu">
      <div class="container__menu--profile" @click="toggleMobileMenuR">
        <font-awesome-icon :icon="['fas', 'circle-user']" size="2xl" />
      </div>
    </div>
  </header>
  <div class="institution-menu" v-show="showMobileMenuLeft">
    <div class="logo-container">
      <router-link to="/institution/home" @click="closeMobileMenu">
        <img
          src="../images/USEI.png"
          alt="Unidad de Servicios Estudiantiles Integrales"
        />
      </router-link>
    </div>
    <nav class="nav-container">
      <ul class="nav-list">
        <li class="nav-item" @click="closeMobileMenu">
          <router-link class="link" to="/institution/home">
            <font-awesome-icon :icon="['fas', 'house']" size="xl" />
            <span class="nav-direction">Inicio</span>
          </router-link>
        </li>
        <li class="nav-item" @click="showDropdownCallList">
          <span class="link">
            <font-awesome-icon :icon="['fas', 'briefcase']" size="xl" />
            <span class="nav-direction">Convocatorias</span>
          </span>
          <ul class="dropdown-menu" v-if="dropdownButton.showDropdownMenu">
            <router-link
              to="/institution/Convocatoria"
              class="dropdown-link"
              @click="handleClick"
            >
              <li class="dropdown-item">Tus Convocatorias</li>
            </router-link>

            <router-link
              to="/institution/addConvocatoria"
              class="dropdown-link"
              @click="handleClick"
            >
              <li class="dropdown-item">Agregar Convocatoria</li>
            </router-link>
          </ul>
        </li>
        <li class="nav-item" @click="closeMobileMenu">
          <router-link class="link" to="/institution/InternshipFilter">
            <font-awesome-icon :icon="['fas', 'users']" size="xl" />
            <span class="nav-direction">Solicitudes</span>
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
      <ul class="container__menu--options">
        <li class="container__menu--options__item" @click="closeMobileMenu">
          <router-link class="link" to="/institution/Profile">
            <font-awesome-icon :icon="['fas', 'user']" />
            <span>Perfil</span>
          </router-link>
        </li>
        <li class="container__menu--options__item" @click="closeMobileMenu">
          <router-link class="link" to="/institution/Settings">
            <font-awesome-icon :icon="['fas', 'gear']" />
            <span>Configuración</span>
          </router-link>
        </li>
        <!--Modo oscuro-->
        <li
          class="container__menu--options__item"
          @click="toggleDarkMode"
          v-if="isDarkMode"
        >
          <div class="container__menu--options__item__dark-mode">
            <font-awesome-icon :icon="['fas', 'moon']" />
            <span>Modo oscuro</span>
          </div>
        </li>
        <li
          class="container__menu--options__item"
          @click="toggleDarkMode"
          v-else
        >
          <div class="container__menu--options__item__dark-mode">
            <font-awesome-icon :icon="['fas', 'sun']" />
            <span>Modo claro</span>
          </div>
        </li>
        <li>
          <div class="button-container">
            <Button
              text="Cerrar sesi&oacute;n"
              :color="1"
              :disabled="false"
              @option-selected="logout"
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
import Button from "@/components/common/Button.vue";
import { useLoginStore } from "@/store/common/loginStore";
export default {
  name: "InstitutionNavbarMobile",
  components: {
    Button,
  },
  data() {
    return {
      isDarkMode: false,
      dropdownButton: {
        showDropdownMenu: false,
      },
      username: "EMPRESA",
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
    logout() {
      /*Logout*/
      $cookies.remove("id");
      $cookies.remove("type");
      $cookies.remove("connect.sid");
      $cookies.remove("username");
      $cookies.remove("institutionID");
      useLoginStore().setLogin(0);
      this.$router.push("/");
      this.closeMobileMenu();
      /*Fin del logout*/
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      useThemeStore().toggleDarkMode();
    },
    showDropdownCallList() {
      this.dropdownButton.showDropdownMenu =
        !this.dropdownButton.showDropdownMenu;
    },
    handleClick() {
      if (this.showDropdownCallList) {
        this.closeMobileMenu();
      }
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
};
</script>

<style scoped>
/*Estilos del header*/
.header-container {
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
  background-color: #fdfeff;
  color: #515c67;
  z-index: 1;
  justify-content: space-between;
}

/*Modo oscuro*/
.dark-theme header {
  background-color: #434b54;
  color: #cacfdb;
}
.header-container .logo-container img {
  width: 150px;
  height: auto;
  transition: all 0.3s ease 0s;
}
.dark-theme .logo-container {
  filter: invert(20%) sepia(100%) saturate(100%) hue-rotate(220deg);
}

.header-container .logo-container img:hover {
  transform: scale(1.1);
}
.header-container .container__menu--profile:hover {
  transform: scale(1.1);
}
.header-container .container__menu--profile svg {
  font-size: 1.7rem;
  font-weight: 700;
  color: #515c67;
}
.dark-theme .header-container .container__menu--profile svg {
  color: #cacfdb;
}
/*Fin del header*/

/*Sidebar de la izquierda*/
.institution-menu {
  position: fixed;
  transition: all 0.3s ease 0s;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fdfeff;
  padding: 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 64px -2px rgba(0, 0, 0, 0.02),
    0 6px 16px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.08);
}
.dark-theme .institution-menu {
  background-color: #434b54;
}
.institution-menu .logo-container img {
  width: 150px;
  height: auto;
  transition: all 0.3s ease 0s;
}
.institution-menu .logo-container img:hover {
  transform: scale(1.1);
}
.institution-menu .nav-container {
  width: 100%;
  margin-top: 1rem;
  overflow: auto;
}
.institution-menu .nav-container .nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.institution-menu .nav-container .nav-item {
  width: 100%;
  padding: 0.5rem 0;
  border-radius: 7px;
}
.institution-menu .nav-container .nav-item:hover {
  background-color: #e4e4e4;
}
.institution-menu .nav-container .nav-item:active {
  background: none;
}
.dark-theme .institution-menu .nav-container .nav-item:hover {
  background-color: #515c67;
}
.dark-theme .institution-menu .nav-container .nav-item:active {
  background: none;
}
.institution-menu .nav-container .nav-item .link {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 7px;
}
.link .nav-direction {
  margin-left: 1rem;
  text-decoration: none;
  color: #515c67;
}
.dark-theme .link .nav-direction {
  color: #cacfdb;
}

.institution-menu .nav-container .nav-item .link svg {
  color: #515c67;
}
.dark-theme .institution-menu .nav-container .nav-item .link svg {
  color: #cacfdb;
}
.institution-menu .nav-container .nav-item .link svg:hover {
  color: #515c67;
}
/*Fin del sidebar de la izquierda*/

/*Sidebar de la derecha*/
.container__sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fdfeff;
  z-index: 3;
}

.dropdown-menu {
  position: relative;
  width: 90%;
  margin: 0 auto;
  background-color: white;
  padding: 0;
  text-align: center;
}

.dropdown-item {
  padding: 7% 10%;
}

.dropdown-link {
  color: black;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: rgba(90, 97, 106, 0.7);
  color: #fff;
}

.dropdown-link:active {
  background-color: aqua;
}

.dark-theme .container__sidebar {
  background-color: #434b54;
}
.container__sidebar .container__sidebar--profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
}
.container__sidebar
  .container__sidebar--profile
  .container__sidebar--profile__image {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.container__sidebar
  .container__sidebar--profile
  .container__sidebar--profile__image
  svg {
  font-size: 2rem;
  font-weight: 700;
  color: #515c67;
}
.dark-theme
  .container__sidebar
  .container__sidebar--profile
  .container__sidebar--profile__image
  svg {
  color: #cacfdb;
}
.container__sidebar
  .container__sidebar--profile
  .container__sidebar--profile__name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.container__sidebar
  .container__sidebar--profile
  .container__sidebar--profile__name
  span {
  font-size: 1rem;
  font-weight: 700;
  color: #515c67;
}
.dark-theme
  .container__sidebar
  .container__sidebar--profile
  .container__sidebar--profile__name
  span {
  color: #cacfdb;
}
.container__sidebar .container__sidebar--options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
}
.container__sidebar .container__sidebar--options .container__menu--options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
  margin: 0;
}

.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item:hover {
  transform: scale(1.1);
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  svg {
  font-size: 1.5rem;
  font-weight: 700;
  color: #515c67;
  margin-right: 1rem;
}
.dark-theme
  .container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  svg {
  color: #cacfdb;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  span {
  font-size: 1rem;
  font-weight: 700;
  color: #515c67;
}
.dark-theme
  .container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  span {
  color: #cacfdb;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link {
  text-decoration: none;
  color: #515c67;
}

.dark-theme .dropdown-menu {
  background-color: #434b54;
}

.dark-theme .dropdown-item {
  color: #cacfdb;
}

.dark-theme
  .container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link {
  color: #cacfdb;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link:hover {
  text-decoration: underline;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link:active {
  text-decoration: underline;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link:visited {
  text-decoration: underline;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link:focus {
  text-decoration: underline;
}
.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .container__menu--options__item
  .link:link {
  text-decoration: underline;
}
ul {
  list-style-type: none;
}
li {
  width: 100%;
}

.container__sidebar
  .container__sidebar--options
  .container__menu--options
  .button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  width: 100%;
}
/*Fin del sidebar de la derecha*/
</style>
