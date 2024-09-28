import { defineStore } from "pinia";
import { getRejectedPostulationsByInstitutionId } from "../../services/institutionService";

export const rejectedPostulationsByInstitutionIdStore = defineStore({
  id: "RejectedPostulationsByInstitutionId",
  state: () => ({
    rejectedPostulations: [],
    hasData: false,
  }),
  actions: {
    async loadRejectedPostulationsByInstitutionId(institution_id) {
      this.rejectedPostulations = getRejectedPostulationsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
