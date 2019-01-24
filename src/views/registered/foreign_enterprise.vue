<template>
  <div class="registered-container">
    <h4 class="developer_h4">{{$t('RegisterInformation.foreign_enterprise_developer')}}</h4>
    <h5 class="developer_h5">{{$t('RegisterInformation.basic_information')}}</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item :label="$t('RegisterInformation.company_name')" prop="companyName">
        <el-input v-model="ruleForm.companyName" :placeholder="$t('RegisterInformation.enter_company_name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.registered_address')" prop="registeredAddress" class="foreEnterpriseDeveloper">
        <el-input v-model="ruleForm.registeredAddress" :placeholder="$t('RegisterInformation.enter_contact_address')"></el-input>
      </el-form-item>
      <h5 class="developer_h5">{{$t('RegisterInformation.contact_information')}}</h5>
      <el-form-item :label="$t('RegisterInformation.contact_name')" prop="contactName">
        <el-input v-model="ruleForm.contactName" :placeholder="$t('RegisterInformation.name_of_the_contact_person')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.contact_person_address')" prop="contactAddress" class="foreEnterpriseDeveloper">
        <el-input v-model="ruleForm.contactAddress" :placeholder="$t('RegisterInformation.enter_contact_person_address')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.email')" prop="email" class="foreEnterpriseDeveloper">
        <el-input v-model="ruleForm.email" :placeholder="$t('RegisterInformation.enter_your_email')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.default_email_address')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.cell_phone_number')" prop="phone" class="foreEnterpriseDeveloper">
        <el-input v-model="ruleForm.phone" :placeholder="$t('RegisterInformation.enter_phone_number')">
        </el-input>
      </el-form-item>
      <el-form-item class="foreEnterpriseDeveloper">
        <el-select v-model="ruleForm.contactType" :placeholder="$t('RegisterInformation.choose')">
          <el-option :label="$t('RegisterInformation.facebook')" value="4"></el-option>
          <el-option :label="$t('RegisterInformation.twitter')" value="5"></el-option>
          <el-option :label="$t('RegisterInformation.skype')" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="contactNumber">
        <el-input v-model="ruleForm.contactNumber"
                  :placeholder="$t('RegisterInformation.enter')+ 
                  contactTypeArr[ruleForm.contactType]+
                  $t('RegisterInformation.account')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.easy_communication')}}</p>
      </el-form-item>
      <el-form-item  :label="$t('RegisterInformation.developer_website')" class="foreEnterpriseDeveloper">
        <el-input v-model="ruleForm.officialWebsiteUrl" :placeholder="$t('RegisterInformation.enter_website')"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:40%">
        <el-button type="primary" class="noloOrangeBtn" @click="submitForm('ruleForm')" :loading="submitLoading">{{$t('RegisterInformation.submit_application')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../../store'
  import { foreignCompanyRegister } from '@/api/general'
  
  export default {
    name: 'foreign_domestic',
    data() {
      return {
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          contactName: '',
          companyName: '',
          phone: '',
          email: '',
          contactAddress: '',
          registeredAddress: '',
          contactType: '4',
          contactNumber: '',
          officialWebsiteUrl: null,
          type: 4
        },
        rules: {
          contactName: [
            { required: true, message: this.$t('RegisterInformation.enter_developer_name'), trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: this.$t('RegisterInformation.enter_company_name'), trigger: 'blur' }
          ],
          contactAddress: [
            { required: true, message: this.$t('RegisterInformation.enter_contact_person_address'), trigger: 'change' }
          ],
          registeredAddress: [
            { required: true, message: this.$t('RegisterInformation.enter_the_company_address'), trigger: 'change' }
          ],
          email: [
            { type: 'email', required: true, message: this.$t('RegisterInformation.enter_correct_email'), trigger: 'blur' }
          ],
          phone: [
            { required: true, message: this.$t('RegisterInformation.enter_phone_number'), trigger: 'blur' }
          ],
          contactNumber: [
            { required: true, message: this.$t('RegisterInformation.enter_account'), trigger: 'blur' }
          ]
        },
        contactTypeArr: { '4': this.$t('RegisterInformation.facebook'), '5': this.$t('RegisterInformation.twitter'), '6': this.$t('RegisterInformation.skype') },
        submitLoading: false
      }
    },
    mounted() {
      // this.$i18n.locale = 'zh_CN'
      this.ruleForm.email = this.userinfo.userName
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            foreignCompanyRegister(this.ruleForm).then(res => {
              if (res.returnCode === 200) {
                this.$store.dispatch('SetType', this.ruleForm.type).then(() => {
                  this.$router.push({ path: '/' })
                }).catch(() => {
                  this.submitLoading = false
                })
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
    },
    computed: {
      ...mapGetters(['userinfo']),
      store
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
    width: 178px;
    margin-left: 10.2%;
    margin-top: -5%;
  }
  
  .foreEnterpriseDeveloper{
    margin-top: 40px;
  }
</style>
