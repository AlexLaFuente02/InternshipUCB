import { defineStore } from "pinia";

export const useThemeStore = defineStore({
  id: "theme",
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    //Cargar el tema del local storage
    loadTheme() {
      const theme = localStorage.getItem("isDarkMode");
      if (theme === "dark") {
        this.isDarkMode = true;
      } else {
        this.isDarkMode = false;
      }
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("isDarkMode", this.isDarkMode ? "dark" : "light");
    },
  },
});
