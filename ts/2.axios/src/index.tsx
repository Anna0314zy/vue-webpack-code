import axios, { AxiosResponse, AxiosRequestConfig } from './axios'
const baseUrl = 'http://localhost:8080';
//指的是服务器返回的对象
interface User {
    name: string,
    password: string
}
let user: User = {
    name: 'zhufeng',
    password: '123456'
}
const CancelToken = axios.CancelToken;
const isCancel=axios.isCancel;
const source = CancelToken.source();
console.time('cost');
/**
 * interceptors = {
 *    onFulfiled: (val:any) => any,
 *    onRejected: (error) => error
 * }
 * axios.interceptors = {
 *  request: [interceptors1, interceptors2],
 *  reponse: [interceptors1, interceptors2]
 * 
 * }
 */
//启用拦截器 先加的后执行
//拦截器 上一个输出 是下一个输入
//异步3秒后  拦截器会等待promise完成才继续 执行顺序是321
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {

    config.headers && (config.headers.name += "1");
    console.timeEnd('cost');
    return config;
}, error=> {
    Promise.reject(error);
})
let request = axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers && (config.headers.name += "2");
    return config;
})
axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    // config.headers.name += '3';
    // return config;
    return new Promise(function(reslove) {
        setTimeout(() => {
         config.headers && (config.headers.name += "3");
         reslove(config);
        },0)
     });
    //若直接失败 则结束一切
    // return Promise.reject('请求失败')
})
axios.interceptors.request.eject(request); //
let response = axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '1';
    return response;
})
 axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '2';
    return response;
})
axios.interceptors.response.use((response: AxiosResponse) => {
    response.data.name += '3';
    return response;
})
axios.interceptors.response.eject(response);
console.log(user, 'user');
//User 就是request
axios({
    method: 'post',
    url: baseUrl + '/post',
    // url: baseUrl + '/post_status?code=400',
    headers: {
        // 'content-type': 'application/json'
    },
    CancelToken: source.token,
    timeout: 0,
    data: user //查询参数对象 转成字符串放在？后面
}).then((response: AxiosResponse<User>) => {
    console.log(response, 'response');
    return response.data;
}).catch((error: any) => {
    console.log(error);
    if (isCancel(error)) {
        console.log('取消请求', error)
    }
})
 //1.网络链接错误 2.超时
 source.cancel('用户取消了请求');