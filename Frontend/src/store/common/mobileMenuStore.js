import { defineStore } from "pinia";
export const useMobileMenuStore = defineStore({
    id: "mobileMenu",
    state: () => ({
        mobileMenu: false,
        menuLeft: false,
        menuRight: false,
    }),
    actions: {
        toggleMobileMenu() {
            this.mobileMenu = !this.mobileMenu;
        },
        closeMobileMenu() {
            this.mobileMenu = false;
            this.menuLeft = false;
            this.menuRight = false;
        },
        toggleMenuLeft() {
            this.menuLeft = !this.menuLeft;
        },
        toggleMenuRight() {
            this.menuRight = !this.menuRight;
        },
    },
});