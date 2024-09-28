import { defineStore } from "pinia";
import { loadCampuses } from "../../services/common";
//Segundo paso, crear el store para guardar los datos
export const useCampusStore = defineStore({
    id: "campus",
    state: () => ({
        campuses: [],
        hasData: false,
    }),
    actions: {
        setCampuses(campuses) {
            this.campuses = campuses;
            this.hasData = true;
        },
        async loadCampuse(){
            if(!this.hasData){
                const campuses = await loadCampuses();
                this.setCampuses(campuses);
            }
        }
        
    },
});