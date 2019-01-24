<template>
  <div class="dashboard-container" style="margin-bottom: 30px" v-loading="dataLoading">
    <el-button class="button200 hollowBtn" @click="toCreatNewGames()"><b>创建新应用</b></el-button>
    <el-container class="container" v-for="listdata in gameListData" v-if="gameListData.length != 0" :key="listdata.id">
      <el-aside width="200px">
        <div v-if="listdata.gameIconUrl"><img :src="listdata.gameIconUrl" class="asideImg" ></div>
        <div v-else><img src="http://img.nolovr.com/static/game_management_1.png"
                                                     class="asideImg" ></div>
      </el-aside>
      <el-main style="width:480px;">
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="24"><div class="grid-content bg-purple">
            <strong>{{listdata.gameNames.chineseName}}</strong>
            </div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple bg-purpleNew01">包名：</div>
            </el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light bg-purpleNew" v-if="listdata.gearPackageName">{{listdata.gearPackageName}}</div>
            <div class="grid-content bg-purple-light bg-purpleNew" v-else>游戏包未上传</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple bg-purpleNew01">appid：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew">{{listdata.appId}}</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple bg-purpleNew01">appkey：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew">{{listdata.appKey}}</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple bg-purpleNew01">线上版本号：</div>
            </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light bg-purpleNew">{{listdata.gearVersion}}</div>
            </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light" style="color:green;font-size:20px;">最新版本已上架</div>
            </el-col>
        </el-row>
      </el-main>
      <el-main style="line-height:50px;width: 150px;">
        <el-row style="margin-top:30px;">
          <el-col
            :span="24">
            <el-button class="button200 hollowBtn" @click="toModifyGames(listdata.gameId)">上传应用包</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button class="button200 hollowBtn"
                       @click="toGameInformation(listdata.gameId,listdata.gearVersion,listdata.gameVersionId)">
            修改应用信息</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="24">
            <el-button class="button200 hollowBtn" @click="toTestAccount(listdata.gameId)">测试账号</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-alert
      title="暂无数据"
      type="warning"
      style="margin-top: 30px"
      v-if="gameListData.length == 0"
      show-icon>
    </el-alert>
  </div>
</template>

<script>
  import { getGameList } from '@/api/general'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'dashboard',
    data() {
      return {
        uuid: this.$store.state.user.uuid,
        dataLoading: false,
        gameListData: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.dataLoading = true
        getGameList(this.uuid).then(response => {
          this.dataLoading = false
          if (response.returnMsg === 'success') {
            this.gameListData = response.data
          }
        }).catch((err) => {
          this.$message.error(err)
          this.dataLoading = false
        })
      },
      toCreatNewGames() {
        this.$router.push({ name: 'CreateNewGame' })
      },
      toGameInformation(gameId, gearVersion, gameVersionId) {
        this.$router.push({ name: 'GameInformation', query: { gameId: gameId, gearVersion: gearVersion, gameVersionId:
            gameVersionId }})
      },
      toModifyGames(gameId) {
        this.$router.push({ name: 'ModifyGame', query: { gameId: gameId }})
      },
      toTestAccount(gameId) {
        this.$router.push({ name: 'TestAccount', query: { gameId: gameId }})
      }
    },
    computed: {
      ...mapGetters(['name', 'roles'])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    padding-top: 30px;
    max-width: 1070px;
    margin: 0 auto;
  }
  
  .navigation_bar {
    margin-top: 50px;
    float: right;
  }
  
  .button200 {
    width: 200px;
  }
  
  .container {
    border: 2px solid #dddddd;
    border-radius: 4px;
    margin-top: 50px;
    text-align: center;
  }
  
  .asideImg {
    margin-top: 90px;
    width: 100px;
    height: 100px;
  }

  .hollowBtn{
    color: #F49819;
    border: 2px solid #F49819;
  }

  .hollowBtn:hover{
    color: #ffffff;
    background: #F49819;
    border: 2px solid #F49819;
  }
</style>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 15px;
  }
  .row-bg {
    padding: 4px 0;
  }
  .bg-purpleNew{
    float: left;
  }
  .bg-purpleNew01{
    float: right;
  }
</style>
