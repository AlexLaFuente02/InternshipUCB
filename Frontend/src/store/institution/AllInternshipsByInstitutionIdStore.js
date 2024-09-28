import { defineStore } from "pinia";
import { getAllInternshipsByInstitutionId } from "../../services/institutionService";

export const allInternshipsByInstitutionIdStore = defineStore({
  id: "AllInternshipsByInstitutionId",
  state: () => ({
    internships: [],
    hasData: false,
  }),
  actions: {
    async loadAllInternshipsByInstitutionId(institution_id) {
      this.internships = await getAllInternshipsByInstitutionId(institution_id);
      this.hasData = true;
    },
  },
});
