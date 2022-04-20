<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
          <h4>{{ Object.entries(this.data).length === 0 ? "AJOUTER UN" : "MODIFIER LE" }} BIEN </h4>
          <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>
      <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
        <div class="p-6">
<!--          <p> Code du bien <b style="color: #ff6141" ></b> </p>-->
<!--          <vs-input-->
<!--            name="code"-->
<!--            v-model="input.code"-->
<!--            class="w-full" />-->
<!--          <span class="text-danger text-sm" v-show="errors.has('code')">{{ errors.first('code') }}</span>-->

          <p class="pt-4"> Désignation <b style="color: #ff6141" >*</b> </p>
          <vs-input
            v-validate="'required'"
            name="designation"
            v-model="input.designation"
            class="w-full" />
          <span class="text-danger text-sm" v-show="errors.has('designation')">{{ errors.first('designation') }}</span>

          <p class="pt-4">Famille<b style="color: #ff6141" >*</b> </p>
          <vs-select
            v-model="input.familyNew"
            autocomplete
            class="mt-5 w-full"
            name="familyNew"
            v-validate="'required'">
            <vs-select-item :key="item" :value="item.id" :text="item.code" v-for="item in familiesNews" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('familyNew')">{{ errors.first('familyNew') }}</span>

          <p class="pt-4">Site<b style="color: #ff6141" >*</b> </p>
          <vs-select
            v-model="input.siteNew"
            autocomplete
            class="mt-5 w-full"
            name="siteNew"
            v-validate="'required'">
            <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in sitesNews" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('siteNew')">{{ errors.first('siteNew') }}</span>

          <p class="pt-4"> Etat <b style="color: #ff6141" ></b> </p>
          <vs-input
            name="condition"
            v-model="input.condition"
            class="w-full" />

          <p class="pt-4"> Quantité<b style="color: #ff6141" ></b> </p>
          <vs-input-number
            class="w-full ml-0"
            v-model="input.quantity"
            name="quantity"
          />
          <p class="pt-4"> Oberservation <b style="color: #ff6141" ></b> </p>
          <vs-input
            name="observation"
            v-model="input.observation"
            class="w-full" />

<!--          <p class="pt-4"> Date début d'amortissement </p>-->
<!--          <datepicker v-model="input.amotizationStartDate"></datepicker>-->

<!--          <p class="pt-4"> Date fin d'amortissement  </p>-->
<!--          <datepicker  v-model="input.amotizationEndDate"></datepicker>-->

<!--          <p class="pt-4"> Date d'achat   </p>-->
<!--          <datepicker  v-model="input.purchaseDate" ></datepicker>-->

          <p class="pt-4"> Taux amortissement  </p>
          <vs-input name="observation" v-model="input.amotizationRate" class="w-full" />

          <p class="pt-4"> Durée amortissement </p>
          <vs-input name="observation" v-model="input.amotizationDuration" class="w-full" />

          <p class="pt-4">  Valeur acquisitions antérieur </p>
          <vs-input name="observation" v-model="input.priorAcquisitionValue" class="w-full" />

          <p class="pt-4">Valeur acquisitions exercice</p>
          <vs-input name="observation" v-model="input.exerciseAcquisitionValue" class="w-full" />

          <p class="pt-4"> Total acquisitions </p>
          <vs-input name="observation" v-model="input.totalAcquisition" class="w-full" />

          <p class="pt-4"> Dotation exercice antérieur</p>
          <vs-input name="observation" v-model="input.priorEndowmentyear" class="w-full" />

          <p class="pt-4"> Dotation exercice 2020 </p>
          <vs-input name="observation" v-model="input.fiscalYear2020Allocation" class="w-full" />

          <p class="pt-4"> Total dotation   </p>
          <vs-input name="observation" v-model="input.totalEndowment" class="w-full" />

          <p class="pt-4"> Vnc </p>
          <vs-input name="observation" v-model="input.vnc" class="w-full" />

          <p class="pt-4"> Compte amortissement </p>
          <vs-input name="observation" v-model="input.amortismntAccount" class="w-full" />

          <p class="pt-4"> Compte </p>
          <vs-input name="observation" v-model="input.account" class="w-full" />

        </div>
      </component>
      <div class="flex flex-wrap items-center p-6" slot="footer">
        <vs-button class="mr-6" @click="Prospect_validate">Soumettre</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Annuler</vs-button>
      </div>
  </vs-sidebar>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { Validator } from 'vee-validate'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
