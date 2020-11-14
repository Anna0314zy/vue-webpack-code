// 拉取你所有的项目 安装哪个项目
// 选择完  显示版本号1.0
import ora from 'ora';
import inquirer from 'inquirer';
import downloadGitRepo from 'download-git-repo';
import { promisify } from 'util';
import { getAll } from './utils/rc';
import { DOWNLOAD } from './utils/constant';

const fs = require('fs');

const MetalSmith = require('metalsmith'); // 异步的api 链式调用
// 遍历文件夹 看需不需要渲染
// console.log(MetalSmith, 'MetalSmith');
// const { render } = require('consolidate').handlebars; //这个也行
// consolidate 统一了 所有的模板引擎
let { render } = require('consolidate').ejs;

// console.log(render, 'render');
render = promisify(render);
const path = require('path');
const axios = require('axios');
let ncp = require('ncp');

ncp = promisify(ncp);
// 封装loading
const waitFnloading = (fn, msg) => async (...args) => {
  const spinner = ora(msg);
  spinner.start();
  const res = await fn(...args);
  spinner.succeed();
  return res;
};
// 1 获取项目列表
const ftechRepolist = async () => {
// https://api.github.com/orgs/zhufeng-cli/repos
  const conf = await getAll();
  const { data } = await axios.get(`https://api.github.com/orgs/${conf.registry}/repos`);
  return data;
};
const fetchTagList = async (repo) => {
  const conf = await getAll();
  // https://api.github.com/repos/zhufeng-cli/vue-template/tags` //查看版本号
  const { data } = await axios.get(`https://api.github.com/repos/${conf.registry}/${repo}/tags`);
  return data;
};
const download = async (repo, tag) => {
  const conf = await getAll();
  let api = `${conf.registry}/${repo}`;
  if (tag) {
    api += `#${tag}`;
  }
  // user/xxx/.template/repo
  const dest = `${DOWNLOAD}/${repo}`;
  await new Promise((resolve, reject) => {
    downloadGitRepo(api, dest, (err) => {
      if (err) reject();
      resolve();
    });
  });
  // await downloadGitRepo(api, dest);
  return dest;// 下载的最终目录
};
module.exports = async (projectName) => {
  // console.log('projectName', projectName);
  let repos = await waitFnloading(ftechRepolist, 'fetching template')();
  repos = repos.map(({ name }) => name);
  // 选择模板
  const { repo } = await inquirer.prompt([
    {
      type: 'list', // 列表
      name: 'repo',
      choices: repos,
      message: 'please choose a template to create project',
    },
  ]);
  console.log(repo);
  // 获取对应的版本号
  let tags = await waitFnloading(fetchTagList, 'fetching template')(repo);
  tags = tags.map(({ name }) => name);
  const { tag } = await inquirer.prompt([
    {
      type: 'list', // 列表
      name: 'tag',
      choices: tags,
      message: 'please choose tag to create project',
    },
  ]);
  console.log(tag);
  // 下载模板后 放到一个临时目录里 以备后期使用
  // 获取项目所有的模板
  // 通过选择的项目 拉取对应的版本
  const result = await waitFnloading(download, 'download template')(repo, tag);
  /// result  Users/liangyuan/.template/vue-template

  console.log(result, '下载到本地的地址');
  // 拿到了下载的目录 直接拷贝到执行的目录下即可 ncp

  // 复杂的需要模板渲染 渲染后在拷贝
  // 把template 下的文件 拷贝到执行命令的目录下 这是简单的
  // 这个目录 项目名字是否已经存在  如果存在提示已经存在
  // 如果有ask.js文件夹
  console.log(!fs.existsSync(path.join(result, 'ask.json')), 'ask.json');
  if (!fs.existsSync(path.join(result, 'ask.json'))) {
    // /my-job 路径
    console.log('简单模板');
    await ncp(result, path.resolve(projectName)).catch((e) => {
      console.log('e-ncp', e);
    });
    // await waitFnloading(ncp, 'copy template')(result, path.resolve(projectName));
  } else {
  // 复杂的模板
  // 把git上面的项目下载下来 如果有ask 文件就是一个复杂的模板 我们需要用户选择 选择后编译模板
  // metalsmith 只要是模板编译 都需要这个模块

    // MetalSmith
    console.log('复杂的模板');
    // 1.用户填信息 2.渲染模板
    // use 中间不会立马执行 还需要调用 build
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname) // 如果传入路径 会默认遍历当前目录下的src
        .source(result) // 遍历的文件
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          // console.log(files); // 遍历文件夹
          const args = require(path.join(result, 'ask.json'));
          const obj = await inquirer.prompt(args);
          console.log(obj, 'OBJ');
          const meta = metal.metadata(); // 下一个metal 就能拿到
          Object.assign(meta, obj);
          delete files['ask.json'];
          done();
        })
        .use((files, metal, done) => {
          // 根据用户的输入 下载模板
          const obj = metal.metadata();
          console.log(obj, 'OBJ-METAL');
          // 遍历对象的所有属性
          Reflect.ownKeys(files).forEach(async (file) => {
            // 这个是要处理的 <%></%>
            if (file.includes('js') || file.includes('json')) {
              let content = files[file].contents.toString();// 文件的内容
              if (content.includes('<%')) {
                content = await render(content, obj);
                files[file].contents = Buffer.from(content);
              }
            }
          });
          console.log(metal.metadata(), 'metal');
          console.log(files);
          done();
        })
        .build((err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
    });
  }
  // github
  // {
  //   name: 'vue-tamplate',
  //   "private": "<%-privata%>",
  //   "author": "<%-author%>",
  // }
};
// config install
