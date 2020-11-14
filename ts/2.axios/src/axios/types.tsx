//接口定义函数
// export interface PlainObject {
//     [name: string]: any
// }
import AxiosInterceptorManager from './AxiosInterceptorManager'
export type Methods = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'options' | 'OPTIONS'
export interface AxiosRequestConfig {
    url?: string,
    method?: Methods,
    timeout?: number,
    headers?: Record<string, any>,
    data?:Record<string, any>,
    params?: any,//代表一个对象 键值是字符串 值任意
    transformRequest?: (data: any, headers: any) => any;
    transformResponse?: (data: any) => any;
    CancelToken?:any,
    isCancel?:any
}

//修饰Axios.prototype.request 这个方法
//promise 的泛型T 代表promise变成成功态之后reslove的值
export interface AxiosInstance {
    //T
    <T = any>(config:AxiosRequestConfig): Promise<AxiosResponse<T>>//此处的T
    interceptors : {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    },
    CancelToken:any
    isCancel:any
}

//泛型T代表响应体的类型
export interface AxiosResponse<T = any>  {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, any>
    config: AxiosRequestConfig;
    request?: XMLHttpRequest; //？代表可选
  }