<!-- =========================================================================================
    File Name: EmailView.vue
    Description: Email Application - Single Email View (Inbox)
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div>
    <vs-sidebar click-not-close parent="#email-app" :hidden-background="true" class="full-vs-sidebar email-view-sidebar items-no-padding" v-model="isSidebarActive" position-right>
      <div class="mail-sidebar-content px-0 sm:pb-6 h-full" v-if="currentMail">
        <div class="flex flex-wrap items-center email-header justify-between md:px-8 px-6 sm:pb-2 sm: pt-6 d-theme-dark-bg">
          <div class="flex mb-4">
            <div class="flex items-center">
              <feather-icon :icon="$vs.rtl ? 'ArrowRightIcon' : 'ArrowLeftIcon'" @click="$emit('closeSidebar')" class="cursor-pointer mr-4" svg-classes="w-6 h-6"></feather-icon>
              <h4 v-if="currentMail.category.name">{{ currentMail.category.name }}</h4>
              <h4 v-else>(no subject)</h4>
            </div>
          </div>
          <div class="ml-10 mb-4 mt-1">
            <div class="email__actions--single flex items-baseline">
<!--              <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="[{'text-warning stroke-current stroke-current': currentMail.isStarred}, 'h-6 w-6']" @click="toggleIsStarred" />-->
              <!-- ADD LABEL DROPDOWN -->
              <vx-tooltip text="Traiter" color="success">
              <feather-icon style="color: lime"  v-if="currentMail.fixed === false" icon="CheckSquareIcon" svg-classes="h-6 w-6" class="cursor-pointer ml-4" @click="$emit('validation')"></feather-icon>
              </vx-tooltip>
              <vx-tooltip text="Editer" color="warning">
              <feather-icon style="color: gold" icon="EditIcon" svg-classes="h-6 w-6" class="cursor-pointer ml-4" @click="$emit('removeMail')"></feather-icon>
              </vx-tooltip>
              <vx-tooltip text="Supprimer" color="danger">
              <feather-icon style="color: red" icon="TrashIcon" svg-classes="h-6 w-6" class="cursor-pointer ml-4" @click="$emit('removeMail')"></feather-icon>
              </vx-tooltip>
              <vx-tooltip text="Message" color="primary">
              <feather-icon style="color: blue "  icon="SendIcon" svg-classes="h-6 w-6" class="cursor-pointer ml-4" @click="$emit('removeMail')"></feather-icon>
              </vx-tooltip>
              <vx-tooltip text="Précédent" color="black">
              <feather-icon style="color: black " :icon="$vs.rtl ? 'ChevronsRightIcon' : 'ChevronsLeftIcon'" svg-classes="h-6 w-6" class="cursor-pointer ml-4 hidden sm:inline-flex" @click="$emit('previousMail')" />
              </vx-tooltip>
              <vx-tooltip text="Suivant" color="black">
              <feather-icon style="color: black " :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'" svg-classes="h-6 w-6" class="cursor-pointer ml-4 hidden sm:inline-flex" @click="$emit('nextMail')" />
              </vx-tooltip>
            </div>
          </div>

        </div>

        <component :is="scrollbarTag" class="scroll-area-mail-content md:px-8 md:pb-8 pt-4 px-6 pb-6" :settings="settings" :key="$vs.rtl">
          <!-- LABEL ROW -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="email__labels--single flex ml-10 items-center mt-2">

                  <div class="open-mail-label flex items-center mr-4">
                    <div class="h-3 w-3  rounded-full bg-primary mr-1" ></div>
                    <span class="text-sm">{{currentMail.author.company  || 'MOOZISTUDIO' }}</span>
                  </div>

              </div>
            </div>
          </div>
          <!-- /LABEL ROW -->
          <br>

          <div v-if="isSidebarActive">
            <!-- LATEST MESSAGE -->
            <div class="vx-row">
              <div class="vx-col w-full">
                <email-mail-card :mailContent="currentMail" />
              </div>
            </div>
          </div>
        </component>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import EmailMailCard from './EmailMailCard.vue'

export default {
  props: {
    emailTags: {
      type: Array,
      required: true
    },
    openMailId: {
      required: true,
      validator: prop => typeof prop === 'number' || prop === null
    },
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    mailFilter: {
      type: String
    }
  },
  data () {
    return {
      showThread: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.50
      }
    }
  },
  watch: {
    isSidebarActive (value) {
      if (!value) {
        this.$emit('closeSidebar')
        setTimeout(() => {
          this.showThread = false
        }, 500)
      }
    }
  },
  computed: {
    currentMail () {
      return this.$store.getters['email/getMail'](this.openMailId)
    },
    labelColor () {
      return (label) => {
        const tags = this.$store.state.email.mailTags
        return tags.find((tag) => {
          return tag.value === label
        }).color
      }
    },
    currentMailLabels: {
      get () {
        return this.currentMail.labels
      },
      set (value) {
        if (Array.isArray(value)) {
          const payload = { mailId: this.openMailId, labels: value }
          this.$store.dispatch('email/setLabels', payload)
        }
      }
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    toggleIsStarred () {
      const payload = { mailId: this.openMailId, value: !this.currentMail.isStarred }
      this.$store.dispatch('email/toggleIsMailStarred', payload)
    },
    moveTo (to) {
      this.$emit('closeSidebar')
      this.$emit('moveTo', to)
    }
  },
  components: {
    VuePerfectScrollbar,
    EmailMailCard
  }

}

</script>

