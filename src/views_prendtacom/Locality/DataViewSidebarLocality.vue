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
      <h4>{{ Object.entries(this.data).length === 0 ? "AJOUTER UNE" : "MODIFIER LA " }} LOCALITÉ  </h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">
        <p class="pt-4">Région<b style="color: #ff6141" >*</b> </p>
        <vs-select
          v-model="input.regionNew"
          autocomplete
          class="mt-5 w-full"
          name="regionNew"
          v-validate="'required'">
          <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in regionNews" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('regionNew')">{{ errors.first('regionNew') }}</span>
        <p class="pt-4"> Nom de la localité <b style="color: #ff6141" >*</b> </p>

        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="nametype"
          v-model="input.name"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('nametype')">{{ errors.first('nametype') }}</span>

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

// For custom error message
import { Validator } from 'vee-validate'

const dict = {
  custom: {

    nametype: {
      required: 'Le champ localité est obligatoire'
    },
    regionNew: {
      required: 'Le champ région est obligatoire'
    }

  }
}

// register custom messages
Validator.localize('en', dict)

import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const input_tempon = {
  name: '',
  regionNew:''
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
      regionNews:[],
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
        this.$validator.reset()
      } else {
        this.input = JSON.parse(JSON.stringify(this.data))
        this.input.regionNew = this.input.regionNew.id
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
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
      this.$vs.loading()
      const input = JSON.parse(JSON.stringify(this.input))

      let url = 'localitiesNew/'
      let methods = 'post'
      const message = {
        error: 'Votre enrégistrement à échouer.',
        success: 'La localité est enrégistrée avec succès.'
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = 'La localité est modifiée avec succès.'
      }

      this.$http[methods](url, input)
        .then((response) => {
          window.getProspect.getAllMembers()
          window.getPrendTaCom.success(message.success, response)
          this.$emit('closeSidebar')
          this.initValues()
        })
        .catch((error) => {

          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'name') {
              libelle = 'Montant'
            }

            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${libelle} :  ${error.response.data[item][j]}`)
            }
          }

          window.getPrendTaCom.error(message.error)
        })
    },
    updateCurrImg (input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.dataImg = e.target.result
        }
        reader.readAsDataURL(input.target.files[0])
      }
    }


  },
  async created () {
    this.$http.get('regionsNew/')
      .then((response) => { this.regionNews = response.data })
      .catch(() => { })
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

      .con-²-upload {
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
