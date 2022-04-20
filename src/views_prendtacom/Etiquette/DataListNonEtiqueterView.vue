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
          <div class="vx-col w-1/4">
            <p class="mb-2" > Regions </p>
            <v-select v-model="region" :options="regionsNews" :reduce="rep => rep.id" label="name" autocomplete >
            </v-select>
          </div>

          <div class="vx-col w-1/4">
            <p class="mb-2" > Sites </p>
            <v-select v-model="site" :options="sitesNews" :reduce="rep => rep.id" label="name" autocomplete >
            </v-select>
          </div>

          <div class="vx-col w-1/4">
            <p class="mb-2" > Domaines </p>
            <v-select v-model="domaine" :options="domaines" :reduce="rep => rep.key" label="name" autocomplete >
            </v-select>

          </div>

          <div class="vx-col w-1/4">
            <p class="mb-2" > Familles </p>
            <v-select v-model="famille" :options="familiesNews" :reduce="rep => rep.id" label="code" autocomplete >
            </v-select>
          </div>
  </div>
    </vx-card>
    <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table" pagination   :max-items="itemsPerPage" search :data="recipients">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- ADD NEW -->
          <div class="flex flex-wrap-reverse items-center data-list-btn-container mb-6" >
            <vs-input label="Entrez le code du bien"  v-model="codeBien" class="w-2/6 mb-6 "/>
          </div>
          <div class="btn-add-new p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="Rech">
              <feather-icon icon="SearchIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Rechercher</span>
          </div>
<!--          <div v-if="this.region === '' && this.site ==='' && this.domaine === '' && this.famille === ''" class="btn-add-new p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="exporter()">-->
<!--              <feather-icon icon="ClipboardIcon" svgClasses="h-4 w-4" />-->
<!--              <span class="ml-2 text-base text-primary">Exporter</span>-->
<!--          </div>-->

<!--          <download-excel-->
<!--            class="btn-add-new icon-chrome p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"-->
<!--            v-if="this.region !== '' || this.site !== '' || this.domaine !== '' || this.famille !== ''"-->
<!--            :fetch= "fetchData"-->
<!--            :fields="json_fields"-->
<!--            worksheet="My Worksheet"-->
<!--            name="Biens_Filtrés.xls"-->
<!--          >-->
<!--            Exporter-->
<!--          </download-excel>-->
<!--          <div class="btn-add-new p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">-->
<!--              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />-->
<!--              <span class="ml-2 text-base text-primary">Ajouter</span>-->
<!--          </div>-->

        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ recipients.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : recipients.length }} of {{ queriedItems }}</span>
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
        <vs-th sort-key="code">Code du bien</vs-th>
        <vs-th sort-key="designation">designation</vs-th>
        <vs-th sort-key="domaine">domaine</vs-th>
        <vs-th sort-key="famille">famille</vs-th>
        <vs-th sort-key="site">site</vs-th>
        <vs-th sort-key="region">région</vs-th>
        <vs-th sort-key="equipement">Signification</vs-th>
        <vs-th sort-key="quantité">quantité</vs-th>
        <vs-th>Action</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.code!=='None'?tr.code:'AUCUN'}}</p>
          </vs-td>

          <vs-td>
            <p class="product-designation">{{ tr.designation }}</p>
          </vs-td>

          <vs-td>
            <p class="product-domaine">{{ domainObject[tr.familyNew.domain] !== "" ? domainObject[tr.familyNew.domain]: 'AUCUN' }}</p>
          </vs-td>

          <vs-td>
            <vs-chip class="product-role">{{ tr.familyNew != null ? tr.familyNew.code : 'AUCUN'}}</vs-chip>
          </vs-td>

          <vs-td>
            <vs-chip class="product-role">{{ tr.siteNew != null ? tr.siteNew.name : 'AUCUN'}}</vs-chip>
          </vs-td>

          <vs-td>
            <p class="product-nature">{{ tr.siteNew.localityNew.regionNew.name !== "" ? tr.siteNew.localityNew.regionNew.name : 'AUCUN'}}</p>
          </vs-td>

          <vs-td>
            <p class="product-nature">{{ tr.familyNew.meaning }}</p>
          </vs-td>

          <vs-td>
            <p class="product-nature">{{ tr.quantity }}</p>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <div class="flex">
            <vx-tooltip text="Voir" color="primary">
            <feather-icon style="color: navy " icon="EyeIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="activePrompt2 = true" v-on:click="openPlayerDialog(tr)" color="warring" type="border" class="ml-4" />
            </vx-tooltip>
