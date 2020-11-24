import Loading from '../../src/components/loading.vue';

export function getLocalStorage(key = '') {
    let storage = window.localStorage,
        // _uid = 'net.dongyin.admins';
        _uid =
            key ||
            window.location.host
                .split('.')
                .reverse()
                .join('.');

    if (!storage) {
        console.error('This browser does NOT support localStorage!');
        return;
    }

    if (!storage[_uid]) {
        var obj = {};
        storage[_uid] = JSON.stringify(obj);
    }

    return {
        set: function(key, value) {
            // 设置某个已保存的键值
            var obj = JSON.parse(storage.getItem(_uid));
            obj[key] = value;
            storage[_uid] = JSON.stringify(obj);
        },
        get: function(key) {
            // 获取某个已保存的键值
            if (!this.has()) return;
            var obj = JSON.parse(storage.getItem(_uid));
            return obj[key];
        },
        has: function() {
            var v = storage.getItem(_uid);
            var obj = JSON.parse(v);
            if (typeof obj !== 'object' || obj == null) {
                return false;
            }
            return true;
        },
        remove: function(key) {
            storage.removeItem(key);
        },
        clear: function() {
            storage.clear();
        }
    };
}
// 实现loading效果


// import ErrorComponent from '../components/error.vue';
console.log(Loading, 'Loading');

console.log(Loading, 'Loading');
export function loadable (asyncFunction) {
    console.log('异步加载的组件', Loading);
    const AsyncComponent = () => ({
        component: asyncFunction(),
        loading: Loading,
        // delay: 200,
        // error: ErrorComponent,
        // timeout: 3000,
    });

    // 最终要返回一个组件，组件需要有render，通过render 在去渲染一个异步组件
    return { // cli 默认不支持模板
        render(h) {
            return h(AsyncComponent);
        },
    };

    // 组件是一个对象 会变成render函数
}
// export default loadable;
// const AsyncComponent = () => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import('./MyComponent.vue'),
//   // 异步组件加载时使用的组件
//   loading: LoadingComponent,
//   // 加载失败时使用的组件
//   error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })
