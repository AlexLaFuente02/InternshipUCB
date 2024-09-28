import { defineStore } from "pinia";
import { loadInstitutions} from "../../services/student";
import {loadInstitutionsByIdSector} from "../../services/student";
import {loadInstitutionById} from "../../services/student";
export const useInstitutionsByIDSectorStore = defineStore({
    id: "institutionsByIDSector",
    state: () => ({
        institutions: [],
        isDataLoaded: false,
        institution:{},
    }),
    actions: {
        async loadInstitutions() {
            this.institutions = await loadInstitutions();
            this.isDataLoaded = true;
        },
        async loadInstitutionsByIdSector(idSector) {
            this.institutions = await loadInstitutionsByIdSector(idSector);
            this.isDataLoaded = true;
        },
        async loadInstitutionById(idInstitution) {
            this.institution = await loadInstitutionById(idInstitution);
        },
    },
});