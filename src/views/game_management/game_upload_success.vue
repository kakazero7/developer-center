<template>
  <div class="dashboard-container">
    <el-container class="game_pack" style="margin-bottom: 30px">
      <el-steps :active="3" align-center style="width:100%">
        <el-step title="上传安装包" description=""></el-step>
        <el-step title="填写游戏信息" description=""></el-step>
        <el-step title="提交审核" description=""></el-step>
      </el-steps>
    </el-container>
    <el-container style="margin-top:60px;">
      <el-aside style="width:400px;">
        <div class="game-card"></div>
      </el-aside>
      <el-main>
        <el-row type="flex" class="information" style="margin-bottom: 0px;">
          <el-col :span="24">
            <div class="grid-content bg-purple" style="font-size:30px;">游戏名称</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="information" :gutter="20" style="margin-bottom: 0px;">
          <el-col :span="8">
            <div class="grid-content bg-purple bg-purpleNew01" >版本号：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew" >1.0.21</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="information" :gutter="20" style="margin-bottom: 0px;">
          <el-col :span="8">
            <div class="grid-content bg-purple bg-purpleNew01" >版本名：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew" >22</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="information" :gutter="20" style="margin-bottom: 0px;">
          <el-col :span="8">
            <div class="grid-content bg-purple bg-purpleNew01" >提交日期：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew" >2018-08-30 12:00</div>
            </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container style="margin-top:30px;" >
      <el-header class="to_examine" style="background:white;">游戏XXX已上传成功，请等待编辑审核。</el-header>
      <el-header class="to_examine" style="background:white;">加速审核？请联系QQ:88888888</el-header>
    </el-container>
    <el-row type="flex" justify="center" style="margin-top:30px;" >
      <el-button class="button200 hollowBtn" @click="toGameManagement()">返回游戏管理</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {}
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    methods: {
      toGameManagement() {
        this.$router.push({ name: 'GameManagement' })
      }
    },
    computed: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    max-width: 990px;
    margin: 0 auto;
  }
  .button200 {
    width: 200px;
    color: #F49819;
    border: #F49819 2px solid;
  }
  .button200:hover{
    color: #ffffff;
    background: #F49819;
    border: #F49819 2px solid;
  }
</style>
<style>
  .game_pack {
    margin-top: 30px;
  }
  
  .game-card {
    width: 220px;
    height: 220px;
    background: #E5E5E5;
    border-radius: 8px;
    float: right;
  }
  
  .information {
    margin-top: -10px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #272727;
    line-height: 60px;
  }
  
  .to_examine {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #272727;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
    line-height: 160px;
    margin-left: 50px;
  }
  
  .bg-purpleNew{
    float: left;
  }

  .bg-purpleNew01{
    float: right;
  }
</style>
