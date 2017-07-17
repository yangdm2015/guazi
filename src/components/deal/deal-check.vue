<template>
  <div class="table-wrap">
    <el-row>
      <el-col :span="8">
        <h1>华泰长城资本管理有限公司</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-form :model="productForm">
        <el-col :span="8">
          <el-form-item label="交易类型">
            <el-select v-model="productForm.productType" placeholder="- 请选择 -">
              <template v-for="option in productTypes">
                <el-option :label="option.label" :value="option.value"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="按日期">
            <el-input placeholder="输入搜索条件"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="按交易对手方">
            <el-input placeholder="输入搜索条件"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-col>
      </el-form>
    </el-row>
    <div>
      <DealDetail :productType="productForm.productType" :date="productForm.date"></DealDetail>
    </div>

  </div>
</template>
<script>
  import { productTypes } from '@/static-data/product-options'
  import DealDetail from './deal-detail'
  export default {
    name: 'dealCheck',
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
      }
    },
    components: {DealDetail}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .table-wrap {
    margin: 0 20PX;
    h1 {
      text-align: left;
    }
    .el-input{
      width:60%;
    }
  }
</style>
