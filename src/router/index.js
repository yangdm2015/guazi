import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
import { carList } from '@/components/cars'
// import { contractList, contractEdit } from '@/components/contracts'
// import { dealInit, dealConfirm, dealCheck } from '@/components/deal'
// import { editTest } from '@/components/edit'
// import contractList from '@/components/contracts/contracts-list'
// const contractList = resolve => require(['@/components/contracts/contracts-list'], resolve);
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'layout', component: Layout, hidden: true, redirect: '/cars-sumary/list'},
    {
      path: '/cars-sumary', name: '车辆总汇', component: Layout, subMenu: false, redirect: '/cars-sumary/list',
      childlist: ['cars-sumary'],
      children: [
        {path: 'list', component: carList, name: '车辆列表'}

        // {path: 'addparameters/:contractId', component: contractSpecify, name: '合同模板编辑'}
      ]
    }
  ]
})
