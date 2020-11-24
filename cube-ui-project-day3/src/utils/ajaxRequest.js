import axios from 'axios'; // 基于promise
import {
  Toast,
} from 'cube-ui';
import store from '@/store';
import * as types from '@/store/action-type.js';
// import router from '@/router';
// axios可以配配置拦截器 我可以给实例增加多个拦截器
// axios 实例的唯一性 ，我可以给，每个请求 独立增加拦截器

// 开发的时候 localhost  /xxx
class AjaxRequest {
  constructor() {
    // development production
    this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api'
      : '/'; // 基础路径
    this.timeout = 3000; // 超时时间
    // message组件
    this.queue = {}; // 请求队列
  }

  setInterceptor(instance, url) {
    instance.interceptors.request.use((config) => { // 请求拦截
      // console.log('请求前');
      const Cancel = axios.CancelToken;
      // 每次请求前 将token 放到请求中
      config.headers.token = localStorage.getItem('token') || '';
      config.cancelToken = new Cancel(((c) => {
        // console.log(c);
        store.commit(types.PUSH_TOKEN, c); //订阅
      }));
      // 请求前  增加请求队列
      if (Object.keys(this.queue).length === 0) {
        this.toast = Toast.$create({
          txt: '正在加载',
          time: 0,
        });
        this.toast.show();
      }
      this.queue[url] = url;
      return config;
    }, err => Promise.reject(err));
    instance.interceptors.response.use((res) => { // 响应拦截
      delete this.queue[url];
      // 请求完成删除对应的url 当队列被情况隐藏掉
      if (Object.keys(this.queue).length === 0) {
        this.toast.hide();
      }
      // res.data.code = 401;
      if (res.data.code === 0) {
        return res.data.data;
      }
      return Promise.reject(res.data);
    }, (err) => {
      delete this.queue[url];
      // 请求完成删除对应的url 当队列被情况隐藏掉
      if (Object.keys(this.queue).length === 0) {
        this.toast.hide();
      }
      Promise.reject(err);
    });
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    // 给这个实例增加拦截器
    this.setInterceptor(instance, options.url); // 给这个实例增加拦截功能
    return instance(config); // 返回的是一个promise
  }
}

export default new AjaxRequest();
// new AjaxRequest().request({
//   url: 'xxxx',
//   xxasd
// }).then(data => {

// })
