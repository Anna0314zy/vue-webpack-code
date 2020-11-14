// 专门管理 .zfclirc 文件的（当前用户目录下）
// zf-cli config set key value
import {
  get, set, getAll, remove,
} from './utils/rc';

const config = async (action, k, v) => {
  // console.log(action, k ,v, 'config文件夹');
  switch (action) {
    case 'get':

      if (k) {
        const key = await get(k);
        console.log(key);
      } else {
        const obj = await getAll();

        Object.keys(obj).forEach((key) => {
          console.log(`${key}----${obj[key]}`);
        });
      }
      break;
    case 'set':
      set(k, v);
      break;
    case 'remove':
      remove(k);
      break;
  }
};
export default config;
