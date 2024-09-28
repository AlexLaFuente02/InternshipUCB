import { defineStore } from "pinia";
import { getInactiveInternshipsByInstitutionId } from "../../services/institutionService";

export const inactiveInternshipsByInstitutionIdStore = defineStore({
  id: "InactiveInternshipsByInstitutionId",
  state: () => ({
    inactiveInternships: [],
    hasData: false,
  }),
  actions: {
    async loadInactiveInternshipsByInstitutionId(institution_id) {
      this.inactiveInternships = await getInactiveInternshipsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
