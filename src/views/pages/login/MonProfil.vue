<template>
  <div id="page-user-view">
    <div id="user-data" v-if="user_data" >
      <vx-card :title="$t('PROFIL')" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="activeUserImg" class="rounded w-full" />
            </div>
          </div>
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Nom") }} {{' :'}}</td>
                <td>{{ user_data.last_name}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Prénoms") }} {{' :'}}</td>
                <td>{{ user_data.first_name}}</td>
              </tr>
            </table>
          </div>
          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("Rôle") }} {{' :'}}</td>
                <td>{{ roleObject[ user_data.role]}}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("mail") }} {{' :'}}</td>
                <td>{{ user_data.email}}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" @click="activePrompt3 = true">{{ $t("Modifier_mon_mot_de_passe") }}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>

    <vs-prompt
      color="danger"
      :title="$t('MODIFICATION_DE_MOT_DE_PASSE')"
      @cancel=" password= '';confirm_password='' "
      @accept="acceptAlert3"
      @close="close"
      :is-valid="validateForm"
      :active.sync="activePrompt3">
      <div class="con-exemple-prompt">
        <b>{{ $t("Entez_les_infomations_pour_continuer") }}</b>.
        <div>
          <vs-input
            ref="password"
            type="password"
            data-vv-validate-on="blur"
            v-validate="'required|min:8|max:15'"
            name="password"
            label-placeholder="Password"
            :placeholder="$t('Mot_de_passe')"
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
            :placeholder="$t('Confirmation_mot_de_passe')"
            v-model="confirm_password"
            class="w-full mt-8" />
          <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
        </div>
        <vs-alert :active="inputValid" color="danger" icon="new_releases" >
          {{ $t("Confirmation_mot_de_passe") }}
        </vs-alert>
      </div>
    </vs-prompt>

  </div>
</template>

<script>

export default {

  data () {
    return {
      roleObject: {
        admin: 'Administrateur',
        user: 'Utilisateur'
      },
      user_data: [],
      password: '',
      confirm_password: '',
      activePrompt3:false,
      user_not_found: false,
      country:''
    }
  },
  computed:{
    activeUserImg () {
      return require('@/assets/images/portrait/small/avatar-s-27.jpg') // From Auth
    },
    inputValid () {
      if (this.password !== '' && this.confirm_password !== '') {
        return false
      } else { return true }
    },

    validateForm () {
      return !this.errors.any() && this.password !== '' && this.confirm_password !== ''
    }
  },
  methods: {
    acceptAlert3 () {
      this.$vs.loading()
      const password = this.password
      this.$http.patch('change-password/', { password })
        .then((reponse) => {
          // localStorage.clear();
          this.$vs.notify({
            time:4000,
            title: this.$t('MOT_DE_PASSE_CHANGÉ'),
            text: reponse.data.message,
            color: 'success',
            position:'top-center'
          })
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.notify({
            time:4000,
            title: this.$t('ERROR_PASSWORD'),
            text: error.response.data.password[0],
            color: 'danger',
            position:'top-center'
          })
          this.$vs.loading.close()
        })
    }
  },
  created () {
    this.user_data = JSON.parse(localStorage.getItem('userInfo'))

  }
}

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }


}

</style>
