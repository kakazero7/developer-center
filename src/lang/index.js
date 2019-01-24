import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import Cookies from 'js-cookie'
import { getLang } from '@/utils/auth'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en_US'
import zhLocale from './zh_CN'
import jpLocale from './ja_JP'

Vue.use(VueI18n)

const messages = {
  zh_CN: {
    ...zhLocale,
    ...elementZhLocale
  },
  en_US: {
    ...enLocale,
    ...elementEnLocale
  },
  ja_JP: {
    ...jpLocale
  }
}
console.log(getLang())
const _lang = getLang() !== 'null' && getLang() !== undefined ? getLang() : 'zh_CN'
const i18n = new VueI18n({
  // options: zh_CN or en_US
  locale: _lang,
  messages
})

export default i18n
