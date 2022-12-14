<template>
  <div id="data-list-list-view" class="data-list-container">
    <h1>{{ $t("Catégories") }}</h1>
    <br>
    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
    <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="categories">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">{{ $t("Ajouter") }}</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ categories.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : categories.length }} of {{ queriedItems }}</span>
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
        <vs-th sort-key="compagnies">{{ $t("Incidents") }}</vs-th>
        <vs-th sort-key="Description">{{ $t("Description") }}</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate">{{tr.name}}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{tr.description}}</p>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <div class="flex">
              <vx-tooltip :text="$t('Modifier')" color="warning">
                <feather-icon
                  style="color: #FF9F43"
                  icon="EditIcon"
                  svgClasses="w-5 h-5 hover:text-warning stroke-current"
                  class="mr-2"
                  @click="editData(tr)"
                />
              </vx-tooltip>
              <vx-tooltip :text="$t('Supprimer')" color="danger">
                <feather-icon
                  @click="deleteData(tr.id)"
                  style="color: red"
                  icon="TrashIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="mr-2"
                />
              </vx-tooltip>
            </div>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>
<script>

import DataViewSidebar from './DataViewSidebarCategory'

export default {
  components: {
    DataViewSidebar
  },
  data () {
    return {
      categories: [],
      selected: [],
      itemsPerPage: 20,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {}
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
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.categories.length
    }
  },
  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },

    deleteData (id) {
      const base_self = this
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: this.$t('enteteDelete'),
        acceptText: this.$t('Confirmer'),
        cancelText: this.$t('Annuler'),
        accept: async () => {
          this.$vs.loading()
          this.$http.delete(`categories/${id}/`)
            .then(response => {
              base_self.getAllCategory()
              window.getPrendTaCom.success(this.$t('SuppressionIncident1'), response)
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: this.$t('Suppression') })
            })
        }
      })

    },

    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },

    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    getAllCategory () {
      this.$vs.loading()
      this.$http.get('categories/')
        .then((response) => {
          this.categories = response.data
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    }
  },
  async created () {
    window.Categories = this
    this.getAllCategory()
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

<style scoped>

</style>
