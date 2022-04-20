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
    <vx-card ref="filterCard" title="Filtre" class="user-list-filters mb-4"  >
      <div class="vx-row">
        <div class="vx-col w-full">
          <p class="mb-2" > Regions </p>
          <!--              <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in regionsNews" :clearable="true" />-->
          <v-select v-model="region" :options="regionsNews" :reduce="rep => rep.id" label="name" autocomplete >
          </v-select>
        </div>
      </div>
    </vx-card>

    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
    <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="sites">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- ADD NEW -->
          <div class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Ajouter</span>
          </div>
          <download-excel
            class="btn-add-new  p-3 mb-4 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center  font-medium text-base text-primary border border-solid border-primary"
            :fetch= "fetchData"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="Sites.xls"
          >
            Exporter
          </download-excel>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ sites.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : sites.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
        <vs-th sort-key="region">Région</vs-th>
        <vs-th sort-key="localite">Localité</vs-th>
        <vs-th sort-key="amount">Nom du Site</vs-th>
        <vs-th sort-key="longitude">longitude</vs-th>
        <vs-th sort-key="latitude">latitude</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.localityNew.regionNew != null ? tr.localityNew.regionNew.name : 'AUCUN'}}</p>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.localityNew != null ? tr.localityNew.name : 'AUCUN'}}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{tr.name}}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{tr.longitude}}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{tr.latitude}}</p>
          </vs-td>


          <vs-td class="whitespace-no-wrap">
            <div class="flex">
              <vx-tooltip v-if="tr.siteNewProofs.length !==0" text="Voir" color="#28C76F">
                <feather-icon style="color: #28C76F " icon="ImageIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"   @click="openLightbox" @click.stop="Show_image(tr)" color="warring" type="border" class="mr-2" />
              </vx-tooltip>
              <vx-tooltip text="Modifier" color="warning">
                <feather-icon style="color: #FF9F43" icon="EditIcon" svgClasses="w-5 h-5 hover:text-warning stroke-current" class="mr-2" @click="editData(tr)"/>
              </vx-tooltip>
<!--              <vx-tooltip v-if="profile_moov!=='studio'" text="Supprimer" color="danger">-->
              <vx-tooltip text="Supprimer" color="danger">
                <feather-icon @click="deleteData(tr.id)" style="color: red" icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="mr-2"/>
              </vx-tooltip>
            </div>
          </vs-td>
        </vs-tr>
        </tbody>
        <vs-popup title="Images des sites" :active.sync="showLightbox" class="items-no-padding">
        <div id="my-strictly-unique-vue-image-lightbox-carousel" style="text-align: center;">
          <vue-image-lightbox-carousel
            ref="lightbox"
            :show="showLightbox"
            @close="showLightbox = false"
            :images="images"
            @change="changeImage"
          >
          </vue-image-lightbox-carousel>
        </div>
        </vs-popup>
      </template>
    </vs-table>
  </div>
</template>
<script>

import DataViewSidebar from './DataViewSidebarSite'
import VueImageLightboxCarousel from './SliderComponent'

const color_array = ['warning', 'success', 'danger', 'primary']
let i = 0

export default {
  components: {
    DataViewSidebar,
    VueImageLightboxCarousel
  },
  data () {
    return {
      showLightbox: false,
      images: [],
      region:'',
      json_fields: {
        'ID': 'id',
        'SITES': 'name',
        'REGIONS': 'localityNew.regionNew.name'
      },
      profile_moov:'',
      regionsNews:[],
      sites: [],
      selected: [],
      itemsPerPage: 20,
      isMounted: false,
      // Data Sidebar
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
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.sites.length
    }
  },
  watch: {
    region (value) {
      if (value) {
        const region = value
        this.$vs.loading()
        this.$http.post('siteByRegion/', {region})
          .then((response) => {
            this.sites = response.data
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })

      } else {
        this.getAllsite()
      }
    }

  },
  methods: {
    Show_image (tr) {
      this.images = []
      const image_url = 'https://matinvent.moozistudio.com/moov'
      if (tr.siteNewProofs !== []) {
        const length = tr.siteNewProofs.length
        for (let i = 0; i < length; i++) {
          this.images.push(image_url + tr.siteNewProofs[i].url)
        }
      } else {
        this.images = []
      }
    },
    resetColFilters () {
      this.$refs.filterCard.removeRefreshAnimation()
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    openLightbox () {
      this.showLightbox = true
      this.$refs.lightbox.showImage(1)
    },
    changeImage (index) {
      console.log(index)
    },
    async fetchData () {
      this.$vs.loading()
      const response = await this.$http.get('sitesNew/')
      this.$vs.loading.close()
      return response.data
    },
    deleteData (id) {
      const base_self = this
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: 'Confirmer la suppression?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.delete(`sitesNew/${id}/`)
            .then(response => {
              base_self.getAllMembers()
              window.getPrendTaCom.success('Le site est supprimé avec succès.', response)
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'La suppression a échoué.' })
            })
        }
      })

    },

    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    getOrderStatusColor () {
      const libelle = color_array[i]
      if ((i + 1) < color_array.length) {
        i++
      } else {
        i = 0
      }
      return libelle
    },
    getPopularityColor (num) {
      if (num > 90)  return 'success'
      if (num > 70)  return 'primary'
      if (num >= 50) return 'warning'
      if (num < 50)  return 'danger'
      return 'primary'
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    getAllMembers () {
      this.$vs.loading()
      this.$http.get('sitesNew/')
        .then((response) => {
          this.sites = response.data
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    getAllsite () {
      this.$vs.loading()
      this.$http.get('sitesNew/')
        .then((response) => {
          this.sites = response.data
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    }
  },
  async created () {
    window.getProspect = this
    this.profile_moov = JSON.parse(localStorage.getItem('userInfo')).last_name
    this.getAllMembers()
    this.$http.get('regionsNew/')
      .then((response) => { this.regionsNews = response.data })
      .catch(() => {  })
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
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
