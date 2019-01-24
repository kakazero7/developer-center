<template >
  <div class="dashboard-container">
      <el-container class="game_pack">       
         <el-steps :active="3" align-center style="width:900px;">
          <el-step title="上传安装包" description="" style=""></el-step>
          <el-step title="填写游戏信息" description=""></el-step>
          <el-step title="提交审核" description=""></el-step>
        </el-steps> 
  </el-container>
  <el-container style="margin-top:60px;">
    <el-aside style="width:300px;"><div class="card"></div></el-aside>
    <img src="http://img.nolovr.com/static/upload_game_pack_2.png" class="img_1">
    <el-aside style="width:300px;"><div class="card"></div></el-aside>
    </el-container>
    <el-row class="information" style="float:left;margin-top:20px;">
        <el-col :span="24"><div class="grid-content" style="font-size:30px;">游戏名称</div></el-col>
        <el-col :span="4"><div class="grid-content">版本号：</div></el-col>
        <el-col :span="18"><div class="grid-content">1.0.21</div></el-col>
        <el-col :span="4"><div class="grid-content">版本名：</div></el-col>
        <el-col :span="18"><div class="grid-content">22</div></el-col>
        <el-col :span="4"><div class="grid-content">提交日期：</div></el-col>
        <el-col :span="18"><div class="grid-content">2018-08-30 12:00</div></el-col>
      </el-row>
      <el-row class="information" style="float:left;margin-top:-240px;margin-left:570px;">
        <el-col :span="24"><div class="grid-content" style="font-size:30px;">游戏名称</div></el-col>
        <el-col :span="7"><div class="grid-content">版本号：</div></el-col>
        <el-col :span="17"><div class="grid-content">1.0.21</div></el-col>
        <el-col :span="7"><div class="grid-content">版本名：</div></el-col>
        <el-col :span="17"><div class="grid-content">22</div></el-col>
        <el-col :span="7"><div class="grid-content">提交日期：</div></el-col>
        <el-col :span="17"><div class="grid-content">2018-08-30 12:00</div></el-col>
      </el-row>
    <el-container style="margin-top:50px;clear:both;">
  <el-header class="to_examine" style="background:white;">游戏XXX已上传成功，请等待编辑审核。</el-header>
  <el-header class="to_examine" style="background:white;">加速审核？请联系QQ:88888888</el-header>
</el-container>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
    max-width: 990px;
    margin: 0 auto;
  } 
</style>
<style>
  .game_pack{
    margin-top:30px;
  }
  .card{
    width:220px;
    height:220px;
    background: #E5E5E5;
    border-radius: 8px;
    float:right;
  }
  .information{
    margin-top:10px;
    margin-left:80px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #272727;
    line-height: 60px;
  }
  .to_examine{
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #272727;
  }
  .img_1{
    margin-top:50px;
    margin-left:70px;
    height:100px;
  }
</style>
<style>
  .el-header, .el-footer {
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
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>