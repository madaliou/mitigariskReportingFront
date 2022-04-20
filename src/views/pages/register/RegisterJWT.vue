<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <div class="vx-row">

      <div class="vx-col sm:w-full md:w-1/2 lg:1/2 xs:w-full">
        <!-- Nom du profil-->
        <p > Profil <b style="color: #ff6141" >*</b> </p>
        <v-select
          v-validate="'required'"
          name="profile"
          :reduce="rep => rep.key"
          class="w-full" label="name"
          v-model="profile"
          :options="profiles">
        </v-select>
        <span class="text-danger text-sm" v-show="errors.has('profile')">{{ errors.first('profile') }}</span>
        <div v-if="profile === 'particular'">
          <!-- NOM ET PRENOMS-->
        <p > Nom <b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="last_name"
          v-model="last_name"
          class="w-full" />
        <span class="text-danger text-sm">{{ errors.first('last_name') }}</span>

        <p > Prénoms <b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="first_name"
          v-model="first_name"
          class="w-full" />
        <span class="text-danger text-sm">{{ errors.first('first_name') }}</span>
        </div>

        <!-- Nom d'utilsateur pour l'entrprise -->
        <div v-if="profile === 'corporate'">
          <p >Type d'apporteur d'affaire<b style="color: #ff6141" >*</b> </p>
          <v-select
            v-validate="'required'"
            name="member"
            :reduce="rep => rep.id"
            class="w-full" label="name"
            v-model="member"
            :options="members">
          </v-select>
          <span class="text-danger text-sm">{{ errors.first('member') }}</span>

          <p >Nom <b style="color: #ff6141" >*</b> </p>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            name="names"
            v-model="names"
            class="w-full" />
          <span class="text-danger text-sm">{{ errors.first('names') }}</span>
        </div>

        <!-- Date de naissance-->
        <div v-if="profile === 'corporate' || profile === 'particular'">
          <p  v-if="profile === 'corporate'"> Date de création <b style="color: #ff6141" >*</b> </p>
          <p  v-if="profile === 'particular'"> Date de naissance <b style="color: #ff6141" >*</b> </p>
          <datepicker
            label-placeholder="Select Date"
            v-model="birthDate"
            v-validate="'required'"
            name="birthDate"
            class="w-full"
          ></datepicker>
          <span class="text-danger text-sm">{{ errors.first('birthDate') }}</span>
          <p > Nom d'utilisateur <b style="color: #ff6141" >*</b> </p>
          <vs-input
            v-validate="'required'"
            data-vv-validate-on="blur"
            name="displayName"
            v-model="displayName"
            class="w-full" />
          <span class="text-danger text-sm">{{ errors.first('displayName') }}</span>
        </div>
      </div>

      <div class="vx-col sm:w-full md:w-1/2 lg:1/2 xs:w-full">
        <div>
        <!--EMAIL-->
        <p > Email <b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required|email'"
          data-vv-validate-on="blur"
          name="email"
          type="email"
          v-model="email"
          class="w-full" />
        <span class="text-danger text-sm">{{ errors.first('email') }}</span>

        <!-- Telephone-->
        <p  >Téléphone <b style="color: #ff6141" >*</b> </p>
        <vue-tel-input
          v-on:country-changed="countryChanged"
          inputOptions.placeholder="Telephone"
          :selectedCountryCode="true"
          v-model="phone"
          data-vv-validate-on="blur"
          @validate="yourValidationMethod"
          v-validate="'required|min:8|max:16'"
        ></vue-tel-input>
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

        <!-- Ville-->
        <p > Ville <b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="city"
          v-model="city"
          class="w-full" />
        <span class="text-danger text-sm">{{ errors.first('city') }}</span>

        <!-- Password-->
        <p > Mot de passe <b style="color: #ff6141" >*</b> </p>
        <vs-input
          ref="password"
          type="password"
          data-vv-validate-on="blur"
          v-validate="'required|min:8'"
          name="password"
          v-model="password"
          class="w-full" />
        <span class="text-danger text-sm">{{ errors.first('password') }}</span>

        <p > Confirmer le mot de passe <b style="color: #ff6141" >*</b> </p>
        <vs-input
          type="password"
          v-validate="'confirmed:password'"
          data-vv-validate-on="blur"
          data-vv-as="password"
          name="confirm_password"
          v-model="confirm_password"
          class="w-full" />
        <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
        </div>
      </div>
    </div>

      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">J'accepte les termes et conditions.</vs-checkbox>
      <vs-button  type="border" to="/pages/login" class="mt-6">Connexion</vs-button>
      <vs-button class="float-right mt-6" @click="registerUserJWt" :disabled="!validateForm">S'inscrire</vs-button>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

// For custom error message
import { Validator } from 'vee-validate'

