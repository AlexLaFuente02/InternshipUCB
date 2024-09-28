<template>
  <div class="main-container">
    <h1>DASHBOARD DE ANÁLISIS DE DATOS</h1>
    <div class="internship-container">
      <BarGraph />
      <BarGraph_lvl2 />
      <PieChart />
      <BarGraph_lvl3 />
    </div>
  </div>
</template>

<script>
import BarGraph from "../../components/usei/Data Analytics/BarGraph.vue";
import BarGraph_lvl2 from "../../components/usei/Data Analytics/BarGraph_lvl2.vue";
import BarGraph_lvl3 from "../../components/usei/Data Analytics/BarGraph_lvl3.vue";
import PieChart from "../../components/usei/Data Analytics/PieChart.vue";
import Button from "@/components/common/Button.vue";
export default {
  name: "UseiAnalyticsDashboardPage",
  components: {
    BarGraph,
    BarGraph_lvl2,
    BarGraph_lvl3,
    PieChart,
    Button,
  },
};
</script>

<style scoped>
.main-container {
  margin: 3% auto;
  width: 90%;
}

.internship-container {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  background-color: rgb(255, 255, 255);
  text-align: center;
  justify-content: center;
  border: 2px solid black;
}

@media screen and (max-width: 768px) {
  .internship-container {
    display: block;
  }
}

/* DARK THEME */
.dark-theme .internship-container {
  background-color: #353e48;
}

.dark-theme .internship-container {
  border: 2px solid white;
}

.dark-theme .third-grid-container {
  border-top: 2px solid white;
}
</style>
