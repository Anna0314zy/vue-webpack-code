import Vue from 'vue'
import Vuex from '../vuex'
//插件的install方法
Vue.use(Vuex)
const persits = (store) => {
  store.subscribe((mutation, state) => {
    console.log(mutation, state);
    localStorage.setItem('vuex-state', JSON.stringify(state));
  })
}
export default new Vuex.Store({
  plugins: [persits],
  modules: { //模块管理
    a: {
      state: { a: 1 },
      modules: {
        c: {
          state: { c: 1 },
          getters: {
            // myAge(state){
            //   return state+18;
            // }
            computedC(state) {
              return state.c + 100;
            }
          },
          mutations: {
            syncAdd(state, payload) {
              console.log('add-a');
              // state.age+=payload;
            },
            syncMinus(state, payload) {
              state.age -= payload;
            }
          },
          modules: {
            n: {
              state: { c: 9 }
            }
          }
        }
      }
    },
    b: {
      state: { b: 1 }
    }
  },
  state: {
    age: 17
  },
  getters: {
    //计算属性
    myAge(state) {
      return state.age + 18;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    //异步获取完后 提交到mutatio中
    asyncMinus({ commit }, payload) { //異步獲取完后 提交mutions中
      setTimeout(() => {
        commit('syncMinus', payload);
      }, 1000)
    }
  }
})
