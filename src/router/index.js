import Vue from 'vue'
import Router from 'vue-router'
import i18n from '../lang' // Internationalization

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
// import { getBankcard } from '@/api/general'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
// console.log(i18n.messages[i18n.locale].registered.basicInformation);
const lang = i18n.messages[i18n.locale] // 国际化配置
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/registered', name: 'Registered', component: () => import('@/views/login/registered'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/domestic', name: 'Domestic', component: () => import('@/views/registered/domestic'), hidden: true },
  { path: '/foreign_domestic', name: 'Foreign_domestic', component: () => import('@/views/registered/foreign_domestic'), hidden: true },
  { path: '/foreign_enterprise', name: 'Foreign_enterprise', component: () => import('@/views/registered/foreign_enterprise'), hidden: true },
  { path: '/enterprise', name: 'Enterprise', component: () => import('@/views/registered/enterprise'), hidden: true },
  { path: '/developer_type', name: 'DeveloperType', component: () => import('@/views/developer_type'), hidden: true },
  // { path: '/upload_game_pack_2', name: 'Upload_game_pack_2', component: () => import('@/views/upload_game_pack_2'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'setting',
    children: [{
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/setting/index'),
      meta: { title: `${lang.BasicInformation}`, icon: 'setting' }
    }]
  },
  {
    path: '/financial',
    component: Layout,
    children: [
      {
        path: 'financial',
        name: 'financial',
        component: () => import('@/views/financial/index'),
        meta: { title: '财务信息', icon: 'finance' }
      }
    ]
  },
  {
    path: '/game_management',
    component: Layout,
    redirect: '/game_management/index',
    name: 'GameManagement',
    meta: { title: '游戏管理', icon: 'game' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/game_management/index'),
        meta: { title: '游戏管理', icon: 'setting' }
      }, {
        path: 'game_management',
        component: () => import('@/views/game_management/index'),
        meta: { title: '游戏管理', icon: 'setting' }, hidden: true
      }, {
        path: 'create_new_game',
        name: 'CreateNewGame',
        component: () => import('@/views/game_management/create_new_game'),
        meta: { title: '创建新游戏', icon: 'password' }, hidden: true
      }, {
        path: 'modify_game',
        name: 'ModifyGame',
        component: () => import('@/views/game_management/modify_game'),
        meta: { title: '修改游戏版本', icon: 'password' }, hidden: true
      },
      {
        path: 'game_information',
        name: 'GameInformation',
        component: () => import('@/views/game_management/game_information'),
        meta: { title: '填写游戏信息', icon: 'password' }, hidden: true
      }, {
        path: 'test_account',
        name: 'TestAccount',
        component: () => import('@/views/game_management/test_account'),
        meta: { title: '测试账号', icon: 'password' }, hidden: true
      },
      {
        path: 'game_upload_success',
        name: 'GameUploadSuccess',
        component: () => import('@/views/game_management/game_upload_success'),
        meta: { title: '上传成功', icon: 'password' }, hidden: true
      }]
  },
  // ,
  // {
  //   path: '/upload_game_pack_2',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'upload_game_pack_2',
  //       name: 'Upload_game_pack_2',
  //       component: () => import('@/views/upload_game_pack_2/index'),
  //       meta: { title: '阿萨德', icon: 'finance' }
  //     }
  //   ]
  // }
  { path: '*', redirect: '/404', hidden: true }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

