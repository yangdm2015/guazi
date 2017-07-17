<template>
  <div class="form-wrap">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :model="templateForm" label-width="120px" class="form">
          <el-form-item label="合同名称">
            <el-input v-model="templateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="协议名称">
            <el-select v-model="templateForm.type" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="main-paragraph">
          <div v-html="mainContract"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import * as api from '@/api/contract'
  import clone from '@/utils/clone'
  import { contractTypes } from '@/static-data/product-options'
  let formInit = {
    id: '',
    name: '',
    type: '',
    templateSrc: ''
  }
  export default {
    data() {
      return {
        templateForm: clone(formInit),
        listLoading: false,
        tableData: [],
        typeOptions: contractTypes,
        mainContract: null,
        agreementList: [],
        currentAgreement: null
      }
    },
    created() {
//      this.templateForm.type = contractTypes[0].value

      this.getDetail(this.$route.params.contractId)
    },
    methods: {
      getDetail(id) {
        api.getContractDetail(id).then(rep => {
          this.templateForm.name = rep.data.data.name
          this.agreementList = rep.data.data.agreementList
          this.typeOptions = rep.data.data.agreementList.map(it => ({label: it.type, 'value': it.type}))
          this.templateForm.type = this.typeOptions[0].value
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      selectChange(){
        this.currentAgreement = this.agreementList.find(item => item.type === this.templateForm.type)
        this.mainContract = require('html-loader!static/' + this.currentAgreement.agreementSrc)
      },
      onSubmit() {
        api.saveContract(this.templateForm).then(rep => {
          if (rep.data.errno === 0) {
            this.$router.push({path: '/contractEdit/addparameters/' + this.templateForm.id})
          }
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
  .form-wrap {
    margin: 30px;
    .form {
      width: 450px;
      margin: 100px auto;
      .el-select {
        width: 100%;
      }
    }
    .main-paragraph {
      height: 700px;
      overflow: auto;
    }
  }
</style>
