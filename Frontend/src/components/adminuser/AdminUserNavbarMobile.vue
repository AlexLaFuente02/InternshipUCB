<template>
    <header class="container__header">
      <div class="container__logo">
        <router-link to="/admin">
          <img
            src="../images/USEI.png"
            alt="Unidad de Servicios Estudiantiles Integrales"
          />
        </router-link>
      </div>
      <div class="container__menu">
        <div class="container__menu--profile" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </div>
      </div>
      <div class="container__sidebar" v-show="showMobileMenu">
        <div class="container__sidebar--profile">
          <font-awesome-icon :icon="['fas', 'circle-user']" />
          <span class="sidebar__name">Administrador USEI</span>
        </div>
        <ul class="container__menu--options">
          <li @click="closeMobileMenu">
            <router-link to="/admin/unlock-users" class="link">
              <font-awesome-icon :icon="['fas', 'unlock']" />
              <span>Desbloquear Usuarios</span>
            </router-link>
          </li>
          <li @click="closeMobileMenu">
            <router-link to="/admin/modify-roles" class="link">
              <font-awesome-icon :icon="['fas', 'user-edit']" />
              <span>Modificar Roles</span>
            </router-link>
          </li>
          <li @click="closeMobileMenu">
            <router-link to="/admin/show-activity" class="link">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <span>Mostrar Actividad</span>
            </router-link>
          </li>
          <!-- Añadir más enlaces aquí según sea necesario -->
        </ul>
      </div>
    </header>
  </template>
  
  <script>
  import { useMobileMenuStore } from "../../store/common/mobileMenuStore";
  
  export default {
    name: "AdminUserNavbarMobile",
    computed: {
      showMobileMenu() {
        return useMobileMenuStore().mobileMenu;
      },
    },
    methods: {
      toggleMobileMenu() {
        useMobileMenuStore().toggleMobileMenu();
      },
      closeMobileMenu() {
        useMobileMenuStore().closeMobileMenu();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista móvil del navbar */
  .container__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #fdfef0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .container__logo img {
    width: 100px;
    height: auto;
  }
  
  .container__menu--profile {
    font-size: 2rem;
    cursor: pointer;
  }
  
  .container__sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 75%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 200;
    display: flex;
    flex-direction: column;
  }
  
  .container__sidebar--profile {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eaeaea;
  }
  
  .sidebar__name {
    margin-left: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .container__menu--options {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .container__menu--options li {
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
  }
  
  .container__menu--options li:hover {
    background-color: #f0f0f0;
  }
  
  .link {
    text-decoration: none;
    color: #333;
    display: flex;
    align-items: center;
  }
  
  .link font-awesome-icon {
    margin-right: 1rem;
  }
  </style>
  