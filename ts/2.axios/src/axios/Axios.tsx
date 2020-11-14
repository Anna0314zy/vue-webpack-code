
import { AxiosRequestConfig, AxiosResponse } from './types'
import AxiosInterceptorManager, { Interceptor } from './AxiosInterceptorManager'
import qs from 'qs'
import parseHeader from 'parse-headers'; //写一个申明文件
let defaults: AxiosRequestConfig = {
    method: 'get',
    timeout: 0,
    headers: {
        common: { //针对所有方法的请求生效
            accept: 'application/json', //告诉服务器返回json格式的数据
        }
    },
    transformRequest: (data: any, headers: any) => {
        headers['common']['content-type'] = 'application/json';
        console.log(data, 'data-transformRequest');
        return JSON.stringify(data);
    },
    transformResponse: (response: any) => {
        return response.data;
    }
    
}
let getStyleMethods = ['get', 'head', 'delete', 'options'];//get风格的请求
getStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {};
});
let postStyleMethods = ['put', 'post', 'patch'];//post风格的请求
postStyleMethods.forEach((method: string) => {
    defaults.headers![method] = {
        'content-type': 'application/json'//请求体的格式
    };
});
let allMethods = [...getStyleMethods, ...postStyleMethods];
export default class Axios<T> {
    public defaults: AxiosRequestConfig = defaults;
    
    public interceptors = {
        request: new AxiosInterceptorManager<AxiosRequestConfig>(),
        response: new AxiosInterceptorManager<AxiosResponse<T>>()
    }
    //T 用来限制响应对象response data 的类型
    request<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        // return this.dispatchRequest<T>(config);
        //构建流水线 拦截请求 拦截响应
        //链条
        if (config.transformRequest && config.data) {
            config.data = config.transformRequest(config.data, config.headers);
        }
        config.headers = Object.assign(this.defaults.headers, config.headers);
        const chain: Array<Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>> = [
            {
                onFulfilled: this.dispatchRequest

            }
        ]
        //[request3, request2, request1, request]
        this.interceptors.request.interceptors.forEach((interceptor: Interceptor<AxiosRequestConfig> | null) => {
            //向数组的左侧添加一个元素
            interceptor && chain.unshift(interceptor);
        })
        this.interceptors.response.interceptors.forEach((interceptor: any) => {
            //向数组的左侧添加一个元素
            interceptor && chain.push(interceptor);
        })
        let promise: any = Promise.resolve(config);
        while(chain.length) { //如果长度大于0
            const {onFulfilled, onRejected} = chain.shift()!;//从头部删除元素 并且返回这个元素
            promise = promise.then(onFulfilled, onRejected)
        } 
        return promise;
    }

    //派发请求的方法
    dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosRequestConfig | AxiosResponse<T>> {
        return new Promise<AxiosResponse<T>>(function (reslove, reject) {
            let { method, url, params, headers, data, timeout } = config;
            let request = new XMLHttpRequest();
            if (params && typeof params === 'object') {
                //?name="zhufeng"&password=""
                params = qs.stringify(params);
                url += ((url!.indexOf('?') == -1 ? '?' : '&') + params);

            }
    
            request.open(method!, url!, true);
            request.responseType = 'json';
            request.onreadystatechange = function () { //指定状态变更函数
                // 0 1 2 3 4
                if (request.readyState === 4 && request.status != 0) {
                    console.log(request, 'request-----');
                    if (request.status >= 200 && request.status < 300) {
                        let response: AxiosResponse<T> = {
                            data: request.response ? request.response : request.responseText,
                            status: request.status,
                            statusText: request.statusText,
                            //{content-type:xxx;content-length:42}
                            headers: parseHeader(request.getAllResponseHeaders()),
                            config,
                            request
                        }
                        if (config.transformResponse) {
                            response = config.transformResponse(response);
                        }
                        reslove(response)
                    } else {
                        reject(`Error： Request failed with status code ${request.status}`);
                    }
                }
            }
            if (headers) {
                for (let key in headers) {
                    //common表示所有的请求方法都生效  或者说key是一个方法名
                    /**
                     * {
                     * headers:{
                     *   common:{accept: 'application/json'},
                     *   post:{'content-type':'application/json'}
                     * }
                     * }
                     */
                    if (key === 'common' || allMethods.includes(key)) {
                        if (key === 'common' || key === config.method) {
                            for (let key2 in headers[key])
                                request.setRequestHeader(key2, headers[key][key2]);
                        }
                    } else {
                        request.setRequestHeader(key, headers[key]);
                    }
                }
            }
            let body: string | null = null;
            if (data) {
                body = JSON.stringify(data);
                console.log(body, 'body');
            }
            if (timeout) {
                request.timeout = timeout;
                console.log(timeout, 'timeout');
                request.ontimeout = function () {
                    console.log('失败')
                    reject(`Error: timeout of ${timeout}ms exceeded`);
                }
            }
            //网络连接失败
            request.onerror = function () {
                reject('net::ERR_INTERNET_DISCONNECTED')
            }
            if (config.CancelToken) {
                //config.cancelToken = source.token: new Promise(() => )
               config.CancelToken.then((message:string) => {
                   request.abort();
                   reject(message); //此处的message
               })
            }
            request.send(body);
        })
    }
}