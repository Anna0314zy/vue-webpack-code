import Vue from 'vue';
import Vuex from 'vuex';
import { Toast } from 'cube-ui';
import home from './modules/home.js';
import * as types from './action-type';
import { login, validate } from '@/api/user.js';
import { ButtonGroup } from 'element-ui';

Vue.use(Vuex);
console.log(types.PUSH_TOKEN, [types.PUSH_TOKEN], 'types.PUSH_TOKEN');
export default new Vuex.Store({
  modules: {
    home,
  },
  state: {
    user: {}, // user.meauList
    hasPermisson: false, // 校验通过
    menuPermisson: false, // 菜单是否要求权限
    ajaxToken: [], // 准备一个容器放所有请求
  },
  mutations: {
    [types.PUSH_TOKEN](state, cancel) {
      state.ajaxToken = [...state.ajaxToken, cancel];
    },
    [types.CLEAR_TOKEN](state) {
      state.ajaxToken.forEach(cancel => cancel());
      state.ajaxToken = [];
    },
    [types.SET_USER](state, payload) {
      state.user = payload;
      state.hasPermisson = true;
    },
    [types.SET_MENU_LIST](state) {
      state.menuPermisson = true;
    },
  },
  actions: {
    async [types.LOGIN]({ commit }, user) {
      try {
        console.log('登录成功');
        const result = await login(user);
        // 做一个映射表
        // menuList 变换成树结构
      
        const routeMap = result.menuList.reduce((memo, current) => {
          memo[current.id] = current;
          return memo;
        }, {});
        console.log(routeMap);
        const menuList = result.menuList.reduce((prev, current) => {
          const { pid } = current;
          const parent = routeMap[pid];
          if (parent) {
            parent.children = prev.children ? prev.children.push(current) : [current];
          } else if (current.pid === -1) {
            prev.push(current);
          }
          return prev;
        }, []);
        commit(types.SET_USER, result);
        localStorage.setItem(('token'), result.token);
      } catch (e) {
        console.error('登录失败');
        Toast.$create({
          txt: '用户无法登陆',
          time: 2000,
        }).show();
        return Promise.reject(e);
      }
    },
    // 直接在地址栏输入网址的时候需要检验
    async [types.VALIDATE]({ commit }) {
      try {
        const user = await validate();
        commit(types.SET_USER, user);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
});
