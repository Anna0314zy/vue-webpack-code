
import Axios from './Axios'
import { AxiosInstance } from './types'
import { CancelToken, isCancel } from './cancel'
function createInstance(): AxiosInstance {
    const context: Axios<any> = new Axios();
    //request this 
    let instance = Axios.prototype.request.bind(context);
    //把axios 类的实例 和类的原型上的方法都拷贝到instance上 即request
    instance = Object.assign(instance, Axios.prototype, context);
    return instance as AxiosInstance;
}
let axios = createInstance();
axios.CancelToken = new CancelToken();
axios.isCancel = isCancel;
export default axios;
export * from './types';