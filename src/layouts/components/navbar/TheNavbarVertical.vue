<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />
        <template v-if="windowWidth >= 992">
        </template>
        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->
        <div class="bookmark-container">
        <span>
          <feather-icon
              icon="UserIcon"
              :svgClasses="['stoke-current text-warning', {'text-white': navbarColor !== '#fff'}]"
              class="cursor-pointer p-2"
          />
          {{ roleObject[user.role]}}
        </span>

        </div>
        <vs-spacer />
        <div class=" mr-8">
          <i18n />
        </div>


        <search-bar />

        <!-- <cart-drop-down /> -->

        <!-- <notification-drop-down /> -->

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>


<script>
import Bookmarks            from './components/Bookmarks.vue'
import I18n                 from './components/I18n.vue'
import SearchBar            from './components/SearchBar.vue'
import CartDropDown         from './components/CartDropDown.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown      from './components/ProfileDropDown.vue'

export default {

  data () {
    return {
      roleObject: {
        admin: 'ADMINISTRATEUR',
        user: 'UTILISATEUR'
      }
    }
  },
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    Bookmarks,
    I18n,
    SearchBar,
    CartDropDown,
    NotificationDropDown,
    ProfileDropDown
  },
  computed: {
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    user () {
      return this.$store.state.AppActiveUser
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if      (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth)               return 'navbar-full'
    }
  },
  methods: {
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }

  }
}
</script>

