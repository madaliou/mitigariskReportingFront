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
                  <h4 class="mb-4">Changer votre mot de passe</h4>
                  <p>C'est votre première connexion.Veuillez saisir votre nouveau mot de passe.</p>
                </div>
                <div>
                  <vs-input
                    ref="password"
                    type="password"
                    data-vv-validate-on="blur"
                    v-validate="'required|min:8|max:15'"
                    name="password"
                    label-placeholder="Password"
                    placeholder="Mot de passe"
                    v-model="password"
                    class="w-full mt-8" />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                  <vs-input
                    type="password"
                    v-validate="'min:8|max:15|confirmed:password'"
                    data-vv-validate-on="blur"
                    data-vv-as="password"
                    name="confirm_password"
                    label-placeholder="Confirm Password"
                    placeholder="Confirmation mot de passe"
                    v-model="confirm_password"
                    class="w-full mt-8" />
                  <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
              </div>
                <br/>
<!--                <vs-input type="email" label-placeholder="Email" v-model="value1" class="w-full mb-8" />-->
                <vs-button type="border" to="/pages/login" class="px-4 w-full md:w-auto">Connexion</vs-button>
                <vs-button  @click="ChangePassword" :disabled="!validateForm" class="float-right px-4 w-full md:w-auto mt-3 mb-8 md:mt-0 md:mb-0">Changer</vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  data () {
    return {
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() &&
        this.password !== '' && this.confirm_password !== ''
    }
  },
  methods: {
    ChangePassword () {
      this.$vs.loading()
      const password = this.password
      this.$http.patch('change-password/', { password })
        .then((reponse) => {
          // localStorage.clear();
          this.$vs.notify({
            time:4000,
            title: 'MOT DE PASSE CHANGÉ ',
            text: reponse.data.message,
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
