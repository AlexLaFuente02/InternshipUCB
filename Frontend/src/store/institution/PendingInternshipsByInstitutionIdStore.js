import { defineStore } from "pinia";
import { getPendingInternshipsByInstitutionId } from "../../services/institutionService";

export const pendingInternshipsByInstitutionIdStore = defineStore({
  id: "PendingInternshipsByInstitutionId",
  state: () => ({
    pendingInternships: [],
    hasData: false,
  }),
  actions: {
    async loadPendingInternshipsByInstitutionId(institution_id) {
      this.pendingInternships = await getPendingInternshipsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
