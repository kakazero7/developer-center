const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userinfo: state => state.user.userinfo,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  type: state => state.user.type,
  language: state => state.user.language,
  gameVersionId: state => state.user.gameVersionId
}
export default getters
