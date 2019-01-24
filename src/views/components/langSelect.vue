<template>
  <el-dropdown trigger="click" style="font-size: 28px" @command="handleSetLanguage">
    <span class="el-dropdown-link">
    <svg-icon icon-class="languageCn" color="#2EB392"/>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh_CN'" command="zh_CN">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en_US'" command="en_US">English</el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja_JP'" command="ja_JP">日本语</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    computed: {
      language() {
        return this.$store.getters.language
      }
    },
    methods: {
      handleSetLanguage(lang) {
        this.$store.dispatch('setLanguage', lang).then(() => {
          this.$i18n.locale = lang
          this.$message({
            message: 'switch language success',
            type: 'success'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .international-icon {
    font-size: 20px;
    cursor: pointer;
    vertical-align: -5px !important;
  }
</style>

