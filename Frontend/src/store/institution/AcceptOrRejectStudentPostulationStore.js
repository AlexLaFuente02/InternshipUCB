import { defineStore } from "pinia";
import { acceptStudentPostulation } from "../../services/institutionService";
import { rejectStudentPostulation } from "../../services/institutionService";

export const acceptOrRejectStudentPostulationStore = defineStore({
  id: "AcceptOrRejectStudentPostulation",
  state: () => ({
    updatedPostulation: [],
    hasData: false,
  }),
  actions: {
    async acceptPostulation(postulation_id) {
      this.updatedPostulation = await acceptStudentPostulation(postulation_id);
      this.hasData = true;
    },
    async rejectPostulation(postulation_id) {
      this.updatedPostulation = await rejectStudentPostulation(postulation_id);
      this.hasData = true;
    },
  },
});
