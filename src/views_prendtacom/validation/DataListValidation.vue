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

    <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="recipients">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <div class="flex flex-wrap-reverse items-center data-list-btn-container mb-6" >
            <vs-input label="Entrez le code du bien"  v-model="codeBien" class="w-2/6 mb-6 "/>
          </div>

          <div  class="btn-add-new p-2 mb-6 mr-4 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="Rech">
            <feather-icon icon="SearchIcon" svgClasses="h-4 w-4" />
            <span class=" text-base text-primary">Rechercher</span>
          </div>
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
        <vs-th sort-key="quantité">Validation</vs-th>
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
            <vs-chip :color="getOrderStatusColor(tr.validated)" class="product-order-status">{{validationObject[tr.validated]}}</vs-chip>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <div class="flex">
              <vx-tooltip text="Voir" color="primary">
                <feather-icon
                  style="color: navy "
                  icon="EyeIcon"
                  svgClasses="w-5 h-5 hover:text-primary stroke-current"
                  @click="activePrompt2 = true"
                  v-on:click="openPlayerDialog(tr)"
                  color="warring"
                  type="border"
                  class="ml-2" />
              </vx-tooltip>

              <vx-tooltip v-if="tr.validated === false" text="Valider" color="success">
                <feather-icon
                  style="color: lime"
                  icon="CheckCircleIcon"
                  svgClasses="w-5 h-5 hover:text-success stroke-current"
                  class="ml-2"
                  @click.stop="validationBiens(tr.id)" />
              </vx-tooltip>

              <vx-tooltip   v-if="tr.validated === true"  text="Annuler" color="danger">
                <feather-icon
                  style="color: red"
                  icon="XCircleIcon"
                  svgClasses="w-5 h-5 hover:text-danger stroke-current"
                  class="ml-2"
                  @click.stop="annulationBiens(tr.id)" />
              </vx-tooltip>

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
    <vs-popup title="DÉTAILS DU BIEN" buttons-hidden @close="close" :active.sync="activePrompt2">
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
// eslint-disable-next-line no-unused-vars
const str = 'https://matinvent.moozistudio.com/api/'

