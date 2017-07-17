<template>
  <div>
    <el-menu class="navbar" default-active="0" mode="horizontal" @select="handleSelect">

      <template v-for="(item, idx) in menuItems" v-if="!item.hidden">
        <router-link v-if="item.subMenu" :to="item.path">
          <el-submenu>
            <template v-for="(subItem, idx) in item.children">
              <router-link :to="subItem.path">
                <el-menu-item :index="subItem.path" :class="{'is-active':ifactive(item.childlist)}">
                  {{subItem.name}}
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </router-link>
        <router-link v-if="!item.subMenu" :to="item.path">
          <el-menu-item :index="item.path" :class="{'is-active':ifactive(item.childlist)}">
            {{item.name}}
          </el-menu-item>
        </router-link>

      </template>
    </el-menu>
    <el-button type="primary" id="upload" v-show="showUpload">导入模板</el-button>
  </div>
</template>

<script>
  import permissionRoutes from '../../store/permission'
  export default {
    components: {},
    data() {
      return {
        menuItems: permissionRoutes.get()
      }
    },
    created() {
//      console.log('menuItems = ', this.menuItems)
    },
    computed: {
      showUpload(){
        return this.$route.path.indexOf('template/index') > -1
      }
    },
    methods: {
      handleSelect(key, keyPath) {
//        console.log(key, keyPath)
      },
      ifactive(childlist) {
        if (childlist) {
          let result = childlist.filter(child => this.$route.path.indexOf(child) > -1)
          return result.length > 0
        }
        return false
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    /*height: 88px;*/
    /*line-height: 56px;*/
  }

  .avatar-text {
    margin-top: 5px;
  }

  #upload {
    position: absolute;
    right: 20px;
    top: 35px
  }

</style>
