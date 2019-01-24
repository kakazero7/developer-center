<template>
  <div class="registered-container">
    <h5 class="developer_h5">财务信息</h5>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-loading="dataLoading" label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="收款人：" prop="payee" class="financeInformation">
        <el-input v-model="ruleForm.payee" placeholder="请输入银行账号收款人"></el-input>
      </el-form-item>
      <el-form-item label="银行账户：" prop="bankAccount" class="financeInformation">
        <el-input v-model="ruleForm.bankAccount" placeholder="请输入银行账号，开户人必须是开发者本人"></el-input>
      </el-form-item>
      <el-form-item label="所属银行：" prop="bankName" class="financeInformation">
        <el-select v-model="ruleForm.bankName" placeholder="请选择">
          <el-option v-for="item in bankOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开户支行：" prop="openingBranch" class="financeInformation">
        <el-input v-model="ruleForm.openingBranch" placeholder="请输入开户支行"></el-input>
      </el-form-item>
      <el-form-item label="增值税发票:" prop="specialInvoice" class="financeInformation">
        <el-radio-group v-model="ruleForm.specialInvoice">
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <h5 class="developer_h5">财务联系人信息</h5>
      <el-form-item label="联系人：" prop="contactName" class="financeInformation">
        <el-input v-model="ruleForm.contactName" placeholder="请输入联系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email" class="financeInformation">
        <el-input v-model="ruleForm.email" placeholder="请输入您的电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone" class="financeInformation">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码">
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:40%" class="financeInformation">
        <el-button class="noloOrangeBtn" type="primary" :loading="submitLoading" @click="submitForm('ruleForm')">保存并修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { addOrUpdateBankcard, getBankcard } from '@/api/general'
  
  export default {
    name: 'dashboard',
    data() {
      return {
        usertype: this.$store.state.user.type,
        ruleForm: {
          uuid: this.$store.state.user.uuid,
          accountType: 1,
          payee: '',
          bankAccount: '',
          phone: '',
          email: '',
          bankName: '',
          openingBranch: '',
          contactName: '',
          specialInvoice: true
        },
        rules: {
          payee: [
            { required: true, message: '请输入银行账号收款人', trigger: 'blur' },
            { min: 0, max: 10, message: '限制最多20字节，请输入正确收款人姓名', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '请输入银行账号', trigger: 'blur' },
            { min: 0, max: 50, message: '限制最多50字节，请输入正确银行账号', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '请选择所属银行', trigger: 'blur' }
          ],
          openingBranch: [
            { required: true, message: '请输入开户支行', trigger: 'blur' },
            { min: 0, max: 50, message: '限制最多50字节，请输入正确信息', trigger: 'blur' }
          ],
          contactName: [
            { required: true, message: '请输入财务联系人姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入11位手机号码', trigger: 'blur' },
            { pattern: /^1[3|4|5|7|8]{1}[0-9]{9}$/, message: '请输入正确手机号，手机号必须为11位', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        bankOptions: [
          { value: '', label: '请选择' },
          { value: '1', label: '工商银行' },
          { value: '2', label: '中国银行' },
          { value: '3', label: '建设银行' },
          { value: '4', label: '农业银行' },
          { value: '5', label: '交通银行' },
          { value: '6', label: '北京银行' },
          { value: '7', label: '广发银行' },
          { value: '8', label: '兴业银行' },
          { value: '9', label: '浦发银行' },
          { value: '10', label: '南京银行' },
          { value: '11', label: '农业银行' },
          { value: '12', label: '平安银行' },
          { value: '13', label: '中国人民银行' },
          { value: '14', label: '民生银行' },
          { value: '15', label: '恒丰银行' },
          { value: '16', label: '厦门银行' },
          { value: '17', label: '光大银行' }
        ],
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            addOrUpdateBankcard(this.ruleForm).then(response => {
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
        getBankcard(this.ruleForm.uuid + '/' + 1).then(response => {
          this.dataLoading = false
          if (response.returnMsg === 'success') {
            this.ruleForm.payee = response.data.payee
            this.ruleForm.bankAccount = response.data.bankAccount
            this.ruleForm.phone = response.data.phone
            this.ruleForm.email = response.data.email
            this.ruleForm.bankName = response.data.bankName
            this.ruleForm.openingBranch = response.data.openingBranch
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

  .financeInformation{
    margin-top: 40px;
  }
</style>
