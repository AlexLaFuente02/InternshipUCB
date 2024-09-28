import { defineStore } from "pinia";
import { getPostulationsByInstitutionId } from "../../services/institutionService";

export const postulationsByInstitutionIdStore = defineStore({
  id: "PostulationsByInstitutionId",
  state: () => ({
    postulations: [],
    hasData: false,
  }),
  actions: {
    async loadPostulationsByInstitutionId(institution_id) {
      this.postulations = await getPostulationsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