const dict = {
  custom: {
    code: {
      required: 'Le champ code est obligatoire'
    },
    designation: {
      required: 'Le champ désignation est obligatoire'
    },

    familyNew: {
      required: 'Le champ famille est obligatoire'
    },
    siteNew: {
      required: 'Le champ site est obligatoire'
    }


  }
}
Validator.localize('fr', dict)

const input_tempon = {
  familyNew:0,
  siteNew:0,
  code: null,
  designation: '',
  observation: '',
  quantity: '',
  condition: '',
  amotizationRate: '',
  amotizationDuration: '',
  priorAcquisitionValue: '',
  exerciseAcquisitionValue: '',
  totalAcquisition: '',
  priorEndowmentyear: '',
  fiscalYear2020Allocation: '',
  vnc: '',
  amortismntAccount: '',
  account: ''
}

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    Datepicker
  },
  data () {
    return {
      sitesNews: [],
      verifyCode:'',
      updatemodification:false,
      UpdateVerify:false,
      familiesNews: [],
      dataImg1_delete: [],
      dataImg1_file: [],
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
      dataSave:{},
      dataImg1: [],
      input: JSON.parse(JSON.stringify(input_tempon)),
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.UpdateVerify = false
        this.input.familyNew = ''
        this.input.siteNew = ''
        this.$validator.reset()
      } else {
        this.UpdateVerify = true
        this.input = JSON.parse(JSON.stringify(this.data))
        this.verifyCode = this.input.code
        // eslint-disable-next-line no-empty
        if (this.verifyCode === 'None') {
          this.input.code = input_tempon.code
        }
        this.input.familyNew = this.input.familyNew.id
        this.input.siteNew = this.input.siteNew.id
        //
        this.initValues()
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.input = JSON.parse(JSON.stringify(input_tempon))
    },
    Prospect_validate () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitData()
        }
      })
    },
    async submitData () {
      if (this.UpdateVerify === true) {
        // eslint-disable-next-line no-unused-vars
        this.dataSave = JSON.parse(JSON.stringify(this.input.code)) !== null ? {
          id: JSON.parse(JSON.stringify(this.input.id)),
          designation: JSON.parse(JSON.stringify(this.input.designation)),
          // code: JSON.parse(JSON.stringify(this.input.code)),
          observation: JSON.parse(JSON.stringify(this.input.observation)),
          condition: JSON.parse(JSON.stringify(this.input.condition)),
          quantity: JSON.parse(JSON.stringify(this.input.quantity)),
          familyNew: JSON.parse(JSON.stringify(this.input.familyNew)),
          siteNew: JSON.parse(JSON.stringify(this.input.siteNew)),
          amotizationRate: JSON.parse(JSON.stringify(this.input.amotizationRate)),
          amotizationDuration: JSON.parse(JSON.stringify(this.input.amotizationDuration)),
          priorAcquisitionValue: JSON.parse(JSON.stringify(this.input.priorAcquisitionValue)),
          exerciseAcquisitionValue: JSON.parse(JSON.stringify(this.input.exerciseAcquisitionValue)),
          totalAcquisition: JSON.parse(JSON.stringify(this.input.totalAcquisition)),
          priorEndowmentyear: JSON.parse(JSON.stringify(this.input.priorEndowmentyear)),
          fiscalYear2020Allocation: JSON.parse(JSON.stringify(this.input.fiscalYear2020Allocation)),
          totalEndowment: JSON.parse(JSON.stringify(this.input.totalEndowment)),
          vnc: JSON.parse(JSON.stringify(this.input.vnc)),
          amortismntAccount: JSON.parse(JSON.stringify(this.input.amortismntAccount)),
          account: JSON.parse(JSON.stringify(this.input.account))
        } : {
          id: JSON.parse(JSON.stringify(this.input.id)),
          designation: JSON.parse(JSON.stringify(this.input.designation)),
          observation: JSON.parse(JSON.stringify(this.input.observation)),
          condition: JSON.parse(JSON.stringify(this.input.condition)),
          quantity: JSON.parse(JSON.stringify(this.input.quantity)),
          familyNew: JSON.parse(JSON.stringify(this.input.familyNew)),
          siteNew: JSON.parse(JSON.stringify(this.input.siteNew)),
          amotizationRate: JSON.parse(JSON.stringify(this.input.amotizationRate)),
          amotizationDuration: JSON.parse(JSON.stringify(this.input.amotizationDuration)),
          priorAcquisitionValue: JSON.parse(JSON.stringify(this.input.priorAcquisitionValue)),
          exerciseAcquisitionValue: JSON.parse(JSON.stringify(this.input.exerciseAcquisitionValue)),
          totalAcquisition: JSON.parse(JSON.stringify(this.input.totalAcquisition)),
          priorEndowmentyear: JSON.parse(JSON.stringify(this.input.priorEndowmentyear)),
          fiscalYear2020Allocation: JSON.parse(JSON.stringify(this.input.fiscalYear2020Allocation)),
          totalEndowment: JSON.parse(JSON.stringify(this.input.totalEndowment)),
          vnc: JSON.parse(JSON.stringify(this.input.vnc)),
          amortismntAccount: JSON.parse(JSON.stringify(this.input.amortismntAccount)),
          account: JSON.parse(JSON.stringify(this.input.account))
        }
      } else {
        // eslint-disable-next-line no-unused-vars
        this.dataSave = JSON.parse(JSON.stringify(this.input))
      }
      // eslint-disable-next-line no-unused-vars
      let url = 'propertiesCodification/'
      // eslint-disable-next-line no-unused-vars
      let methods = 'post'
      const message = {
        error: 'Votre enrégistrement à échouer.',
        success: 'Le bien est enrégistré avec succès.',
        titre: 'ENREGISTREMENT'
      }
      if (this.dataSave.id) {
        this.updatemodification = true
        url += `${this.dataSave.id}/`
        methods = 'put'
        message.success = 'Le bien est modifié avec succès.'
        message.titre = 'MODIFICATION'

      }
      this.$http[methods](url, this.dataSave)
        .then(() => {
          // if (this.updatemodification) {
          //   window.getProspect.getAllfiter()
          // } else {
          //   window.getProspect.getAllRecipients()
          // }
          window.getProspect.getAllRecipients()
          this.$vs.notify({
            title: message.titre,
            text: message.success,
            color: 'success',
            position:'top-right'
          })
          this.$emit('closeSidebar')
          this.initValues()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            if (item === 'designation') {
              this.$vs.notify({
                time:4000,
                title: 'ATTENTION',
                text: 'Le champs code est vide',
                color: 'warning',
                position:'top-center'
              })
            } else if (item === 'code') {
              this.$vs.notify({
                time:4000,
                title: 'ATTENTION',
                text: 'Le champs nom est vide',
                color: 'warning',
                position:'top-center'
              })
            } else if (item === 'familyNew') {
              this.$vs.notify({
                time:4000,
                title: 'ATTENTION',
                text: 'Le champs famille est vide',
                color: 'warning',
                position:'top-center'
              })
            } else if (item === 'siteNew') {
              this.$vs.notify({
                time:4000,
                title: 'ATTENTION',
                text: 'Le champs site est vide',
                color: 'warning',
                position:'top-center'
              })
            }
            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${'Message'} :  ${error.response.data[item][j]}`)
            }
          }
          this.$vs.notify({
            time:8000,
            title: 'ENREGISTREMENT',
            text: 'L\'enregistrement a écchoué',
            color: 'danger',
            position:'top-right'
          })
        })
    }
  },
  created () {
    this.$http.get('familiesNew/')
      .then((response) => { this.familiesNews = response.data })


    this.$http.get('sitesNew/')
      .then((response) => { this.sitesNews = response.data })

  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
