import { defineStore } from "pinia";

export const useModeViewStore = defineStore({
  id: "ModeView",
  state: () => ({
    modeView: false,
  }),
  actions: {
    loadMode() {
      var mode = localStorage.getItem("modeView");
      if (mode=== "LIST") {
        this.modeView = true;
      } else {
        this.modeView = false;
      }
    },

    toggleMode() {
        this.modeView = !this.modeView;
        localStorage.setItem("modeView", this.modeView ? "LIST" : "GRID");
    },
  },
});
