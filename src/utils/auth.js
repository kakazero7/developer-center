import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TypeKey = 'Admin-Type'
const UUIDKey = 'Admin-UUID'
const LangKey = 'Admin-lang'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getType() {
  return Cookies.get(TypeKey)
}

export function setType(type) {
  return Cookies.set(TypeKey, type)
}

export function getLang() {
  return Cookies.get(LangKey)
}

export function setLang(lang) {
  return Cookies.set(LangKey, lang)
}

export function setuuid(id) {
  return sessionStorage.setItem(UUIDKey, id)
}

export function getuuid() {
  return sessionStorage.getItem(UUIDKey)
}
