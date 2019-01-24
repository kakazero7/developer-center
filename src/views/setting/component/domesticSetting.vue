<template>
  <div class="registered-container">
    <h5 class="developer_h5">基本信息</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-loading="dataLoading" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入开发者姓名"></el-input>
        <p class="help-block">必须与身份证姓名保持一致</p>
      </el-form-item>
      <el-form-item label="证件号" prop="cardId" class="essentialInformation">
        <el-input v-model="ruleForm.cardId" placeholder="请输入身份证号码"></el-input>
        <p class="help-block">请填写18位身份证号码</p>
      </el-form-item>
      <el-form-item class="idcard_form_item" prop="cardIdUrl">
        <p><span>&nbsp;&nbsp;</span> 上传手持身份证正面照片</p>
        <div style="float: left">
          <singleimgupload :uuid="ruleForm.uuid"
                           :p-size-data="1"
                           :p-size="'320 * 180 不超过1M（JPG/PNG/BMP）'"
                           :p-img-url="ruleForm.cardIdUrl"
                           :p-action="baseUrl + '/web/upload/img/idcard/' + ruleForm.uuid"
                           v-on:listenToChildSingleUrl="singleUrlWatch"></singleimgupload>
        </div>
        <div style="display: inline-block;margin-left: 80px">
          <a href="javascript:;" @click="IDcardDialog = true">
            <img src="http://img.nolovr.com/static/IDcardExample.png" style="height: 178px" alt="example">
          </a>
          <p class="help-block">示例照片 点击查看大图</p>
        </div>
        <el-dialog :visible.sync="IDcardDialog" style="text-align: center" width="40%">
          <img src="http://img.nolovr.com/static/IDcardExample.png" alt="example">
        </el-dialog>
      </el-form-item>
      <el-dialog :visible.sync="cardIdDialog" style="text-align: center" width="40%">
        <img src="http://img.nolovr.com/static/IDcardExample.png" alt="example">
      </el-dialog>
      <h5 class="developer_h5">联系方式</h5>
      <citylist :p-address="'联系人地址：'"
                v-if="citylistFlag" :province-id="ruleForm.contactProvince"
                :city-id="ruleForm.contactCity"
                :area-id="ruleForm.contactArea"
                v-on:listenToChildProvince="provinceWatch"
                v-on:listenToChildCity="cityWatch"
                v-on:listenToChildArea="areaWatch"></citylist>
      <el-form-item label="详细地址：" prop="contactAddress" class="essentialInformation">
        <el-input v-model="ruleForm.contactAddress" placeholder="请输入详细联系地址"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email" class="essentialInformation">
        <el-input v-model="ruleForm.email" placeholder="请输入您的电子邮箱"></el-input>
        <p class="help-block">默认为您注册账号时填写的邮箱，可进行修改</p>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone" class="essentialInformation">
        <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号码">
          <template slot="append">
            <el-button @click="sendVerificationCode" :disabled="!VCFlag" v-loading="VCLoading">{{VCcontent}}</el-button>
          </template>
        </el-input>
        <p class="help-block">默认为您注册账号时填写的手机号码，可进行修改</p>
      </el-form-item>
      <el-form-item label="验证码：" prop="verification_code" class="essentialInformation">
        <el-input type="number" v-model="ruleForm.verification_code" maxlength="6"
                  placeholder="请输入您上述手机号收到的手机验证码"></el-input>
      </el-form-item>
      <el-form-item prop="contactType" class="essentialInformation">
        <el-select v-model="ruleForm.contactType" placeholder="请选择">
          <el-option label="QQ：" value="1"></el-option>
          <el-option label="微信：" value="2"></el-option>
          <el-option label="微博：" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="contactNumber">
        <el-input v-model="ruleForm.contactNumber"
                  :placeholder="'请输入您的'+ contactTypeArr[ruleForm.contactType] +'账号'"></el-input>
      </el-form-item>
      <el-form-item label="开发者官网：" prop="officialWebsiteUrl" class="essentialInformation">
        <el-input v-model="ruleForm.officialWebsiteUrl" placeholder="请输入您的官网地址"></el-input>
      </el-form-item>
      <el-form-item class="essentialInformation">
        <el-alert
          title="审核记录"
          type="info"
          :closable="false">
          <br>
          暂无记录
        </el-alert>
      </el-form-item>
      <el-form-item style="margin-left:40%" class="essentialInformation">
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading" class="submitButtonSave">
          保存并提交审核
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { sendMessage } from '@/api/login'
  import { getDeveloperInfo, addDomesticSetting } from '@/api/general'
  import citylist from '../../components/citylist'
  import singleimgupload from '../../components/singleImgUpload'
  
  export default {
    components: { citylist, singleimgupload },
    data() {
      var checkArea = (rule, value, callback) => {
        setTimeout(() => {
          if (!this.ruleForm.contactArea) {
            return callback(new Error('请选择地区'))
          } else {
            callback()
          }
        }, 100)
      }
      var cardIdUrlValidate = (rule, value, callback) => {
        setTimeout(() => {
          if (!this.ruleForm.cardIdUrl) {
            return callback(new Error('请上传身份证照片'))
          } else {
            callback()
          }
        }, 100)
      }
      const ValidatePhoneDomeSetting = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8]{1}[0-9]{9}$/
        if (value.length !== 11) {
          callback(new Error('请输入正确的手机号码，手机号码必须为11位'))
        } else if (!reg.test(value)) {
          callback(new Error('请输入以13，14，15，17，18开头的手机号码'))
        } else {
          callback()
        }
      }
      return {
        usertype: this.$store.state.user.type,
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          name: '',
          cardId: '',
          phone: '',
          email: '',
          cardIdUrl: '',
          contactProvince: null, // 省
          contactCity: null, // 市
          contactArea: null, // 区
          contactAddress: null,
          contactType: '1',
          contactNumber: '',
          officialWebsiteUrl: '',
          verification_code: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入开发者姓名', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '请填写18位身份证号码', trigger: 'blur' },
            { min: 18, max: 18, message: '请填写18位身份证号码', trigger: 'blur' }
          ],
          area: [
            { required: true, validator: checkArea, trigger: 'change' }
          ],
          cardIdUrl: [
            { required: true, validator: cardIdUrlValidate, trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入11位手机号码', trigger: 'blur' },
            { required: true, trigger: 'blur', validator: ValidatePhoneDomeSetting }
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          contactAddress: [
            { required: true, message: '请输入详细联系地址', trigger: 'blur' }
          ],
          verification_code: [
            { required: true, message: '请输入您收到的验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
          ],
          contactNumber: [
            { required: true, message: '请输入您的账号', trigger: 'blur' }
          ]
        },
        value: '',
        contactTypeArr: ['', 'QQ', '微信', '微博'],
        cardIdDialog: false,
        imageUrl: '',
        VCLoading: false, // 验证码 loading
        VCFlag: true, // 添加验证码Flag
        VCcontent: '发送验证码',
        VCtotalTime: 5, // 验证码时间
        submitLoading: false,
        dataLoading: false,
        IDcardDialog: false,
        baseUrl: process.env.BASE_API,
        citylistFlag: false // 解决citylist异步传值问题
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      // this.$i18n.locale = 'zh_CN'
    },
    methods: {
      fetchData() {
        this.dataLoading = true
        getDeveloperInfo(this.ruleForm.uuid + '/' + this.usertype).then(response => {
          this.dataLoading = false
          if (response.returnMsg === 'success') {
            this.ruleForm.name = response.data.name
            this.ruleForm.cardId = response.data.cardId
            this.ruleForm.email = response.data.email
            this.ruleForm.cardIdUrl = response.data.cardIdUrl
            this.ruleForm.contactAddress = response.data.contactAddress
            this.ruleForm.contactProvince = response.data.contactProvince
            this.ruleForm.contactCity = response.data.contactCity
            this.ruleForm.contactArea = response.data.contactArea
            this.ruleForm.officialWebsiteUrl = response.data.officialWebsiteUrl
            this.ruleForm.contactType = response.data.contactType.toString()
            this.ruleForm.contactNumber = response.data.contactNumber
            this.ruleForm.phone = response.data.phone
            this.citylistFlag = true
          }
        }).catch((err) => {
          this.$message.error(err)
          this.dataLoading = false
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addDomesticSetting(this.ruleForm).then(response => {
              this.submitLoading = false
              if (response.returnMsg === 'success') {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
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
      sendVerificationCode() { // 发送验证码
        if (!this.VCFlag) return false
        const pat = /^1[3|4|5|7|8]{1}[0-9]{9}$/
        const this_ = this
        if (pat.test(this.ruleForm.phone)) {
          this.VCFlag = false
          sendMessage({
            mobilePhoneNumber: this_.ruleForm.phone,
            codeType: '1'
          }).then(response => {
            console.log(response)
            this.$message({
              message: '验证码已发送',
              type: 'success'
            })
            this_.VCcontent = this.VCtotalTime + 's后重新发送'
            const clock = window.setInterval(() => {
              this_.VCtotalTime--
              this_.VCcontent = this.VCtotalTime + 's后重新发送'
              if (this_.VCtotalTime <= 0) {
                window.clearInterval(clock)
                this_.VCcontent = '重新发送验证码'
                this_.VCtotalTime = 5
                this_.VCFlag = true // 这里重新开启
              }
            }, 1000)
            this.VCLoading = false
          }).catch((err) => {
            this.$message.error(err)
            this.VCFlag = true
          })
        } else {
          this.$message.error('请输入11位手机号码!')
        }
      },
      provinceWatch(data) {
        this.ruleForm.contactProvince = data
      },
      cityWatch(data) {
        this.ruleForm.contactCity = data
      },
      areaWatch(data) {
        this.ruleForm.contactArea = data
      },
      singleUrlWatch(data) {
        this.ruleForm.cardIdUrl = data
      }
    },
    computed: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .registered-container {
    max-width: 990px;
    margin: 0 auto;
  }
  
  .developer_h5 {
    font-size: 30px;
    padding-left: 100px;
    font-weight: normal;
  }
  
  .developer_h4 {
    text-align: center;
    color: #666;
    font-size: 48px;
  }
  
  .registered-container .el-form-item__label {
    white-space: nowrap;
  }
  
  .button_upload {
    border: 1px solid #333333;
    border-radius: 4px;
    color: block;
    width: 178px;
    margin-left: 10.2%;
    margin-top: -5%;
  }

  .essentialInformation{
    margin-top: 40px;
  }
</style>
<style>
  .registered-container .el-form-item__label {
    white-space: nowrap;
  }
  
  .avatar-uploader {
    display: inline-block;
  }
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  
  .submitButtonSave {
    border-radius: 8px;
    background: #F49819;
    border: 1px solid #F49819;
    margin-left: -10%;
  }
  
  .submitButtonSave:hover {
    background: #F49819;
    border: 1px solid #F49819;
    opacity: .7;
  }
  
  .idcard_form_item .el-form-item__label {
    width: 100% !important;
    text-align: left;
  }
</style>

