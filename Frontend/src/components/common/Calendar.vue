<template>
  <div class="card flex justify-content-center">
    <Calendar
      v-model="dateValue"
      :manualInput="false"
      dateFormat="dd/mm/yy"
      showButtonBar
      showIcon
      @date-select="setDate"
    />
    <!-- <Calendar
      v-model="dateValue"
      :manualInput="false"
      dateFormat="dd/mm/yy"
      touchUI
      showButtonBar
      showIcon
      @date-select="setDate"
    /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateValue: "",
    };
  },
  methods: {
    setDate() {
      this.$emit("date-emit", this.dateValue);
    },
  },
};
</script>
