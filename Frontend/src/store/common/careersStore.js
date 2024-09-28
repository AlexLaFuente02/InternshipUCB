import { defineStore } from "pinia";
import { loadCareers } from "@/services/common";
//Segundo paso, crear el store para guardar los datos
export const useCareersStore = defineStore({
    id: "careers",
    state: () => ({
        careers: [],
        hasData: false,
    }),
    actions:{
        async loadCareer(){
            if(!this.hasData){
                const career = await loadCareers();
                this.setCareer(career);
            }
        },
        setCareer(careers){
            this.careers = careers;
            this.hasData = true;
        }
    },
});