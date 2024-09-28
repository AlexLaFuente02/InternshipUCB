import { defineStore } from "pinia";
import { getTotalPostulationsByInstitutionId } from "../../services/institutionService";

export const totalPostulationsByInstitutionIdStore = defineStore({
  id: "TotalPostulationsByInstitutionId",
  state: () => ({
    totalPostulationsResult: [],
    hasData: false,
  }),
  actions: {
    async loadTotalPostulationsByInstitutionId(institution_id) {
      this.totalPostulationsResult = await getTotalPostulationsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
