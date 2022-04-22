<!-- =========================================================================================
  File Name: ChartjsComponentBarChart.vue
  Description: Chartjs component - Bar Chart
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<script>
import { Bar } from 'vue-chartjs'
const backgroundColorData = [
  '#7367F0', '#EA5455', '#28C76F', '#e4f067', '#67e4f0',
  '#FF9F43', '#1E1E1E', '#67e5f0', '#a0f067', '#3321e9',
  '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850'
]
// eslint-disable-next-line no-unused-vars
const biensLabels = ['Biens totaux', 'Biens perdus', 'Biens retrouvés', 'Biens nouveaux']
export default {
  extends: Bar,
  data () {
    return {
      data: {
        labels:[],
        datasets: [
          {
            label: 'Nombre de bien',
            backgroundColor: [],
            data:[]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Effectifs des biens'
        }
      }
    }
  },
  mounted () {
    this.$http.get('gap/')
      .then((response) => {
        if (response.data) {
          const totauxBiens = response.data.found + response.data.losed + response.data.unknown
          this.data.datasets[0].data.push(totauxBiens)
          this.data.datasets[0].data.push(response.data.losed)
          this.data.datasets[0].data.push(response.data.found)
          this.data.datasets[0].data.push(response.data.unknown)
          for (let i = 0; i < 4; i++) {
            this.data.labels.push(biensLabels[i])
            this.data.datasets[0].backgroundColor.push(backgroundColorData[i])
          }
        }
        this.renderChart(this.data, this.options)
      })
  }
}
</script>
