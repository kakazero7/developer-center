<template>
  <div class="dashboard-container">
    <el-container class="game_pack">
      <el-steps :active="1" align-center style="">
        <el-step title="上传安装包" description=""></el-step>
        <el-step title="填写游戏信息" description=""></el-step>
        <el-step title="提交审核" description=""></el-step>
      </el-steps>
      <el-container style="margin-top: 60px">
        <el-upload
          style="width: 50%"
          class="upload-demo"
          :action="baseUrl+'/web/upload/apk/' + ruleForm.uuid + '/' +  ruleForm.gameId"
          :on-preview="handlePreview"
          :on-success="cbHandleSuccess"
          :on-remove="cbHandleRemove"
          :headers="{token}"
          :before-upload="beforeAvatarUpload"
          :before-remove="cbBeforeRemove"
          accept="application/vnd.android.package-archive"
          multiple
          :limit="1"
          :on-exceed="handleExceed">
          <el-button size="small" type="primary" class="game_upload_btn">上传<br>
            Cardboard版
          </el-button>
        </el-upload>
        <el-upload
          style="width: 50%"
          class="upload-demo"
          :action="baseUrl+'/web/upload/apk/' + ruleForm.uuid + '/' +  ruleForm.gameId"
          :on-preview="handlePreview"
          :on-success="gearHandleSuccess"
          :on-remove="gearHandleRemove"
          :headers="{token}"
          :before-upload="beforeAvatarUpload"
          :before-remove="gearBeforeRemove"
          accept="application/vnd.android.package-archive"
          multiple
          :limit="1"
          :on-exceed="handleExceed">
          <el-button size="small" type="primary" class="game_upload_btn">上传<br>
            Gear版
          </el-button>
        </el-upload>
      </el-container>
      <el-container style="margin-top: 30px">
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" style="width:100%" label-width="80px">
          <div style="width:44%; margin-right: 5%; display: inline-block">
            <div v-show="cardboardFlag">
              <el-form-item label="包名：" prop="cardboardPackageName">
                <el-input v-model="ruleForm.cardboardPackageName" placeholder="请输入包名"></el-input>
              </el-form-item>
              <el-form-item label="版本名：" prop="cardboardVersionName">
                <el-input v-model="ruleForm.cardboardVersionName" placeholder="请输入版本名"></el-input>
              </el-form-item>
              <el-form-item label="版本号：" prop="cardboardVersion">
                <el-input v-model.number="ruleForm.cardboardVersion" type="number" placeholder="请输入版本号"></el-input>
              </el-form-item>
            </div>
          </div>
          <div style="width:50%;display: inline-block">
            <div v-show="gearFlag">
              <el-form-item label="包名：" prop="gearPackageName">
                <el-input v-model="ruleForm.gearPackageName" placeholder="请输入包名"></el-input>
              </el-form-item>
              <el-form-item label="版本名：" prop="gearVersionName">
                <el-input v-model="ruleForm.gearVersionName" placeholder="请输入版本名"></el-input>
              </el-form-item>
              <el-form-item label="版本号：" prop="gearVersion">
                <el-input v-model.number="ruleForm.gearVersion" type="number" placeholder="请输入版本号，纯数字"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </el-container>
      <el-header style="background:white;">
        <el-row type="flex" justify="center">
          <el-button type="primary" class="noloOrangeBtn submitButton" :disabled="ruleForm.cardboardUrl ==='' ||
          ruleForm.gearVRUrl === ''"
                     @click="submitForm('ruleForm')"
                     :loading="submitLoading">立即创建
          </el-button>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
  import { addGameVersion } from '@/api/general'
  import { getToken } from '@/utils/auth'
  
  export default {
    name: 'dashboard',
    data() {
      var _this = this
      var validateGearVersion = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(_this.ruleForm.gearVersion)) {
            return callback(new Error('版本号应为纯数字'))
          } else {
            callback()
          }
        }, 100)
      }
      var validateCardboardVersion = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(_this.ruleForm.cardboardVersion)) {
            return callback(new Error('版本号应为纯数字'))
          } else {
            callback()
          }
        }, 100)
      }
      return {
        baseUrl: process.env.BASE_API,
        submitLoading: false,
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        cardboardFlag: false,
        gearFlag: false,
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          gameId: this.$route.query.gameId,
          cardboardUrl: '',
          cardboardVersion: '',
          cardboardVersionName: '',
          cardboardPackageName: '',
          gearVRUrl: '',
          gearVersion: '',
          gearVersionName: '',
          gearPackageName: ''
        },
        rules: {
          cardboardVersion: [
            { required: true, validator: validateCardboardVersion, trigger: 'blur' }
          ],
          cardboardVersionName: [
            { required: true, message: '请输入版本名', trigger: 'blur' }
          ],
          cardboardPackageName: [
            { required: true, message: '请输入包名', trigger: 'blur' }
          ],
          gearVersion: [
            { required: true, validator: validateGearVersion, trigger: 'blur' }
          ],
          gearVersionName: [
            { required: true, message: '请输入版本名', trigger: 'blur' }
          ],
          gearPackageName: [
            { required: true, message: '请输入包名', trigger: 'blur' }
          ]
        },
        token: getToken()
      }
    }, created() {
      this.gameIdVerification()
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addGameVersion(this.ruleForm).then(res => {
              this.submitLoading = false
              if (res.returnMsg === 'success') {
                this.$message({
                  message: '创建成功！',
                  type: 'success'
                })
                this.$router.push({
                  name: 'GameInformation', query: {
                    gameId: this.$route.query.gameId, gearVersion:
                    this.ruleForm.gearVersion, gameVersionId:
                    res.data.gameVersionId
                  }
                })
              }
            }).catch((err) => {
              this.$message.error(err)
              this.submitLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isapk = file.type === 'application/vnd.android.package-archive'
        if (!isapk) {
          this.$message.error('上传文件只能是 apk 格式!')
        }
        return isapk
      },
      cbHandleRemove(file, fileList) {
        this.ruleForm.cardboardUrl = ''
        this.cardboardFlag = false
      },
      gearHandleRemove(file, fileList) {
        this.ruleForm.gearVRUrl = ''
        this.gearFlag = false
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制上传 1 个文件，本次上传了 ${files.length} 个文件，如需上传新包请先删除旧包`)
      },
      cbHandleSuccess(res, file, fileList) {
        this.cardboardFlag = true
        this.ruleForm.cardboardUrl = res.data.url
      },
      gearHandleSuccess(res, file, fileList) {
        this.gearFlag = true
        this.ruleForm.gearVRUrl = res.data.url
      },
      cbBeforeRemove(file, fileList) {
        const filename = file.name
        const _index = filename.lastIndexOf('.')
        const suffixname = filename.substring(_index + 1, filename.length)
        if (suffixname !== 'apk') {
          return true
        }
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      gearBeforeRemove(file, fileList) {
        const filename = file.name
        const _index = filename.lastIndexOf('.')
        const suffixname = filename.substring(_index + 1, filename.length)
        if (suffixname !== 'apk') {
          return true
        }
        return this.$confirm(`确定移除 ${file.name}？`)
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

</style>
<style>
  .el-upload {
    display: block;
  }
  
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .game_pack {
    margin: 30px 0;
  }
  
  .game_upload_btn {
    line-height: 150%;
    width: 350px;
    color: #F49819;
    font-size: 28px;
    height: 150px;
    background: #fff;
    border: 4px solid #F49819;
  }
  
  .game_upload_btn:hover {
    color: #fff;
    background: #F49819;
    border: 4px solid #F49819;
  }
  
  .game_upload_btn:focus {
    color: #fff;
    background: #F49819;
    border: 4px solid #F49819;
  }
  
  .submitButton {
    width: 250px;
  }
  
  .noloOrangeBtn.is-disabled {
    opacity: .8;
    background-color: #F49819 !important;
    border-color: #F49819 !important;
  }
  
</style>
