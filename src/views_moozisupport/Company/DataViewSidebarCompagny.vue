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
      <h4>{{ Object.entries(this.data).length === 0 ? $t("AJOUTER_UNE") : $t("MODIFICATION_DE") }} {{ $t("COMPAGNIE") }} </h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">
        <p class="pt-4">{{ $t("Compagnie") }}<b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="nametype"
          v-model="input.name"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('nametype')">{{$t("compagnie_error")}}</span>

        <p class="pt-4"> {{ $t("Description") }} <b style="color: #ff6141" >*</b> </p>
         <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="description"
          v-model="input.description"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{$t("description_error")}}</span>

     <!--  <p class="pt-4">{{ $t("resource_person") }}<b style="color: #ff6141" >*</b> </p>
         <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="resourcePerson"
          v-model="input.resourcePerson"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('resourcePerson')">{{$t("resourcePerson_error")}}</span>

        <p class="pt-4"> {{ $t("mail") }} <b style="color: #ff6141" >*</b> </p>
        <vs-input
            v-validate="'required|email'"
            data-vv-validate-on="blur"
            name="email"
            type="email"
            v-model="input.email"
            class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{$t("email_error")}}</span>

      <p class="pt-4"> {{ $t("Phone") }} <b style="color: #ff6141" >*</b> </p>
        <vue-tel-input
            v-model="input.phoneNumber"
            :enabledCountryCode="true"
            :enabledFlags="true"
            :validCharactersOnly="true"
            data-vv-validate-on="blur"
            v-validate="'required|min:8|max:25'"
            @validate="yourValidationMethod"
            name="phoneNumber"
            class="w-full"
        >
        </vue-tel-input>
        <span class="text-danger text-sm" v-show="errors.has('phoneNumber')">{{$t("phoneNumber_error")}}</span> -->

      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="company_validate">{{$t("Soumettre")}}</vs-button>
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
      required: 'Le champ compagnie est obligatoire'
    },
    description: {
      required: 'Le champ description est obligatoire'
    },
    phoneNumber: {
      required: 'Le champ t??l??phone est obligatoire'
    },
    resourcePerson: {
      required: 'Le champ personne ressource est obligatoire'
    },
    email: {
      required: 'Le champ email est obligatoire'
    }

  }
}

// register custom messages
Validator.localize('en', dict)

import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const input_tempon = {
  name: '',
  email: '',
  description:'',
  phoneNumber:'',
  resourcePerson:''
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
      code:'',
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
    company_validate () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitData()
        }
      })
    },
    yourValidationMethod ({ country }) {
      this.code = country.dialCode
    },
    async submitData () {
      this.$vs.loading()
      const input = JSON.parse(JSON.stringify(this.input))
      input.phoneNumber = `+${this.code } ${  this.input.phoneNumber}`
      let url = 'types/'
      let methods = 'post'
      const message = {
        error: this.$t('save_error'),
        success: this.$t('compagny_save')
      }
      if (input.id) {
        input.phoneNumber = this.input.phoneNumber
        url += `${input.id}/`
        methods = 'put'
        message.success = this.$t('compagny_update')
      }

      this.$http[methods](url, input)
        .then((response) => {
          window.Compagnies.getAllCompagny()
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
              libelle = this.$t('Compagnie')
            }
            if (item === 'email') {
              libelle =  this.$t('mail')
            }
            if (item === 'description') {
              libelle = this.$t('Description')
            }
            if (item === 'phoneNumber') {
              libelle = this.$t('Phone')
            }
            if (item === 'resourcePerson') {
              libelle = this.$t('resource_person')
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

      .con-??-upload {
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