<!--            <vx-tooltip text="Modifier" color="warning">-->
<!--            <feather-icon  style="color: #FF9F43 " icon="EditIcon" svgClasses="w-5 h-5 hover:text-warning stroke-current" @click.stop="editData(tr)" class="ml-4" />-->
<!--            </vx-tooltip>-->
<!--              <vx-tooltip text="Supprimer" color="danger">-->
<!--&lt;!&ndash;            <feather-icon v-if="profile_moov!=='studio'" style="color: red"  icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />&ndash;&gt;-->
<!--            <feather-icon style="color: red"  icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />-->
<!--            </vx-tooltip>-->
            </div>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <div v-if="!this.verif_filter ">
      <vs-button v-if="this.repPrev !== null" @click="prev()" class="ml-4 mb-4">Précédent</vs-button>
      <vs-button v-if="this.repNext !== null" @click="next()" class="ml-4 mb-4" >Suivant</vs-button>
    </div>
    <div v-if="this.verif_filter" >
      <vs-button v-if="this.prevPage!==null" @click="prev1()" class="ml-4 mb-4">Précédent</vs-button>
      <vs-button  v-if="this.nextPage!==null" @click="next1()" class="ml-4 mb-4" >Suivant</vs-button>
    </div>
    <vs-popup title="DÉTAILS DU BIEN"  :active.sync="activePrompt2">
      <div class="vx-row" v-if="selectedPlayer">
        <div class="vx-col sm:w-full md:w-1/3 lg:1/3 xs:w-full">
          <vs-input readonly label="CODE "  v-model=" selectedPlayer.code" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DESIGNATION "  v-model="selectedPlayer.designation" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="FAMILLE "  v-model=" selectedPlayer.familyNew.code " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="EQUIPEMENT "  v-model="selectedPlayer.familyNew.meaning" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="OBSERVATION"  v-model=" selectedPlayer.observation" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="COMPTE"  v-model=" selectedPlayer.account" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DATE DÉBUT D'AMORT"  v-model=" selectedPlayer.amotizationStartDate" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DATE FIN D'AMORT "  v-model=" selectedPlayer.amotizationEndDate" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="TAUX AMORT"  v-model=" selectedPlayer.amotizationRate" class="mt-4 mb-2 w-full" />
        </div>
        <div class="vx-col sm:w-full md:w-1/3 lg:1/3 xs:w-full">
          <vs-input readonly label="SITE "  v-model=" selectedPlayer.siteNew.name " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="Etat "  v-model="selectedPlayer.condition" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DOMAINE"  v-model=" domainObject[selectedPlayer.familyNew.domain]" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="QUANTITE "  v-model="selectedPlayer.quantity" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DURÉE AMORT "  v-model=" selectedPlayer.amotizationDuration " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DATE ACHAT "  v-model=" selectedPlayer.purchaseDate" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="VAL ACQUISIT° ANTÉR"  v-model=" selectedPlayer.priorAcquisitionValue " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="VAL ACQUISIT° EXERCICE"  v-model=" selectedPlayer.exerciseAcquisitionValue" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="TOTAL ACQUISITIONS "  v-model=" selectedPlayer.totalAcquisition" class="mt-4 mb-2 w-full" />
        </div>
        <div class="vx-col sm:w-full md:w-1/3 lg:1/3 xs:w-full">
          <vs-input readonly label="LOCALITE "  v-model=" selectedPlayer.siteNew.localityNew.name " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="REGION "  v-model=" selectedPlayer.siteNew.localityNew.regionNew.name " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="LONGITUDE "  v-model="selectedPlayer.siteNew.longitude" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="LATITUDE"  v-model="selectedPlayer.siteNew.latitude" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DOTAT° EXERCICE ANTÉR"  v-model=" selectedPlayer.priorEndowmentyear " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="DOTAT° EXERCICE 2020 "  v-model=" selectedPlayer.fiscalYear2020Allocation " class="mt-4 mb-2 w-full" />
          <vs-input readonly label="TOTAL DOTATION "  v-model=" selectedPlayer.totalEndowment" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="VNC"  v-model=" selectedPlayer.vnc" class="mt-4 mb-2 w-full" />
          <vs-input readonly label="COMPTE AMORTISMNT"  v-model=" selectedPlayer.amortismntAccount" class="mt-4 mb-2 w-full" />
        </div>
      </div>
    </vs-popup>
  </div>
