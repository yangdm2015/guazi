const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  permissions: state => state.user.permissions,
  permissiveTaskTypes: state => state.user.permissiveTaskTypes,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  email: state => state.user.email,
  auth_type: state => state.user.auth_type,
  status: state => state.user.status
}
export default getters
