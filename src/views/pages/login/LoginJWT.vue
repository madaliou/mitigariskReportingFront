<template>
  <div>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        :label-placeholder="$t('mail')"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{$t("email_error")}}</span>

    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        :label-placeholder="$t('Mot_de_passe')"
        v-model="password"
        class="w-full mt-6" />
    <span class="text-danger text-sm">{{$t("password_error")}}</span>

    <div class="flex flex-wrap justify-between my-5">
        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">{{ $t("Se_souvenir_de_moi") }}</vs-checkbox>
        <router-link to="/pages/forgot-password">{{ $t("Mot_de_passe_oublié") }}</router-link>
    </div>
    <div class="flex flex-wrap justify-center mb-3">
<!--      <vs-button  type="border" @click="registerUser">S'inscrire</vs-button>-->
      <vs-button :disabled="!validateForm" @click="loginJWT">{{ $t("Connexion") }}</vs-button>
    </div>
  </div>
</template>

<script>
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    email: {
      required: 'Le champ email est obligatoire'
    },
    password: {
      required: 'Le champ mot de passe est obligatoire'
    }
  }
}
Validator.localize('fr', dict)
export default {
  data () {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
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
    loginJWT () {

      if (!this.checkLogin()) return

      // Loading
      this.$vs.loading()

      const data = {
        username: this.email,
        password: this.password
      }

      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: 'admin@admin.com',
          password: 'adminadmin',
          data
        }
      }

      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => { this.$vs.loading.close() })
        .catch(error => {
          this.$http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/pages/register').catch(() => {})
    }
  }
}

</script>

