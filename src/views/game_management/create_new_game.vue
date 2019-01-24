<template>
  <div class="dashboard-container">
    <div class="build_game">创建新游戏</div>
    <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" ref="ruleForm" label-width="100px">
      <el-form-item label="中文游戏名称" prop="gameNames.chineseName">
        <el-input v-model="ruleForm.gameNames.chineseName" placeholder="请输入您的中文游戏名称" class="game_name"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="英文游戏名称" prop="gameNames.englishName">
        <el-input v-model="ruleForm.gameNames.englishName" placeholder="请输入您的英文游戏名称" class="game_name"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="日文游戏名称" prop="gameNames.japaneseName">
        <el-input v-model="ruleForm.gameNames.japaneseName" placeholder="请输入您的日文游戏名称" class="game_name"
                  clearable></el-input>
      </el-form-item>
      <el-form-item >
        <el-row type="flex" justify="center">
          <el-button type="primary" class="noloOrangeBtn" @click="submitForm('ruleForm')" :loading="submitLoading">立即创建
          </el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  
  import { addGameNames } from '@/api/general'
  export default {
    data() {
      return {
        labelPosition: 'top',
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          gameNames: {
            chineseName: '',
            englishName: '',
            japaneseName: ''
          }
        },
        rules: {
          gameNames: {
            chineseName: [
              { required: true, message: '请输入您的中文游戏名称', trigger: 'blur' }
            ],
            englishName: [
              { required: true, message: '请输入您的英文游戏名称', trigger: 'blur' }
            ],
            japaneseName: [
              { required: true, message: '请输入您的日文游戏名称', trigger: 'blur' }
            ]
          }
        },
        submitLoading: false
      }
    },
    mounted() {
      // this.$i18n.locale = 'en_US'
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addGameNames(this.ruleForm).then(res => {
              this.submitLoading = false
              if (res.returnMsg === 'success') {
                this.$message({
                  message: '创建成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'GameManagement' })
              }
            }).catch((err) => {
              alert(err)
              this.submitLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    max-width: 990px;
    margin: 0 auto;
  }
  
  .build_game {
    margin-top: 75px;
    margin-bottom: 50px;
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #000000;
    text-align: left;
  }
  
  .game_name {
    border: 1px solid #DDDDDD;
    box-shadow: inset 0 2px 2px 0 #D8D8D8;
    border-radius: 4px;
  }
</style>
