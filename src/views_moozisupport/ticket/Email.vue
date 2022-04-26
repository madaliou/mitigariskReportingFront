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
          <h1>TICKETS</h1>
        </div>
        <div class="flex"></div>

      </div>

      <!-- EMAILS LIST -->
      <component :is="scrollbarTag" class="email-content-scroll-area" :settings="settings" ref="mailListPS" :key="$vs.rtl">
        <transition-group name="list-enter-up" class="email__mails" tag="ul" appear>
          <li class="cursor-pointer email__mail-item" v-for="(mail, index) in mails" :key="mail.id" @click="updateOpenMail(mail.id)" :style="{transitionDelay: (index * 0.1) + 's'}">
            <mail-item :mail="mail" :isSelected="isMailSelected(mail.id)"  />
          </li>
        </transition-group>
      </component>
    </div>

    <!-- EMAIL VIEW SIDEBAR -->
    <email-view
        :emailTags       = "emailTags"
        :openMailId      = "openMailId"
        :isSidebarActive = "isSidebarActive"
        @closeSidebar    = "closeMailViewSidebar">
    </email-view>
  </div>
</template>

<script>
import EmailSidebar        from './EmailSidebar.vue'
import MailItem            from './MailItem.vue'
import EmailView           from './EmailView.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleEmail         from '@/store/ticket/moduleEmail.js'

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

    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {

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
    isMailSelected () {
      return (mailId) => this.selectedMails.indexOf(mailId) !== -1
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  methods: {
    validation () {
      this.openLoading()
    },

    updateOpenMail (mailId) {
      this.openMailId = mailId
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
    removeOpenMail () {
      this.selectedMails = [this.openMailId]
      this.moveTo('trashed')
      this.isSidebarActive = false
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
    this.openLoading()
    this.$store.dispatch('email/fetchEmails') // Fetch Emails From API
    this.$store.dispatch('email/fetchTags')  // Fetch Mail Tags
  }
}

</script>


<style lang="scss">
@import "@/assets/scss/vuexy/apps/email.scss";
</style>
