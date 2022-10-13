<!-- =========================================================================================
    File Name: Email.vue
    Description: Email Application (Inbox)
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>

  <div id="email-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar class="items-no-padding" parent="#email-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isEmailSidebarActive">
      <email-sidebar :emailTags="emailTags" @closeSidebar="toggleEmailSidebar" :mailFilter="mailFilter" />
    </vs-sidebar>

    <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">
      <!-- EMAIL ACTION BAR -->
      <div class="email__actions flex items-center flex-wrap justify-between p-4 border border-r-0 border-l-0 border-solid d-theme-border-grey-light">
        <div class="flex items-center">
          <h1>{{ $t("Tickets") }}</h1>
        </div>
        <div class="flex"></div>

      </div>

      <!-- EMAILS LIST -->
      <component :is="scrollbarTag" class="email-content-scroll-area" :settings="settings" ref="mailListPS" :key="$vs.rtl">
        <transition-group name="list-enter-up" class="email__mails" tag="ul" appear>
          <li class="cursor-pointer email__mail-item" v-for="(mail, index) in mails" :key="mail.id" @click="updateOpenMail(mail.id,mail.description,mail.category.id)" :style="{transitionDelay: (index * 0.1) + 's'}">
            <mail-item :mail="mail" :isSelected="isMailSelected(mail.id)"/>
          </li>
        </transition-group>
      </component>
    </div>

    <!-- EMAIL VIEW SIDEBAR -->
    <email-view
        :emailTags       = "emailTags"
        :openMailId      = "openMailId"
        :isSidebarActive = "isSidebarActive"
        @removeMail      = "removeMail"
        @validation      = "validation"
        @Annuler_validation = "Annuler_validation"
        @Encours_traitement = "Encours_traitement"
        @Annuler_Encours_traitement = "Annuler_Encours_traitement"
        @send_Message    = "send_Message"
        @Edit_ticket     = "Edit_ticket"
        @previousMail    = "previousMail"
        @nextMail        = "nextMail"
        @moveTo          = "moveCurrentTo"
        @closeSidebar    = "closeMailViewSidebar">
    </email-view>
    <!-- ENVOYER UN MAIL-->
    <vs-prompt
        class="email-compose"
        :title="this.$t('Envoyer_un_mail')"
        :accept-text= "this.$t('Envoyer')"
        :cancel-text= "this.$t('Annuler')"
        @cancel="clearMessage"
        @accept="sendMail"
        @close="clearMessage"
        :is-valid="validateForm && validateForm1"
        :active.sync="activePrompt">
      <component :is="scrollbarTag" class="scroll-area p-4" :settings="settings" :key="$vs.rtl">
        <form @submit.prevent>
          <vs-input disabled="true"
                    v-validate="'required'"
                    name="mailTo"
                    :label-placeholder="this.$t('Destinataire')"
                    v-model="mailTo"
                    class="w-full mb-6"
                    :danger="!validateForm && mailTo !== ''"
                    val-icon-danger="clear"
                    :success="validateForm"
                    val-icon-success="done"
                    :color="validateForm ? 'success' : 'danger'" />
          <quill-editor
              v-model="message"
              name="message"
              v-validate="'required'"
              :options="editorOption"
              :danger="!message"
              val-icon-danger="clear"
              :success="!message"
              val-icon-success="done"
              :color="!message ? 'success' : 'danger'"
          />
        </form>
      </component>
    </vs-prompt>
    <!-- MODIFICATION TICKET -->
    <vs-prompt
        class="email-compose"
        title="Modifier un ticket"
        accept-text= "Modifier"
        cancel-text= "Annuler"
        @cancel="clearTickets"
        @accept="UpdateTicket"
        @close="clearTickets"
        :is-valid="validateForm && validateCategory && validateDesignation"
        :active.sync="activePrompt1">
      <component :is="scrollbarTag" class="scroll-area p-4" :settings="settings" :key="$vs.rtl">
        <form @submit.prevent>
          <vs-input disabled="true"
                    v-validate="'required'"
                    name="mailTo"
                    label-placeholder="Destinataire"
                    v-model="mailTo"
                    class="w-full mb-6"
                    :danger="!validateForm && mailTo !== ''"
                    val-icon-danger="clear"
                    :success="validateForm"
                    val-icon-success="done"
                    :color="validateForm ? 'success' : 'danger'" />

          <vs-select

              v-validate="'required'"
              autocomplete
              v-model="category"
              label="Categorie"
              class="w-full mb-6"
              name="category"
              :danger="!validateCategory && description !== ''"
              val-icon-danger="clear"
              :success="validateForm1"
              val-icon-success="done"
              :color="validateForm1 ? 'success' : 'danger'"
          >
            <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in emailTags" />
          </vs-select>

          <quill-editor
              v-model="description"
              v-validate="'required'"
              :options="editorOption"
              :danger="!validateDesignation && category !== ''"
              val-icon-danger="clear"
              :success="validateDesignation"
              val-icon-success="done"
              :color="validateDesignation ? 'success' : 'danger'"
          />
        </form>
      </component>
    </vs-prompt>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import EmailSidebar        from './EmailSidebar.vue'
