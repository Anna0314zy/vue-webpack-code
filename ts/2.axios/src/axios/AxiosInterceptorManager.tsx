// export interface AxiosInterceptorManager<V> {
//     use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
//     eject(id: number): void;
//   }
// import { AxiosRequestConfig, AxiosResponse } from './types'
interface OnFulfilled<V> {
    (value: V): V | Promise<V>,
}
interface OnRejected {
    (error: any): any; //interface用：号
}
export interface Interceptor<V> { //某一个拦截器
    onFulfilled?: OnFulfilled<V>,
    onRejected?: OnRejected;
}
// class 
export default class InterceptorManager<V> {
    //每当调用use的时候 可以向拦截管理器中添加一个拦截器
    // request: AxiosInterceptorManager<AxiosRequestConfig>;
    // response: AxiosInterceptorManager<AxiosResponse>;
    public interceptors: Array<Interceptor<V> | null> = [];
    use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
        this.interceptors.push({
            onFulfilled,
            onRejected
        });
        return this.interceptors.length - 1;
    }
    eject(id: number): void {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}
//请求拦截器 先添加后执行 响应拦截器先添加先执行