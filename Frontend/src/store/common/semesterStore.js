import { defineStore } from "pinia";
import { loadSemester } from "../../services/common";
//Segundo paso, crear el store para guardar los datos
export const useSemesterStore = defineStore({
    id: "semester",
    state: () => ({
        semesters: [],
        hasData: false,
    }),
    actions: {
        setSemesters(semesters) {
            this.semesters = semesters;
            this.hasData = true;
        },
        async loadSemester(){
            if(!this.hasData){
                
                const semesters = await loadSemester();
                this.setSemesters(semesters);
            }
        }
        
    },
});