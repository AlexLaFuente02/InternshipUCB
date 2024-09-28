import { defineStore } from "pinia";
import { getAllInternshipsByInstitutionId } from "@/services/institutionService";

export const internshipsByInstitutionIdStore = defineStore({
  id: "internshipsByInstitutionId",
  state: () => ({
    internships: [],
    hasData: false,
  }),
  actions: {
    setInternships(internships) {
      this.internships = internships;
      this.hasData = true;
    },
    async loadInternshipsByInstitutionId(institution_id) {
      if (!this.hasData) {
        const internships = await getAllInternshipsByInstitutionId(institution_id);
        this.setInternships(internships);
      }
    },
  },
});
