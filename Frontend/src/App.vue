<template>
  <div :class="[darkMode ? 'dark-theme' : 'light-theme']">
    <component 
    :is="getConditionallyRenderedNavbar" 
    v-if="!mobile"/>
    <component 
    :is="getConditionallyRenderedNavbarMobile" 
    v-else/>
    <router-view />
    <FooterCommon/>
    <div class="overlay" v-show="showMobileMenu" @click="closeMobileMenu"></div>
    <div class="overlay" v-show="isLoading">
      <div class="section">
        <span class="loader"></span>
      </div>
    </div>
  </div>
</template>

<script>
import FooterCommon from "@/components/common/FooterCommon.vue";
import NavbarCommon from "@/components/common/NavbarCommon.vue";
import NavbarCommonMobile from "@/components/common/NavbarCommonMobile.vue";
// Student
import StudentNavbar from "@/components/student/StudentNavbar.vue";
import StudentNavbarMobile from "@/components/student/StudentNavbarMobile.vue";
// Institution
import InstitutionNavbar from "@/components/institution/InstitutionNavbar.vue";
import InstitutionNavbarMobile from "@/components/institution/InstitutionNavbarMobile.vue";
// USEI
import UseiNavbar from "@/components/usei/UseiNavbar.vue";
import UseiNavbarMovile from "@/components/usei/UseiNavbarMovile.vue";

import { useMobileMenuStore } from "./store/common/mobileMenuStore";
import { useThemeStore } from "@/store/common/useThemeStore"; 
import { useLoginStore } from "@/store/common/loginStore";
import { useLoaderStore } from "@/store/common/loaderStore";
export default {
  name: "App",
  data() {
    return {
      mobile: false,
      windowWidth: 0,
    };
  },
  
  computed: {
      showMobileMenu(){
        return useMobileMenuStore().mobileMenu;
      },
      darkMode(){
        return useThemeStore().isDarkMode;
      },
      getConditionallyRenderedNavbar(){
        if(useLoginStore().isLogged == 1){
          return "StudentNavbar";
        } else if (useLoginStore().isLogged== 2){
          return "InstitutionNavbar";
        } else if (useLoginStore().isLogged == 3){
          return "UseiNavbar";
        } else {
          return "NavbarCommon";
        }
      },
      getConditionallyRenderedNavbarMobile(){
        if(useLoginStore().isLogged == 1){
          return "StudentNavbarMobile";
        } else if (useLoginStore().isLogged== 2){
          return "InstitutionNavbarMobile";
        } else if (useLoginStore().isLogged == 3){
          return "UseiNavbarMovile";
        } else {
          return "NavbarCommonMobile";
        }
      },
      isLoading(){
        return useLoaderStore().isLoading;
      },
  },
  components: {
    FooterCommon,
    NavbarCommon,
    NavbarCommonMobile,
    StudentNavbar,
    InstitutionNavbar,
    InstitutionNavbarMobile,
    UseiNavbar,
    UseiNavbarMovile,
    StudentNavbarMobile,
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.loadTheme();
    this.getNavbar();
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1024) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.closeMobileMenu();
      }
    },
    closeMobileMenu() {
      useMobileMenuStore().closeMobileMenu();
    },
    toggleShowMobileMenu() {
      useMobileMenuStore().toggleMobileMenu();
    },
    loadTheme(){
      useThemeStore().loadTheme();
    },
    getNavbar(){
      var userType = $cookies.get("type");
      if(userType == 1){
        useLoginStore().setLogin(1);
        this.isFooterVisible = false;
      } else if (userType == 2){
        this.isFooterVisible = true;
        useLoginStore().setLogin(2);
      } else if (userType == 3){
        this.isFooterVisible = true;
        useLoginStore().setLogin(3);
      } else {
        this.isFooterVisible = true;
        useLoginStore().setLogin(0);
      }
    },
    getNavbarMobile(){

      return this.getConditionallyRenderedNavbarMobile();
      
    }

  },
 
};
</script>

<style scoped>
.overlay {
  display: block;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

.section{
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 54px;
  height: 54px;
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  background-image:
    radial-gradient(circle 5px , #FF3D00 100%, transparent 0),
    radial-gradient(circle 5px , #FF3D00 100%, transparent 0),
    radial-gradient(circle 5px , #FF3D00 100%, transparent 0),
    radial-gradient(circle 5px , #FF3D00 100%, transparent 0),
    radial-gradient(circle 5px , #FF3D00 100%, transparent 0),
    radial-gradient(circle 5px , #FF3D00 100%, transparent 0);
    background-repeat: no-repeat;
  animation: move 4s linear infinite , rotate 2s linear infinite;
}

@keyframes rotate {
  0% , 20%{ transform: rotate(0deg)}
  30% , 40% { transform: rotate(90deg)}
  50% , 60% { transform: rotate(180deg)}
  70% , 80% { transform: rotate(270deg)}
  90%,  100% { transform: rotate(360deg)}
}
@keyframes move {
  0% ,  9%{
      background-position:
      -12px -15px,  -12px 0px, -12px 15px,
      12px -15px,  12px 0px,  12px 15px;
  }
  10% , 25%{
      background-position:
      0px -15px,  -12px 0px, -12px 15px,
      34px -15px,  12px 0px,  12px 15px;
  }
  30% , 45%{
      background-position:
      0px -34px, -12px -10px, -12px 12px,
      34px -15px, 12px -10px, 12px 12px;
  }
  50% , 65% {
      background-position:
      0px -34px, -12px -34px, -12px 12px,
      34px -12px, 0px -10px, 12px 12px;
  }
  70% , 85% {
      background-position:
      0px -34px, -12px -34px, 0px 12px,
      34px -12px, 0px -10px, 34px 12px;
  }
 90% , 100% {
      background-position:
      0px -34px, -12px -34px, 0px 0px,
      34px -12px, 0px 0px, 34px 12px;
  }
}
</style>
