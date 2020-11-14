import { version } from '../../package-lock.json';

export const VERSION = version;

// 找到用户的根目录
//
const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
export const RC = `${HOME}/.zfclirc`;
// console.log(RC);
// RC配置模板的地方 参数给github用的
export const DEFAULTS = {
  registry: 'zhufeng-cli',
  type: 'orgs', // 组织和用户
};
// 下载目录 当前根路径下
export const DOWNLOAD = `${HOME}/.template`;
// 把公司的代码都先下载到本地 如果用到的时候 再直接考到文件夹里就行了 免得每次都还要下载 网速太慢
