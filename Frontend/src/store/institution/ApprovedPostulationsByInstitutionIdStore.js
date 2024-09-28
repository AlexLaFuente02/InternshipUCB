import { defineStore } from "pinia";
import { getApprovedPostulationsByInstitutionId } from "../../services/institutionService";

export const approvedPostulationsByInstitutionIdStore = defineStore({
  id: "ApprovedPostulationsByInstitutionId",
  state: () => ({
    approvedPostulations: [],
    hasData: false,
  }),
  actions: {
    async loadApprovedPostulationsByInstitutionId(institution_id) {
      this.approvedPostulations = await getApprovedPostulationsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
