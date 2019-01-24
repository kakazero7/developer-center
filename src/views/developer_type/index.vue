<template>
  <el-row>
    <h4 class="developer_h4"> 请选择您的开发者类型</h4>
    <p style="margin-bottom: 100px;text-align: center">
      <small class="developer_type_top_small">（类型不可更改，请谨慎选择）</small>
    </p>
    <el-col :span="6" style="width:521px" :offset="5">
      <el-card :body-style="{ padding: '0px' }">
        <router-link :to="userinfo.countryId ==='44'? 'domestic' : 'foreign_domestic'">
        <el-container style="background: url('http://img.nolovr.com/static/developer_type1.png');height:364px;">
          <div class="personal_developer">个人开发者
          <div class="personal_developer1">适用于个人或小规模团队
          <p>免费在平台发布应用</p>
          </div>
          </div>
        </el-container>
        </router-link>
      </el-card>
    </el-col>
    <el-col :span="6" style="width:521px" :offset="2">
      <el-card :body-style="{ padding: '0px' }">
        <router-link :to="userinfo.countryId ==='44'? 'enterprise' : 'foreign_enterprise'">
        <el-container style="background: url('http://img.nolovr.com/static/developer_type2.png');height:364px;">
          <div  class="enterprise_developer">企业开发者
          <div class="enterprise_developer1">适用于合法企业、组织
          <p>机构享有平台推广及服务</p>
          </div>
          </div>
        </el-container>
        </router-link>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'dashboard',
    data() {
      return {
        currentDate: new Date()
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['userinfo'])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .developer_h4 {
    text-align: center;
    color: #666;
    font-size: 48px;
  }
  
  .developer_type_top_small {
    color: #898989;
    font-size: 24px;
  }
  
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
</style>

<style>
  .personal_developer{
    margin-top: 15%;
    width: 550px;
    height: 60px;
    text-align:center;
    font-family: PingFangSC-Semibold;
    font-size:2.5em;
    color: #FFFFFF;
    letter-spacing: 5px;
  }
  .personal_developer1{
    height: 100px;
    margin-top: 100px;
    font-family: PingFangSC-Medium;
    font-size: 25px;
    color: #FFFFFF;
    text-align: center;
  }
  .enterprise_developer{
    margin-top: 15%;
    width: 550px;
    height: 60px;
    text-align:center;
    font-family: PingFangSC-Semibold;
    font-size:2.5em;
    color: #FFFFFF;
    letter-spacing: 5px;
  }
  .enterprise_developer1{
    height: 100px;
    margin-top: 100px;
    font-family: PingFangSC-Regular;
    font-size: 25px;
    color: #FFFFFF;
    text-align:center;
  }
</style>

