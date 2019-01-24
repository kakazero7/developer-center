<template>
  <div class="registered-container">
    <el-form ref="registeredForm" :model="registeredForm" :rules="RegisteredRules" class="registered-form"
             auto-complete="on" label-position="top">
      <el-row type="flex" class="row-bg" style="margin-bottom: 0;margin-top:70px;">
        <el-col :span="4">
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple"><h3 class="title">{{$t("RegisterPage.register_NOLO_account")}}</h3></div>
        </el-col>
        <el-col :span="4" style="text-align: right">
          <lang-select class="set-language"/>
        </el-col>
      </el-row>
      <el-form-item :label="$t('RegisterPage.country')" prop="country">
        <el-select style="display: block" v-model="registeredForm.country">
          <el-option :label="$t('RegisterPage.choose')" value=""></el-option>
          <el-option :label="$t('RegisterPage.china')" value="44"></el-option>
          <el-option :label="$t('RegisterPage.us')" value="226"></el-option>
          <el-option :label="$t('RegisterPage.japan')" value="109"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('RegisterPage.phone_number')" prop="phone" key="phone" v-if="registeredForm.country==='44'">
        <el-input v-model="registeredForm.phone" :placeholder="$t('RegisterPage.enter_phone_number')">
          <template slot="append">
            <el-button class="phone_button" @click="sendVerificationCode" :disabled="!VCFlag" v-loading="VCLoading">
              {{VCcontent}}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterPage.email_account')" prop="email" key="email"
                    v-if="registeredForm.country === '226' || registeredForm.country==='109'">
        <el-input v-model="registeredForm.email" :placeholder="$t('RegisterPage.enter_email_account')">
          <template slot="append">
            <el-button class="email_button" @click="sendVerificationCodeEmail" :disabled="!VCFlag"
                       v-loading="VCLoading">{{VCcontent}}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('RegisterPage.verification_code')" prop="verificationCode" v-if="registeredForm.country !== ''">
        <el-input type="number" v-model="registeredForm.verificationCode" maxlength="6"
                  :placeholder="$t('RegisterPage.input_validation_code')"></el-input>
      </el-form-item>
      <el-form-item prop="password" :label="$t('RegisterPage.password')" v-if="registeredForm.country !== ''">
        <el-input
          :type="pwdType"
          v-model="registeredForm.password"
          name="password"
          :placeholder="$t('RegisterPage.enter_password')"
          oncopy="return false"
          oncontextmenu="return false"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item prop="ConfirmPassword" :label="$t('RegisterPage.confirm_password')" v-if="registeredForm.country !== ''">
        <el-input
          :type="pwdTypeCon"
          v-model="registeredForm.ConfirmPassword"
          name="ConfirmPassword"
          :placeholder="$t('RegisterPage.enter_the_password_again')"
          :disabled="registeredForm.password == ''"
          onpaste="return false"
          oncontextmenu="return false"
          @keyup.enter.native="validateRegistered"/>
        <span class="show-pwd" @click="showPwdCon">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item v-if="registeredForm.country !== ''">
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="validateRegistered">
          {{$t('RegisterPage.register')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // import { isvalidUsername } from '@/utils/validate'
  import LangSelect from '@/views/components/langSelect'
  import { sendEmail, sendMessage, checkMessageCode, accountOnly, userRegister } from '@/api/login'
  
  export default {
    components: { LangSelect },
    name: 'Registered',
    data() {
      const validateCountry = (rule, value, callback) => {
        if (!this.registeredForm.country) {
          callback(new Error(this.$t('RegisterPage.choose_country')))
        } else {
          callback()
        }
      }
      const validateUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('RegisterPage.enter_user_name')))
        } else {
          accountOnly({ account: this.registeredForm.username }).then(response => {
            if (response.data === true) {
              callback()
            } else {
              callback(new Error(this.$t('RegisterPage.user_name_has_occupied')))
            }
          }).catch(err => {
            callback(new Error(err))
          })
        }
      }
      const validatePass = (rule, value, callback) => {
        const reg = /^[0-9A-Za-z]{8,20}$/
        if (!reg.test(value)) {
          callback(new Error(this.$t('RegisterPage.enter_the_8_20_bit_password')))
        } else {
          callback()
        }
      }
      const validateConfirmPassword = (rule, value, callback) => {
        if (this.registeredForm.ConfirmPassword !== this.registeredForm.password) {
          callback(new Error(this.$t('RegisterPage.password_inconsistent')))
        } else {
          callback()
        }
      }
      const ValidatePhoneRegistered = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8]{1}[0-9]{9}$/
        if (value.length !== 11) {
          callback(new Error(this.$t('RegisterPage.enter_correct_phone_number_Must_be_11')))
        } else if (!reg.test(value)) {
          callback(new Error(this.$t('RegisterPage.enter_phone_number_begins_with_13_14_15_17_18')))
        } else {
          callback()
        }
      }
      // const ValidateMessageCode = (rule, value, callback) => {
      //   const account = this.registeredForm.country === '44' ? this.registeredForm.phone : this.registeredForm.email
      //   if (!value) {
      //     callback(new Error('请输入验证码!'))
      //   } else if (account === '') {
      //     callback(new Error('请先输入账号!'))
      //   } else {
      //     const codeType = this.registeredForm.country === '44' ? '1' : '2'
      //     const code = this.registeredForm.verificationCode
      //     checkMessageCode({ codeType, account, code }).then(response => {
      //       callback()
      //     }).catch(err => {
      //       callback(new Error(this.$i18n.messages[this.$i18n.locale].returnCode[err]))
      //     })
      //   }
      // }
      return {
        registeredForm: {
          country: '',
          username: '',
          password: '',
          ConfirmPassword: '',
          phone: '',
          email: '',
          verificationCode: ''
        },
        RegisteredRules: {
          country: [
            { required: true, trigger: 'blur', validator: validateCountry }
          ],
          username: [
            { required: true, trigger: 'blur', validator: validateUsername }
          ],
          password: [
            { required: true, message: this.$t('RegisterPage.enter_password'), trigger: 'blur' },
            { required: true, trigger: 'blur', validator: validatePass }
          ],
          ConfirmPassword: [
            { required: true, message: this.$t('RegisterPage.confirm_password'), trigger: 'blur' },
            { required: true, trigger: 'blur', validator: validateConfirmPassword }
          ],
          phone: [
            { required: true, message: this.$t('RegisterPage.enter_11_phone_number'), trigger: 'blur' },
            { pattern: /^1[3|4|5|7|8]{1}[0-9]{9}$/, message: this.$t('RegisterPage.enter_correct_cell_phone_number'), trigger: 'blur' },
            { required: true, trigger: 'blur', validator: ValidatePhoneRegistered }
          ],
          email: [
            { required: true, message: this.$t('RegisterPage.enter_email_account'), trigger: 'blur' },
            { type: 'email', required: true, message: this.$t('RegisterPage.input_correct_email_account'), trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: this.$t('RegisterPage.input_validation_code'), trigger: 'blur' },
            { min: 6, max: 6, message: this.$t('RegisterPage.enter_correct_verification_code'), trigger: 'blur' }
          ]
        },
        loading: false,
        pwdType: 'password',
        pwdTypeCon: 'password',
        redirect: undefined,
        VCLoading: false, // 验证码 loading
        VCFlag: true, // 添加验证码Flag
        VCtotalTime: 5, // 验证码时间
        VCcontent: this.$t('RegisterPage.send_the_verification_code')
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
        // const promise = new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     console.log(111)
        //     resolve('success')
        //   }, 1000)
        // })
        // const d = Date.now()
        // promise.then(function(res) {
        //   console.log(res, Date.now() - d)
        // }).catch(function(res) {
        //   console.log(res)
        // })
      },
      showPwdCon() {
        if (this.pwdTypeCon === 'password') {
          this.pwdTypeCon = ''
        } else {
          this.pwdTypeCon = 'password'
        }
      },
      validateRegistered() { // 注册校验
        this.$refs.registeredForm.validate(valid => {
          if (valid) {
            this.loading = true
            // this.$store.dispatch('Registered', this.registeredForm).then(() => {
            //   this.loading = false
            //   this.$router.push({ path: this.redirect || '/' })
            // }).catch(() => {
            //   this.loading = false
            // })
  
            const account = this.registeredForm.country === '44' ? this.registeredForm.phone : this.registeredForm.email
            const codeType = this.registeredForm.country === '44' ? '1' : '2'
            const code = this.registeredForm.verificationCode
            const pwd = this.registeredForm.password
            const countryId = this.registeredForm.country
            checkMessageCode({ codeType, account, code }).then(response => {
              this.register(countryId, account, codeType, pwd)
            }).catch(err => {
              console.log(err)
              this.loading = false
              // callback(new Error(this.$i18n.messages[this.$i18n.locale].returnCode[err]))
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      register(...val) {
        const userTelephone = val[2] === '1' ? val[1] : ''
        const userEmail = val[2] === '1' ? '' : val[1]
        userRegister({ countryId: val[0], userTelephone, userEmail, userPwd: val[3] }).then(response => {
          this.$message({
            message: this.$t('RegisterPage.login_was_successful'),
            type: 'success'
          })
          this.$router.push({ path: '/login' })
        }).catch((err) => {
          this.loading = false
          console.log(err)
        })
      },
      sendVerificationCode() { // 发送手机验证码
        if (!this.VCFlag) return false
        const pat = /^1[3|4|5|6|7|8]{1}[0-9]{9}$/
        const this_ = this
        if (pat.test(this.registeredForm.phone)) {
          this.VCFlag = false
          sendMessage({
            mobilePhoneNumber: this_.registeredForm.phone,
            codeType: '1'
          }).then(response => {
            if (response.returnCode === 200) {
              this.$message({
                message: this.$t('RegisterPage.verification_code_is_sent'),
                type: 'success'
              })
            }
            this_.VCcontent = this.VCtotalTime + 's' + this.$t('RegisterPage.re_send_after')
            const clock = window.setInterval(() => {
              this_.VCtotalTime--
              this_.VCcontent = this.VCtotalTime + 's' + this.$t('RegisterPage.re_send_after')
              if (this_.VCtotalTime <= 0) {
                window.clearInterval(clock)
                this_.VCcontent = this.$t('RegisterPage.re_send_the_verification_code')
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
          this.$message.error(this.$t('RegisterPage.enter_11_phone_number'))
        }
      },
      sendVerificationCodeEmail() { // 发送邮箱验证码
        if (!this.VCFlag) return false
        const pat = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        const this_ = this
        if (pat.test(this.registeredForm.email)) {
          this.VCFlag = false
          sendEmail({
            userEmail: this_.registeredForm.email,
            codeType: '1',
            countryId: this_.registeredForm.country
          }).then(response => {
            this.$message({
              message: this.$t('RegisterPage.verification_code_is_sent'),
              type: 'success'
            })
            this_.VCcontent = this.VCtotalTime + 's' + this.$t('RegisterPage.re_send_after')
            const clock = window.setInterval(() => {
              this_.VCtotalTime--
              this_.VCcontent = this.VCtotalTime + 's' + this.$t('RegisterPage.re_send_after')
              if (this_.VCtotalTime <= 0) {
                window.clearInterval(clock)
                this_.VCcontent = this.$t('RegisterPage.re_send_the_verification_code')
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
          this.$message.error(this.$t('RegisterPage.enter_email_account'))
        }
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .registered-container {
    position: fixed;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    background-color: $bg;
    .registered-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 0px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .phone_button:hover, .email_button:hover {
      color: #2D3A4B;
    }
  }
</style>
<style>
  
  .registered-form .el-form-item__label {
    color: #eee;
  }
  
  .row-bg {
    padding: 4px 0;
  }
</style>
