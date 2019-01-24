import request from '@/utils/request'
// import { get } from 'https'

export function getVerificationCode(phoneNumber) {
  return request({
    url: 'https://www.easy-mock.com/mock/5b863b1653caec39da89b95b/developer-center/getUserType',
    method: 'POST',
    data: {
      phoneNumber
    }
  })
}

export function uploadIDcardImg(img) { // 增加身份证图片 需要加/{uuid}
  return request({
    url: '/web/upload/img/idcard',
    method: 'POST',
    data: {
      img
    }
  })
}

export function addOrUpdateBankcard(data) { // 增加或修改财务信息
  return request({
    url: '/web/bankcard/addOrUpdate',
    method: 'POST',
    data: data
  })
}

export function getBankcard(params) { // 获取财务信息 国内外通过参数判断
  return request({
    url: '/web/bankcard/' + params,
    method: 'GET'
  })
}

export function addOrUpdateBankcardForeign(data) { // 增加或修改财务信息-国外
  return request({
    url: '/web/bankcard/foreign/addOrUpdate',
    method: 'POST',
    data: data
  })
}

export function getDeveloperInfo(params) { // 查询开发者注册信息 1 中国个人 2 中国企业 3 国外个人 4 国外企业
  return request({
    url: '/web/developer/' + params,
    method: 'GET'
  })
}

export function getProvince(params) { // 获取省
  return request({
    url: '/address/provinces.json',
    method: 'GET'
  })
}

export function getCities(params) { // 获取市
  return request({
    url: '/address/cities.json',
    method: 'GET'
  })
}

export function getAreas(params) { // 获取区
  return request({
    url: '/address/areas.json',
    method: 'GET'
  })
}

export function chinaPersonalRegister(data) { // 国内个人开发者注册
  return request({
    url: '/web/developer/china/personal/register',
    method: 'POST',
    data: data
  })
}

export function chinaEnterpriseRegister(data) { // 国内企业开发者注册
  return request({
    url: '/web/developer/china/company/register',
    method: 'POST',
    data: data
  })
}

export function foreignPersonalRegister(data) { // 国外个人开发者注册
  return request({
    url: '/web/developer/foreign/personal/register',
    method: 'POST',
    data: data
  })
}

export function foreignCompanyRegister(data) { // 国外企业开发者注册
  return request({
    url: '/web/developer/foreign/company/register',
    method: 'POST',
    data: data
  })
}

export function addGameNames(data) { // 增加游戏名称
  return request({
    url: '/web/game/add/info',
    method: 'POST',
    data: data
  })
}

export function addGameInformation(data) { // 更新游戏信息、图片
  return request({
    url: '/web/game/update/version',
    method: 'POST',
    data: data
  })
}

export function addDomesticSetting(data) { // 国内个人开发者修改
  return request({
    url: '/web/developer/update/1/88571bebe270477283fcd20afc8d8129/5b98b0ec28829661ef3941a8',
    method: 'put',
    data: data
  })
}

export function addEnterpriseSetting(data) { // 国内企业开发者修改
  return request({
    url: '/web/developer/update/2/88571bebe270477283fcd20afc8d8129/5b973a9e28829661ef394197',
    method: 'put',
    data: data
  })
}

export function addForeignDomesticSetting(data) { // 国外个人开发者修改
  return request({
    url: '/web/developer/update/3/88571bebe270477283fcd20afc8d8129/5b99fcdc28829661ef3941ab',
    method: 'put',
    data: data
  })
}

export function addForeignEnterpriseSetting(data) { // 国外企业开发者修改
  return request({
    url: '/web/developer/update/4/88571bebe270477283fcd20afc8d8124/5b9a0ca828829661ef3941ad',
    method: 'put',
    data: data
  })
}

export function addGameVersion(data) { // 增加游戏包
  return request({
    url: '/web/game/add/version',
    method: 'POST',
    data: data
  })
}

export function getGameList(params) { // 查询游戏列表
  return request({
    url: '/web/game/' + params,
    method: 'GET',
    data: params
  })
}
export function addAccount(data) { // 添加测试账号
  return request({
    url: '/web/game/add/account/',
    method: 'POST',
    data: data
  })
}
export function getAccount(params) { // 添加测试账号
  return request({
    url: '/web/game/get/account/' + params,
    method: 'GET'
  })
}
export function deleteAccount(data) { // 删除测试账号
  return request({
    url: '/web/game/delete/account/' + data,
    method: 'DELETE'
  })
}
