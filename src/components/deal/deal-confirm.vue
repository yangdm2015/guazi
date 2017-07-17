<template>
  <div class="table-wrap">
    <el-row>
      <el-col :span="8">
        <h1>华泰长城资本管理有限公司</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-form>
        <el-col :span="8">
          <el-form-item label="交易类型">
            <el-select v-model="productForm.productType" placeholder="- 请选择 -">
              <template v-for="option in productTypes">
                <el-option :label="option.label" :value="option.value"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4" :offset="12">
          <el-button type="primary" @click="onSubmit">确认交易</el-button>
        </el-col>
      </el-form>
    </el-row>
    <DealDetail :productType="productForm.productType"></DealDetail>

  </div>
</template>
<script>
  import { productTypes } from '@/static-data/product-options'
  import DealDetail from './deal-detail'
  export default {
    name: 'dealConfirm',
    data() {
      return {
        productForm: {
          productType: ''
        },
        productTypes
      }
    },
    created() {
      this.productForm.productType = productTypes[0].value
    },
    methods: {
      onSubmit() {
        console.log('onSubmit')
        this.$store.commit('DEAL_COMFIRMED')
        this.$message({message: '交易已确认', type: 'success'})
      }
    },
    components: {DealDetail}
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .table-wrap {
    margin: 0 20PX;
    h1 {
      text-align: left;
    }
  }
</style>
