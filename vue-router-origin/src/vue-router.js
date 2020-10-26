class Router {

}
let Vue;
Router.install = (_vue) => {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        this._router = this.$options.router;
      }else {
        this._router = this.$parent && this.$parent._router;
      }
    }
  })

}
export default Router;