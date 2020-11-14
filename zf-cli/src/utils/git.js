import request from 'request';
import downloadGitRepo from 'download-git-repo';
import { getAll } from './rc';
import { DOWNLOAD } from './constant';

const fetch = async (url) => new Promise((resolve, reject) => {
  const config = {
    url,
    method: 'get',
    headers: {
      'user-agent': 'xxx',
    },
  };
  request(config, (err, response, body) => {
    console.log(err, 'err');
    if (err) {
      reject(err);
    }
    // console.log(response)
    resolve(JSON.parse(body));
  });
});
export const tagList = async (repo) => {
  const config = await getAll();
  const api = `https://api.github.com/repos/${config.registry}/${repo}/tags`; // 查看版本号
  return fetch(api);
};

export const repoList = async () => {
  const config = await getAll();
  const api = `https://api.github.com/${config.type}/${config.registry}/repos`;
  return fetch(api);
};
export const downLoad = async (src, dest) => new Promise((resolve, reject) => {
  console.log(dest, 'dest');
  // Users/liangyuan/.template/react-template
  downloadGitRepo(src, dest, (err) => {
    if (err) reject();
    resolve();
  });
});
export const downLoadLocal = async (project, version) => {
  const conf = await getAll();
  let api = `${conf.registry}/${project}`;
  if (version) {
    api += `#${version}`;
  }
  return downLoad(api, `${DOWNLOAD}/${project}`);
};
// https://api.github.com/orgs/zhufeng-cli/repos
// https://api.github.com/repos/zhufeng-cli/vue-template/tags` //查看版本号