export default {
  data () {
    return {
      validationObject: {
        false: 'Non validé',
        true: 'Validé'
      },
      domainObject: {
        untechnical: 'Non technique',
        technical: 'technique'
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
      verify_stock_repNext:false,
      verify_stock_repPrev:false,
      verify_stock_nextPage :false,
      verify_stock_prevPage :false,
      verify_stock_filter :false,
      stock_nextPage:'',
      stock_prevPage:'',
      stock_repNext:'',
      stock_repPrev:'',
      repNext:'',
      repPrev:'',
      famille:'',
      codeBien:'',
      verif_filter:false,
      familleValidate:'',
      nextPage: '',
      prevPage: '',
      site:'',
      siteValidate:'',
      region:'',
      regionValidate:'',
      domaine:'',
      domaineValidate:'',
      recipients: [],
      regionsNews: [],
      sitesNews: [],
      selected: [],
      itemsPerPage: 20,
      isMounted: false,
      incrementpage:0,
      disableeNext:true,
      selectedPlayer:undefined,
      activePrompt2:false,
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
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.recipients.length
    }
  },
  watch: {
    famille (value) {
      this.verif_filter = true
      this.verify_stock_filter = true
      this.verify_stock_repNext = false
      if (value) {
        const familyNew = value
        this.familleValidate = value
        const domain = this.domaine
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('validatedPropertyFilter/', { familyNew, domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
        this.$http.post('validatedPropertyFilter/', { domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
      this.verify_stock_filter = true
      this.verify_stock_repNext = false
      if (value) {
        const domain = value
        this.domaineValidate = value
        const familyNew = this.famille
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('validatedPropertyFilter/', { domain, familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
        this.$http.post('validatedPropertyFilter/', { familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
      this.verify_stock_filter = true
      this.verify_stock_repNext = false
      if (value) {
        const siteNew = value
        this.siteValidate = value
        const domain = this.domaine
        const familyNew = this.famille
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('validatedPropertyFilter/', { siteNew, domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
        this.$http.post('validatedPropertyFilter/', { domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
      this.verify_stock_filter = true
      this.verify_stock_repNext = false
      if (value) {
        const regionNew = value
        const region = value
        this.regionValidate = value
        const siteNew = this.site
        const domain = this.domaine
        const familyNew = this.famille
        this.$vs.loading()
        this.$http.post('validatedPropertyFilter/', { regionNew, siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
        this.getAllsite()
        this.region = ''
        const siteNew = this.site
        const domain = this.domaine
        const familyNew = this.famille
        this.$vs.loading()
        this.$http.post('validatedPropertyFilter/', { siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.recipients = response.data.results
              this.nextPage = str + (response.data.next).substr(45)
              this.prevPage = str + (response.data.previous).substr(45)

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
  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    validationBiens (id) {
      this.$vs.dialog({
        type:'confirm',
        color: 'success',
        title: 'Confirmation',
        text: 'Confirmer la validation?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.post('propertyValidation/', { id})
            .then(response => {
              this.$vs.loading()
              //sans filter avec next_prev//
              if (this.verify_stock_repNext) {
                this.verifySansFilter(this.stock_repNext)
              }
              if (this.verify_stock_repPrev) {
                this.verifySansFilter(this.stock_repPrev)
              }
              //avec filter avec next_prev//
              if (this.verify_stock_nextPage) {
                this.verifyFilter(this.stock_nextPage)
              }
              if (this.verify_stock_prevPage) {
                this.verifyFilter(this.stock_prevPage)
              }
              // avec filter sans next_prev
              if (this.verify_stock_filter) {
                this.verifyFilter('validatedPropertyFilter/')
              }

              window.getPrendTaCom.success('Bien valider avec succès.', response)
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'La validation du bien a échouée.' })
            })
        }
      })

    },
    annulationBiens (id) {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: 'Confirmer l\'annulation?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.post('propertyValidation/', { id})
            .then(response => {
              this.$vs.loading()
              //sans filter next_prev//
              if (this.verify_stock_repNext) {
                this.verifySansFilter(this.stock_repNext)
              }
              if (this.verify_stock_repPrev) {
                this.verifySansFilter(this.stock_repPrev)
              }
              //avec filter next_prev//
              if (this.verify_stock_nextPage) {
                this.verifyFilter(this.stock_nextPage)
              }
              if (this.verify_stock_prevPage) {
                this.verifyFilter(this.stock_prevPage)
              }
              // avec filter sans next_prev
              if (this.verify_stock_filter) {
                this.verifyFilter('validatedPropertyFilter/')
              }
              window.getPrendTaCom.success('Validation annulée avec succès.', response)
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'L\'annulation a échouée.' })
            })
        }
      })

    },
    Rech () {
      if (this.codeBien !== '') {
        this.$vs.loading()
        const code = this.codeBien
        this.$http.post('search/', { code })
          .then((response) => {
            this.recipients = response.data
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
    next () {
      this.verify_stock_repNext = true
      this.verify_stock_nextPage  = false
      this.verify_stock_repPrev = false
      this.verify_stock_prevPage = false
      this.verify_stock_filter = false
      this.stock_repNext = this.repNext.substr(41)
      this.$vs.loading()
      this.$http.get(this.repNext)
        .then((response) => {
          this.recipients = response.data.results
          this.repNext = str + (response.data.next).substr(45)
          this.repPrev = str + (response.data.previous).substr(45)

          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev () {
      this.verify_stock_repPrev = true
      this.verify_stock_nextPage  = false
      this.verify_stock_repNext = false
      this.verify_stock_prevPage = false
      this.verify_stock_filter = false
      this.stock_repPrev = this.repPrev.substr(41)

      this.$vs.loading()
      this.$http.get(this.repPrev)
        .then((response) => {
          this.recipients = response.data.results
          this.repNext = str + (response.data.next).substr(45)
          this.repPrev = str + (response.data.previous).substr(45)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    next1 () {
      this.verify_stock_nextPage  = true
      this.verify_stock_repNext = false
      this.verify_stock_repPrev = false
      this.verify_stock_prevPage = false
      this.verify_stock_filter = false
      this.stock_nextPage = this.nextPage.substr(41)

      this.$vs.loading()
      this.$http.post(this.nextPage, {
        regionNew:this.region,
        siteNew:this.site,
        domain:this.domaine,
        familyNew:this.famille
      })
        .then((response) => {
          this.recipients = response.data.results
          this.nextPage = str + (response.data.next).substr(45)
          this.prevPage = str + (response.data.previous).substr(45)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev1 () {
      this.verify_stock_prevPage  = true
      this.verify_stock_nextPage  = false
      this.verify_stock_repNext = false
      this.verify_stock_repPrev = false
      this.verify_stock_filter = false
      this.stock_prevPage = this.prevPage.substr(41)

      this.$vs.loading()
      this.$http.post(this.prevPage, {
        regionNew:this.region,
        siteNew:this.site,
        domain:this.domaine,
        familyNew:this.famille
      }).then((response) => {
        this.recipients = response.data.results
        this.nextPage = str + (response.data.next).substr(45)
        this.prevPage = str + (response.data.previous).substr(45)
        this.$vs.loading.close()
      }).catch(() => {
        this.$vs.loading.close()
      })
    },
    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    openPlayerDialog (player) {
      this.selectedPlayer = player

    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
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
    getAllRecipients () {
      this.verify_stock_repNext = true
      this.$vs.loading()
      this.$http.get('validationList/')
        .then((response) => {
          this.verif_filter = false
          this.verify_stock_filter = false
          this.recipients = response.data.results
          this.repNext = `${str}validationList/?page=2`
          this.repPrev = response.data.previous
          this.stock_repNext = 'validationList/'
          this.$vs.loading.close()
        })
        .catch(() => {

          this.$vs.loading.close()
        })
    },
    verifyFilter (url) {
      this.$http.post(url, {
        familyNew:this.familleValidate,
        domain:this.domaineValidate,
        siteNew:this.siteValidate,
        regionNew :this.regionValidate
      })
        .then((response) => {
          if (response.data.length !== 0) {
            this.recipients = response.data.results
            this.nextPage = str + (response.data.next).substr(45)
            this.prevPage = str + (response.data.previous).substr(45)
          } else {
            this.recipients = []
          }
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    verifySansFilter (url) {
      this.$http.get(url)
        .then((response) => {
          this.recipients = response.data.results
          this.repNext = str + (response.data.next).substr(45)
          this.repPrev = str + (response.data.previous).substr(45)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    getOrderStatusColor (status) {
      if (status === true) {
        return 'success'
      } else if (status === false) {
        return 'danger'
      }
    }
  },
  created () {
    window.getProspect = this
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
eslint
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
