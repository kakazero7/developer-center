<template >
  <div class="dashboard-container">
    <h4 class="dashboard_h4">{{$t('RegisterInformation.enterprise_developer')}}</h4>
    <h5 class="dashboard_h5">{{$t('RegisterInformation.basic_information')}}</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label=" " prop="name">
        <el-input v-model="ruleForm.name" :placeholder="$t('RegisterInformation.enter_company_name')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.consistent_with_business_license')}}</p>
      </el-form-item>
      <el-form-item label=" " prop="creditCode" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.creditCode" :placeholder="$t('RegisterInformation.enter_unified_social_credit_code')"></el-input>
      </el-form-item>
       <el-form-item prop="businessLicenseUrl">
        <p><span style="color: #f56c6c;margin-left:-2%;">* &nbsp;&nbsp;</span> {{$t('RegisterInformation.upload_copies_of_business_license')}}</p>
          <el-row type="flex">
            <el-col :span="12">
        <div style="display: inline-block">
          <div style="float: left">
            <singleimgupload :uuid="ruleForm.uuid"
                             :p-size-data="1"
                             :p-size="$t('RegisterInformation.a320_180')"
                             :p-img-url="ruleForm.businessLicenseUrl"
                             :p-action="baseUrl + '/web/upload/img/idcard/' + ruleForm.uuid"
                             v-on:listenToChildSingleUrl="singleUrlWatch"></singleimgupload>
          </div>
          <p class="help-block" style="visibility: hidden">.</p>
        </div>
        </el-col>
            <el-col :span="12">
        <div style="display: inline-block;margin-left: 80px;text-align:center;">
          <a href="javascript:;" @click="IDcardDialog = true">
            <img src="http://img.nolovr.com/static/enterprise.png" style="height: 178px" alt="example">
          </a>
          <p class="help-block">{{$t('RegisterInformation.click_to_enlarge')}}</p>
        </div>
        </el-col>
          </el-row>
      </el-form-item>
      <el-dialog :visible.sync="IDcardDialog" style="text-align: center" width="40%">
          <img src="http://img.nolovr.com/static/enterprise.png" alt="example">
      </el-dialog>
      <el-form-item label=" " prop="legalRepresentative" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.legalRepresentative" :placeholder="$t('RegisterInformation.name_of_enterprise_representative')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.consistent_with_business_license')}}</p>
      </el-form-item>
      <citylist class="enterpriseDeveloper"
                :p-address="$t('RegisterInformation.registered_address')"
                v-on:listenToChildProvince="provinceWatch"
                v-on:listenToChildCity="cityWatch"
                v-on:listenToChildArea="areaWatch"></citylist>
  <el-form-item label=" " prop="registeredAddress" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.registeredAddress" :placeholder="$t('RegisterInformation.enter_contact_address')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.consistent_with_business_license')}}</p>
      </el-form-item>
      <h5 class="dashboard_h5">{{$t('RegisterInformation.contact')}}</h5>
      <el-form-item label=" " prop="contactName" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.contactName" :placeholder="$t('RegisterInformation.name_of_the_contact_person')"></el-input>
      </el-form-item>
      <citylist class="enterpriseDeveloper"
                :p-address="$t('RegisterInformation.contact_person_address')"
                v-on:listenToChildProvince="provinceWatch"
                v-on:listenToChildCity="cityWatch"
                v-on:listenToChildArea="areaWatch"></citylist>
  <el-form-item label=" " prop="contactAddress" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.contactAddress" :placeholder="$t('RegisterInformation.enter_contact_address')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.email')" prop="email" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.email" :placeholder="$t('RegisterInformation.enter_your_email')"></el-input>
      <p class="help-block">{{$t('RegisterInformation.default_email_address')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.cell_phone_number')" prop="phone" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.phone" :placeholder="$t('RegisterInformation.enter_phone_number')">
        <template slot="append">
          <el-button @click="sendVerificationCode" :disabled="!VCFlag" v-loading="VCLoading">{{VCcontent}}</el-button>
          </template>
          </el-input>
        <p class="help-block">{{$t('RegisterInformation.default_cell_phone_number')}}</p>
      </el-form-item>
      <el-form-item label=" " prop="code" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.code" :placeholder="$t('RegisterInformation.mobile_verification_code')"></el-input>
      </el-form-item>
      <el-form-item class="enterpriseDeveloper">
        <el-select v-model="ruleForm.contackType" :placeholder="$t('RegisterInformation.choose')">
          <el-option :label="$t('RegisterInformation.qq')" value="1"></el-option>
          <el-option :label="$t('RegisterInformation.wechat')" value="2"></el-option>
          <el-option :label="$t('RegisterInformation.weibo')" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="contactNumber" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.contactNumber" 
        :placeholder="$t('RegisterInformation.enter')+
        contackTypeArr[ruleForm.contackType]+ 
        $t('RegisterInformation.account')"></el-input>
      <p class="help-block">{{$t('RegisterInformation.easy_communication')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.developer_website')" prop="officialWebsiteUrl" class="enterpriseDeveloper">
        <el-input v-model="ruleForm.officialWebsiteUrl" :placeholder="$t('RegisterInformation.enter_website_address_of_the_company')"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:40%" class="enterpriseDeveloper">
    <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading" class="submitButton_0">{{$t('RegisterInformation.submit_application')}}</el-button>
  </el-form-item>
      </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import store from '../../store'
import singleimgupload from '../components/singleImgUpload'
import { chinaEnterpriseRegister } from '@/api/general'
import { sendMessage } from '@/api/login'
import citylist from '../components/citylist'

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
        if (!this.ruleForm.businessLicenseUrl) {
          return callback(new Error(this.$t('RegisterInformation.upload_a_copy_of_the_business_license')))
        } else {
          callback()
        }
      }, 100)
    }
    const ValidatePhoneEnter = (rule, value, callback) => {
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
        creditCode: '',
        legalRepresentative: '',
        registeredAddress: '',
        contactName: '',
        contactAddress: '',
        email: '',
        phone: '',
        code: '',
        contactNumber: '',
        contackType: '1',
        type: 2,
        officialWebsiteUrl: '',
        contactProvince: null, // 省
        contactCity: null, // 市
        contactArea: null // 区
      },
      rules: {
        name: [
          { required: true, message: this.$t('RegisterInformation.enter_company_name'), trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: this.$t('RegisterInformation.enter_unified_social_credit_code'), trigger: 'blur' },
          { min: 18, max: 18, message: this.$t('RegisterInformation.enter_correct_unified_social_credit_code'), trigger: 'blur' }
        ],
        businessLicenseUrl: [
          { required: true, validator: cardIdUrlValidate, trigger: 'blur' }
        ],
        legalRepresentative: [
          { required: true, message: this.$t('RegisterInformation.name_of_enterprise_representative'), trigger: 'blur' }
        ],
        area: [
          { required: true, validator: checkArea, trigger: 'change' }
        ],
        registeredAddress: [
          { required: true, message: this.$t('RegisterInformation.enter_contact_address'), trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: this.$t('RegisterInformation.name_of_the_contact_person'), trigger: 'blur' }
        ],
        contactAddress: [
          { required: true, message: this.$t('RegisterInformation.enter_contact_address'), trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('RegisterInformation.enter_your_email'), trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: this.$t('RegisterInformation.enter_correct_email'), trigger: 'blur' }
        ],
        phone: [
          { required: true, message: this.$t('RegisterInformation.enter_phone_number'), trigger: 'blur' },
          { required: true, trigger: 'blur', validator: ValidatePhoneEnter }
        ],
        code: [
          { required: true, message: this.$t('RegisterInformation.mobile_verification_code'), trigger: 'blur' },
          { min: 6, max: 6, message: this.$t('RegisterInformation.enter_correct_verification_code'), trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: this.$t('RegisterInformation.enter_account'), trigger: 'blur' }
        ]
      },
      contackTypeArr: ['', this.$t('RegisterInformation.qq'), this.$t('RegisterInformation.wechat'), this.$t('RegisterInformation.weibo')],
      IDcardDialog: false,
      businessLicenseUrl: '',
      submitLoading: false,
      citylistFlag: false, // 解决citylist异步传值问题
      baseUrl: process.env.BASE_API,
      VCLoading: false, // 验证码 loading
      VCFlag: true, // 添加验证码Flag
      VCcontent: this.$t('RegisterInformation.send_the_verification_code'),
      VCtotalTime: 5 // 验证码时间
    }
  },
  mounted() {
    // this.$i18n.locale = 'zh'
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          chinaEnterpriseRegister(this.ruleForm).then(res => {
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
    handleAvatarSuccess(res, file) {
      this.businessLicenseUrl = URL.createObjectURL(file.raw)
      console.log(file)
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
          console.log(err)
          this.VCFlag = true
        })
      } else {
        this.$message.error(this.$t('RegisterInformation.enter_11_phone_number'))
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPGPNG) {
        this.$message.error(this.$t('RegisterInformation.upload_head_picture'))
      }
      if (!isLt1M) {
        this.$message.error(this.$t('RegisterInformation.the_picture_is_1M'))
      }
      return isJPGPNG && isLt1M
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
      this.ruleForm.businessLicenseUrl = data
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
.dashboard_h4{
    font-family: PingFangSC-Semibold;
    font-size: 40px;
    color: #666666;
    text-align: center;
}
.dashboard_h5{
    margin-left:10%;
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #000000;
    text-align: left;
    font-weight: normal;
}
.button_upload{
    border: 1px solid #333333;
    border-radius: 4px;
    color:block;
    width:178px;
    margin-left:10.2%;
}
.enterpriseDeveloper{
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

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .submitButton_0{
    border-radius: 8px;
    background: #F49819;
    border: 1px solid #F49819;
  }

  .submitButton_0:hover{
    background: #F49819;
    border: 1px solid #F49819;
    opacity: .7;
}
</style>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
