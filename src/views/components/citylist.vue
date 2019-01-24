<template>
  <el-form-item :label="pAddress" prop="area">
    <el-select v-model="province" placeholder="请选择省">
      <el-option value="" label="请选择">
      </el-option>
      <el-option :value="items.code" :label="items.name" v-for="items in allProvince" :key="items.value">
      </el-option>
    </el-select>
    <el-select v-model="city" placeholder="请选择市">
      <el-option value="" label="请选择">
      </el-option>
      <el-option :value="items.code" :label="items.name" v-for="items in citys" :key="items.value">
      </el-option>
    </el-select>
    <el-select v-model="area" placeholder="请选择区">
      <el-option value="" label="请选择">
      </el-option>
      <el-option :value="items.code" :label="items.name" v-for="items in areas" :key="items.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>


<script>
  import provincesJson from '../../test/provinces.json' // 测试用
  import citiesJson from '../../test/cities.json' // 测试用
  import areasJson from '../../test/areas.json' // 测试用
  
  export default {
    props: ['provinceId', 'cityId', 'areaId', 'pAddress'],
    data() {
      return {
        // id: this.site_id,
        allProvince: provincesJson,
        allCity: citiesJson,
        allArea: areasJson,
        province: this.provinceId,
        city: this.cityId,
        area: this.areaId
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      province: function(new_id, old_id) {
        this.$emit('listenToChildProvince', new_id)
        this.city = null
        this.area = null
      },
      city: function(new_id, old_id) {
        this.$emit('listenToChildCity', new_id)
        this.area = null
      },
      area: function(new_id, old_id) {
        this.$emit('listenToChildArea', new_id)
      }
    },
    methods: {
      fetchData() {
      }
    },
    computed: {
      citys() { // 筛选城市
        if (!this.province) return null
        const selectedProvince = this.province
        const oldArr = this.allCity
        const newArr = oldArr.filter(function(element, index, self) {
          return element.provinceCode === selectedProvince
        })
        return newArr
      },
      areas() { // 筛选区
        if (!this.city) return null
        const selectedCity = this.city
        const oldArr = this.allArea
        const newArr = oldArr.filter(function(element, index, self) {
          return element.cityCode === selectedCity
        })
        return newArr
      }
    }
  }
</script>
