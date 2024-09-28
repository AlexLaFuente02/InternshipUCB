import { defineStore } from "pinia";
import { getPendingPostulationsByInternshipId } from "../../services/institutionService";

export const pendingPostulationsByInternshipIdStore = defineStore({
  id: "PendingPostulationsByInternshipId",
  state: () => ({
    pendingPostulations: [],
    hasData: false,
  }),
  actions: {
    async loadPendingPostulationsByInternshipId(internship_id) {
      this.pendingPostulations = await getPendingPostulationsByInternshipId(internship_id);
      this.hasData = true;
    },
  },
});
