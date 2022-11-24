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

            <div class="cursor-pointer vx-col w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2" @click="tickets_totaux">
              <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="FileTextIcon"
                  icon-right
                  :statistic="new Intl.NumberFormat('de-DE').format( ( variable_dashboard.total_tickets || 0) )"
                  :statisticTitle="$t('Reportings totaux')"  />
            </div>

            <div class="cursor-pointer vx-col w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2" @click="companies">
              <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="GlobeIcon"
                  icon-right
                  :statistic="new Intl.NumberFormat('de-DE').format( ( variable_dashboard.companies || 0) )"
                  :statisticTitle="$t('Compagnies')"  />
            </div>

            <div class="cursor-pointer vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/3" @click="tickets_traites" >
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="FileIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( ( variable_dashboard.fixed_tickets || 0) )"
                :statisticTitle="$t('Reportings traités')"/>
            </div>

            <div class=" cursor-pointer vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/3" @click="tickets_non_traites">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="FileMinusIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( ( variable_dashboard.unfixed_tickets || 0) )"
                :statisticTitle="$t('Reportings non traités')"  />
            </div>

            <div class="cursor-pointer  vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" @click="tickets_encours">
              <statistics-card-line
                hideChart
                class="mb-base"
                icon="FilePlusIcon"
                icon-right
                :statistic="new Intl.NumberFormat('de-DE').format( ( variable_dashboard.infixing_tickets || 0) )"
                :statisticTitle="$t('Reportings en cours de traitement')"  />
            </div>
<!--            <chartjs-bar-chart></chartjs-bar-chart>-->
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
import ChartjsBarChart from '/src/views_moozisupport/statistiqueGraph/ChartjsBarChart'
import moduleEmail         from '@/store/ticket/moduleEmail.js'

export default {
  data () {
    return {
      showByAdmin: false,
      dashboardValue: false,
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
    tickets_totaux () {
      this.$router.push('/tickets')
        .then(() => {
          this.dashboardValue = true
          this.$store.dispatch('email/fetchEmails')
        })
        .catch(() => {})
    },
    tickets_traites () {
      this.$router.push('/tickets')
        .then(() => {
          this.dashboardValue = true
          this.$store.dispatch('email/tickets_traite')
        })
        .catch(() => {})
    },
    tickets_non_traites () {
      this.$router.push('/tickets')
        .then(() => {
          this.dashboardValue = true
          this.$store.dispatch('email/tickets_non_traite')
        })
        .catch(() => {})
    },
    tickets_encours () {
      this.$router.push('/tickets')
        .then(() => {
          this.dashboardValue = true
          this.$store.dispatch('email/tickets_Encours')
        })
        .catch(() => {})
    },
    companies () {
      this.$router.push('/companies').catch(() => {})
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
    // this.dashboard()
    window.getdashboard = this
    this.$store.registerModule('email', moduleEmail)
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (user_role === 'admin') {
      this.showByAdmin = true
      this.dashboard()
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
