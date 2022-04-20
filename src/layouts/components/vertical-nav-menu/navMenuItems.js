/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
const user_role = JSON.parse(localStorage.getItem('userInfo')).role
let role = []

const role_admin = [
  {
    url: null,
    name: 'Dashboard',
    tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard/analytics',
        name: 'Analytics',
        slug: 'dashboard-analytics',
        i18n: 'Analytics'
      }
    ]
  },
  {
    url: '/base/prospects',
    name: 'Prospects',
    icon: 'UserCheckIcon',
    slug: 'base-prospects'
  },
  {
    url: '/base/beneficiaires',
    name: 'Bénéficiaires',
    icon: 'UserPlusIcon',
    slug: 'base-beneficiaires'
  },
  {
    url: '/base/apporteurs-affaires',
    name: 'Apporteurs d\'affaires',
    icon: 'UserIcon',
    slug: 'base-apporteurs-affaires'
  },

  {
    url: '/base/apporteurs-affaires',
    name: 'Taux de commissions',
    icon: 'PieChartIcon',
    slug: 'base-Taux-de-commissions'
  }
]

const role_contributor = [
  {
    url: null,
    name: 'Dashboard',
    tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard/analytics',
        name: 'Analytics',
        slug: 'dashboard-analytics',
        i18n: 'Analytics'
      }
    ]
  },
  {
    url: '/base/prospects',
    name: 'Prospects',
    icon: 'UserCheckIcon',
    slug: 'base-prospects'
  }
]

if (user_role === 'admin') {
  role = role_admin
}

if (user_role === 'contributor') {
  role = role_contributor
}

export default role

/*
admin
contributor
*/

