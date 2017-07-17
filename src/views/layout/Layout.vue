<template>
  <div class="app-wrapper">
    <Navbar/>
    <!--<el-tabs v-model="activeName" @tab-click="handleTabClick">-->
    <!--<template v-for="menuItem in menuItems">-->
    <!--<el-tab-pane :label="menuItem" :name="menuItem"></el-tab-pane>-->
    <!--</template>-->
    <!--</el-tabs>-->
    <App-main/>
  </div>
</template>

<script>
  import { AppMain, Navbar } from '@/views/layout'
  //  import { AppMain, Navbar } from '../../views/layout';
  //  import Navbar from './Navbar'
  //  import AppMain from './AppMain'

  export default {
    name: 'layout',
    data() {
      return {
        activeName: '合同模板编辑'
      }
    },
    methods: {
      handleTabClick() {
        console.log('handleTabClick')
      }
    },
    components: {
      AppMain,
      Navbar
    },
    computed: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";

  .app-wrapper {
    .el-tabs {
      margin: 0 auto 0;
    }
  }
</style>
