import { defineStore } from "pinia";
import { getActiveInternshipsByInstitutionId } from "../../services/institutionService";

export const activeInternshipsByInstitutionIdStore = defineStore({
  id: "ActiveInternshipsByInstitutionId",
  state: () => ({
    internships: [],
    hasData: false,
  }),
  actions: {
    async loadActiveInternshipsByInstitutionId(institution_id) {
      this.internships = await getActiveInternshipsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
