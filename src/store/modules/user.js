import { login, getInfo } from '@/api/login'
import { getToken, setToken, setLang, getLang, removeToken } from '@/utils/auth'
// import Cookies from 'js-cookie'

const user = {
  state: {
    userinfo: '',
    token: getToken(),
    name: '',
    avatar: '',
    type: '',
    // roles: [],
    uuid: '',
    language: getLang() || 'zh_CN'
  },

  mutations: {
    SET_INFO: (state, info) => {
      state.userinfo = info
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    // SET_ROLES: (state, roles) => {
    //   state.roles = roles
    // },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setLang(language)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token) // 登录时获取token存到cookie
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.userType !== undefined || data.userType !== '') { // 验证返回的roles是否是一个非空数组
            commit('SET_INFO', data)
            commit('SET_TYPE', data.userType)
            commit('SET_UUID', data.userId)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.headPicUrl)
            commit('SET_LANGUAGE', data.language)
            resolve(response)
          } else {
            reject('getInfo: 获取用户信息失败 !')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetLang({ commit }) {
      return new Promise((resolve, reject) => {
        resolve('en_US')
      })
    },
    // 存入用户type类型
    SetType({ commit }, type) {
      commit('SET_TYPE', type)
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_TYPE', '')
        commit('SET_UUID', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        resolve()
      })
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default user
