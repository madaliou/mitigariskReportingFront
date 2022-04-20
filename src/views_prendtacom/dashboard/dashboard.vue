<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: ESM - EASY SCHOOL MANAGEMENT
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <!-- ROW 1-->

    <div class="vx-row">
        <!-- CARD 6: Product Orders -->
        <div class="vx-col w-full mb-base">
          <div class="vx-row" v-if="showByAdmin">
            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" >
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="GlobeIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (variable_dashboard ? variable_dashboard.regions  : '0') )"
                statisticTitle="Régions" />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="familles()">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="PlusCircleIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (variable_dashboard ? variable_dashboard.famylies   : '0') )"
                statisticTitle="Familles" />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="sites()">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="TruckIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (variable_dashboard ? variable_dashboard.sites  : '0') )"
                statisticTitle="Sites" />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="biens()">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="GiftIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (variable_dashboard ? variable_dashboard.properties  : '0') )"
                statisticTitle="Biens" />
            </div>
            <chartjs-bar-chart></chartjs-bar-chart>
          </div>
          <div class="vx-row" v-if="showByContributors">
            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"  >
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="UsersIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (0) )"
                statisticTitle="Beneficiaires" />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" >
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="TrendingUpIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (0))"
                statisticTitle="Chiffre d'affaire" />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="PieChartIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( (0))"
                statisticTitle="Taux commission(%)" />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" >
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="PieChartIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format((0))"
                statisticTitle="Consommation" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="HeartIcon"
                  icon-right
                  statistic="26.8k"
                  statisticTitle="Favorited"
                  color="danger" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="SmileIcon"
                  icon-right
                  statistic="689"
                  statisticTitle="Reviews"
                  color="success" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="TruckIcon"
                  icon-right
                  statistic="2"
                  statisticTitle="Returns"
                  color="warning" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="EyeIcon"
                  icon-right
                statistic="36.9k"
                statisticTitle="Views" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="MessageSquareIcon"
                  icon-right
                statisticTitle="Comments"
                statistic="12k"
                color="success" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="ShoppingBagIcon"
                  icon-right
                  statistic="978"
                  statisticTitle="Orders"
                  color="warning" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="HeartIcon"
                  icon-right
                  statistic="26.8k"
                  statisticTitle="Favorited"
                  color="danger" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="SmileIcon"
                  icon-right
                  statistic="689"
                  statisticTitle="Reviews"
                  color="success" />
            </div>

            <div class="vx-col w-full md:w-full xl:w-1/3" v-if="false">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="TruckIcon"
                  icon-right
                  statistic="2"
                  statisticTitle="Returns"
                  color="warning" />
            </div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>


import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '@/views/ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'
import ChartjsBarChart from '/src/views_prendtacom/statistiqueGraph/ChartjsBarChart'


export default {
  data () {
    return {
      showByAdmin: false,
      showByPropect: false,
      showByContributors: false,
      variable_dashboard : {},
      variable_prospects : {},
      get_prospects : {},
      variable_contributors : {},
      get_contributors : {},
      analyticsData
    }
  },

  components: {
    VueApexCharts,
    ChartjsBarChart,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline
  },
  methods: {
    familles () {
      this.$router.push('/base/familles').catch(() => {})
    },

    biens () {
      this.$router.push('/base/biens').catch(() => {})
    },
    sites () {
      this.$router.push('/base/sites').catch(() => {})
    },

    dashboard () {
      this.$vs.loading()
      this.$http.get('dashboard/')
        .then((response) => {
          this.variable_dashboard = response.data
          this.$vs.loading.close()
        })
    }
  },
  created () {
    this.dashboard()
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (user_role === 'admin') {
      this.showByAdmin = true
    } else if (user_role === 'contributor') {
      this.showByContributors = true
      this.$http.get('contributorProspects/')
        .then((response) => {
          this.get_contributors = response.data
        })
        .catch(() => {

        })

    } else if (user_role === 'prospect') {
      this.showByPropect = true
      this.$http.get('prospectRecipients/')
        .then((response) => {
          this.get_prospects = response.data
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
