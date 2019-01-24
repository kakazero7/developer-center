<template>
  <div class="registered-container">
    <h5 class="developer_h5">国外个人基本信息</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-loading="dataLoading" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入开发者姓名"></el-input>
        <p class="help-block">必须与身份证姓名保持一致</p>
      </el-form-item>
      <h5 class="developer_h5">联系方式</h5>
      <el-form-item label="联系人地址:" prop="contactAddress" class="foreEssentialInformation">
        <el-input v-model="ruleForm.contactAddress" placeholder="请输入详细联系地址"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email" class="foreEssentialInformation">
        <el-input v-model="ruleForm.email" placeholder="请输入您的电子邮箱"></el-input>
        <p class="help-block">默认为您注册账号时填写的邮箱，可进行修改</p>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone" class="foreEssentialInformation">
        <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号码">
        </el-input>
        <p class="help-block">默认为您注册账号时填写的手机号码，可进行修改</p>
      </el-form-item>
      <el-form-item class="foreEssentialInformation">
        <el-select v-model="ruleForm.contactType" placeholder="请选择">
          <el-option label="Facebook account：" value="4"></el-option>
          <el-option label="Twitter account：" value="5"></el-option>
          <el-option label="Skype account：" value="6"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item prop="contactNumber">
        <el-input v-model="ruleForm.contactNumber"
                  :placeholder="'请输入您的'+ contactTypeArr[ruleForm.contactType] +'账号'"></el-input>
                  <p class="help-block">便于客服人员与您及时沟通</p>
      </el-form-item>
      <el-form-item label="开发者官网：" class="foreEssentialInformation">
        <el-input v-model="ruleForm.officialWebsiteUrl" placeholder="请输入您的官网地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-alert
          title="审核记录"
          type="info"
          :closable="false">
          <br>
          暂无记录
        </el-alert>
      </el-form-item>
       <el-form-item style="margin-left:40%">
     <el-button type="primary" @click="submitForm('ruleForm')" :loading="submitLoading" class="submitButtonForeignEnterprise">保存并提交审核</el-button>
  </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addForeignDomesticSetting, getDeveloperInfo } from '@/api/general'
  
  export default {
    name: 'foreign_domestic',
    data() {
      return {
        usertype: this.$store.state.user.type,
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
            { required: true, message: '请输入开发者姓名', trigger: 'blur' }
          ],
          contactAddress: [
            { required: true, message: '请输入详细联系地址', trigger: 'change' }
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入11位手机号码', trigger: 'blur' }
          ],
          contactNumber: [
            { required: true, message: '请输入您的账号', trigger: 'blur' }
          ]
        },
        contactTypeArr: { '4': 'Facebook account', '5': 'Twitter account', '6': 'Skype account' },
        submitLoading: false,
        dataLoading: false
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
            this.ruleForm.contactAddress = response.data.contactAddress
            this.ruleForm.email = response.data.email
            this.ruleForm.phone = response.data.phone
            this.ruleForm.contactNumber = response.data.contactNumber
            this.ruleForm.officialWebsiteUrl = response.data.officialWebsiteUrl
          }
        }).catch((err) => {
          this.$message.error(err)
          this.dataLoading = false
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addForeignDomesticSetting(this.ruleForm).then(response => {
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

  .button_upload{
    border: 1px solid #333333;
    border-radius: 4px;
    width:178px;
    margin-left:10.2%;
    margin-top:-5%;
  }

  .submitButtonForeignEnterprise{
    border-radius: 8px;
    background: #F49819;
    border: 1px solid #F49819;
    margin-left: -10%;
  }

  .submitButtonForeignEnterprise:hover{
    background: #F49819;
    border: 1px solid #F49819;
    opacity: .7;
  }

  .foreEssentialInformation{
    margin-top: 40px;
  }
</style>
