import { defineStore } from "pinia";
import {loadUseiInternship, loadPendentinternship,loadRechazadointernship,activateInternship,rechazarInternship,pendienteInternship} from "@/services/usei.js";
export const UseUseiInternshipStore = defineStore({
    id: "useiInternship",
    state: () => ({
        InternshipList:[],
       HashData:false,

    }),
    actions: {
        async LoadInternship(){
            const internship=await loadUseiInternship();
            this.InternshipList= internship;
        }, 
        async LoadPendenInternship(){
            const internship=await loadPendentinternship();
            this.InternshipList= internship;
        },
        async LoadRechazadoInternship(){
            const internship=await loadRechazadointernship();
            this.InternshipList= internship;
        },
        async ActivateInternship(internshipId){
            const result = await activateInternship(internshipId);
            // Aquí puedes manejar la respuesta, por ejemplo, actualizando la lista de instituciones
            // o emitiendo un mensaje de éxito o error.
            return result;
        },
        async RechazarInternship(internshipId){
            const result = await rechazarInternship(internshipId);
            // Aquí puedes manejar la respuesta, por ejemplo, actualizando la lista de instituciones
            // o emitiendo un mensaje de éxito o error.
            return result;
        },
        async PendienteInternship(internshipId){
            const result = await pendienteInternship(internshipId);
            // Aquí puedes manejar la respuesta, por ejemplo, actualizando la lista de instituciones
            // o emitiendo un mensaje de éxito o error.
            return result;
        },

    },

});