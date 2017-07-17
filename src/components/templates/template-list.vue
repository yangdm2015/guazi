<template>
  <div class="table-wrap">
    <el-table :data="tableData" style="width: 100%" stripe>

      <el-table-column prop="name" label="模板名称" align="center" min-width="580"
                       sortable>
      </el-table-column>

      <!--<el-table-column prop="type" label="模板类型" align="center" min-width="180"-->
                       <!--sortable>-->
      <!--</el-table-column>-->

      <el-table-column prop="lastModifyTime" align="center" label="最后修改时间" min-width="150"
                       sortable>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="100">
        <template scope="scope">
          <el-button size="mini" @click="getDetail(scope.row)" class="back-green">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import * as api from '@/api/template'
  export default {
    data() {
      return {
        listLoading: false,
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getDetail(template) {
        this.$store.commit('SET_TEMPLATE_INFO', template)
        this.$router.push({path: '/template/edit/' + template.id})
      },
      getList() {
        this.listLoading = true
//        this.$http.get('/api/contractList').then((rsp) => {
//          console.log(rsp)
//        });
        api.getTemplateList().then(response => {
          this.tableData = response.data.data
          console.log('response.data.data = ', response.data.data)
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .table-wrap {
    margin: 30px auto;
  }
</style>
