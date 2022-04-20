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
    <div class="vx-row">
      <div class="vx-col w-full ">
        <div class="vx-row" v-if="showByAdmin">
          <div class="cursor-pointer vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" @click="Biens_retrouves()">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="ArchiveIcon"
              icon-right
              :statistic="new Intl.NumberFormat('de-DE').format(variable_dashboard.found)"
              statisticTitle="Biens retrouvés" />
          </div>
          <div class="cursor-pointer vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" @click="Biens_nouveaux()">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="GiftIcon"
              icon-right
              :statistic="new Intl.NumberFormat('de-DE').format(variable_dashboard.unknown )"
              statisticTitle="Biens nouveaux" />
          </div>
          <div class="cursor-pointer vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" @click="Biens_perdus()">
            <statistics-card-line
              hideChart
              class="mb-base"
              icon="AlertTriangleIcon"
              icon-right
              :statistic="new Intl.NumberFormat('de-DE').format(variable_dashboard.losed)"
              statisticTitle="Biens perdus" />
          </div>
        </div>
        <div class="vx-row" v-if="showByContributors">
        </div>
      </div>
    </div>
    <vx-card v-if="lostVerif2" ref="filterCard" title="Filtre des biens retrouvés" class="user-list-filters mb-4"  >
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
    <vx-card  v-if="lostVerif1" ref="filterCard" title="Filtre des biens nouveaux" class="user-list-filters mb-4"  >
      <div class="vx-row">
        <div class="vx-col w-1/4">
          <p class="mb-2" > Regions </p>
          <v-select v-model="region1" :options="regionsNews" :reduce="rep => rep.id" label="name" autocomplete >
          </v-select>
        </div>

        <div class="vx-col w-1/4">
          <p class="mb-2" > Sites </p>
          <v-select v-model="site1" :options="sitesNews" :reduce="rep => rep.id" label="name" autocomplete >
          </v-select>
        </div>

        <div class="vx-col w-1/4">
          <p class="mb-2" > Domaines </p>
          <v-select v-model="domaine1" :options="domaines" :reduce="rep => rep.key" label="name" autocomplete >
          </v-select>

        </div>

        <div class="vx-col w-1/4">
          <p class="mb-2" > Familles </p>
          <v-select v-model="famille1" :options="familiesNews" :reduce="rep => rep.id" label="code" autocomplete >
          </v-select>
        </div>
      </div>
    </vx-card>
    <vx-card v-if="lostVerif" ref="filterCard" title="Filtre des biens perdus" class="user-list-filters mb-4"  >
      <div class="vx-row">
        <div class="vx-col w-1/4">
          <p class="mb-2" > Regions </p>
          <v-select v-model="region2" :options="regionsNews" :reduce="rep => rep.id" label="name" autocomplete >
          </v-select>
        </div>

        <div class="vx-col w-1/4">
          <p class="mb-2" > Sites </p>
          <v-select v-model="site2" :options="sitesNews" :reduce="rep => rep.id" label="name" autocomplete >
          </v-select>
        </div>

        <div class="vx-col w-1/4">
          <p class="mb-2" > Domaines </p>
          <v-select v-model="domaine2" :options="domaines" :reduce="rep => rep.key" label="name" autocomplete >
          </v-select>

        </div>

        <div class="vx-col w-1/4">
          <p class="mb-2" > Familles </p>
          <v-select v-model="famille2" :options="familiesNews" :reduce="rep => rep.id" label="code" autocomplete >
          </v-select>
        </div>
      </div>
    </vx-card>

    <div id="data-list-list-view" class="data-list-container">
      <data-view-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

      <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="properties">

          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

            <div class="flex flex-wrap-reverse items-center data-list-btn-container">
              <div class="flex flex-wrap-reverse items-center data-list-btn-container mb-6" >
                <vs-input label="Entrez le code du bien"  v-model="codeBien" class="w-2/6 mb-6 "/>
              </div>

              <div  class="btn-add-new p-2 mb-6 mr-4 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="Rech">
                <feather-icon icon="SearchIcon" svgClasses="h-4 w-4" />
                <span class=" text-base text-primary">Rechercher</span>
              </div>
              <div v-if="lostVerif && (this.region2 === '' && this.site2 ==='' && this.domaine2 === '' && this.famille2 === '') " class="btn-add-new p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="exporter1()">
                <feather-icon icon="ClipboardIcon" svgClasses="h-4 w-4" />
                <span class="ml-2 text-base text-primary">Exporter</span>
              </div>
              <div v-if="lostVerif2 && (this.region === '' && this.site ==='' && this.domaine === '' && this.famille === '')" class="btn-add-new p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="exporter2()">
                <feather-icon icon="ClipboardIcon" svgClasses="h-4 w-4" />
                <span class="ml-2 text-base text-primary">Exporter</span>
              </div>
              <div v-if="lostVerif1 && (this.region1 === '' && this.site1 ==='' && this.domaine1 === '' && this.famille1 === '')" class="btn-add-new p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary" @click="exporter3()">
                <feather-icon icon="ClipboardIcon" svgClasses="h-4 w-4" />
                <span class="ml-2 text-base text-primary">Exporter</span>
              </div>


              <download-excel
                class="btn-add-new icon-chrome p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
                v-if="lostVerif1 && (this.region1 !== '' || this.site1 !== '' || this.domaine1 !== '' || this.famille1 !== '')"
                :fetch= "fetchData"
                :fields="json_fields"
                worksheet="My Worksheet"
                name="Biens_Nouveaux_Filtrés.xls"
              >
                Exporter
              </download-excel>

              <download-excel
                class="btn-add-new icon-chrome p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
                v-if="lostVerif2 && (this.region !== '' || this.site !== '' || this.domaine !== '' || this.famille !== '')"
                :fetch= "fetchData1"
                :fields="json_fields"
                worksheet="My Worksheet"
                name="_Biens_Retrouvés_Filtrés.xls"
              >
                Exporter
              </download-excel>

              <download-excel
                class="btn-add-new icon-chrome p-2 mb-6 mr-2 ml-2 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
                v-if="lostVerif && (this.region2 !== '' || this.site2 !== '' || this.domaine2 !== '' || this.famille2 !== '')"
                :fetch= "fetchData2"
                :fields="json_fields"
                worksheet="My Worksheet"
                name="Biens_Perdus_Filtrés.xls"
              >
                Exporter
              </download-excel>
            </div>

            <!-- ITEMS PER PAGE -->
            <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
              <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ properties.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : properties.length }} of {{ queriedItems }}</span>
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
            <vs-th v-if="lostVerif1" sort-key="validation">Validation</vs-th>
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
              <vs-td v-if="lostVerif1" >
                <vs-chip :color="getOrderStatusColor(tr.validated)" class="product-order-status">{{validationObject[tr.validated]}}</vs-chip>
              </vs-td>
              <vs-td class="whitespace-no-wrap">
                <div class="flex">
                <vx-tooltip text="Voir" color="primary">
                <feather-icon style="color: navy " icon="EyeIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click="activePrompt2 = true" v-on:click="openPlayerDialog(tr)" color="warring" type="border" class="ml-2" />
                </vx-tooltip>
                <vx-tooltip text="Modifier" color="warning">
                <feather-icon v-if="lostVerif" style="color: #FF9F43 " icon="EditIcon" svgClasses="w-5 h-5 hover:text-warning stroke-current" @click.stop="editData(tr)" class="ml-2" />
                </vx-tooltip>
                <vx-tooltip  v-if="tr.validated === false && lostVerif1" text="Valider" color="success">
                    <feather-icon
                      style="color: lime"
                      icon="CheckCircleIcon"
                      svgClasses="w-5 h-5 hover:text-success stroke-current"
                      class="ml-2"
                      @click.stop="validationBiens(tr.id)" />
                  </vx-tooltip>
                <vx-tooltip  v-if="tr.validated === true && lostVerif1"  text="Annuler" color="danger">
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

      <div v-if="lostVerif">
        <div v-if="!this.verif_filter ">
          <vs-button v-if="this.lostPrev!==null" @click="prev()" class="ml-4 mb-4">Précédent</vs-button>
          <vs-button v-if="this.lostNext!==null" @click="next()" class="ml-4 mb-4" >Suivant</vs-button>
        </div>
        <div v-if="this.verif_filter" >
          <vs-button v-if="this.prevPage_AP!==null" @click="prev_AP()" class="ml-4 mb-4">Précédent</vs-button>
          <vs-button  v-if="this.nextPage_AN!==null" @click="next_AN()" class="ml-4 mb-4" >Suivant</vs-button>
        </div>
      </div>

      <div v-if="lostVerif1">
        <div v-if="!this.verif_filter1 " >
        <vs-button v-if="this.unknowPrev!==null" @click="prev1()" class="ml-4 mb-4">Précédent</vs-button>
        <vs-button v-if="this.unknowNext!==null" @click="next1()" class="ml-4 mb-4" >Suivant</vs-button>
        </div>
        <div v-if="this.verif_filter1" >
          <vs-button v-if="this.prevPage_AP1!==null" @click="prev_AP1()" class="ml-4 mb-4">Précédent</vs-button>
          <vs-button  v-if="this.nextPage_AN1!==null" @click="next_AN1()" class="ml-4 mb-4" >Suivant</vs-button>
        </div>
      </div>

      <div v-if="lostVerif2">
        <div v-if="!this.verif_filter2 ">
        <vs-button v-if="this.foundPrev !== null" @click="prev2()" class="ml-4 mb-4">Précédent</vs-button>
        <vs-button v-if="this.foundNext !== null" @click="next2()" class="ml-4 mb-4" >Suivant</vs-button>
        </div>
        <div v-if="this.verif_filter2" >
          <vs-button v-if="this.prevPage_AP2!==null" @click="prev_AP2()" class="ml-4 mb-4">Précédent</vs-button>
          <vs-button  v-if="this.nextPage_AN2!==null" @click="next_AN2()" class="ml-4 mb-4" >Suivant</vs-button>
        </div>
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
  </div>
