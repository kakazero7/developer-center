<template>
  <div class="dashboard-container" style="margin: 30px auto;" v-loading="dataLoading">
    <el-button class="button200 hollowBtn testButton" @click="dialogFormVisible = true" :disabled="dataList.length >=5"><b>添加测试账号</b></el-button>
    <b class="hintInformation" v-show="dataList.length >=5"><i class="el-icon-caret-right">每个开发者最多只能填写5个测试账号</i></b>
    <el-container class="container_1" v-for="list in dataList" :key="list.id">
      <el-aside width="200px">
        <img src="http://img.nolovr.com/static/game_management_1.png" class="asideImg">
      </el-aside>
      <el-main style="line-height:40px;width:400px;">
        <el-row type="flex" class="row-bg" :gutter="20" style="margin-bottom: 0px;margin-top:70px;">
          <el-col :span="6">
            <div class="grid-content bg-purple bg-purpleNew01" >ID：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew" >{{list.username}}</div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" :gutter="20" style="margin-bottom: 0px;">
          <el-col :span="6">
            <div class="grid-content bg-purple bg-purpleNew01" >更新时间：</div>
            </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light bg-purpleNew" >2018-10-12 14:41</div>
            </el-col>
        </el-row>
      </el-main>
      <el-main width="200px" style="line-height:180px;">
        <el-row style="margin-top:30px;margin-bottom: 0px;">
          <el-col :span="24">
            <el-button class="button200 hollowBtn deleteButton" @click="deleteAccount_(list.id)">删除</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-alert
      title="暂无数据"
      type="warning"
      style="margin-top: 30px"
      v-if="dataList.length == 0"
      show-icon>
    </el-alert>
    <el-dialog :visible="dialogFormVisible">
      <div class="test_number">添加测试账号</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item :label-width="'120px'" prop="username">
          <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入登录账号使用的邮箱或者手机号" clearable
             @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="hollowBtn hollowCancelBtn" @click="dialogFormVisible = false"><div @click="cancel">取消</div>
        </el-button>
        <el-button type="primary" class="noloOrangeBtn" :loading="submitLoading" @click="submitForm('ruleForm')">添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  
  import { mapGetters } from 'vuex'
  import { addAccount, getAccount, deleteAccount } from '@/api/general'
  
  export default {
    name: 'dashboard',
    data() {
      return {
        newname: '',
        dataLoading: false,
        dialogFormVisible: false,
        submitLoading: false,
        ruleForm: {
          gameId: this.$route.query.gameId,
          username: ''
        },
        dataList: '',
        rules: {
          username: [
            { required: true, message: '请输入登录账号使用的邮箱或者手机号', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.gameIdVerification()
      this.fetchData()
    },
    methods: {
      gameIdVerification() {
        if (this.$route.query.gameId === undefined) {
          this.$alert('您还没有创建游戏', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({ name: 'GameManagement' })
            }
          })
        }
      },
      fetchData() {
        this.dataLoading = true
        getAccount(this.ruleForm.gameId).then(response => {
          this.dataLoading = false
          if (response.returnMsg === 'success') {
            this.dataList = response.data
          }
        }).catch((err) => {
          this.$message.error(err)
          this.dataLoading = false
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            addAccount(this.ruleForm).then(response => {
              this.submitLoading = false
              if (response.data.isHave === true) {
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                })
                this.dialogFormVisible = false
                this.dataList.push({ username: this.ruleForm.username, id: response.data.id })
                this.ruleForm.username = ''
              }
            }).catch((err) => {
              this.$message.error(err)
              this.submitLoading = false
            })
          } else {
            this.submitLoading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      deleteAccount_(id) {
        this.$confirm('是否删除该测试账号？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(() => {
          deleteAccount(id).then(response => {
            if (response.returnMsg === 'success') {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
              this.dialogFormVisible = false
              for (const i in this.dataList) {
                if (this.dataList[i].id === id) {
                  this.dataList.splice(i, 1)
                  break
                }
              }
            }
          }).catch((err) => {
            this.$message.error(err)
          })
        }).catch(action => {
          this.$message({
            type: 'info',
            message: '删除已取消'
          })
        })
      },
      cancel() {
        this.ruleForm.username = ''
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
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
  .container_1 {
    border: 2px solid #DDDDDD;
    border-radius: 4px;
    margin-top: 50px;
    text-align: center;
    height: 270px;
  }
  
  .asideImg {
    margin-top: 90px;
  }
  
  .information_1 {
    float: left;
    font-size: 20px;
  }
  
  .test_number {
    margin-top: -3%;
    line-height: 80px;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #272727;
    text-align: center;
  }

  .hintInformation{
    color: #969697;
  }

  .testButton,.deleteButton{
    width: 200px;
    color: #F49819;
    border: #F49819 2px solid;
  }

  .testButton:hover,.deleteButton:hover{
    color: #ffffff;
    background: #F49819;
    border: #F49819 2px solid;
  }
  
</style>

<style>
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

