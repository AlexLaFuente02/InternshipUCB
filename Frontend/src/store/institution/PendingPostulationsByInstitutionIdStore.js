import { defineStore } from "pinia";
import { getPendingPostulationsByInstitutionId } from "../../services/institutionService";

export const pendingPostulationsByInstitutionIdStore = defineStore({
  id: "PendingPostulationsByInstitutionId",
  state: () => ({
    pendingPostulations: [],
    hasData: false,
  }),
  actions: {
    async loadPendingPostulationsByInstitutionId(institution_id) {
      this.pendingPostulations = await getPendingPostulationsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
