<template>
  <div class="form-wrap" id="templateBody" ref="templateBody">

    <el-row>

      <el-col :span="8">

        <div v-show="progressInfoSuspend">模板编辑区</div>
        <div class="main-editor left-col" :class="progressInfoSuspend ? 'suspend' : 'follow'">
          <!--<hr id ='space-holder'>-->
          <el-collapse @change="handleCollapseChange">
            <el-collapse-item title="模板选择" name="1">
              <el-row>
                <el-form ref="form" :model="agreementListForm" label-width="70px" class="form">
                  <el-form-item label="模板名称">
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
            </el-collapse-item>
            <el-collapse-item title="插入新字段" name="2">
              <el-row>
                <el-form class="table-expand" label-width="60px">
                  <el-form-item label="文字">
                    <el-input v-model="addField.highLight" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="变量名">
                    <el-input v-model="addField.propertyName" placeholder="必填"></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-select v-model="addField.type" placeholder="必选">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="值">
                    <el-input v-model="addField.value" placeholder="选填"></el-input>
                  </el-form-item>
                </el-form>
              </el-row>
              <el-row>
                <el-button @click="addFields">添加</el-button>
                <el-button @click="saveAgreement">保存</el-button>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="字段列表" name="3">
              <el-row>
                <el-table :data="agreementFields" border @expand="exp" height="550">
                  <el-table-column type="expand">
                    <template scope="props">
                      <el-form class="table-expand" label-width="60px">
                        <el-form-item label="变量名">
                          <span>{{ props.row.propertyName }}</span>
                        </el-form-item>
                        <el-form-item label="值">
                          <span>{{ props.row.value }}</span>
                        </el-form-item>
                        <el-form-item label="操作">
                          <el-button type='primary' @click="deleteField(props.row)" class="back-green">删除
                          </el-button>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="文字" prop="highLight">
                  </el-table-column>
                  <el-table-column label="类型" prop="type">
                    <template scope="props">
                      <span>{{props.row.type | toc}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--<div class="test">模板编辑区</div>-->

          <!--<div class="test">插入新字段</div>-->


        </div>
      </el-col>
      <el-col :span="16">
        <div class="main-paragraph" ref="mainParagraph">
          <div v-html="mainAgreement" ref="mainAgreement" id="mainAgreement"></div>
        </div>
      </el-col>
    </el-row>
    <div class="fieldInfo" v-show="showFieldInfo" ref="fieldInfo">
      <!--<div class="fieldInfo" v-show="true" ref="fieldInfo">-->
      <el-form class="infoTable" label-width="60px">
        <el-form-item label="变量名">
          <span>{{ fieldInfo.propertyName }}</span>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{ fieldInfo.type }}</span>
        </el-form-item>
        <el-form-item label="值">
          <span>{{ fieldInfo.value }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import * as api from '@/api/template'
  import clone from '@/utils/clone'
  import { removeselection, addbackground, getRelatedNode } from '@/utils/removeselection'
  import timestamp from '@/utils/timestamp'
  import rangy from 'vue-rangy/lib/rangy-core'
  import ClassApplier from 'vue-rangy/lib/rangy-classapplier'
  import selectionsaverestore from 'vue-rangy/lib/rangy-selectionsaverestore'
  import { getMarkerId, entityIsEmpty, getHeight } from '@/utils/template-edit-utils'
  let options = [
    {label: '字符串', value: 'string'},
    {label: '表达式', value: 'expression'},
    {label: '布尔值', value: 'boolean'},
    {label: '数字', value: 'number'},
    {label: '日期', value: 'date'}
  ]
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
        templateId: '',
        agreementListForm: clone(formInit),
        listLoading: false,
        tableData: [],
        typeOptions: [],
        mainAgreement: '',
        agreementList: [],
        agreementSrc: '',
        agreementFieldsSrc: '',
        currentAgreement: null,
        currentSelection: {},
        currentRange: null,
        isCurrentSelectionSaved: false,
        agreementFields: [],
        addField: {highLight: '', propertyName: '', type: '', value: ''},
        progressInfoSuspend: false,
        showFieldInfo: false,
        fieldInfo: {highLight: '', propertyName: '', type: '', value: ''},
        options,
        infoStyle: {},
        mousein: false
      }
    },
    filters: {
      toc(value){
//        console.log('value =',value)
        let mapping = {
          string: '字符串', expression: '表达式', boolean: '布尔值', number: '数字', date: '日期'
        }
        return mapping[value]
      }
    },
    created() {
//      console.log('this.$route = ',this.$route)
      this.getTemplateDetail(this.$route.params.templateId)

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
      getTemplateDetail(id) {
        api.getTemplateDetail(id).then(rep => {
//          console.log('rep.data.data = ', rep.data.data)
          this.templateId = rep.data.data.id
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
//          console.log('this.agreementSrc = ', this.agreementSrc)
          this.getAgreementFieldsList()
        }
//        api.getAgreementDetail(this.templateId, this.agreementListForm.id).then(rep => {
//          this.agreementSrc = rep.data.data.agreementSrc
//          this.agreementFieldsSrc = rep.data.data.agreementFieldsSrc
//          this.mainAgreement = require('html-loader!static/' + this.agreementSrc)
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
        api.getAgreementFieldsList(this.templateId, this.agreementListForm.id).then(response => {
//          console.log('response = ', response.data.data)
          this.agreementFields = response.data.data
          this.agreementFields.forEach(field => {
            this.addInforShow(field, classApplier)
          })
//          console.log('this.agreementFields = ', this.agreementFields)
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
          this.$refs.mainAgreement.addEventListener('mouseup', function (e) { // saveRestoreModule 的初始化必须放在这里，因为直到此时this.$refs.mainTemplate才有效
            vm.setCurrentSelection()
          })
          this.$refs.mainAgreement.addEventListener('mousedown', function (e) { // saveRestoreModule 的初始化必须放在这里，因为直到此时this.$refs.mainTemplate才有效
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
        this.addField.highLight = root.rangy.getSelection().toString()
        this.isCurrentSelectionSaved = false
      },
      cancelCurrentSection(){
        if (!this.isCurrentSelectionSaved && this.currentRange) { // 当新选中了一段文字（section有长度），并且上一段选中的文字并未保存时，取消上次的选区
//          root.boldRedApplier.undoToRange(root.rangy.getSelection().getRangeAt(0));
          root.boldRedApplier.undoToRange(this.currentRange)
        }
      },
      addFields(){
        console.log('this.addField = ', this.addField)
        if (!entityIsEmpty(this.addField)) {
          let field = clone(this.addField)
          field = {
            ...field, ...{
              key: timestamp(),
              markerId: getMarkerId(this.currentSelection)
            }
          }
//          console.log('field = ', field)
          field.height = getHeight(field)
          this.agreementFields.push(field)
          this.isCurrentSelectionSaved = true
          this.mainAgreement = this.$refs.mainAgreement.innerHTML

          this.$nextTick(() => {
            this.addInforShow(field, classApplier)
            this.initAddField()
          })
        }
      },
      addInforShow(field, classApplier){
        let nodes = getRelatedNode(field.markerId, classApplier)
        let vm = this
        for (let i in nodes) {
          let node = nodes[i]
//          console.log('node = ', node, '  field = ', field)
//          addListener(node,field)
          node.addEventListener('mouseover', function (e) {
            if (!this.mousein) {
//              console.log('this.mousein = true')
              vm.showInfoDialog(e, field)
              this.mousein = true
            }
          })
          node.addEventListener('mouseout', function (e) {
            vm.closeInfoDialog(e, field)
//            console.log('this.mousein = false')
            this.mousein = false
          })
//          node.onmouseover=function(e){
//            this.showInfoDialog(e,field)
//          }
        }
      },
      showInfoDialog(e, field){
        let len = ''
        let fieldInfo = this.$refs.fieldInfo
        let wholeLen = ''
//        console.log('fieldInfo = ',fieldInfo)
        if (field.value) {
          len = field.value.length
          if (len > 30) {
            wholeLen = len * 8 + 60
            fieldInfo.style.width = wholeLen + 'px'
          } else {
            wholeLen = 300
          }
        } else {
          fieldInfo.style.width = '300px'
          wholeLen = 300
        }
//        console.log('wholeLen  = ', wholeLen)
//        console.log('wholeLen + e.clientX  = ', wholeLen + e.clientX)
//        console.log('window.innerWidth  = ', window.innerWidth)
        if (wholeLen + e.clientX > window.innerWidth || 300 + e.clientX > window.innerWidth) {
          fieldInfo.style.left = ''
          fieldInfo.style.right = '30px'
//          console.log('fieldInfo.style  = ', fieldInfo.style)
        } else {
          fieldInfo.style.left = e.clientX + 'px'
        }
        fieldInfo.style.top = e.clientY + 'px'
//        console.log('field = ', field)
//        console.log('window = ', window)
        this.showFieldInfo = true
        this.fieldInfo.highLight = field.highLight
        this.fieldInfo.propertyName = field.propertyName
        this.fieldInfo.value = field.value
        this.fieldInfo.type = field.type
//        console.log('e = ', e, '  highLight = ', field.highLight)
      },
      closeInfoDialog(e, field){
        this.showFieldInfo = false
//        console.log('e = ', e, '  highLight = ', field.highLight)
      },
      saveAgreement(){
        let agreement = {
          mainAgreement: this.mainAgreement,
          agreementFields: this.agreementFields
        }
        api.saveAgreement(this.templateId, this.agreementListForm.id, agreement).then(response => {
          console.log(response.data.data)
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      initAddField(){
        this.addField.highLight = ''
        this.addField.propertyName = ''
      },
      exp(row, expanded){
        if (expanded) {
          window.scrollTo(0, row.height)
          this.locateField(row)
        }
      },
      handleCollapseChange(){

      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../styles/var.scss';

  #templateBody {
    text-align: left;
    #space-holder {
      width: 320px;
    }
    .el-select {
      width: 100%;
    }
    .form-wrap {
      margin: 30px;
      .form {
        width: 450px;
        margin: 100px auto;

      }
      /*.main-paragraph {*/
      /*height: 700px;*/
      /*overflow: auto;*/
      /*padding-left:10px;*/
      /*}*/
    }
    .left-col {
      border-right: 1px dashed #666;
    }
    .boldRed {
      font-weight: bold;
      color: red;
      background-color: #fff;
      transition: background 1s;
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
    .table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
    .fieldInfo {
      position: fixed;
      /*top: 0;*/
      /*left: 0;*/
      width: 300px;
      height: 100px;
      background-color: $main-background-color;
      z-index: 20;
      border-radius: 8px;
      box-shadow: #777 1px 1px 5px;
      .infoTable {
        .el-form-item {
          /*margin: 3px 0px;*/
          margin: 0px;
          height: 36px;
          label {
            padding: 0;
            line-height: 35px;
            color: $color-yellow
          }
          span {
            float: left;
            margin-left: 10px;
          }
        }
      }
    }
    .main-paragraph {
      padding-left: 10px;
    }
    .main-editor {
      padding-right: 10px;
      box-sizing: border-box;
    }
    .main-editor /deep/ .el-table__expanded-cell {
      padding: 5px;
    }

  }
</style>
