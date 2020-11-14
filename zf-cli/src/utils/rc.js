// RC是配置文件 DEFAULT是默认配置
import { decode, encode } from 'ini';
import { promisify } from 'util';
import fs from 'fs';
import { RC, DEFAULTS } from './constant';

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
export const get = async (k) => {
  const has = await exists(RC);
  let opts;
  if (has) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    return opts[k];
  }
  return '';
};
export const set = async (k, v) => {
  const has = await exists(RC);
  // console.log(has, 'has---');
  let opts;
  if (has) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    Object.assign(opts, { [k]: v });
  } else {
    opts = Object.assign(DEFAULTS, { [k]: v });
  }
  await writeFile(RC, encode(opts), 'utf8');
};
export const remove = async (k) => {
  const has = await exists(RC); // 异步的
  let opts;
  if (has) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    delete opts[k];
    await writeFile(RC, encode(opts), 'utf8');
  }
};
export const getAll = async () => {
  const has = await exists(RC);
  let opts;
  if (has) {
    opts = await readFile(RC, 'utf8');
    opts = decode(opts);
    // console.log(opts, 'opts');
    return opts;
  }
  return {};
};
