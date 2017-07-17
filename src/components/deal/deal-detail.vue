<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="tabwrap">
          <el-table :data="productTableData" style="width: 100%" stripe highlight-current-row>
            <el-table-column type="expand">
              <template scope="props">
                <el-form class="table-expand" :inline="true">
                  <el-form-item label="交易类型">
                    <span>{{ props.row.productType }}</span>
                  </el-form-item>
                  <el-form-item label="交易ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" min-width="100"
                             sortable>
              <template scope="props">
                <div @click="getDetail(props.row)">{{props.row.date}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="counterPart" label="交易对手方" align="center" min-width="180"
                             sortable>
              <template scope="props">
                <div @click="getDetail(props.row)">{{props.row.counterPart}}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="tabwrap">
          <el-tabs v-model="activeAgreementId" @tab-click="handleTabClick" v-if="agreementList.length>0">
            <template v-for="item in agreementList">
              <el-tab-pane :label="item.type" :name="''+item.id"></el-tab-pane>
            </template>
          </el-tabs>
        </div>
        <div class="fieldswrap">
          <el-table :data="dealFieldsData" style="width: 100%" stripe v-if="dealFieldsData.length>0">

            <el-table-column prop="highLight" label="变量名" align="center" min-width="100"
                             sortable>
            </el-table-column>
            <el-table-column prop="value" label="值" align="center" min-width="100"
                             sortable>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import * as api from '@/api/deal'
  export default {
    name: '',

    data() {
      return {
        queryParam: {
          productType: null,
          date: null
        },
        activeAgreementId: '',
        productTableData: [],
        agreementList: [],
        dealFieldsData: [],
        dealId: '',
        firstDeal: null
      }
    },
    props: ['productType', 'id', 'date'],
    created() {
      this.queryParam.productType = this.productType
      console.log('this.queryParam = ', this.queryParam)
      this.getList()
    },
    watch: {
      productType: function (newValue, oldValue) {
        this.queryParam.productType = newValue
        this.initTables()
        this.getList()
      }
    },
    computed: {
      tt: function () {
        return this.productType
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        api.getDealList(this.queryParam).then(response => {
          let started = this.$store.state.deal.started
          let clicked = this.$store.state.deal.clicked
          if (response.data.data.length > 0) {
            this.productTableData = response.data.data
            this.firstDeal = this.productTableData.shift()
            console.log('this.firstDeal =', this.firstDeal)
            if (!started) {
            } else if (!clicked) {
              this.$store.commit('TAB_CLICKED')
              setTimeout(() => {
                this.$message({message: '收到新交易', type: 'success'})
                this.productTableData.unshift(this.firstDeal)
              }, 3000)
            } else {
              this.productTableData.unshift(this.firstDeal)
            }
          } else {
            this.productTableData = []
          }

//          if (this.$store.state.deal.started && !this.$store.state.deal.clicked) {
//            let firstone = response.data.data.splice(0, 1)
//
//          } else {
//            this.productTableData = response.data.data
//          }
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      initTables() {
        this.dealFieldsData = []
        this.agreementList = []
      },
      getDetail(row) {
        this.dealId = row.id
        api.getDealDetail(row.id).then(response => {
          this.agreementList = response.data.data.agreementList
          if (this.agreementList.length > 0) {
            this.activeAgreementId = '' + this.agreementList[0].id
            this.handleTabClick()
          } else {
            this.dealFieldsData = []
          }
          return 'ok'
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      handleTabClick() {
        console.log('activeAgreementId = ', this.activeAgreementId)
        let agreement = this.$store.state.agreement[this.activeAgreementId]
        if (!agreement || !agreement.mainAgreement) {
          api.getDealFieldsList(this.dealId, this.activeAgreementId).then(response => {
            console.log('response.data = ', response.data)
            this.dealFieldsData = response.data.data
          }).catch(error => {
            console.log(error)
          }).finally(e => {
            this.listLoading = false
          })
        } else {
          this.dealFieldsData = agreement.agreementFields
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .tabwrap {
    h1 {
      text-align: left;
    }
    .el-table__expanded-cell {
      padding: 10px 12px;
    }
    .table-expand {
      font-size: 0;
      .el-row {
        margin: 15px 10px
      }
      label {
        width: 90px;
        height: 100%;
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50% !important;
      }
    }
  }
</style>
