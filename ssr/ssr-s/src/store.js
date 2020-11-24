import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default () => {
    const store = new Vuex.Store({
        state: {
            name: 'msg'
        },
        mutations: {
            changename(state) {
                state.name ='zpkf';
            }
        },
        actions: {
            changename({ commit }) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('changename');
                        resolve();
                    }, 1000)
                })
            }
        }
    })
    //如果浏览器执行的时候 我需要将服务器设置的最新状态替换掉客户端的
    if (typeof window !== 'undefined' && window.__INITIAL_STATE_) {
        store.replaceState(window.__INITIAL_STATE_)
    }
    return store;
}