</template>
<script>
const color_array = ['warning', 'success', 'danger', 'primary']
const str = 'https://matinvent.moozistudio.com/api/'
let i = 0

export default {
  data () {
    return {
      domainObject: {
        untechnical: 'Non technique',
        technical: 'technique'
      },
      json_fields: {
        'CODE': 'code',
        'DESIGNATION': 'designation',
        'FAMILLE': 'familyNew.code',
        'SITE': 'siteNew.name',
        'REGION': 'siteNew.localityNew.regionNew.name',
        'SIGNIFICATION': 'familyNew.meaning',
        'QUANTITE': 'quantity',
        'COMPTE':'account',
        'DATE DÉBUT D\'AMORT':'amotizationStartDate',
        'DATE FIN D\'AMORT ':'amotizationEndDate',
        'TAUX AMORT':'amotizationRate',
        'DURÉE AMORT':'amotizationDuration',
        'DATE ACHAT':'purchaseDate',
        'VAL ACQUISIT° ANTÉR':'priorAcquisitionValue',
        'VAL ACQUISIT° EXERCICE':'exerciseAcquisitionValue',
        'TOTAL ACQUISITIONS':'totalAcquisition',
        'DOTAT° EXERCICE ANTÉR':'priorEndowmentyear',
        'DOTAT° EXERCICE 2020':'fiscalYear2020Allocation',
        'TOTAL DOTATION':'totalEndowment',
        'VNC':'vnc',
        'COMPTE AMORTISMNT':'amortismntAccount'
      },
      domaines: [
        {
          key: 'technical',
          name: 'Technique'
        },
        {
          key: 'untechnical',
          name: 'Non technique'
        }
      ],
      repNext:'',
      repPrev:'',
      profile_moov:'',
      filterBiens:false,
      famille:'',
      site:'',
      region:'',
      domaine:'',
      incrementpage:0,
      incrementpage1:0,
      disableeNext:true,
      recipients: [],
      datatable: [],
      datatable2: [],
      regionsNews: [],
      familiesNews: [],
      sitesNews: [],
      selected: [],
      codeBien: '',
      itemsPerPage: 20,
      isMounted: false,
      selectedPlayer:undefined,
      activePrompt2:false,
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  watch: {
    famille (value) {
      this.verif_filter = true
      if (value) {
        this.filterBiens = false
        const familyNew = value
        const domain = this.domaine
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', { familyNew, domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.famille = ''
        const domain = this.domaine
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', { domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },
    domaine (value) {
      this.verif_filter = true
      if (value) {
        this.filterBiens = false
        const domain = value
        const familyNew = this.famille
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', { domain, familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.$vs.loading()
        this.domaine = ''
        const familyNew = this.famille
        const siteNew = this.site
        const regionNew = this.region
        this.$http.post('unlabeledProperties-filter/', { familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },
    site (value) {
      this.verif_filter = true
      if (value) {
        this.filterBiens = false
        const siteNew = value
        const domain = this.domaine
        const familyNew = this.famille
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', { siteNew, domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.site = ''
        const domain = this.domaine
        const familyNew = this.famille
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', { domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },
    region (value) {
      this.verif_filter = true
      if (value) {
        this.filterBiens = false
        const regionNew = value
        const region = value
        const siteNew = this.site
        const domain = this.domaine
        const familyNew = this.famille
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', { regionNew, siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })

        this.$http.post('siteByRegion/', {region})
          .then((response) => {
            this.sitesNews = response.data
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })

      } else {
        this.region = ''
        this.getAllsite()
        const siteNew = this.site
        const domain = this.domaine
        const familyNew = this.famille
        this.$vs.loading()
        this.$http.post('unlabeledProperties-filter/', {siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(37)
              this.prevPage = str + (response.data.previous).substr(37)
            } else {
              this.recipients = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    validateForm () {
      return this.region !== '' && this.site !== '' && this.domaine !== '' && this.famille !== ''
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.recipients.length
    }
  },
  methods: {
    async fetchData () {
      const siteNew = this.site
      const domain = this.domaine
      const familyNew = this.famille
      const regionNew = this.region
      const response = await this.$http.post('unpaginatedFilter/', { regionNew, siteNew, domain, familyNew})
      return response.data
    },
    exporter () {
      window.open(`${this.$http.defaults.baseURL  }export_properties/`, '_blank')
    },
    exportFilter () {
      const regionNew = this.region
      const siteNew = this.site
      const domain = this.domaine
      const familyNew = this.famille
      // eslint-disable-next-line no-unused-vars
      const routeData = this.$router.resolve({name: 'export_filtered_properties/',
        query: {data: {
          // eslint-disable-next-line no-undef
          regionNew, siteNew, domain, familyNew
        }}})

      window.open(routeData, '_blank')
    },
    Rech () {
      if (this.codeBien !== '') {
        this.$vs.loading()
        const q = this.codeBien
        this.$http.post('unlabeledProperties-filter/', { q })
          .then((response) => {
            this.recipients = response.data.results
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.notify({
              time:4000,
              title: 'ATTENTION',
              text: 'Entrez le code du bien.',
              color: 'warning',
              position:'top-center'
            })
            this.$vs.loading.close()
          })
      } else {
        this.$vs.notify({
          time:4000,
          title: 'ATTENTION',
          text: 'Entrez le code du bien.',
          color: 'warning',
          position:'top-center'
        })
        this.$vs.loading.close()
      }

    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    next () {
      this.$vs.loading()
      this.$http.get(this.repNext)
        .then((response) => {
          this.recipients = response.data.results
          this.repNext = str + (response.data.next).substr(37)
          this.repPrev = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev () {
      this.$vs.loading()
      this.$http.get(this.repPrev)
        .then((response) => {
          this.recipients = response.data.results
          this.repNext = str + (response.data.next).substr(37)
          this.repPrev = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    next1 () {
      this.$vs.loading()
      this.$http.post(this.nextPage, {
        regionNew:this.region,
        siteNew:this.site,
        domain:this.domaine,
        familyNew:this.famille
      })
        .then((response) => {
          this.recipients = response.data.results
          this.nextPage = str + (response.data.next).substr(37)
          this.prevPage = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev1 () {
      this.$vs.loading()
      this.$http.post(this.prevPage, {
        regionNew:this.region,
        siteNew:this.site,
        domain:this.domaine,
        familyNew:this.famille
      }).then((response) => {
        this.recipients = response.data.results
        this.nextPage = str + (response.data.next).substr(37)
        this.prevPage = str + (response.data.previous).substr(37)
        this.$vs.loading.close()
      }).catch(() => {
        this.$vs.loading.close()
      })
    },
    deleteData (id) {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: 'Confirmer la suppression?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.delete(`unlabeledProperties/${id}/`)
            .then(response => {
              window.getPrendTaCom.success('Bien supprimé avec succès.', response)
              this.getAllRecipients()
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'La suppression du bien a échouée.' })
            })
        }
      })

    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.Data))
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
    openPlayerDialog (player) {
      this.selectedPlayer = player
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    getAllRecipients () {
      this.$vs.loading()
      this.$http.get('unlabeledProperties/')
        .then((response) => {
          this.verif_filter = false
          this.recipients = response.data.results
          this.repNext = `${str}unlabeledProperties/?limit=100&offset=100`
          this.repPrev = response.data.previous
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
          this.sitesNews = response.data
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    getAllfiter () {
      this.$http.post('filter/', {
        regionNew: this.region,
        siteNew:this.site,
        domain : this.domaine,
        familyNew: this.famille})
        .then((response) => {
          if (response.data.length !== 0) {
            this.recipients = response.data.results
            this.nextPage = str + (response.data.next).substr(37)
            this.prevPage = str + (response.data.previous).substr(37)
          }
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    }
  },
  created () {
    window.getProspect = this
    this.profile_moov = JSON.parse(localStorage.getItem('userInfo')).last_name
    this.filterBiens = true
    this.getAllRecipients()
    this.$http.get('regionsNew/')
      .then((response) => { this.regionsNews = response.data })

    this.$http.get('sitesNew/')
      .then((response) => { this.sitesNews = response.data })

    this.$http.get('familiesNew/')
      .then((response) => { this.familiesNews = response.data })
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
