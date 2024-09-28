<template>
  <div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
      <Calendar
        v-model="timeValue"
        :manualInput="false"
        timeOnly
        @date-select="setTime"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeValue: "",
    };
  },
  methods: {
    setTime() {
      this.$emit("time-emit", this.timeValue);
    },
  },
};
</script>
