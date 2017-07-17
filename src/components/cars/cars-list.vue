<template>
  <div class="table-wrap">
    <el-table :data="carsData" style="width: 100%" stripe>

      <el-table-column prop="title" label="车辆概述" align="center" min-width="200"
                       sortable>
      </el-table-column>

      <el-table-column prop="ageInfo" label="车龄" align="center" min-width="180"
                       sortable>
      </el-table-column>

      <el-table-column prop="price" align="center" label="价格" min-width="150"
                       sortable>
      </el-table-column>

    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from '@/api/cars'
  export default {
    name: '',
    data() {
      return {
        listLoading: false,
        carsData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        api.getCarList().then(response => {
          this.carsData = response.data.data
          this.carsData = this.carsData.map(car => {
            let p = car.price
            car.price = p.split('万')[0]
            return car
          })
        }).catch(error => {
          console.log(error)
        }).then(e => {
          this.listLoading = false
        })
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
