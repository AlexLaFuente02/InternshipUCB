import { defineStore } from "pinia";
import { getUserByIdUsuario } from "@/services/common";
export const useUserByIdStore = defineStore({
    id: "userById",
    state: () => ({
        user: [],
        isDataLoaded: false,
    }),
    actions: {
        async getUserByIdUsuario(idUsuario) {
            if(this.isDataLoaded) {
                return;
            }
            this.isDataLoaded = true;
            this.user = await getUserByIdUsuario(idUsuario);
        },
    },
});