import MailItem            from './MailItem.vue'
import EmailView           from './EmailView.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleEmail         from '@/store/ticket/moduleEmail.js'
const lastData = {
  descriptionTicket:'',
  categoryTicket:''
}
export default {
  data () {
    return {
      dashbordValuemail    :false,
      openMailId           : null,
      openMailTexte        : null,
      openMailCategotyId   : null,
      selectedMails        : [],
      isSidebarActive      : false,
      showThread           : false,
      clickNotClose        : true,
      isEmailSidebarActive : true,
      settings             : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      },
      activePrompt: false,
      activePrompt1: false,
      mailTo: 'MOOZISTUDIO',
      description:'',
      category:'',
      categories:[],
      ticket: '',
      message: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'font': [] }]
          ]
        },
        placeholder: 'Message'
      }
    }
  },
  watch: {
    isSidebarActive (value) {
      if (!value) this.showThread = false
    },

    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    //prompt message
    validateForm () {
      return !this.errors.any() && this.mailTo !== ''
    },
    validateForm1 () {
      return !this.errors.any() &&  this.message !== ''
    },
    //prompt ticket

    validateCategory () {
      return !this.errors.any()  && this.category !== ''
    },
    validateDesignation () {
      return !this.errors.any()  && this.description !== ''
    },
    emailTags () {
      return this.$store.state.email.mailTags
    },
    mails () {
      return this.$store.state.email.mails
    },
    selectAllIcon () {
      return this.selectedMails.length === this.mails.length ? 'icon-check' : 'icon-minus'
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    //pour récupéré l'id du mail en cours
    isMailSelected () {
      return (mailId) => this.selectedMails.indexOf(mailId) !== -1
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    //pour traiter un ticket
    validation () {
      this.$vs.dialog({
        type:'confirm',
        color: 'success',
        title: 'Confirmation',
        text: 'Confirmer le traitement?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.post('fix_ticket/', { ticket:this.openMailId})
            .then(response => {
              this.openLoading()
              window.getPrendTaCom.success('Ticket traité avec succès.', response)
              this.$store.dispatch('email/fetchEmails')
              this.isSidebarActive = false
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'Le traitement du ticket a échoué.' })
              this.isSidebarActive = false
            })
        }
      })

    },
    //pour annuler un ticket traité
    Annuler_validation () {
      this.$vs.dialog({
        type:'confirm',
        color: 'warning',
        title: 'Confirmation',
        text: 'Confirmer l\'annulation du ticket traité?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.post('unfix_ticket/', { ticket:this.openMailId})
            .then(response => {
              this.openLoading()
              window.getPrendTaCom.success('Ticket traité annuller avec succès.', response)
              this.$store.dispatch('email/fetchEmails')
              this.isSidebarActive = false
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'l\'annulation du ticket a échoué.' })
              this.isSidebarActive = false
            })
        }
      })

    },
    //pour mettre un ticket encours de traitement
    Encours_traitement () {
      this.$vs.dialog({
        type:'confirm',
        color: 'warning',
        title: 'Confirmation',
        text: 'Mettre le ticket encours de traitement?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.post('begin-fixing-ticket/', { ticket:this.openMailId})
            .then(response => {
              this.openLoading()
              window.getPrendTaCom.success('Ticket mis encours de traitement avec succès.', response)
              this.$store.dispatch('email/tickets_Encours')
              this.isSidebarActive = false
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'le mis encours de traitement à échoué.' })
              this.isSidebarActive = false
            })
        }
      })

    },
    //pour annuller un ticket encours de traitement
    Annuler_Encours_traitement () {
      this.$vs.dialog({
        type:'confirm',
        color: 'warning',
        title: 'Confirmation',
        text: 'Annuler le traitement encours?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.post('begin-unfixing-ticket/', { ticket:this.openMailId})
            .then(response => {
              this.openLoading()
              window.getPrendTaCom.success('le traitement encours du tickets annuller avec succès.', response)
              this.$store.dispatch('email/tickets_Encours')
              this.isSidebarActive = false
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'l\'annulation du ticket en traitement a échoué.' })
              this.isSidebarActive = false
            })
        }
      })

    },
    //pour effecer un ticke
    removeMail () {
      const id = this.openMailId
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: 'Confirmer la suppression?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.delete(`tickets/${id}/`)
            .then(response => {
              this.openLoading()
              window.getPrendTaCom.success('Ticket supprimer avec succès.', response)
              this.$store.dispatch('email/fetchEmails')
              this.isSidebarActive = false
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'La suppression du ticket a échoué.' })
              this.isSidebarActive = false
            })
        }
      })
    },
    //send messeger
    send_Message () {
      this.activePrompt = true
    },
    Edit_ticket () {
      if (this.openMailTexte === '' && this.openMailCategotyId === '') {
        this.description = lastData.descriptionTicket
        this.category = lastData.categoryTicket
        this.activePrompt1 = true
      } else {
        this.description = this.openMailTexte
        this.category = this.openMailCategotyId
        this.activePrompt1 = true
      }

    },
    UpdateTicket () {
      this.$vs.loading()
      const input = {
        description:this.description,
        category:this.category,
        id:this.openMailId
      }
      lastData.descriptionTicket = input.description
      lastData.categoryTicket = input.category
      let url = 'tickets/'
      let methods = 'post'
      const message = {
        error: 'Votre enrégistrement à échouer.',
        success: 'Le ticket est enrégistré avec succès.'
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = 'La ticket est modifié avec succès.'
      }
      this.$http[methods](url, input)
        .then((response) => {
          window.getPrendTaCom.success(message.success, response)
          this.$store.dispatch('email/fetchEmails')
          this.clearTickets()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'category') {
              libelle = 'categorie'
            }
            if (item === 'description') {
              libelle = 'description'
            }
            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${libelle} :  ${error.response.data[item][j]}`)
            }
          }
          window.getPrendTaCom.error(message.error)
        })
    },
    updateOpenMail (mailId, mailTexte, mailCategoryId) {
      this.openMailId = mailId
      this.openMailTexte = mailTexte
      this.openMailCategotyId = mailCategoryId
      this.isSidebarActive = true
    },
    moveCurrentTo (to) {
      this.selectedMails = [this.openMailId]
      this.moveTo(to)
    },
    closeMailViewSidebar () {
      this.isSidebarActive = false
    },
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isEmailSidebarActive = this.clickNotClose = false
      } else {
        this.isEmailSidebarActive = this.clickNotClose = true
      }
    },
    openLoading () {
      this.$vs.loading()
      setTimeout(() => {
        this.$vs.loading.close()
      }, 1000)
    },
    nextMail () {
      const currentMailIndex = this.mails.findIndex((mail) => mail.id === this.openMailId)
      if (this.mails[currentMailIndex + 1]) this.openMailId = this.mails[currentMailIndex + 1].id
    },
    previousMail () {
      const currentMailIndex = this.mails.findIndex((mail) => mail.id === this.openMailId)
      if (this.mails[currentMailIndex - 1]) this.openMailId = this.mails[currentMailIndex - 1].id
    },
    toggleEmailSidebar (value = false) {
      if (!value) {
        this.closeMailViewSidebar()
        if (this.clickNotClose) {
          return
        }
      }
      this.isEmailSidebarActive = value
    },
    clearMessage () {
      this.$nextTick(() => {
        this.ticket = ''
        this.message = ''
      })
    },
    clearTickets () {
      this.$nextTick(() => {
        this.category = ''
        this.description = ''
        this.openMailTexte = ''
        this.openMailCategotyId = ''
      })
    },
    async sendMail () {
      const lang = window.getlanguage.$i18n.locale
      this.$vs.loading()
      const input = {
        message:this.message,
        ticket:this.openMailId,
        // lg : lang
      }
      let url = 'replies/'
      let methods = 'post'
      const message = {
        error: this.$t('message_error'),
        success: this.$t('messsage_envoyer')
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = this.$t('message_update')
      }
      this.$http[methods](url, input)
        .then((response) => {
          window.getPrendTaCom.success(message.success, response)
          // this.$store.dispatch('email/fetchMessage')
          this.clearMessage()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'ticket') {
              libelle = 'Ticket'
            }
            if (item === 'message') {
              libelle = 'Message'
            }
            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${libelle} :  ${error.response.data[item][j]}`)
            }
          }
          window.getPrendTaCom.error(message.error)
        })
    }
  },
  components: {
    quillEditor,
    MailItem,
    EmailSidebar,
    EmailView,
    VuePerfectScrollbar
  },
  created () {
    this.$store.registerModule('email', moduleEmail)
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    window.getCloseSidebar = this

    this.setSidebarWidth()
    this.openLoading()
    if (user_role === 'admin') {
      if (window.getdashboard === undefined) {
        this.dashbordValuemail = false
      } else {
        this.dashbordValuemail = window.getdashboard._data.dashboardValue
      }
      if (this.dashbordValuemail === false) {
        this.$store.dispatch('email/fetchEmails')// Fetch Emails From API
      }
    }
    if (user_role === 'user') {
      this.$store.dispatch('email/fetchEmails')
    }
    this.$store.dispatch('email/fetchTags')  // Fetch Mail Tags
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/email.scss";
</style>
