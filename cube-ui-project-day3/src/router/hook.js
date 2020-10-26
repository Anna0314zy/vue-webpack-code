// 根路由相关的hook 钩子 全局钩子
import store from '@/store';
import * as types from '@/store/action-type';
import auth from './auth';

export default {
  // 标识 当前的hook的作用
  cancelToken: (to, from, next) => {
    // 清除token
    store.commit(types.CLEAR_TOKEN); // 清除所有的请求
    next(); // 继续王下走
  },
  permisson: async (to, from, next) => {
    // 如果用户没有登陆 访问了课程页 就要访问登录页
    // 在页面切换的时候 拿到当前状态 是否登录
    // 我们1要知道用户是否登录 2） 要知道哪个页面是需要登录的
    const needLogin = to.matched.some(item => item.meta.needLogin);
    // 可以做一个白名单
    //  let pages = ['/', 'xxx']
    // 判断    next();

    console.log(to, '', needLogin, needLogin, store.state.hasPermisson, 'hasPermisso');
    // hasPermisson 是否拉取过权限
    // const token = localStorage.getItem('token');
    // 如果用户 把本地的token 删除了怎么办呢
    // console.log(store.state.hasPermisson && token, 'token---');
    if (!store.state.hasPermisson) {
      const flag = await store.dispatch(types.VALIDATE);
      console.log(flag, 'flag', needLogin, 'needLogin');
      if (needLogin) { // 如果需要登录 并且没登录就跳转到登录页面
        if (!flag) {
          next('/login');// 需要登录但是没登录
        } else {
          next(); // 需要登录已经登录
        }
      } else {
        // 不需要登录
        if (to.name === 'login') {
          if (!flag) {
            next(); // 没登录 直接登录
          } else {
            next('/profile'); // 登录过了 去登录中心
          }
        }
        next(); // 不需要登录
      }
    } else {
      // 有权限
      // 还是访问登录页的话
      if (to.name === 'login') {
        next('/');
      }
      next();
    }
  },
  profileAuth(to, from, next) {
    // 根据当前用户权限 动态加载路由
    if (store.state.hasPermisson && store.state.user && store.state.user.menuList) {
      if (!store.state.menuPermisson) {
        const list = store.state.user.menuList.map(item => item.auth);

        const newRoutes = auth.filter(item => list.includes(item.name));
        this.addRoutes(newRoutes); // 把需要的路由新增进,是在下一轮才会生效
        store.commit(types.SET_MENU_LIST);
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
    next();
  },
};
