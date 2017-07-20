<template>
  <div class="table-wrap">
    <span>总共有{{carsData.length}}辆车</span>
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
      <el-table-column prop="price" align="center" label="地址" min-width="150"
                       sortable>
        <template scope="scope">
          <a :href="scope.row.a">前往页面</a>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as api from '@/api/cars'
  let baseUrl = 'https://www.guazi.com'
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
      toWeb(){

      },
      getList() {
        this.listLoading = true
        api.getCarList().then(response => {
          this.carsData = response.data.data
          this.carsData = this.carsData.map(car => {
            let p = car.price
            car.price = p.split('万')[0]
            car.a = baseUrl + car.a
            return car
          })
          this.carsData = this.carsData.filter(item => {
            let m = item.mileage < 4.9
            let notwuling = item.title.indexOf('五菱') === -1
            let l = item.location === '北京'
            if (m && notwuling && l) {
              return true;
            }
            return false;
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
