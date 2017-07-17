const permission = {
  state: {
    permissionRoutes: []
  },
  init(data) {
    const {roles, router} = data
    // console.log('router = ', router)
    this.state.permissionRoutes = router
    if (roles) {
      // console.log(roles)
    }
    // const permissionRoutes = router.filter(v => {
    //   if (roles.indexOf('admin') >= 0 || roles.indexOf('all') >= 0) return true;
    //   if (this.hasPermission(roles, v)) {
    //     if (v.children && v.children.length > 0) {
    //       v.children = v.children.filter(child => {
    //         if (this.hasPermission(roles, child)) {
    //           return child
    //         }
    //         return false;
    //       });
    //       return v
    //     } else {
    //       return v
    //     }
    //   }
    //   return false;
    // });
    // this.state.permissionRoutes = permissionRoutes;
  },
  get() {
    // console.log('this.state.permissionRoutes = ', this.state.permissionRoutes)
    return this.state.permissionRoutes
  },
  hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
      return roles.some(role => this.implies(role, route.meta.role[0]))
    } else {
      return true
    }
  },
  implies(permission, permissionString) {
    const modulePermissionPattern = /^([\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]+):\*/
    if (permission === permissionString) {
      return true
    } else if (modulePermissionPattern.test(permission)) {
      // user granted permissions is recognized
      let moduleName = permission.split(':')[0]
      let pattern = new RegExp(`^${moduleName}:`)
      return pattern.test(permissionString)
    }
  }
}

export default permission
