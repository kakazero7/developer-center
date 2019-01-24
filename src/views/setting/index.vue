<template>
  <component :is="currentComponent"></component>
</template>
<script>
  import { mapGetters } from 'vuex'
  import domesticsetting from './component/domesticSetting'
  import enterprisesetting from './component/enterpriseSetting'
  import foreigndomesticsetting from './component/foreignDomesticSetting'
  import foreignenterprisesetting from './component/foreignEnterpriseSetting'
  export default {
    components: { domesticsetting, enterprisesetting, foreigndomesticsetting, foreignenterprisesetting },
    data() {
      return {
        componentArr: ['', 'domesticsetting', 'enterprisesetting', 'foreigndomesticsetting', 'foreignenterprisesetting']
        // 1 中国个人 2 中国企业 3 国外个人 4 国外企业
      }
    },
    computed: { ...mapGetters(['name', 'type']),
      currentComponent: function() { return this.componentArr[this.type] }
    }
  }
</script>
