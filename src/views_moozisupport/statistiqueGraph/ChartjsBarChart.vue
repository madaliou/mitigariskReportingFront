<!-- =========================================================================================
    File Name: ChartBarChart.vue
    Description: Create bar chart
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
    <vx-card title="Statistique" class="mb-base" >
        <div class="mt-5">
            <chartjs-component-bar-chart :height="150"></chartjs-component-bar-chart>
        </div>
    </vx-card>
</template>

<script>
import ChartjsComponentBarChart from './ChartjsComponentBarChart.vue'
export default {
  components: {
    ChartjsComponentBarChart
  }
}
</script>
