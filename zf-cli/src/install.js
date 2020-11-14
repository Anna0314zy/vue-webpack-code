import ora from 'ora';
import inquirer from 'inquirer';
import { repoList, tagList, downLoadLocal } from './utils/git';

const install = async () => {
  // 下载模板 选择模板使用
  // 通过配置模板文件 获取模板信息（哪些模板）
  let loading = ora('fetching template');
  loading.start();
  let list = await repoList();
  loading.succeed();
  list = list.map(({ name }) => name);
  console.log(list, 'list');
  let answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      choices: list,
      message: 'please choose template',
    },
  ]);
  // 拿到项目名字
  // console.log(answer.project, 'project');
  const { project } = answer;
  // 获取当前项目的 版本号
  loading = ora('fetching tag.....');
  loading.start();
  console.log(project, 'project');
  list = await tagList(project);
  loading.succeed();
  list = list.map(({ name }) => name);
  answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'tag',
      choices: list,
      message: 'please choose tag',
    },
  ]);
  const { tag } = answer;
  // 下载文件 （先下载到缓存文件中）
  // zf-cli init
  // 下载 git版本
  // 下载
  loading = ora('downloading project.....');
  loading.start();
  await downLoadLocal(project, tag);
  loading.succeed();
};
// vue 会使用模板引擎
// vue init 当前下载好的模板 生成到项目目录中
// vue uninstall
// 选择技术
// https://api.github.com/orgs/zhufeng-cli/repos 看模板目录的
export default install;
