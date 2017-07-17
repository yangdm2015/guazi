<template>
  <div class="table-wrap-init">
    <el-row>
      <el-col :span="8">
        <h1>XXX大宗商品进口商</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-form>
        <el-col :span="8">
          <el-form-item label="产品类型">
            <el-select v-model="productForm.productType" placeholder="- 请选择 -" @change="productTypeOnChange">
              <template v-for="option in productTypes">
                <el-option :label="option.label" :value="option.value"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-button type="primary" @click="onSubmit">发起交易</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="tabwrap">
          <el-tag type="success" id="contract-change" v-show="contractChange">新</el-tag>
          <el-table :data="productTableData" style="width: 100%" stripe highlight-current-row>
            <el-table-column type="expand">
              <template scope="props">
                <el-form class="table-expand">
                  <el-form-item label="产品类型">
                    <span>{{ props.row.productType }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="合同名称" align="center" min-width="310"
                             sortable>
              <template scope="props">
                <div @click="getDetail(props.row)">{{props.row.name}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="comfirmState" label="合同状态" align="center" min-width="110"
                             sortable>
              <template scope="props">
                <el-tag type="success" v-if="props.row.comfirmState==='对方已确认'">对方已确认</el-tag>
                <el-tag type="warning" v-if="props.row.comfirmState==='等待对方确认'">等待对方确认</el-tag>
                <el-tag type="gray" v-if="props.row.comfirmState==='未发起'">未发起</el-tag>
                <!--<div @click="getDetail(props.row)">{{props.row.comfirmState}}</div>-->
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
          <el-table :data="contractFieldsData" style="width: 100%" stripe v-if="contractFieldsData.length>0">

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
  import { productTypes } from '@/static-data/product-options'
  import * as api from '@/api/contract'
  export default {
    name: '',
    data() {
      return {
        productForm: {
          productType: ''
        },
        productTypes,
        contractId: '',
        activeAgreementId: '',
        productTableData: [],
        queryParam: {
          productType: null
        },
        agreementList: [],
        contractFieldsData: []
//        contractChange: true
      }
    },
    created() {
      this.productForm.productType = productTypes[0].value
      this.queryParam.productType = productTypes[0].value
//      console.log('this.queryParam.productType = ', this.queryParam.productType)
      this.getList()
//      this.contractChange = this.$store.state.agreement.edited
    },
    computed: {
      contractChange(){
        if (this.queryParam.productType === '场外期权交易') {
          return this.$store.state.agreement.edited
        }
        return false
      }
    },
    methods: {
      test(e){
        console.log('e = ', e)
      },
      getList() {
        this.listLoading = true
        api.getContractList(this.queryParam).then(response => {
          if (response.data.data.length > 0) {
            this.productTableData = response.data.data
            if (this.$store.state.deal.started) {
              if (this.$store.state.deal.comfirmed) {
                this.productTableData[0].comfirmState = '对方已确认'
              } else {
                this.productTableData[0].comfirmState = '等待对方确认'
              }
            }
          } else {
            this.productTableData = []
          }
//          console.log('this.productTableData = ', this.productTableData)
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      initTables() {
        this.contractFieldsData = []
        this.agreementList = []
      },
      productTypeOnChange() {
        this.initTables()
        this.queryParam.productType = this.productForm.productType
//        if (this.queryParam.productType !== '场外期权交易') {
//          this.contractChange = false
//        }
        this.getList()
      },
      getDetail(row) {
        this.contractId = row.id
        if (this.contractId) {
          api.getContractDetail(row.id).then(response => {
            console.log('response =', response)
//            console.log('this.ContractDetail = ', response.data.data)
            this.agreementList = response.data.data.agreementList
            if (this.agreementList.length > 0) {
              this.activeAgreementId = '' + this.agreementList[0].id
              this.handleTabClick()
            } else {
              this.contractFieldsData = []
            }
          }).catch(error => {
            console.log(error)
          }).finally(e => {
            this.listLoading = false
          })
        }
      },
      onSubmit(){
        console.log('onSubmit')
        this.$store.commit('DEAL_STARTED')
        setTimeout(() => {
          this.$message({message: '交易发起成功', type: 'success'})
        }, 1000)
      },
      handleTabClick(){
        console.log('activeAgreementId = ', this.activeAgreementId)
        let agreement = this.$store.state.agreement[this.activeAgreementId]
        if (!agreement || !agreement.mainAgreement) {
          api.getContractFieldsList(this.contractId, this.activeAgreementId).then(response => {
            console.log('response.data = ', response.data)
            this.contractFieldsData = response.data.data
          }).catch(error => {
            console.log(error)
          }).finally(e => {
            this.listLoading = false
          })
        } else {
          this.contractFieldsData = agreement.agreementFields
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .table-wrap-init {
    margin: 0 20px;
    h1 {
      text-align: left;
    }
    #contract-change {
      position: absolute;
      z-index: 20;
      left: 400px;
      top: 50px;
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
        width: 100%;
      }
    }
  }
</style>
