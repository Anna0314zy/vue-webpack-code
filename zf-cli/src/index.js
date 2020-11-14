// 主流程控制
import { resolve } from 'path';
import { betterRequire } from './utils/common';

const apply = (action, ...args) => {
  console.log(action, ...args);
  // 读取的都是dist 目录下的文件

  betterRequire(resolve(__dirname, `./${action}`))(...args);
  console.log(betterRequire(resolve(__dirname, `./${action}`)));
};

export default apply;
