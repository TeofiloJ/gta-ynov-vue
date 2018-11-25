import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'


import planning from './views/Planning.vue'
import login from './views/Login.vue'
import dashboard from './views/Dashboard.vue'
import profile from './views/Profile.vue'
import account from './views/Account.vue'

import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'));

export const EventBus = new Vue();

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        requireAuth: false,
        permission: 0
      }
    },
    {
      path: '/planning',
      name: 'planning',
      component: planning,
      meta: {
        requireAuth: true,
        permission: 1
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      meta: {
        requireAuth: true,
        permission: 1
      }
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: profile,
      meta: {
        requireAuth: true,
        permission:1
      }
    },
    {
      path: '/account',
      name: 'account',
      component: account,
      meta: {
        requireAuth: true,
        permission:1
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth && !router.app.$session.exists()){
    next('/')
  }else if(to.name == "login" && router.app.$session.exists()){
    next('/account')
  }else if(to.name == "dashboard" && router.app.$session.exists()){
    if(router.app.$session.get('user').status == "administrateur" || router.app.$session.get('user').status == "responsable"){
      next()
    }else{
      next('/account')
    }    
  }
  else{
    next()
  }
})

new Vue({
  el: '#app',
  router,
  template:"<App/>",
  components: { App }
})
