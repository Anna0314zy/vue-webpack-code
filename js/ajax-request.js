import axios from 'axios'; // 基于promise
// import router from '@/router';
// axios可以配配置拦截器 我可以给实例增加多个拦截器
// axios 实例的唯一性 ，我可以给，每个请求 独立增加拦截器

// 开发的时候 localhost  /xxx
class AjaxRequest {
  constructor() {
    // development production
    this.baseURL = 'http://localhost:3000'; // 基础路径
    this.timeout = 3000; // 超时时间
    this.queue = {}; // 请求队列
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    return instance(config); // 返回的是一个promise
  }
}

export default new AjaxRequest();
// new AjaxRequest().request({
//   url: 'xxxx',
//   xxasd
// }).then(data => {

// })
