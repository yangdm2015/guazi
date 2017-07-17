<template>
  <div>
    contractSpecify
  </div>
</template>
<script>
  import * as api from '@/api/contract'
//  import { test } from 'rangy'
//  require('rangy/lib/rangy-core.js')
//  require('./test')
//  console.log('in vue, this = ',this)
//  console.log('rangy = ', rangy)
  export default {
    name: '',
    data() {
      return {
        templateForm: null,
        mainContract: null,
        listLoading: false
      }
    },
    created() {
      this.getDetail(this.$route.params.contractId)
    },
    methods: {
      getDetail(id) {
        api.getContractDetail(id).then(rep => {
          this.templateForm = rep.data.data
          this.mainContract = require('html-loader!static/' + this.templateForm.templateSrc)
        }).catch(error => {
          console.log(error)
        }).finally(e => {
          this.listLoading = false
        })
      },
      onSubmit() {
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
