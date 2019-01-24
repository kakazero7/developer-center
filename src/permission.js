/*
路由守卫 通过beforeEach在路由跳转前拦截
*/
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
const whiteList = ['/404', '/login', '/Registered', '/registered'] // 白名单
const registeredPage = ['/login', '/Registered', '/registered'] // 登录注册名单
const registered = ['/', '/setting', '/financial/financial', '/financial/foreign_financial', '/game_management/index', '/game_management/game_management', '/game_management/create_new_game', '/game_management/modify_game', '/game_management/game_information', '/game_management/test_account'] // 已注册白名单
const unregistered = ['/developer_type', '/domestic', '/enterprise', '/foreign', '/foreign_domestic', '/foreign_enterprise'] // 未注册白名单
const userTypeArr = [1, 2, 3, 4]
// console.log(router.options.routes[8]['hidden'] = true)
// router.options.routes[8].children[0].meta.title = 'hehe'
// for (const item in router.options.routes) {
//   console.log(router.options.routes[item]);
//   if (router.options.routes[item].path === '/upload_game_pack_2') {
//     router.options.routes[item]['hidden'] = true
//   }
// }

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (registeredPage.indexOf(to.path) !== -1) { // 拦截重复登录
      next({ path: '/' })
      NProgress.done()
    } else {
      const _type = parseInt(store.state.user.type)
      if (_type === 0) {
        if (unregistered.indexOf(to.path) !== -1) {
          next()
        } else {
          next({ path: '/developer_type' })
        }
        NProgress.done()
      } else if (userTypeArr.indexOf(_type) !== -1) {
        if (registered.indexOf(to.path) !== -1) {
          next()
        } else {
          next({ path: '/' })
        }
        NProgress.done()
      } else {
        store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
          if (res.data.userType === 0) next({ path: '/developer_type' })
          if (userTypeArr.indexOf(res.data.userType) !== -1) { // 防止登录用户为已注册 但记忆路径为注册页面的问题
            if (unregistered.indexOf(to.path) !== -1) {
              next({ path: '/' })
            } else {
              next()
            }
          }
          NProgress.done()
        }).catch((err) => {
          console.log(err)
          Message.error(err || '请重试')
          next({ path: '/404' })
          NProgress.done()
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
