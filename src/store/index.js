import Vue from 'vue'
import Vuex from 'vuex'
import templateInfo from './modules/template-info'
import agreement from './modules/agreement'
import deal from './modules/deal'
// import app from './modules/app';
// import user from './modules/user';
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    // user,
    templateInfo,
    agreement,
    deal
  }
  // getters
})

export default store
