<template>
  <div class="form-wrap" id="contractBody" ref="contractBody">

    <el-row>
      <el-col :span="12">
        <div class="main-paragraph">
          <div v-html="mainAgreement" ref="mainAgreement" id="mainAgreement"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="main-paragraph">
          <el-row>
            <el-table :data="addField" border>
              <el-table-column label="文字" prop="highLight">
              </el-table-column>
              <el-table-column label="变量名">
                <template scope="scope">
                  <el-input v-model="scope.row.propertyName" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="值">
                <template scope="scope">
                  <el-input v-model="scope.row.value" placeholder="请输入内容"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-button @click="addFields">添加</el-button>
            <el-button @click="saveAgreement">保存</el-button>
          </el-row>
          <el-row>
            <el-table :data="agreementFields" border>
              <el-table-column label="文字" prop="highLight">
              </el-table-column>
              <el-table-column label="变量名" prop="propertyName">
              </el-table-column>
              <el-table-column label="值" prop="value">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button size="mini" @click="deleteField(scope.row)" class="back-green">删除
                  </el-button>
                  <el-button size="mini" @click="locateField(scope.row)" class="back-green">定位
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
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
  import timestamp from '@/utils/timestamp'
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
        mainAgreement: '',
        agreementList: [],
        currentAgreement: null,
        currentSelection: {},
        currentRange: null,
        isCurrentSelectionSaved: false,
        agreementFields: [],
        addField: [{highLight: '', propertyName: '', value: ''}]
      }
    },
    created() {
      this.getAgreementFieldsList()
      this.mainAgreement = require('html-loader!static/template/agreementExample1.html')
      root.classApplierModule = root.rangy.modules.ClassApplier
      if (root.rangy.supported && root.classApplierModule && root.classApplierModule.supported) {
        root.boldRedApplier = root.rangy.createClassApplier(classApplier, {
          tagNames: ['span', 'img']
        })
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      getAgreementFieldsList(){
        api.getAgreementFieldsList().then(response => {
          console.log(response.data.data)
          this.agreementFields = response.data.data
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
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
      addFields(){
        if (!this.entityIsEmpty(this.addField[0])) {
          let field = clone(this.addField[0])
          field = {
            ...field, ...{
              key: timestamp(),
              markerId: this.getMarkerId(this.currentSelection)
            }
          }
          this.agreementFields.push(field)
          this.isCurrentSelectionSaved = true
          this.mainAgreement = this.$refs.mainAgreement.innerHTML
          this.initAddField()
        }
      },
      saveAgreement(){
        let agreement = {
          mainAgreement: this.mainAgreement,
          agreementFields: this.agreementFields
        }
        api.saveAgreement(agreement).then(response => {
          console.log(response.data.data)
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      getMarkerId(section){
        let rangeInfo = section.rangeInfos[0]
        let {endMarkerId, startMarkerId} = rangeInfo
        return {endMarkerId, startMarkerId}
      },
      entityIsEmpty(entity){
        let isEmpty = false
        for (let key in entity) {
          if (!entity[key]) {
            isEmpty = true
            break
          }
        }
        return isEmpty
      },
      initAddField(){
        this.addField[0].highLight = ''
        this.addField[0].propertyName = ''
        this.addField[0].value = ''
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  #contractBody {
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

    .boldRed {
      font-weight: bold;
      color: red;
    }
    .el-row {
      margin: 20px 10px
    }

  }
</style>
