import { defineStore } from "pinia";
import { getQuantityOfActiveNInactiveInternships } from "../../services/institutionService";

export const QuantityOfActiveNInactiveInternshipsStore = defineStore({
  id: "QuantityOfActiveNInactiveInternships",
  state: () => ({
    quantityResults: [],
    hasData: false,
  }),
  actions: {
    async loadQuantitiesOfInternships(institution_id) {
      this.quantityResults = await getQuantityOfActiveNInactiveInternships(institution_id);
      this.hasData = true;
    },
  },
});
