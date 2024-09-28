import { defineStore } from "pinia";
import { getPostulationsByInternshipId } from "../../services/institutionService";

export const postulationsByInternshipIdStore = defineStore({
  id: "PostulationsByInternshipId",
  state: () => ({
    postulations: [],
    hasData: false,
  }),
  actions: {
    setPostulations(postulations) {
      this.postulations = postulations;
      this.hasData = true;
    },
    async loadPostulationsByInternshipId(internship_id) {
      if (!this.hasData) {
        const postulations = await getPostulationsByInternshipId(internship_id);
        this.setPostulations(postulations);
      }
    },
  },
});
