import { defineStore } from "pinia";
import {loadUseiInstitution, loadUseiInstitutionPendent, activateInstitution,loadUseiInstitutionRechazado,rechazarInstitution,pendienteInstitution} from "@/services/usei.js";
export const UseUseiInstitutionStore = defineStore({
    id: "useiInstitution",
    state: () => ({
       InstitutionList:[],
       HashData:false,

    }),
    actions: {
        async LoadInstitutions(){
            const institucion=await loadUseiInstitution();
            this.InstitutionList= institucion;
        },   
        async LoadPendentInstitutions(){
            const institucion=await loadUseiInstitutionPendent();
            this.InstitutionList= institucion;
        },
        async LoadRechazadoInstitutions(){
            const institucion=await loadUseiInstitutionRechazado();
            this.InstitutionList= institucion;
        },
        async ActivateInstitution(institutionId){
            const result = await activateInstitution(institutionId);
            return result;
        },
        async RechazarInstitution(institutionId){
            const result = await rechazarInstitution(institutionId);
            return result;
        },
        async PendienteInstitution(institutionId){
            const result = await pendienteInstitution(institutionId);
            return result;
        },
    },

});