const dict = {
  custom: {
    profile : {
      required: 'Le champ nom est profile'
    },
    last_name: {
      required: 'Le champ nom est obligatoire'
    },
    first_name: {
      required: 'Le champ prénoms est obligatoire'
    },
    birthDate: {
      required: 'Le champ date de naissance est obligatoire'
    },

    member: {
      required: 'Le champ d\'apporteur d\'affaire est obligatoire'
    },
    city: {
      required: 'Le champ ville est obligatoire'
    },

    phone: {
      required: 'Le champ téléphone est obligatoire'
    },
    displayName: {
      required: 'Le champ nom d\'utilisateur est obligatoire'
    },
    email: {
      required: 'Le champ email est obligatoire'
    },
    names: {
      required: 'Le champ nom d\'utilisateur est obligatoire'
    },

    password: {
      required: 'Le champ mot de passe est obligatoire',
      min: 'Ce mot de passe est trop court. Il doit contenir au minimum 8 caractères.'
    },

    confirm_password: {
      required: 'Le champ de confirmation de mot de passe est obligatoire',
      confirmed: 'La confirmation du mot de passe ne correspond pas'
    }
  }
}


// register custom messages
Validator.localize('en', dict)

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      profile : 'particular',
      countries: [],

      profiles: [
        {
          key: 'particular',
          name: 'Particulier'
        },
        {
          key: 'corporate',
          name: 'Autre'
        }
      ],
      displayName: '',
      email: '',
      password: '',
      names: '',
      member: '',
      members:[],
      confirm_password: '',
      first_name: '',
      last_name: '',
      birthDate: '',
      city: '',
      phone: '',
      countryCode: '',
      isTermsConditionAccepted: true
    }
  },

  computed: {
    validateForm () {
      return !this.errors.any() &&
        this.displayName !== ''
        && this.email !== ''
        && this.city !== ''
        && this.password !== ''
        && this.confirm_password !== ''
        && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    yourValidationMethod ({ country }) {
      this.countryCode = country.dialCode
    },
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    registerUserJWt () {
      // if (!this.validateForm || !this.checkLogin()) return
      // eslint-disable-next-line no-unused-vars
      this.$validator.validateAll().then(result => {
        this.$vs.loading()
        const data = this.member !== '' ? {
          username: this.displayName,
          email: this.email,
          membership: this.member,
          name: this.names,
          password: this.password,
          password2: this.confirm_password,
          countryCode: this.countryCode,
          phoneNumber: `+${  this.countryCode  } ${  this.phone}`,
          birthDate: this.$store.state.convertDateTime(this.birthDate).date,
          city: this.city
        } : {
          username: this.displayName,
          email: this.email,
          password: this.password,
          password2: this.confirm_password,
          membership: this.member,
          first_name: this.first_name,
          last_name: this.last_name,
          countryCode: this.countryCode,
          phoneNumber: `+${  this.countryCode  } ${  this.phone}`,
          birthDate: this.$store.state.convertDateTime(this.birthDate).date,
          city: this.city
        }

        this.$http.post('register/', data)
          .then(() => {
            this.$vs.notify({
              title: 'INSCRIPTION',
              text: 'Vous vous êtes inscrit avec succès.',
              color: 'success',
              position: 'top-center'
            })
            this.$router.push('/pages/login').catch(() => {
            })
            this.$vs.loading.close()
          })
          .catch((error) => {
            const clefs = Object.keys(error.response.data)
            for (let i = 0; i < clefs.length; i++) {
              const item = clefs[i]

              if (item === 'username') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Nom d\'utilisateur ',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'phoneNumber') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Champ Téléphone vide',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'email') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'L\'Email déjà utilisé ',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'password') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Mot de passe',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'password2') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Confirmer le mot de passe',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'first_name') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Champ Prénoms vide ',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'last_name') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Champ Nom vide ',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'birthDate') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Champ Date de naissance vide',
                  color: 'warning',
                  position: 'top-center'
                })
              } else if (item === 'city') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Champ Ville vide',
                  color: 'warning',
                  position: 'top-center'
                })

              } else if (item === 'membership') {
                this.$vs.notify({
                  time: 4000,
                  title: 'ATTENTION',
                  text: 'Champ d\'apporteur d\'affaire vide',
                  color: 'warning',
                  position: 'top-center'
                })

              }

            }
            this.$vs.notify({
              time: 8000,
              title: 'ENREGISTREMENT',
              text: 'L\'enregistrement a échoué',
              color: 'danger',
              position: 'top-right'
            })
            this.$vs.loading.close()
          })
      })
    }

  },
  created () {
    this.$http.get('memberships/')
      .then((response) => {
        this.members = response.data
      })
      .catch(() => {
      })
  }
}
</script>
