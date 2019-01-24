<template>
  <div class="registered-container">
    <h4 class="developer_h4">{{$t('RegisterInformation.individual_developer')}}</h4>
    <h5 class="developer_h5">{{$t("RegisterInformation.basic_information")}}</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('RegisterInformation.name')" prop="name">
        <el-input v-model="ruleForm.name" :placeholder="$t('RegisterInformation.enter_developer_name')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.consistent_with_ID_card_name')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.iD_Card')" prop="cardId" class="personalDeveloper">
        <el-input v-model="ruleForm.cardId" :placeholder="$t('RegisterInformation.enter_ID_number')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.fill_in_ID_card_number')}}</p>
      </el-form-item>
      <el-form-item class="idcard_form_item" prop="cardIdUrl">
        <p><span>&nbsp;&nbsp;</span> {{$t('RegisterInformation.upload_ID_card_photos')}}</p>
        <div style="float: left">
          <singleimgupload :uuid="ruleForm.uuid"
                           :p-size="$t('RegisterInformation.a320_180')"
                           :p-size-data="1"
                           :p-img-url="ruleForm.cardIdUrl"
                           :p-action="baseUrl + '/web/upload/img/idcard/' + ruleForm.uuid"
                           v-on:listenToChildSingleUrl="singleUrlWatch"></singleimgupload>
        </div>
        <div style="display: inline-block;margin-left: 80px">
          <a href="javascript:;" @click="IDcardDialog = true">
            <img src="http://img.nolovr.com/static/IDcardExample.png" style="height: 178px" alt="example">
          </a>
          <p class="help-block">{{$t('RegisterInformation.Click_to_enlarge')}}</p>
        </div>
        <el-dialog :visible.sync="IDcardDialog" style="text-align: center" width="40%">
          <img src="http://img.nolovr.com/static/IDcardExample.png" alt="example">
        </el-dialog>
      </el-form-item>
      <h5 class="developer_h5">{{$t('RegisterInformation.contact_information')}}</h5>
      <citylist :p-address="$t('RegisterInformation.contact_person_address')"
                v-on:listenToChildProvince="provinceWatch"
                v-on:listenToChildCity="cityWatch"
                v-on:listenToChildArea="areaWatch"></citylist>
      <el-form-item label=" " prop="contactAddress" class="personalDeveloper">
        <el-input v-model="ruleForm.contactAddress" :placeholder="$t('RegisterInformation.enter_contact_address')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.email')" prop="email" class="personalDeveloper">
        <el-input v-model="ruleForm.email" :placeholder="$t('RegisterInformation.enter_your_email')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.default_email_address')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.cell_phone_number')" prop="phone" class="personalDeveloper">
        <el-input v-model="ruleForm.phone" :placeholder="$t('RegisterInformation.enter_phone_number')">
          <template slot="append">
            <el-button @click="sendVerificationCode" :disabled="!VCFlag" v-loading="VCLoading">{{VCcontent}}</el-button>
          </template>
        </el-input>
        <p class="help-block">{{$t('RegisterInformation.default_cell_phone_number')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.verification_code')" prop="code" class="personalDeveloper">
        <el-input v-model="ruleForm.code" :placeholder="$t('RegisterInformation.mobile_verification_code')"></el-input>
      </el-form-item>
      <el-form-item class="personalDeveloper">
        <el-select v-model="ruleForm.contactType" :placeholder="$t('RegisterInformation.choose')">
          <el-option :label="$t('RegisterInformation.qq')" value="1"></el-option>
          <el-option :label="$t('RegisterInformation.wechat')" value="2"></el-option>
          <el-option :label="$t('RegisterInformation.weibo')" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="contactNumber" class="personalDeveloper">
        <el-input v-model="ruleForm.contactNumber"
                  :placeholder="$t('RegisterInformation.enter') + 
                  contactTypeArr[ruleForm.contactType] + 
                  $t('RegisterInformation.account')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.easy_communication')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.developer_website')" prop="officialWebsiteUrl" class="personalDeveloper">
        <el-input v-model="ruleForm.officialWebsiteUrl" :placeholder="$t('RegisterInformation.enter_website')"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:40%" class="personalDeveloper">
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading" class="noloOrangeBtn">{{$t('RegisterInformation.submit_1')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import store from '../../store'
  import citylist from '../components/citylist'
  import singleimgupload from '../components/singleImgUpload'
  import { chinaPersonalRegister } from '@/api/general'
  import { sendMessage } from '@/api/login'
  
  export default {
    components: { citylist, singleimgupload, store },
    data() {
      const checkArea = (rule, value, callback) => {
        setTimeout(() => {
          if (!this.ruleForm.contactArea) {
            return callback(new Error(this.$t('RegisterInformation.select_area')))
          } else {
            callback()
          }
        }, 100)
      }
      const cardIdUrlValidate = (rule, value, callback) => {
        setTimeout(() => {
          if (!this.ruleForm.cardIdUrl) {
            return callback(new Error(this.$t('RegisterInformation.upload_the_photo_of_your_ID_Card')))
          } else {
            callback()
          }
        }, 100)
      }
      const ValidatePhoneDome = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8]{1}[0-9]{9}$/
        if (value.length !== 11) {
          callback(new Error(this.$t('RegisterInformation.enter_correct_phone_number_Must_be_11')))
        } else if (!reg.test(value)) {
          callback(new Error(this.$t('RegisterInformation.enter_phone_number_begins_with_13_14_15_17_18')))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          name: '',
          cardId: '',
          phone: '',
          email: '',
          cardIdUrl: '',
          contactType: '1',
          contactNumber: '',
          code: '',
          region: '',
          officialWebsiteUrl: '',
          type: 1, // 类型 中国个人
          contactProvince: null, // 省
          contactCity: null, // 市
          contactArea: null, // 区
          contactAddress: null // 区
        },
        rules: {
          name: [
            { required: true, message: this.$t('RegisterInformation.enter_developer_name'), trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: this.$t('RegisterInformation.fill_in_ID_card_number'), trigger: 'blur' },
            { min: 18, max: 18, message: this.$t('RegisterInformation.fill_in_ID_card_number'), trigger: 'blur' }
          ],
          area: [
            { required: true, validator: checkArea, trigger: 'change', message: this.$t('RegisterInformation.choose_region') }
          ],
          contactAddress: [
            { required: true, message: this.$t('RegisterInformation.enter_detailed_contact_address'), trigger: 'blur' }
          ],
          phone: [
            { required: true, message: this.$t('RegisterInformation.enter_11_phone_number'), trigger: 'blur' },
            { required: true, trigger: 'blur', validator: ValidatePhoneDome }
          ],
          email: [
            { type: 'email', required: true, message: this.$t('RegisterInformation.enter_correct_email'), trigger: 'blur' }
          ],
          cardIdUrl: [
            { required: true, validator: cardIdUrlValidate, trigger: 'change' }
          ],
          code: [
            { required: true, message: this.$t('RegisterInformation.input_validation_code'), trigger: 'blur' }
          ],
          contactNumber: [
            { required: true, message: this.$t('RegisterInformation.enter_account'), trigger: 'blur' }
          ]
        },
        contactTypeArr: ['', this.$t('RegisterInformation.qq'), this.$t('RegisterInformation.wechat'), this.$t('RegisterInformation.weibo')],
        IDcardDialog: false,
        imageUrl: '',
        VCLoading: false, // 验证码 loading
        VCFlag: true, // 添加验证码Flag
        VCcontent: this.$t('RegisterInformation.send_the_verification_code'),
        VCtotalTime: 5, // 验证码时间
        submitLoading: false,
        baseUrl: process.env.BASE_API
      }
    },
    mounted() {
      // this.$i18n.locale = 'zh_CN'
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            chinaPersonalRegister(this.ruleForm).then(res => {
              if (res.returnCode === 200) {
                this.$store.dispatch('SetType', this.ruleForm.type).then(() => {
                  this.$router.push({ path: '/' })
                }).catch(() => {
                  this.submitLoading = false
                })
              }
            }).catch((err) => {
              console.log(err)
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
              message: this.$t('RegisterInformation.verification_code_is_sent'),
              type: 'success'
            })
            this_.VCcontent = this.VCtotalTime + 's' + this.$t('RegisterInformation.re_send_after')
            const clock = window.setInterval(() => {
              this_.VCtotalTime--
              this_.VCcontent = this.VCtotalTime + 's' + this.$t('RegisterInformation.re_send_after')
              if (this_.VCtotalTime <= 0) {
                window.clearInterval(clock)
                this_.VCcontent = this.$t('RegisterInformation.re_send_the_verification_code')
                this_.VCtotalTime = 5
                this_.VCFlag = true // 这里重新开启
              }
            }, 1000)
            this.VCLoading = false
          }).catch((err) => {
            alert(err)
            this.VCFlag = true
          })
        } else {
          this.$message.error(this.$t('RegisterInformation.enter_11_phone_number'))
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
    computed: {}
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
    width: 178px;
    margin-left: 10.2%;
    margin-top: -5%;
  }

  .personalDeveloper{
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
  
  .idcard_form_item .el-form-item__label {
    width: 100% !important;
    text-align: left;
  }
</style>
