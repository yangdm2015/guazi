<template>
  <div class="form-wrap">
    <el-row>
      合同模板编辑
      <!--<el-col :span="12">-->
        <!--<el-form ref="form" :model="templateForm" label-width="120px" class="form">-->
          <!--<el-form-item label="模板名称">-->
            <!--<el-input v-model="templateForm.name"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="模板类型">-->
            <!--<el-select v-model="templateForm.type" placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in typeOptions"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="onSubmit">保存</el-button>-->
            <!--<el-button>取消</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-col>-->
      <!--<el-col :span="12">-->
        <!--<div class="main-paragraph">-->
          <!--<div v-html="mainContract"></div>-->
        <!--</div>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>
<script>
  import * as api from '@/api/template'
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
        mainContract: null
      }
    },
    created() {
      this.getDetail(this.$route.params.contractId)
    },
    methods: {
      getDetail(id) {
        api.getTemplateDetail(id).then(rep => {
          this.templateForm = rep.data.data
          this.mainContract = require('html-loader!static/' + this.templateForm.templateSrc)
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
//        this.templateForm = this.$store.state.templateInfo;
//        this.mainContract = require('html-loader!static/' + this.templateForm.templateSrc)
      },
      onSubmit() {
//        console.log('this.templateForm = ', this.templateForm)
        api.saveTemplate(this.templateForm).then(rep => {
          if (rep.data.errno === 0) {
//            console.log('rep = ', rep.data.data)
//            this.$router.push({path: '/contractEdit/addparameters/' + this.templateForm.id})
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
    margin: 30px auto;
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
