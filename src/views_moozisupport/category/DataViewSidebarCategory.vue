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
      <h4>{{ Object.entries(this.data).length === 0 ? $t("AJOUTER_UN") : $t("MODIFICATION_DE_L") }} {{$t("INCIDENT")}}  </h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">
        <p class="pt-4">{{ $t("Catégorie") }}<b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="nametype"
          v-model="input.name"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('nametype')">{{$t("nametype_error")}}</span>

        <p class="pt-4">{{ $t("Description") }}<b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="description"
          v-model="input.description"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{$t("description_error")}}</span>

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="category_validate">{{$t("Soumettre")}}</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">{{$t("Annuler")}}</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>

// For custom error message
import { Validator } from 'vee-validate'

const dict = {
  custom: {

    nametype: {
      required: 'Le champ incident est obligatoire'
    },
    description: {
      required: 'Le champ description est obligatoire'
    }

  }
}

// register custom messages
Validator.localize('en', dict)

import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const input_tempon = {
  name: '',
  description: ''
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
    VuePerfectScrollbar
  },
  data () {
    return {

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
    category_validate () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitData()
        }
      })
    },

    async submitData () {
      this.$vs.loading()
      const input = JSON.parse(JSON.stringify(this.input))

      let url = 'categories/'
      let methods = 'post'
      const message = {
        error: this.$t('save_error'),
        success: this.$t('incident_save')
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = this.$t('incident_update')
      }

      this.$http[methods](url, input)
        .then((response) => {
          window.Categories.getAllCategory()
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
              libelle = this.$t('Incidents')
            }
            if (item === 'description') {
              libelle = this.$t('Description')
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
