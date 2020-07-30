import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Sandbox from '@/components/Sandbox'
import Add from '@/components/Add'
import Edit from '@/components/Edit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/edit/:icecream_slug',
      name: 'Edit',
      component: Edit
    }
    

  ]
})
