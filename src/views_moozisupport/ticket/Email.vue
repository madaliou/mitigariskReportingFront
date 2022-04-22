<template>
    <div id="email-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">

        <vs-sidebar class="items-no-padding" parent="#email-app" :click-not-close="clickNotClose" :hidden-background="clickNotClose" v-model="isEmailSidebarActive">
            <email-sidebar :emailTags="emailTags" @closeSidebar="toggleEmailSidebar" :mailFilter="mailFilter" />
        </vs-sidebar>

        <div :class="{'sidebar-spacer': clickNotClose}" class="no-scroll-content border border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">


            <!-- EMAIL ACTION BAR -->
            <div class="email__actions flex items-center flex-wrap justify-between p-4 border border-r-0 border-l-0 border-solid d-theme-border-grey-light">
                <div class="flex items-center">
                  <h1>Liste des tickets</h1>
                </div>
            </div>

            <!-- EMAILS LIST -->
            <component :is="scrollbarTag" class="email-content-scroll-area" :settings="settings" ref="mailListPS" :key="$vs.rtl">
                <transition-group name="list-enter-up" class="email__mails" tag="ul" appear>
                    <li class="cursor-pointer email__mail-item" v-for="(mail, index) in mails" :key="String(mailFilter) + String(mail.id)" @click="updateOpenMail(mail.id)" :style="{transitionDelay: (index * 0.1) + 's'}">
                        <mail-item :mail="mail" :isSelected="isMailSelected(mail.id)" @addToSelected="addToSelectedMails" @removeSelected="removeSelectedMail" />
                    </li>
                </transition-group>
            </component>
        </div>

        <!-- EMAIL VIEW SIDEBAR -->
        <email-view
            :emailTags       = "emailTags"
            :openMailId      = "openMailId"
            :isSidebarActive = "isSidebarActive"
            :mailFilter      = "mailFilter"
            @markUnread      = "updateSingleMarkUnread"
            @removeMail      = "removeOpenMail"
            @previousMail    = "previousMail"
            @nextMail        = "nextMail"
            @moveTo          = "moveCurrentTo"
            @closeSidebar    = "closeMailViewSidebar">
        </email-view>
    </div>
</template>

<script>
import EmailSidebar        from './EmailSidebar.vue'
import MailItem            from './MailItem.vue'
import EmailView           from './EmailView.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleEmail         from '@/store/email/moduleEmail.js'

export default {
  data () {
    return {
      openMailId           : null,
      selectedMails        : [],
      isSidebarActive      : false,
      showThread           : false,
      clickNotClose        : true,
      isEmailSidebarActive : true,
      settings             : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      }
    }
  },
  watch: {
    isSidebarActive (value) {
      if (!value) this.showThread = false
    },
    mailFilter () {
      this.selectedMails = []

      const scroll_el = this.$refs.mailListPS.$el || this.$refs.mailListPS
      scroll_el.scrollTop = 0

      this.$store.commit('email/UPDATE_MAIL_FILTER', this.$route.params.filter)
      this.$store.dispatch('email/fetchEmails', { filter: this.$route.params.filter })
      this.toggleEmailSidebar()
    },
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    mailFilter () {
      return this.$route.params.filter
    },
    emailTags () {
      return this.$store.state.email.mailTags
    },
    searchQuery: {
      get () {
        return this.$store.state.email.mailSearchQuery
      },
      set (val) {
        this.$store.dispatch('email/setEmailSearchQuery', val)
      }
    },
    selectAllCheckBox: {
      get () {
        return this.selectedMails.length
      },
      set (value) {
        value ? this.selectedMails = this.mails.map(mail => mail.id) : this.selectedMails = []
      }
    },
    mails () {
      return this.$store.getters['email/filteredMails']
    },
    selectAllIcon () {
      return this.selectedMails.length === this.mails.length ? 'icon-check' : 'icon-minus'
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    isMailSelected () {
      return (mailId) => this.selectedMails.indexOf(mailId) !== -1
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    updateOpenMail (mailId) {
      this.openMailId = mailId
      this.isSidebarActive = true
    },
    addToSelectedMails (mailId) {
      if (this.selectedMails.indexOf(mailId) === -1) this.selectedMails.push(mailId)
    },
    removeSelectedMail (mailId) {
      const mailIndex = this.selectedMails.indexOf(mailId)
      if (mailIndex !== -1) this.selectedMails.splice(mailIndex, 1)
    },
    moveTo (to) {
      const payload = { emailIds: this.selectedMails, to }
      this.$store.dispatch('email/moveMailsTo', payload)
        .catch((error) => { console.error(error) })
      this.selectedMails = []
    },
    moveCurrentTo (to) {
      this.selectedMails = [this.openMailId]
      this.moveTo(to)
    },
    updateMarkUnread () {
      const payload = { emailIds: this.selectedMails, unreadFlag: true }
      this.$store.dispatch('email/setUnread', payload)
      this.selectedMails = []
    },
    removeOpenMail () {
      this.selectedMails = [this.openMailId]
      this.moveTo('trashed')
      this.isSidebarActive = false
    },
    toggleIsStarred () {
      const payload = { mailId: this.currentMail.id, value: !this.currentMail.isStarred }
      this.$store.dispatch('email/toggleIsMailStarred', payload)
    },
    nextMail () {
      const currentMailIndex = this.mails.findIndex((mail) => mail.id === this.openMailId)
      if (this.mails[currentMailIndex + 1]) this.openMailId = this.mails[currentMailIndex + 1].id
    },
    previousMail () {
      const currentMailIndex = this.mails.findIndex((mail) => mail.id === this.openMailId)
      if (this.mails[currentMailIndex - 1]) this.openMailId = this.mails[currentMailIndex - 1].id
    },
    updateSingleMarkUnread () {
      this.selectedMails = [this.openMailId]
      this.updateMarkUnread()
      this.isSidebarActive = false
    },
    updateLabels (label) {
      this.$store.dispatch('email/updateLabels', { mails: this.selectedMails, label })
      this.selectedMails = []
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
    toggleEmailSidebar (value = false) {
      if (!value) {
        this.closeMailViewSidebar()
        if (this.clickNotClose) {
          return
        }
      }
      this.isEmailSidebarActive = value
    }
  },
  components: {
    MailItem,
    EmailSidebar,
    EmailView,
    VuePerfectScrollbar
  },
  created () {
    this.$store.registerModule('email', moduleEmail)
    this.setSidebarWidth()

    this.$store.commit('email/UPDATE_MAIL_FILTER', this.$route.params.filter)        // Update Mail Filter
    this.$store.dispatch('email/fetchEmails', { filter: this.$route.params.filter }) // Fetch Emails From API
    this.$store.dispatch('email/fetchMeta')                                          // Fetch Unread Mails
    this.$store.dispatch('email/fetchTags')                                          // Fetch Mail Tags
  },
  beforeDestroy () {
    this.$store.unregisterModule('email')
  },
  mounted () {
    this.$store.dispatch('email/setEmailSearchQuery', '')
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/email.scss";
</style>
