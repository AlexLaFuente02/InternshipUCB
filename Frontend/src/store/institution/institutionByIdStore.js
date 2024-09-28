import { defineStore } from "pinia";
import { getInstitutionById } from "../../services/institutionService";

export const InstitutionByIdStore = defineStore({
  id: "InstitutionById",
  state: () => ({
    institution: [],
    hasData: false,
  }),
  actions: {
    async loadInstitutionById(institution_id) {
      this.institution = await getInstitutionById(institution_id);
      this.hasData = true;
    },
  },
});
