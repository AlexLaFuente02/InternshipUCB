import { defineStore } from "pinia";
export const useLoaderStore = defineStore({
    id: "loader",
    state: () => ({
        isLoading: false,
    }),
    actions: {
        activateLoader() {
            this.isLoading = true;
        },
        desactivateLoader() {
            this.isLoading = false;
        }
    },
});