import { defineStore } from "pinia";
import { getStudentByIdInApplicationTray } from "../../services/institutionService";

export const studentByIdInApplicationTrayStore = defineStore({
  id: "StudentByIdInApplicationTray",
  state: () => ({
    student: [],
    hasData: false,
  }),
  actions: {
    async loadStudentByIdInApplicationTray(student_id) {
      this.student = await getStudentByIdInApplicationTray(student_id);
      this.hasData = true;
    },
  },
});
