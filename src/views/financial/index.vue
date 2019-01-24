<template>
  <component :is="currentComponent"></component>
</template>
<script>
  import { mapGetters } from 'vuex'
  import financial from './component/financial'
  import foreign_financial from './component/foreign_financial'
  export default {
    components: { financial, foreign_financial },
    data() {
      return {
        componentArr: ['', 'financial', 'financial', 'foreign_financial', 'foreign_financial']
        // 1 financial 国内 2 foreign_financial 国外
      }
    },
    computed: { ...mapGetters(['name', 'type']),
      currentComponent: function() { return this.componentArr[this.type] }
    }
  }
</script>
