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
          <h4>{{ Object.entries(this.data).length === 0 ? $t("AJOUTER_UN") : $t("MODIFICATION_DE_L") }} {{$t("UTILISATEUR")}}</h4>
          <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
      </div>
      <vs-divider class="mb-0"></vs-divider>

      <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
        <div class="p-6">

          <p> {{$t("Rôle")}} <b style="color: #ff6141" >*</b> </p>
          <v-select
            v-validate="'required'"
            name="role"
            :reduce="rep => rep.key"
            class="w-full" label="name"
            v-model="input.role"
            :options="roles">
          </v-select>
          <span class="text-danger text-sm" v-show="errors.has('role')">{{$t("role_error")}}</span>
          <div v-if="input.role ==='user'">
          <p class="pt-4">{{$t("Compagnie")}}<b style="color: #ff6141" >*</b> </p>
          <vs-select
              v-validate="'required'"
              autocomplete
              v-model="input.company"
              class="w-full"
              name="compagnie">
            <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in companies" />
          </vs-select>
          <span class="text-danger text-sm" v-show="errors.has('compagnie')">{{$t("compagnie_error")}}</span>
          </div>
          <p class="pt-4"> {{$t("Nom")}} <b style="color: #ff6141" >*</b> </p>
          <vs-input
            v-validate="'required'"
            name="last_name"
            v-model="input.last_name"
            class="w-full" />
          <span class="text-danger text-sm" v-show="errors.has('last_name')">{{$t("last_name_error")}}</span>

          <p class="pt-4"> {{$t("Prénoms")}} <b style="color: #ff6141" >*</b> </p>
          <vs-input
            v-validate="'required'"
            name="first_name"
            v-model="input.first_name"
            class="w-full" />
          <span class="text-danger text-sm" v-show="errors.has('first_name')">{{$t("first_name_error")}}</span>

          <p class="pt-4"> {{$t("mail")}} <b style="color: #ff6141" >*</b> </p>
          <vs-input
            v-validate="'required|email'"
            name="email"
            type="email"
            v-model="input.email"
            class="w-full" />
          <span class="text-danger text-sm" v-show="errors.has('email')">{{$t("email_error")}}</span>

          <p class="pt-4"> {{$t("Phone")}} <b style="color: #ff6141" >*</b> </p>
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
          <span class="text-danger text-sm" v-show="errors.has('phoneNumber')">{{$t("phoneNumber_error")}}</span>
        </div>

      </component>
color: #ff6141"
      <div class="flex flex-wrap items-center p-6" slot="footer">
        <vs-button class="mr-6" @click="User_validate">{{$t("Soumettre")}}</vs-button>
        <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">{{$t("Annuler")}}</vs-button>
      </div>
  </vs-sidebar>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Validator } from 'vee-validate'

const dict = {
  custom: {
    last_name: {
      required: 'Le champ nom est obligatoire'
    },
    first_name: {
      required: 'Le champ prénoms est obligatoire'
    },
    role: {
      required: 'Le champ role est obligatoire'
    },
    email: {
      required: 'Le champ email est obligatoire'
    },
    phoneNumber: {
      required: 'Le champ téléphone est obligatoire'
    },
    compagnie: {
      required: 'Le champ compagnie est obligatoire'
    }
  }
}

// register custom messages
Validator.localize('fr', dict)

const input_tempon = {
  email: '',
  first_name: '',
  last_name: '',
  company: '',
  phoneNumber:'',
  role: ''
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
      roles: [
        {
          key: 'admin',
          name: 'Administrateur'
        },
        {
          key: 'user',
          name: 'Utilisateur'
        }

      ],
      showByAdmin: false,
      showByUser: false,

      companies:[],
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
        this.input.company = this.input.company.id
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
    User_validate () {
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
      delete input.parent
      let url = 'users/'
      let methods = 'post'
      const message = {
        error: this.$t('save_error'),
        success: this.$t('save_sucess_user')
      }
      if (input.id) {
        input.phoneNumber = this.input.phoneNumber
        url += `${input.id}/`
        methods = 'put'
        message.success = this.$t('update_user')
      }
      this.$http[methods](url, input)
        .then((response) => {
          window.getProspect.getAllUsers()
          window.getPrendTaCom.success(message.success, response)
          this.$emit('closeSidebar')
          this.initValues()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'username') {
              libelle = 'Nom d\'utilisateur'
            } else if (item === 'email') {
              libelle = 'Email'
            } else if (item === 'first_name') {
              libelle = 'Prénoms'
            } else if (item === 'phoneNumber')  {
              libelle = 'Le Numéro de téléphone'
            } else if (item === 'company') {
              libelle = 'Compagnie'
            } else if (item === 'last_name') {
              libelle = 'Nom'
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
  created () {
    this.$http.get('companies/')
      .then((response) => { this.companies = response.data })
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
