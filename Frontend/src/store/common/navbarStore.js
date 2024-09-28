import { defineStore } from "pinia";
export const usenavbarStore = defineStore({
    id: "navbarStore",
    state: () => ({
        navbar: "NavbarCommon",
    }),
    actions: {
        StudentNavbar() {
            this.navbar = "StudentNavbar";
        },
        InstitutionNavbar() {
            this.navbar = "InstitutionNavbar";
        },
        AdminNavbar() {
            this.navbar = "UseiNavbar";
        },
        CommonNavbar() {
            this.navbar = "NavbarCommon";
        },
    },
});