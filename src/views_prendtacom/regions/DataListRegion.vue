<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
  <div id="data-list-list-view" class="data-list-container">
    <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="regionsNews">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
<!--          <download-excel-->
<!--            class="btn-add-new  p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"-->
<!--            :fetch= "fetchData"-->
<!--            :fields="json_fields"-->
<!--            worksheet="My Worksheet"-->
<!--            name="Régions.xls"-->
<!--          >-->
<!--            Exporter-->
<!--          </download-excel>-->

        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ regionsNews.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : regionsNews.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=40">
              <span>40</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=60">
              <span>60</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=80">
              <span>80</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="amount">Région</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.name != "" ? tr.name : 'AUCUN'}}</p>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      regionsNews: [],
      json_fields: {
        'ID': 'id',
        'REGION': 'name'
      },
      profile_moov:'',
      itemsPerPage: 20,
      isMounted: false
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.regionsNews.length
    }
  },
  methods: {
    async fetchData () {
      this.$vs.loading()
      const response = await this.$http.get('regionsNew/')
      this.$vs.loading.close()
      return response.data
    }
  },
  async created () {
    this.$vs.loading()
    this.profile_moov = JSON.parse(localStorage.getItem('userInfo')).last_name
    this.$http.get('regionsNew/')
      .then((response) => {
        this.regionsNews = response.data
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr{
        box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
        td{
          padding: 20px;
          &:first-child{
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }
          &:last-child{
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }
        }
        td.td-check{
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>


<style scoped>

</style>
