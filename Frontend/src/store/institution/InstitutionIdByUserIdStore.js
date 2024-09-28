import { defineStore } from "pinia";
import { getInstitutionIdByUserId } from "../../services/institutionService";

export const InstitutionIdByUserIdStore = defineStore({
  id: "InstitutionIdByUserId",
  state: () => ({
    institution: [],
    hasData: false,
  }),
  actions: {
    async loadInstitutionIdByUserId(user_id) {
      this.institution = await getInstitutionIdByUserId(user_id);
      this.hasData = true;
    },
  },
});
