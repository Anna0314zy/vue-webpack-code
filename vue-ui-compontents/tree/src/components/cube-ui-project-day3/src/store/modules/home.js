import { fetchCategory, fetchSlides } from '@/api/home';
import * as types from '../action-type';

export default {
  namespaced: true,
  state: {
    categories: [],
    currentLesson: -1,
    slides: [],
  },
  actions: {
    async [types.SET_CATEGORIES]({ commit }) {
      const categories = await fetchCategory();
      console.log(categories, 'categories');
      commit(types.SET_CATEGORIES, categories);
    },
    async [types.SET_SLIDES]({ commit }) {
      const slides = await fetchSlides();
      commit(types.SET_SLIDES, slides);
    },
  },
  mutations: {
    // 设置分类的
    [types.SET_CATEGORIES](state, payload) {
      state.categories = payload;
    },
    [types.SET_SLIDES](state, payload) {
      state.slides = payload;
    },
    [types.SET_CURRENT_LESSON](state, payload) {
      state.currentLesson = payload;
    },
  },
};
