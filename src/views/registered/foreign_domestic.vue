<template>
  <div class="registered-container">
    <h4 class="developer_h4">{{$t('RegisterInformation.foreign_individual_developer')}}</h4>
    <h5 class="developer_h5">{{$t('RegisterInformation.basic_information')}}</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('RegisterInformation.name')" prop="name">
        <el-input v-model="ruleForm.name" :placeholder="$t('RegisterInformation.enter_developer_name')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.consistent_with_ID_card_name')}}</p>
      </el-form-item>
      <h5 class="developer_h5">{{$t('RegisterInformation.contact_information')}}</h5>
      <el-form-item :label="$t('RegisterInformation.contact_person_address')" prop="contactAddress" style="margin-top:2%;" class="forePersonalDeveloper">
        <el-input v-model="ruleForm.contactAddress" :placeholder="$t('RegisterInformation.enter_contact_address')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.email')" prop="email" class="forePersonalDeveloper">
        <el-input v-model="ruleForm.email" :placeholder="$t('RegisterInformation.enter_your_email')"></el-input>
        <p class="help-block">{{$t('RegisterInformation.default_email_address')}}</p>
      </el-form-item>
      <el-form-item :label="$t('RegisterInformation.cell_phone_number')" prop="phone" class="forePersonalDeveloper">
        <el-input v-model="ruleForm.phone" :placeholder="$t('RegisterInformation.enter_phone_number')">
        </el-input>
      </el-form-item>
      <el-form-item class="forePersonalDeveloper">
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
      <el-form-item :label="$t('RegisterInformation.developer_website')" class="forePersonalDeveloper">
        <el-input v-model="ruleForm.officialWebsiteUrl" :placeholder="$t('RegisterInformation.enter_website')"></el-input>
      </el-form-item>
       <el-form-item style="margin-left:40%" class="forePersonalDeveloper">
    <el-button type="primary" class="noloOrangeBtn" @click="submitForm('ruleForm')" :loading="submitLoading">{{$t('RegisterInformation.submit_application')}}</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../../store'
  import { foreignPersonalRegister } from '@/api/general'
  
  export default {
    name: 'foreign_domestic',
    data() {
      return {
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          name: '',
          phone: '',
          email: '',
          contactAddress: '',
          contactType: '4',
          contactNumber: '',
          officialWebsiteUrl: null,
          type: 3
        },
        rules: {
          name: [
            { required: true, message: this.$t('RegisterInformation.enter_developer_name'), trigger: 'blur' }
          ],
          contactAddress: [
            { required: true, message: this.$t('RegisterInformation.fill_in_the_address'), trigger: 'change' }
          ],
          email: [
            { required: true, message: this.$t('RegisterInformation.enter_email'), trigger: 'blur' },
            { type: 'email', required: true, message: this.$t('RegisterInformation.input_correct_email_account'), trigger: 'blur' }
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
            foreignPersonalRegister(this.ruleForm).then(res => {
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

  .button_upload{
    border: 1px solid #333333;
    border-radius: 4px;
    width:178px;
    margin-left:10.2%;
    margin-top:-5%;
  }

  .forePersonalDeveloper{
    margin-top: 40px;
  }
</style>