</template>

<script>
import DataViewSidebar from './DataViewSidebarEcart'
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
const str = 'https://matinvent.moozistudio.com/api/'

export default {
  data () {
    return {
      validationObject: {
        false: 'Non validé',
        true: 'Validé'
      },
      verify_stock_filter_UK:false,
      verify_stock_prevPage_AP1:false,
      verify_stock_nextPage_AN1:false,
      verify_stock_unknowPrev:false,
      verify_stock_unknowNext:false,
      stock_unknowNext:'',
      stock_unknowPrev:'',
      stock_unknowNext_Filter:'',
      stock_unknowPrev_Filter:'',
      sidebarData: {},
      addNewDataSidebar: false,
      showByAdmin: false,
      codeBien: '',
      lostNext: '',
      lostPrev: '',
      foundNext: '',
      foundPrev: '',
      unknowNext:'',
      unknowPrev:'',
      prevPage_AP: '',
      nextPage_AN: '',
      prevPage_AP1: '',
      nextPage_AN1: '',
      verif_filter:false,
      verif_filter1:false,
      verif_filter2:false,
      lostVerif: false,
      lostVerif1: false,
      lostVerif2: false,
      activePrompt2:false,
      showByPropect: false,
      showByContributors: false,
      variable_dashboard : {},
      variable_prospects : {},
      get_prospects : {},
      variable_contributors : {},
      get_contributors : {},
      productsOrder: {},
      selectedPlayer:undefined,
      dispatchedOrders: [],
      selected: [],
      itemsPerPage: 20,
      isMounted: false,
      incrementpage:0,
      incrementpage1:0,
      incrementpage2:0,
      disableeNext:true,
      properties: [],
      domainObject: {
        untechnical: 'Non technique',
        technical: 'technique'

      },
      regionsNews: [],
      familiesNews: [],
      sitesNews: [],
      //biens retrouvés
      region:'',
      site:'',
      domaine:'',
      famille:'',
      //biens nouveaux
      region1:'',
      site1:'',
      domaine1:'',
      famille1:'',
      //biens perdus
      region2:'',
      site2:'',
      domaine2:'',
      famille2:'',
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
      ]
    }
  },

  components: {
    DataViewSidebar,
    VueApexCharts,
    StatisticsCardLine
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.properties.length
    }
  },
  watch: {
    //biens retrouvés
    famille (value) {
      this.verif_filter2 = true
      if (value) {
        const familyNew = value
        const domain = this.domaine
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('foundPropertiesFilter/', { familyNew, domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
        this.$http.post('foundPropertiesFilter/', { domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    domaine (value) {
      this.verif_filter2 = true
      if (value) {
        const domain = value
        const familyNew = this.famille
        const siteNew = this.site
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('foundPropertiesFilter/', { domain, familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
        this.$http.post('foundPropertiesFilter/', { familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    site (value) {
      this.verif_filter2 = true
      if (value) {
        const siteNew = value
        const domain = this.domaine
        const familyNew = this.famille
        const regionNew = this.region
        this.$vs.loading()
        this.$http.post('foundPropertiesFilter/', { siteNew, domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
        this.$http.post('foundPropertiesFilter/', { domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    region (value) {
      this.verif_filter2 = true
      if (value) {
        const regionNew = value
        const region = value
        const siteNew = this.site
        const domain = this.domaine
        const familyNew = this.famille
        this.$vs.loading()
        this.$http.post('foundPropertiesFilter/', { regionNew, siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
        this.$http.post('foundPropertiesFilter/', {siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN2 = str + (response.data.next).substr(37)
              this.prevPage_AP2 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }

    },
    //biens nouveaux

    famille1 (value) {
      this.verif_filter1 = true
      this.verify_stock_nextPage_AN1 = true
      this.verify_stock_filter_UK = false
      if (value) {
        const familyNew = value
        const domain = this.domaine1
        const siteNew = this.site1
        const regionNew = this.region1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { familyNew, domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.famille1 = ''
        const domain = this.domaine1
        const siteNew = this.site1
        const regionNew = this.region1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    domaine1 (value) {
      this.verif_filter1 = true
      this.verify_stock_nextPage_AN1 = true
      this.verify_stock_filter_UK = false
      if (value) {
        const domain = value
        const familyNew = this.famille1
        const siteNew = this.site1
        const regionNew = this.region1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { domain, familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.$vs.loading()
        this.domaine1 = ''
        const familyNew = this.famille
        const siteNew = this.site
        const regionNew = this.region
        this.$http.post('UnknowPropertiesFilter/', { familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    site1 (value) {
      this.verif_filter1 = true
      this.verify_stock_nextPage_AN1 = true
      this.verify_stock_filter_UK = false
      if (value) {
        const siteNew = value
        const domain = this.domaine1
        const familyNew = this.famille1
        const regionNew = this.region1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { siteNew, domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.site1 = ''
        const domain = this.domaine1
        const familyNew = this.famille1
        const regionNew = this.region1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    region1 (value) {
      this.verif_filter1 = true
      this.verify_stock_nextPage_AN1 = true
      this.verify_stock_filter_UK = false
      if (value) {
        const regionNew = value
        const region = value
        const siteNew = this.site1
        const domain = this.domaine1
        const familyNew = this.famille1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { regionNew, siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
        this.region1 = ''
        this.getAllsite()
        const siteNew = this.site1
        const domain = this.domaine1
        const familyNew = this.famille1
        this.$vs.loading()
        this.$http.post('UnknowPropertiesFilter/', { siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN1 = str + (response.data.next).substr(37)
              this.prevPage_AP1 = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })

      }
    },

    //biens perdus
    famille2 (value) {
      this.verif_filter = true
      if (value) {
        const familyNew = value
        const domain = this.domaine2
        const siteNew = this.site2
        const regionNew = this.region2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', { familyNew, domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.famille2 = ''
        const domain = this.domaine2
        const siteNew = this.site2
        const regionNew = this.region2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', { domain, siteNew, regionNew   })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    domaine2 (value) {
      this.verif_filter = true
      if (value) {
        const domain = value
        const familyNew = this.famille2
        const siteNew = this.site2
        const regionNew = this.region2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', { domain, familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.$vs.loading()
        this.domaine2 = ''
        const familyNew = this.famille2
        const siteNew = this.site2
        const regionNew = this.region2
        this.$http.post('lostPropertiesFilter/', { familyNew, siteNew, regionNew  })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    site2 (value) {
      this.verif_filter = true
      if (value) {
        const siteNew = value
        const domain = this.domaine2
        const familyNew = this.famille2
        const regionNew = this.region2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', { siteNew, domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      } else {
        this.site2 = ''
        const domain = this.domaine2
        const familyNew = this.famille2
        const regionNew = this.region2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', { domain, familyNew, regionNew })
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
            }
            this.$vs.loading.close()
          })
          .catch(() => {
            this.$vs.loading.close()
          })
      }
    },

    region2 (value) {
      this.verif_filter = true
      if (value) {
        const regionNew = value
        const region = value
        const siteNew = this.site2
        const domain = this.domaine2
        const familyNew = this.famille2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', { regionNew, siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
        this.region2 = ''
        this.getAllsite()
        const siteNew = this.site2
        const domain = this.domaine2
        const familyNew = this.famille2
        this.$vs.loading()
        this.$http.post('lostPropertiesFilter/', {siteNew, domain, familyNew})
          .then((response) => {
            if (response.data.length !== 0) {
              this.properties = response.data.results
              this.nextPage_AN = str + (response.data.next).substr(37)
              this.prevPage_AP = str + (response.data.previous).substr(37)
            } else {
              this.properties = []
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
    editData (data) {
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
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
              //sans filter //avec next_prev//
              if (this.verify_stock_unknowNext) {
                this.verifySansFilterUK(this.stock_unknowNext)

              }
              if (this.verify_stock_unknowPrev) {
                this.verifySansFilterUK(this.stock_unknowPrev)
              }
              //avec filter //sans next_prev//
              if (this.verify_stock_nextPage_AN1) {
                this.verifyFilterUK(this.stock_unknowNext_Filter)
              }
              if (this.verify_stock_prevPage_AP1) {
                this.verifyFilterUK(this.stock_unknowPrev_Filter)
              }
              // sans filter sans next_prev
              if (this.verify_stock_filter_UK) {
                this.verifySansFilterUK('unknownProperties/')
              }
              this.validateCount()
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
              //sans filter //avec next_prev//
              if (this.verify_stock_unknowNext) {
                this.verifySansFilterUK(this.stock_unknowNext)
              }
              if (this.verify_stock_unknowPrev) {
                this.verifySansFilterUK(this.stock_unknowPrev)
              }
              //avec filter //sans next_prev//
              if (this.verify_stock_nextPage_AN1) {
                this.verifyFilterUK(this.stock_unknowNext_Filter)
              }
              if (this.verify_stock_prevPage_AP1) {
                this.verifyFilterUK(this.stock_unknowPrev_Filter)
              }
              // sans filter sans next_prev
              if (this.verify_stock_filter_UK) {
                this.verifySansFilterUK('unknownProperties/')
              }
              this.validateCount()
              window.getPrendTaCom.success('Validation annulée avec succès.', response)
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'L\'annulation a échouée.' })
            })
        }
      })
    },
    async fetchData1 () {
      const siteNew = this.site
      const domain = this.domaine
      const familyNew = this.famille
      const regionNew = this.region
      const response = await this.$http.post('unpaginatedFoundPropertiesFilter/', { regionNew, siteNew, domain, familyNew})
      return response.data
    },
    async fetchData2 () {
      const siteNew = this.site2
      const domain = this.domaine2
      const familyNew = this.famille2
      const regionNew = this.region2
      const response = await this.$http.post('unpaginatedLostPropertiesFilter/', { regionNew, siteNew, domain, familyNew})
      return response.data
    },
    async fetchData () {
      const siteNew = this.site1
      const domain = this.domaine1
      const familyNew = this.famille1
      const regionNew = this.region1
      const response = await this.$http.post('unpaginatedUnknowPropertiesFilter/', { regionNew, siteNew, domain, familyNew})
      return response.data
    },
    exporter1 () {
      window.open(`${this.$http.defaults.baseURL  }export_lost_properties/`, '_blank')
    },
    exporter2 () {
      window.open(`${this.$http.defaults.baseURL  }export_found_properties/`, '_blank')
    },
    exporter3 () {
      window.open(`${this.$http.defaults.baseURL  }export_new_properties/`, '_blank')
    },
    Rech () {
      if (this.codeBien !== '') {
        this.$vs.loading()
        const code = this.codeBien
        this.$http.post('search/', { code })
          .then((response) => {
            this.properties = response.data
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
    getAllEcarts_fiter () {
      this.$http.post('lostPropertiesFilter/', {
        regionNew: this.region2,
        siteNew:this.site2,
        domain : this.domaine2,
        familyNew: this.famille2})
        .then((response) => {
          if (response.data.length !== 0) {
            this.properties = response.data.results
            this.nextPage_AN = str + (response.data.next).substr(37)
            this.prevPage_AP = str + (response.data.previous).substr(37)
          }
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    //Biens perdus pagination
    next () {
      this.$vs.loading()
      this.$http.get(this.lostNext)
        .then((response) => {
          this.properties = response.data.results
          this.lostNext = str + (response.data.next).substr(37)
          this.lostPrev = str +  (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev () {
      this.$vs.loading()
      this.$http.get(this.lostPrev)
        .then((response) => {
          this.properties = response.data.results
          this.lostNext = response.data.next
          this.lostPrev = response.data.previous
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    ///****Filterperdus****///
    next_AN () {
      this.$vs.loading()
      this.$http.post(this.nextPage_AN, {
        regionNew:this.region2,
        siteNew:this.site2,
        domain:this.domaine2,
        familyNew:this.famille2
      })
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN = str + (response.data.next).substr(37)
          this.prevPage_AP = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev_AP () {
      this.$vs.loading()
      this.$http.post(this.prevPage_AP, {
        regionNew:this.region2,
        siteNew:this.site2,
        domain:this.domaine2,
        familyNew:this.famille2
      })
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN = str + (response.data.next).substr(37)
          this.prevPage_AP = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    //Biens nouveaux pagination
    next1 () {
      this.verify_stock_filter_UK = false
      this.verify_stock_unknowNext = true
      this.verify_stock_unknowPrev = false
      this.verify_stock_nextPage_AN1 = false
      this.verify_stock_prevPage_AP1 = false
      this.stock_unknowNext = this.unknowNext.substr(41)
      this.$vs.loading()
      this.$http.get(this.unknowNext)
        .then((response) => {
          this.properties = response.data.results
          this.unknowNext = str + (response.data.next).substr(37)
          this.unknowPrev = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev1 () {
      this.verify_stock_filter_UK = false
      this.verify_stock_unknowNext = false
      this.verify_stock_unknowPrev = true
      this.verify_stock_nextPage_AN1 = false
      this.verify_stock_prevPage_AP1 = false
      this.stock_unknowPrev = this.unknowPrev.substr(41)
      this.$vs.loading()
      this.$http.get(this.unknowPrev)
        .then((response) => {
          this.properties = response.data.results
          this.unknowNext = response.data.next
          this.unknowPrev = response.data.previous
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    ///****Filternouveaux****///
    next_AN1 () {
      this.verify_stock_filter_UK = false
      this.verify_stock_unknowNext = false
      this.verify_stock_unknowPrev = false
      this.verify_stock_nextPage_AN1 = true
      this.verify_stock_prevPage_AP1 = false
      this.stock_unknowNext_Filter = this.nextPage_AN1.substr(41)
      this.$vs.loading()
      this.$http.post(this.nextPage_AN1, {
        regionNew:this.region1,
        siteNew:this.site1,
        domain:this.domaine1,
        familyNew:this.famille1
      })
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN1 = str + (response.data.next).substr(37)
          this.prevPage_AP1 = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev_AP1 () {
      this.verify_stock_filter_UK = false
      this.verify_stock_unknowNext = false
      this.verify_stock_unknowPrev = false
      this.verify_stock_nextPage_AN1 = false
      this.verify_stock_prevPage_AP1 = true
      this.stock_unknowPrev_Filter = this.prevPage_AP1.substr(41)
      this.$vs.loading()
      this.$http.post(this.prevPage_AP1, {
        regionNew:this.region1,
        siteNew:this.site1,
        domain:this.domaine1,
        familyNew:this.famille1
      })
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN1 = str + (response.data.next).substr(37)
          this.prevPage_AP1 = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    //Biens retrouvés pagination
    next2 () {
      this.$vs.loading()
      this.$http.get(this.foundNext)
        .then((response) => {
          this.properties = response.data.results
          this.foundNext = str + (response.data.next).substr(37)
          this.foundPrev = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev2 () {
      this.$vs.loading()
      this.$http.get(this.foundPrev)
        .then((response) => {
          this.properties = response.data.results
          this.foundNext = response.data.next
          this.foundPrev = response.data.previous
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    ///****FilterRetrouvé****///
    next_AN2 () {
      this.$vs.loading()
      this.$http.post(this.nextPage_AN2, {
        regionNew:this.region,
        siteNew:this.site,
        domain:this.domaine,
        familyNew:this.famille
      })
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN2 = str + (response.data.next).substr(37)
          this.prevPage_AP2 = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    prev_AP2 () {
      this.$vs.loading()
      this.$http.post(this.prevPage_AP2, {
        regionNew:this.region,
        siteNew:this.site,
        domain:this.domaine,
        familyNew:this.famille
      })
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN2 = str + (response.data.next).substr(37)
          this.prevPage_AP2 = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },

    //---------------------------//

    Biens_nouveaux () {
      this.$vs.loading()
      this.verify_stock_filter_UK = true
      this.verify_stock_unknowNext = false
      this.verify_stock_unknowPrev = false
      this.verify_stock_nextPage_AN1 = false
      this.verify_stock_prevPage_AP1 = false
      this.verif_filter1 = false
      this.lostVerif = false
      this.lostVerif1 = true
      this.lostVerif2 = false
      this.properties = []
      this.$http.get('unknownProperties/')
        .then((response) => {
          this.properties = response.data.results
          this.unknowNext = `${str}unknownProperties/?page=2`
          this.stock_unknowNext_Filter = 'UnknowPropertiesFilter/'
          this.unknowPrev = response.data.previous
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    Biens_retrouves () {
      this.$vs.loading()
      this.verif_filter2 = false
      this.lostVerif = false
      this.lostVerif1 = false
      this.lostVerif2 = true
      this.properties = []
      this.$http.get('foundProperties/')
        .then((response) => {
          this.properties = response.data.results
          this.foundNext = `${str}foundProperties/?page=2`
          this.foundPrev = response.data.previous
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    Biens_perdus () {
      this.$vs.loading()
      this.verif_filter = false
      this.lostVerif = true
      this.lostVerif1 = false
      this.lostVerif2 = false
      this.properties = []
      this.$http.get('lostProperties/')
        .then((response) => {
          this.properties = response.data.results
          this.lostNext = `${str}lostProperties/?page=2`
          this.lostPrev = response.data.previous
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },

    //----------------------------//

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

    //----------filtre avec next----------------//
    verifyFilterUK (url) {
      this.$http.post(url, {
        familyNew:this.famille1,
        domain:this.domaine1,
        siteNew:this.site1,
        regionNew :this.region1
      })
        .then((response) => {
          if (response.data.length !== 0) {
            this.properties = response.data.results
            this.nextPage_AN1 = str + (response.data.next).substr(37)
            this.prevPage_AP1 = str + (response.data.previous).substr(37)
          } else {
            this.recipients = []
          }
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    //----------filtre avec next----------------//
    verifySansFilterUK (url) {
      this.$http.get(url)
        .then((response) => {
          this.properties = response.data.results
          this.nextPage_AN1 = str + (response.data.next).substr(37)
          this.prevPage_AP1 = str + (response.data.previous).substr(37)
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    },
    openPlayerDialog (player) {
      this.selectedPlayer = player
    },
    getOrderStatusColor (status) {
      if (status === true) {
        return 'success'
      } else if (status === false) {
        return 'danger'
      }
    },
    validateCount () {
      this.$http.get('gap/')
        .then((response) => {
          this.variable_dashboard = response.data
        })
    }
  },
  created () {
    window.getProspect = this
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (user_role === 'admin') {
      this.$http.get('gap/')
        .then((response) => {
          this.variable_dashboard = response.data
        })
      this.$vs.loading()
      this.$http.get('lostProperties/')
        .then((response) => {
          this.properties = response.data.results
          this.lostNext = `${str}lostProperties/?page=2`
          this.lostPrev = response.data.previous
          this.$vs.loading.close()
        })
      this.showByAdmin = true
      this.verif_filter = false
      this.lostVerif = true
      this.lostVerif1 = false
      this.lostVerif2 = false

    } else if (user_role === 'contributor') {
      this.showByContributors = true
      this.$http.get('contributorProspects/')
        .then((response) => {
          this.get_contributors = response.data
        })

    } else if (user_role === 'moov') {
      this.showByPropect = true
      this.$http.get('prospectRecipients/')
        .then((response) => {
          this.get_prospects = response.data
        })
    }
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

/*! rtl:end:ignore */
</style>
