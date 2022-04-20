<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col w-4/5 sm:w-4/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/forgot-password.png" alt="login" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Récupérez votre mot de passe</h4>
                                    <p>Veuillez saisir votre adresse e-mail et nous vous enverrons des instructions pour réinitialiser votre mot de passe.</p>
                                </div>

                                <vs-input
                                  v-validate="'required|email'"
                                  data-vv-validate-on="blur"
                                  type="email"
                                  name="email"
                                  label-placeholder="Email"
                                  v-model="email"
                                  class="w-full mb-3 " />
                              <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                              <div class="flex flex-wrap justify-between mb-3">
                                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Connexion</vs-button>
<!--                                <vs-button class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Changer</vs-button>-->
                                <vs-button  @click="ChangePassword" :disabled="!validateForm" class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Changer</vs-button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import router from '../../router'

export default {
  data () {
    return {
      email: ''
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() &&
        this.email !== ''
    }
  },
  methods: {
    ChangePassword () {
      this.$vs.loading()
      delete this.$http.defaults.headers.common['Authorization']
      const email = this.email
      this.$http.post('password-reset/', {email})
        .then((reponse) => {
          // localStorage.clear();
          this.$vs.notify({
            time:8000,
            title: 'MOT DE PASSE REINITIALLISÉ ',
            text: reponse.data,
            color: 'success',
            position:'top-center'
          })
          router.push(router.currentRoute.query.to || '/pages/login')
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })
    }
  }
}
</script>
