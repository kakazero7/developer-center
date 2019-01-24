<template>
  <div class="dashboard-container">
    <el-container class="game_pack_1" style="margin-bottom: 30px">
      <el-steps :active="2" align-center style="width:100%">
        <el-step title="上传安装包" description=""></el-step>
        <el-step title="填写游戏信息" description=""></el-step>
        <el-step title="提交审核" description=""></el-step>
      </el-steps>
    </el-container>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="" style="padding: 30px">
      <!-- 中文游戏基本信息 -->
      <el-collapse v-model="activeNames" @change="handleChange" style="width: 100%;">
        <el-collapse-item title="中文游戏基本信息" name="1" class="collapseSlowBorder">
          <el-form-item label="游戏名称：" prop="gameCountryInfos.chinese.gameName" class="countryInfos">
            <el-input v-model="ruleForm.gameCountryInfos.chinese.gameName"></el-input>
          </el-form-item>
          <el-form-item label="关键字：" prop="gameCountryInfos.chinese.keyword">
            <el-input v-model="ruleForm.gameCountryInfos.chinese.keyword"></el-input>
            <p class="help-block">关键词间以英文“,”间隔，最多填写10个</p>
          </el-form-item>
          <el-form-item label="一句话描述：" prop="gameCountryInfos.chinese.description">
            <el-input v-model="ruleForm.gameCountryInfos.chinese.description"></el-input>
            <p class="help-block">限最多20个字符</p>
          </el-form-item>
          <el-form-item label="游戏介绍：" prop="gameCountryInfos.chinese.releaseNotes">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.gameCountryInfos.chinese.releaseNotes">
            </el-input>
            <p class="help-block">限最多1000个字符</p>
          </el-form-item>
          <el-form-item label="更新说明：" v-if="0">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.gameCountryInfos.chinese.notes">
            </el-input>
            <p class="help-block">限最多1000个字符</p>
          </el-form-item>
        </el-collapse-item>
        <!-- 英文游戏基本信息 -->
        <el-collapse-item title="英文游戏基本信息" name="2" class="collapseSlowBorder">
          <el-form-item label="游戏名称：" prop="gameCountryInfos.english.gameName" class="countryInfos">
            <el-input v-model="ruleForm.gameCountryInfos.english.gameName"></el-input>
          </el-form-item>
          <el-form-item label="关键字：" prop="gameCountryInfos.english.keyword">
            <el-input v-model="ruleForm.gameCountryInfos.english.keyword"></el-input>
            <p class="help-block">关键词间以英文“,”间隔，最多填写10个</p>
          </el-form-item>
          <el-form-item label="一句话描述：" prop="gameCountryInfos.english.description">
            <el-input v-model="ruleForm.gameCountryInfos.english.description"></el-input>
            <p class="help-block">限最多20个字符</p>
          </el-form-item>
          <el-form-item label="游戏介绍：" prop="gameCountryInfos.english.releaseNotes">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.gameCountryInfos.english.releaseNotes">
            </el-input>
            <p class="help-block">限最多1000个字符</p>
          </el-form-item>
          <el-form-item label="更新说明：" v-if="0">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="ruleForm.gameCountryInfos.english.notes">
          </el-input>
          <p class="help-block">限最多1000个字符</p>
        </el-form-item>
        </el-collapse-item>
        <!-- 日文游戏基本信息 -->
        <el-collapse-item title="日文游戏基本信息" name="3" class="collapseSlowBorder">
          <el-form-item label="游戏名称：" prop="gameCountryInfos.japanese.gameName" class="countryInfos">
            <el-input v-model="ruleForm.gameCountryInfos.japanese.gameName"></el-input>
          </el-form-item>
          <el-form-item label="关键字：" prop="gameCountryInfos.japanese.keyword">
            <el-input v-model="ruleForm.gameCountryInfos.japanese.keyword"></el-input>
            <p class="help-block">关键词间以英文“,”间隔，最多填写10个</p>
          </el-form-item>
          <el-form-item label="一句话描述：" prop="gameCountryInfos.japanese.description">
            <el-input v-model="ruleForm.gameCountryInfos.japanese.description"></el-input>
            <p class="help-block">限最多20个字符</p>
          </el-form-item>
          <el-form-item label="游戏介绍：" prop="gameCountryInfos.japanese.releaseNotes">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.gameCountryInfos.japanese.releaseNotes">
            </el-input>
            <p class="help-block">限最多1000个字符</p>
          </el-form-item>
          <el-form-item label="更新说明：" v-if="0">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.gameCountryInfos.japanese.notes">
            </el-input>
            <p class="help-block">限最多1000个字符</p>
          </el-form-item>
        </el-collapse-item>
        <!-- 上传应用预览图 -->
        <el-collapse-item title="上传应用预览图" name="4" class="collapseSlowBorder">
          <el-form-item prop="appPreviewUrls">
            <p class="help-block">请上传至少三张图片，用于游戏详情与展示，请务必上传16:9的图片 1920*1080</p>
            <imglistupload :uuid="ruleForm.uuid"
                           :p-size="'240 * 150'"
                           :p-width="1920"
                           :p-height="1080"
                           :p-size-data="5"
                           :p-img-url="ruleForm.cardIdUrl" :p-action="baseUrl
         + '/web/upload/img/' + ruleForm.uuid + '/'+ gameId +'/' + gearVersion"
                           v-on:listenToChildListUrl="listUrlWatch"></imglistupload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-collapse-item>
        <!-- 上传游戏lcon -->
        <el-collapse-item title="上传游戏lcon" name="5" class="collapseSlowBorder">
          <el-form-item prop="gameIconUrl">
            <p class="help-block">上传1张（512*512）游戏图标，请务必上传PNG格式的透明背景图标</p>
            <singleimgupload :uuid="ruleForm.uuid"
                             :p-size="'512 * 512'"
                             :p-size-data="1"
                             :p-width="512"
                             :p-height="512"
                             :p-type=[1]
                             :p-img-url="ruleForm.cardIdUrl"
                             :p-action="baseUrl + '/web/upload/img/' + ruleForm.uuid + '/'+ gameId +'/'+ gearVersion"
                             v-on:listenToChildSingleUrl="gameIconUrlWatch"></singleimgupload>
          </el-form-item>
        </el-collapse-item>
        <!-- 上传游戏全景图 -->
        <el-collapse-item title="上传游戏全景图" name="6" class="collapseSlowBorder">
          <el-form-item>
            <p class="help-block">上传1张游戏内容的全景图片（4096*2048）</p>
            <singleimgupload :uuid="ruleForm.uuid"
                             :p-size="'4096 * 2048'"
                             :p-img-url="ruleForm.cardIdUrl"
                             :p-width="4096"
                             :p-height="2048"
                             :p-size-data="10"
                             :p-action="baseUrl + '/web/upload/img/' + ruleForm.uuid + '/'+ gameId +'/'+ gearVersion"
                             v-on:listenToChildSingleUrl="gamePanoramaUrlWatch"></singleimgupload>
          </el-form-item>
        </el-collapse-item>
        <!-- 上传游戏视频 -->
        <el-collapse-item title="上传游戏视频" name="7"  class="videoUpload collapseSlowBorder">
          <el-form-item prop="introductionVideoUrl">
            <videoupload :p-size="'1280 * 720'" style="margin-top: 5%"
                         :uuid="ruleForm.uuid"
                         :p-action="baseUrl + '/web/upload/vedio/' + ruleForm.uuid +'/'+ gameId + '/' + gearVersion"
                         v-on:listenToChildVideoUrl="introductionVideoUrlWatch">
            </videoupload>
          </el-form-item>
        </el-collapse-item>
        <!-- 其他信息 -->
        <el-collapse-item title="其他信息" name="8" class="collapseSlowBorder">
          <el-form-item label="需要联网:" prop="needNetworking" style="margin-left:-8%;margin-top:2%;">
            <el-radio-group v-model="ruleForm.needNetworking">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-row type="flex" justify="center">
        <el-button type="primary" :loading="submitLoading" @click="submitForm('ruleForm')"
                   class="noloOrangeBtn submitButtonApply">提交申请
        </el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import imglistupload from '../components/imgListUpload'
  import singleimgupload from '../components/singleImgUpload'
  import { addGameInformation } from '@/api/general'
  import videoupload from '../components/videoUpload'
  
  export default {
    components: { imglistupload, singleimgupload, videoupload },
    data() {
      var videoUrlValidate = (rule, value, callback) => {
        setTimeout(() => {
          if (!this.ruleForm.introductionVideoUrl) {
            return callback(new Error('请上传视频'))
          } else {
            callback()
          }
        }, 100)
      }
      var imgListUrlValidate = (rule, value, callback) => {
        setTimeout(() => {
          if (this.ruleForm.appPreviewUrls.length < 3) {
            return callback(new Error('请上传至少三张图片'))
          } else {
            callback()
          }
        }, 100)
      }
      var keywordsValidate = (rule, value, callback) => {
        const _value = value
        setTimeout(() => {
          if (_value.split(',').length - 1 > 10) {
            return callback(new Error('最多填写10个'))
          } else {
            if (_value.split(',').indexOf('') !== -1) {
              return callback(new Error('不可含有空关键词'))
            }
            callback()
          }
        }, 100)
      }
      return {
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        submitLoading: false,
        gearVersion: this.$route.query.gearVersion,
        gameId: this.$route.query.gameId,
        baseUrl: process.env.BASE_API,
        activeNames: ['1', '2', '3', '4', '5', '6', '7', '8'],
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          id: this.$route.query.gameVersionId,
          appPreviewUrls: [], // 游戏展示图
          gameIconUrl: '',
          gamePanoramaUrl: '',
          needNetworking: '',
          introductionVideoUrl: '',
          gameCountryInfos: {
            chinese: {
              gameName: '',
              keyword: '',
              description: '',
              releaseNotes: '',
              notes: ''
            },
            english: {
              gameName: '',
              keyword: '',
              description: '',
              releaseNotes: '',
              notes: ''
            },
            japanese: {
              gameName: '',
              keyword: '',
              description: '',
              releaseNotes: '',
              notes: ''
            }
          }
        },
        rules: {
          introductionVideoUrl: [
            { required: true, validator: videoUrlValidate, trigger: 'change' }
          ],
          appPreviewUrls: [
            { required: true, message: '请上传应用预览图', trigger: 'change' },
            { validator: imgListUrlValidate, trigger: 'change' }
          ],
          gameIconUrl: [
            { required: true, message: '请上传游戏lcon', trigger: 'change' }
          ],
          gamePanoramaUrl: [
            { required: true, message: '请上传游戏全景图', trigger: 'change' }
          ],
          gameCountryInfos: {
            chinese: {
              gameName: [
                { required: true, message: '请输入游戏名称', trigger: 'blur' },
                { min: 0, max: 100, message: '限最多100个字符', trigger: 'blur' }
              ],
              keyword: [
                { required: true, message: '请输入关键字', trigger: 'blur' },
                { max: 100, message: '限最多100个字符', trigger: 'blur' },
                { validator: keywordsValidate, trigger: 'blur' }
              ],
              description: [
                { required: true, message: '请输入一句话描述', trigger: 'blur' },
                { min: 0, max: 20, message: '限最多20个字符', trigger: 'blur' }
              ],
              releaseNotes: [
                { required: true, message: '请输入游戏介绍', trigger: 'blur' },
                { min: 0, max: 1000, message: '限最多1000个字符', trigger: 'blur' }
              ]
            },
            english: {
              gameName: [
                { required: true, message: '请输入游戏名称', trigger: 'blur' },
                { min: 0, max: 100, message: '限最多100个字符', trigger: 'blur' }
              ],
              keyword: [
                { required: true, message: '请输入关键字', trigger: 'blur' },
                { max: 100, message: '限最多100个字符', trigger: 'blur' },
                { validator: keywordsValidate, trigger: 'blur' }
              ],
              description: [
                { required: true, message: '请输入一句话描述', trigger: 'blur' },
                { min: 0, max: 20, message: '限最多20个字符', trigger: 'blur' }
              ],
              releaseNotes: [
                { required: true, message: '请输入游戏介绍', trigger: 'blur' },
                { min: 0, max: 1000, message: '限最多1000个字符', trigger: 'blur' }
              ]
            },
            japanese: {
              gameName: [
                { required: true, message: '请输入游戏名称', trigger: 'blur' },
                { min: 0, max: 100, message: '限最多100个字符', trigger: 'blur' }
              ],
              keyword: [
                { required: true, message: '请输入关键字', trigger: 'blur' },
                { max: 100, message: '限最多100个字符', trigger: 'blur' },
                { validator: keywordsValidate, trigger: 'blur' }
              ],
              description: [
                { required: true, message: '请输入一句话描述', trigger: 'blur' },
                { min: 0, max: 20, message: '限最多20个字符', trigger: 'blur' }
              ],
              releaseNotes: [
                { required: true, message: '请输入游戏介绍', trigger: 'blur' },
                { min: 0, max: 1000, message: '限最多1000个字符', trigger: 'blur' }
              ]
            }
          }
        }
      }
    },
    created() {
      this.gameIdVerification()
    },
    methods: {
      gameIdVerification() {
        if (!this.ruleForm.id) {
          this.$alert('您还没有上传应用', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              if (this.$route.query.gameId === undefined) {
                this.$router.push({ name: 'GameManagement' })
              } else {
                this.$router.push({ name: 'ModifyGame', query: {
                  gameId: this.$route.query.gameId }})
              }
            }
          })
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addGameInformation(this.ruleForm).then(response => {
              this.submitLoading = false
              if (response.returnMsg === 'success') {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                })
                this.$router.push({ name: 'GameUploadSuccess', query: { gameId: this.gameId }})
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
      toGameInformation() {
        this.$router.push({ name: 'GameReview' })
      },
      listUrlWatch(data) {
        console.log(data)
        this.ruleForm.appPreviewUrls = data
      },
      gameIconUrlWatch(data) {
        this.ruleForm.gameIconUrl = data
      },
      gamePanoramaUrlWatch(data) {
        this.ruleForm.gamePanoramaUrl = data
      },
      introductionVideoUrlWatch(data) {
        this.ruleForm.introductionVideoUrl = data
      },
      handleChange(val) {
        console.log(val)
      }
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
  
  .game_pack_1 {
    margin-top: 30px;
  }
  
  .countryInfos {
    margin-top: 5%;
  }
  
  .submitButtonApply {
    margin-top: 30px;
    width: 250px;
    height: 45px;
  }
  
  .registered-container .el-form-item__label {
    white-space: nowrap;
  }
</style>
<style>
  .videoUpload .el-upload {
    text-align: left;
  }
  .collapseSlowBorder .el-collapse-item__header {
    letter-spacing: 1px;
    background-color: #fafafa;
    padding-left: 10px;
  }
</style>
