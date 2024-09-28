/*Store para saber si el usuario esta logueado o no*/
import { defineStore } from "pinia";
export const useLoginStore = defineStore({
    id: "login",
    state: () => ({
        isLogged: 0,
    }),
    actions: {
        setLogin(user) {
            this.isLogged = user;
        },
        setLogout() {
            this.isLogged = 0;
        },
    },
});