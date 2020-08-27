import Vue from 'vue'
import Router from 'vue-router'
import CreateContact from '@/pages/CreateContact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'create-contact',
      component: CreateContact
    },
    {
      path: '*',
      name: 'not-found',
      component: CreateContact
    },
  ]
})
