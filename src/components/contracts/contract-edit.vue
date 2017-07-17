<template>
  <div class="form-wrap" id="contractBody" ref="contractBody">

    <el-row>

      <el-col :span="8">
        <div v-show="progressInfoSuspend">合同编辑区</div>
        <div class="main-paragraph" :class="progressInfoSuspend ? 'suspend' : 'follow'">
          <div>模板编辑区</div>
          <el-row>
            <el-form ref="form" :model="agreementListForm" label-width="70px" class="form">
              <el-form-item label="合同名称">
                <el-input v-model="agreementListForm.name"></el-input>
              </el-form-item>
              <el-form-item label="协议名称">
                <el-select v-model="agreementListForm.id" placeholder="请选择" @change="selectChange">
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-row>

          <el-row>
            <!--<el-button @click="addFields">添加</el-button>-->
            <el-button @click="saveAgreement">保存</el-button>
          </el-row>
          <el-row>
            <el-table :data="agreementFields" border @expand="exp">
              <el-table-column type="expand">
                <template scope="props">
                  <el-form class="table-expand" label-width="60px">
                    <el-row>
                      <el-form-item label="类型">
                        <span>{{ props.row.type }}</span>
                      </el-form-item>
                      <el-form-item label="变量名">
                        <span>{{ props.row.propertyName }}</span>
                      </el-form-item>
                      <el-form-item label="值">
                        <span>{{ props.row.value }}</span>
                      </el-form-item>
                    </el-row>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="文字" prop="highLight">
              </el-table-column>
              <el-table-column label="值" prop="value">
                <template scope="props">
                  <el-input v-model="props.row.value" :disabled="props.row.type =='expression'"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="main-paragraph">
          <div v-html="mainAgreement" ref="mainAgreement" id="mainAgreement"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import * as api from '@/api/contract'
  import clone from '@/utils/clone'
  import { removeselection, addbackground } from '@/utils/removeselection'
  import { contractTypes } from '@/static-data/product-options'
  import rangy from 'vue-rangy/lib/rangy-core'
  import ClassApplier from 'vue-rangy/lib/rangy-classapplier'
  import selectionsaverestore from 'vue-rangy/lib/rangy-selectionsaverestore'
  let root = {}
  root.rangy = rangy()
  root.rangy.init()
  root.classApplierModule = {}
  root.boldRedApplier = {}
  const classApplier = 'boldRed'
  ClassApplier(root.rangy)
  selectionsaverestore(root.rangy)
  let isFirstChange = true

  let formInit = {
    id: '',
    name: '',
    type: '',
    templateSrc: ''
  }
  export default {
    data() {
      return {
        contractId: '',
        agreementListForm: clone(formInit),
        listLoading: false,
        tableData: [],
        typeOptions: contractTypes,
        mainAgreement: '',
        agreementList: [],
        agreementSrc: '',
        agreementFieldsSrc: '',
        currentAgreement: null,
        currentSelection: {},
        currentRange: null,
        isCurrentSelectionSaved: false,
        agreementFields: [],
        addField: [{highLight: '', propertyName: '', value: ''}],
        progressInfoSuspend: false
      }
    },
    created() {
      this.getContractDetail(this.$route.params.contractId)

      this.initClassApplierModule()
      window.addEventListener('scroll', this.onScroll)
    },
    mounted(){
      this.init()
    },
    methods: {
      onScroll() {
        this.progressInfoSuspend = document.body.scrollTop > 102
      },
      selectChange(v){
        if (!isFirstChange) {
          this.getAgreementDetail()
        }
        isFirstChange = false
      },
      initClassApplierModule(){
        root.classApplierModule = root.rangy.modules.ClassApplier
        if (root.rangy.supported && root.classApplierModule && root.classApplierModule.supported) {
          root.boldRedApplier = root.rangy.createClassApplier(classApplier, {
            tagNames: ['span', 'img']
          })
        }
      },
      getContractDetail(id) {
        api.getContractDetail(id).then(rep => {
//          console.log('rep.data.data = ', rep.data.data)
          this.contractId = rep.data.data.id
          this.agreementListForm.name = rep.data.data.name
          this.agreementList = rep.data.data.agreementList
          this.typeOptions = rep.data.data.agreementList.map(it => ({label: it.type, 'value': it.id}))
          if (this.typeOptions && this.typeOptions[0]) {
            this.agreementListForm.id = this.typeOptions[0].value
          }

          return 'ok'
        }).then(e => {
          this.getAgreementDetail()
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      getAgreementDetail() {
        let areement = this.agreementList.find(item => item.id === this.agreementListForm.id)
        if (areement) {
          this.agreementSrc = areement.agreementSrc
          this.agreementFieldsSrc = areement.agreementFieldsSrc
          this.mainAgreement = require('html-loader!static/' + this.agreementSrc)
          this.getAgreementFieldsList()
        }
//        api.getAgreementDetail(this.contractId, this.agreementListForm.id).then(rep => {
//          this.agreementSrc = rep.data.data.agreementSrc
//          this.agreementFieldsSrc = rep.data.data.agreementFieldsSrc
//          this.mainAgreement = require('html-loader!static/' + this.agreementSrc)
//          console.log('this.agreement = ', rep.data.data)
//          return 'ok'
//        }).then(e => {
//          this.getAgreementFieldsList()
//        }).catch(error => {
//          console.log(error)
//        }).finally(e => {
//          this.listLoading = false
//        })
      },

      getAgreementFieldsList(){
        let agreement = this.$store.state.agreement[this.agreementListForm.id]
//        console.log('this.agreementListForm.id = ', this.agreementListForm.id)
//        console.log('this.$store.state = ', this.$store.state)
//        console.log('agreement = ', agreement)
//        console.log('!!agreement.mainAgreement = ', !!agreement.mainAgreement)
        if (!agreement || !agreement.mainAgreement) { // agreement 不存在或者存在但是是初始值
          api.getAgreementFieldsList(this.contractId, this.agreementListForm.id).then(response => {
            this.agreementFields = response.data.data
//            console.log('this.agreementFields = ', this.agreementFields)
          }).catch(error => {
            console.log(error)
          }).finally(e => {
            this.listLoading = false
          })
        } else {
          this.agreementFields = agreement.agreementFields
          this.mainAgreement = agreement.mainAgreement
        }
      },
      init(){
        let vm = this
        root.saveRestoreModule = root.rangy.modules.SaveRestore
        if (root.rangy.supported && root.saveRestoreModule && root.saveRestoreModule.supported) {
          this.$refs.mainAgreement.addEventListener('mouseup', function (e) { // saveRestoreModule 的初始化必须放在这里，因为直到此时this.$refs.mainContract才有效
            vm.setCurrentSelection()
          })
          this.$refs.mainAgreement.addEventListener('mousedown', function (e) { // saveRestoreModule 的初始化必须放在这里，因为直到此时this.$refs.mainContract才有效
            vm.cancelCurrentSection()
          })
        }
      },
      deleteField(row){
        removeselection(row.markerId, classApplier)
        this.mainAgreement = this.$refs.mainAgreement.innerHTML
        let index = this.agreementFields.indexOf(row)
        this.agreementFields.splice(index, 1)
      },
      locateField(row){
        addbackground(row.markerId, classApplier, 'back-yellow')
      },
      setCurrentSelection(){
        root.boldRedApplier.toggleSelection()
        this.currentSelection = root.rangy.saveSelection()
        this.currentRange = root.rangy.getSelection().getRangeAt(0)
        this.addField[0].highLight = root.rangy.getSelection().toString()
        this.isCurrentSelectionSaved = false
      },
      cancelCurrentSection(){
        if (!this.isCurrentSelectionSaved && this.currentRange) { // 当新选中了一段文字（section有长度），并且上一段选中的文字并未保存时，取消上次的选区
//          root.boldRedApplier.undoToRange(root.rangy.getSelection().getRangeAt(0));
          root.boldRedApplier.undoToRange(this.currentRange)
        }
      },
      saveAgreement(){
        let agreement = {
          id: this.agreementListForm.id,
          mainAgreement: this.mainAgreement,
          agreementFields: this.agreementFields
        }
        this.$store.commit('SET_AGREEMENT', agreement)
        this.$message('保存成功')
//        api.saveAgreement(this.contractId, this.agreementListForm.id, agreement).then(response => {
//          console.log(response.data.data)
//        }).catch(error => {
//          console.log(error)
//        }).finally(e => {
//          this.listLoading = false
//        })
      },
      getMarkerId(section){
        let rangeInfo = section.rangeInfos[0]
        let {endMarkerId, startMarkerId} = rangeInfo
        return {endMarkerId, startMarkerId}
      },
      initAddField(){
        this.addField[0].highLight = ''
        this.addField[0].propertyName = ''
        this.addField[0].value = ''
      },
      exp(row, expanded){
        if (expanded) {
          window.scrollTo(0, row.height)
          this.locateField(row)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  #contractBody {
    .el-select {
      width: 100%;
    }
    .form-wrap {
      margin: 30px;
      .form {
        width: 450px;
        margin: 100px auto;
      }
      .main-paragraph {
        height: 700px;
        overflow: auto;
      }
    }

    .boldRed {
      font-weight: bold;
      color: red;
    }
    .el-row {
      margin: 20px 0px
    }
    .table-expand {
      font-size: 0;
      .el-row {
        margin: 5px 10px
      }
    }
    .table-expand label {
      width: 90px;
      height: 100%;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
    .el-table__expanded-cell {
      padding: 5px;
    }
  }
</style>
