<template>
  <div class="registered-container">
    <h5 class="developer_h5">Financial Information</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" v-loading="dataLoading" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="BENEFICIARY NAME: "  prop="beneficiaryName">
        <el-input v-model="ruleForm.beneficiaryName" placeholder="Please Enter BENEFICIARY NAME"></el-input>
      </el-form-item>
      <el-form-item label="ACCOUNT NUMBER: "  prop="bankAccount">
        <el-input v-model="ruleForm.bankAccount" placeholder="Please Enter ACCOUNT NUMBER"></el-input>
      </el-form-item>
      <el-form-item label="BANK NAME: "  prop="bankName">
        <el-input v-model="ruleForm.bankName" placeholder="Please Enter  BANK NAME"></el-input>
      </el-form-item>
      <el-form-item label="BANK ADDRESS: "  prop="bankAddress">
        <el-input v-model="ruleForm.bankAddress" placeholder="Please Enter  BANK ADDRESS"></el-input>
      </el-form-item>
      <el-form-item label="SWIFT CODE: "  prop="swiftCode">
        <el-input v-model="ruleForm.swiftCode" placeholder="Please Enter  SWIFT CODE"></el-input>
      </el-form-item>
      <h5 class="developer_h5">财务联系人信息</h5>
      <el-form-item label="联系人：" prop="contactName"  style="margin-top:2%;">
        <el-input v-model="ruleForm.contactName" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱："  prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入您的电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号码："  prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:40%">
        <el-button type="primary" class="noloOrangeBtn" :loading="submitLoading" @click="submitForm('ruleForm')">保存并修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { addOrUpdateBankcardForeign, getBankcard } from '@/api/general'
  
  export default {
    name: 'dashboard',
    data() {
      return {
        usertype: this.$store.state.user.type,
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          accountType: 2,
          beneficiaryName: '',
          bankAccount: '',
          phone: '',
          email: '',
          bankName: '',
          bankAddress: '',
          swiftCode: '',
          contactName: ''
        },
        rules: {
          beneficiaryName: [
            { required: true, message: '请输入银行账号收款人', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '请输入银行账号', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '请选择所属银行', trigger: 'blur' }
          ],
          bankAddress: [
            { required: true, message: '请输入支行', trigger: 'blur' }
          ],
          swiftCode: [
            { required: true, message: '请输入支行', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入财务联系人姓名', trigger: 'blur' },
            { min: 0, max: 50, message: '请输入财务联系人姓名,限制最多为50字节', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        submitLoading: false,
        dataLoading: false,
        labelPosition: 'top'
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      // this.$i18n.locale = 'zh_CN'
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            addOrUpdateBankcardForeign(this.ruleForm).then(response => {
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
            this.submitLoading = false
            console.log('error submit!!')
            return false
          }
        })
      },
      fetchData() {
        this.dataLoading = true
        getBankcard(this.ruleForm.uuid + '/' + 2).then(response => {
          this.dataLoading = false
          if (response.returnMsg === 'success') {
            this.ruleForm.beneficiaryName = response.data.beneficiaryName
            this.ruleForm.bankAccount = response.data.bankAccount
            this.ruleForm.phone = response.data.phone
            this.ruleForm.email = response.data.email
            this.ruleForm.bankName = response.data.bankName
            this.ruleForm.bankAddress = response.data.bankAddress
            this.ruleForm.swiftCode = response.data.swiftCode
            this.ruleForm.contactName = response.data.contactName
          }
        }).catch((err) => {
          this.$message.error(err)
          this.dataLoading = false
        })
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
  .registered-container {
    max-width: 990px;
    margin: 0 auto;
  }
  
  .developer_h5 {
    font-size: 30px;
    font-weight: normal;
  }
  
  .developer_h4 {
    text-align: center;
    color: #666;
    font-size: 48px;
  }
  
</style>
