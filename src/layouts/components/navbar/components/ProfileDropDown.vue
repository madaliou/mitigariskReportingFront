<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.displayName">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.last_name +" "}}{{ activeUserInfo.first_name}}</p>
      <span class="flex items-center px-2 py-1 rounded"><div class="h-3 w-3 rounded-full mr-2" :class="'bg-success'"></div><small>{{ activeUserInfo.status }}</small></span>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img v-if="activeUserInfo.photoURL" key="onlineImg" :src="activeUserInfo.photoURL" alt="user-img" width="40" height="40" class="rounded-full shadow-md cursor-pointer block" />
      </div>
      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li v-if="is_admin===true"
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/Profile').catch(() => {})">

            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profil</span>
          </li>

          <li v-if="is_admin===false"
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/pages/Profil').catch(() => {})">

            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Profil</span>
          </li>
          <vs-divider class="m-1" />
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Déconnexion</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data () {
    return {
      is_admin:true,
      user_role:''
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    logout () {

      // if user is logged in via auth0
      if (this.$auth.profile) this.$auth.logOut()

      // if user is logged in via firebase
      const firebaseCurrentUser = firebase.auth().currentUser

      if (firebaseCurrentUser) {
        firebase.auth().signOut().then(() => {
          this.$router.push('/pages/login').catch(() => {})
        })
      }
      // If JWT login
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken')
        this.$router.push('/pages/login').catch(() => {})
      }

      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change('admin')
      localStorage.removeItem('userInfo')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    }
  },
  created () {
    this.user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (this.user_role === 'admin') {
      this.is_admin = true
    } else {
      this.is_admin = false
    }
  }
}
</script>
