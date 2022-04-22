/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth/authService'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const ifAuthenticated = async (to, from, next) => {
  if (localStorage.getItem('accessToken') && (localStorage.getItem('accessToken') !== null) && localStorage.getItem('accessToken').length) {
    next()
    return
  }
  next('/pages/login')
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          beforeEnter: ifAuthenticated,
          component: () => import('./views_moozisupport/dashboard/dashboard.vue'),
          meta: {
            rule: 'editor'
          }
        },

        // =============================================================================
        // ------- Start MooZiSupport Application Routes -------------------------------
        // =============================================================================


        {
          path: 'users',
          beforeEnter: ifAuthenticated,
          name: 'users',
          component: () => import('./views_moozisupport/users/DataListListView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Tableau de bord', url: '/' },
              { title: 'Utilisateurs', active: true }
            ],
            pageTitle: 'Utilisateurs',
            rule: 'editor'
          }
        },
        {
          path: '/tickets',
          beforeEnter: ifAuthenticated,
          name: 'tickets',
          component: () => import('./views_moozisupport/ticket/Email'),
          meta: {
            breadcrumb: [
              { title: 'Tableau de bord', url: '/' },
              { title: 'Tickets', active: true }
            ],
            pageTitle: 'Tickets',
            rule: 'editor'
          }
        },

        {
          path: 'companies',
          beforeEnter: ifAuthenticated,
          name: 'companies',
          component: () => import('./views_moozisupport/Company/DataListCompagny.vue'),
          meta: {
            breadcrumb: [
              { title: 'Tableau de bord', url: '/' },
              { title: 'Compagnies', active: true }
            ],
            pageTitle: 'Compagnies',
            rule: 'editor'
          }
        },

        {
          path: 'categories',
          beforeEnter: ifAuthenticated,
          name: 'categories',
          component: () => import('./views_moozisupport/category/DataListCategory'),
          meta: {
            breadcrumb: [
              { title: 'Tableau de bord', url: '/' },
              { title: '', active: true }
            ],
            pageTitle: 'Categories',
            rule: 'editor'
          }
        },

        {
          path: '/pages/Profil',
          name: 'page-Profil',
          beforeEnter: ifAuthenticated,
          component: () => import('./views/pages/login/MonProfil'),
          meta: {
            rule: 'editor'
          }
        },

        {
          path: '/pages/Profile',
          name: 'page-Profile',
          beforeEnter: ifAuthenticated,
          component: () => import('./views/pages/login/MonProfile'),
          meta: {
            rule: 'editor'
          }
        }

      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('./layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('./views/Callback.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('./views/pages/login/Login.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/Changelogin',
          name: 'page-Changelogin',
          component: () => import('./views/pages/login/Changelogin'),
          meta: {
            rule: 'editor'
          }
        },


        // {
        //   path: '/pages/register',
        //   name: 'page-register',
        //   component: () => import('./views/pages/register/Register.vue'),
        //   meta: {
        //     rule: 'editor'
        //   }
        // },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('./views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('./views/pages/ResetPassword.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('./views/pages/LockScreen.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('./views/pages/ComingSoon.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('./views/pages/Error404.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('./views/pages/Error500.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('./views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('./views/pages/Maintenance.vue'),
          meta: {
            rule: 'editor'
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {

    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser

    // If auth required, check login. If login fails redirect to login page
    if (to.meta.authRequired) {
      if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
        router.push({ path: '/pages/login', query: { to: to.path } })
      }
    }

    return next()
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });

  })

})

export default router
