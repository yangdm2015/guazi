<template>
  <div class="table-wrap">
    <el-table :data="tableData" style="width: 100%" stripe>

      <el-table-column prop="name" label="合同名称" align="center" min-width="280"
                       sortable>
      </el-table-column>

      <el-table-column prop="productType" label="产品类型" align="center" min-width="180"
                       sortable>
      </el-table-column>

      <el-table-column prop="agreementList.length" align="center" label="协议数量" min-width="150"
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
  import * as api from '@/api/contract'
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
      getDetail(contract) {
        this.$store.commit('SET_TEMPLATE_INFO', contract)
        this.$router.push({path: '/contractEdit/edit/' + contract.id})
      },
      getList() {
        this.listLoading = true
//        this.$http.get('/api/contractList').then((rsp) => {
//          console.log(rsp)
//        });
        api.getContractList().then(response => {
          this.tableData = response.data.data
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
