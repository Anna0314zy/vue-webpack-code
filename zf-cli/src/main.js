import program from 'commander';
import { VERSION } from './utils/constant';
import main from './index';

// zf-cli config set a 1
// zf-cli install
const actionMap = {
  install: {
    description: 'install template',
    alias: 'i',
    examples: [
      'zf-cli i',
      'zf-cli install',
    ],
  },
  config: {
    alias: 'c',
    description: 'config .zfclirc',
    examples: [
      'zf-cli config set <k> <v>',
      'zf-cli config get <k>',
      'zf-cli config remove <k>',
    ],
  },
  create: {
    alias: 'ct',
    description: 'create project',
    examples: [
      'zf-cli create your projectName',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};
Object.keys(actionMap).forEach((action) => {
  // console.log(action, 'action');
  program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
      // 判断一下  当前是什么操作
      if (action === '*') {
        console.log(actionMap[action].description);
      } else if (action === 'config') {
        // 实现更改配置文件  zf-cli config set a 1 拿到命令行参数
        main(action, ...process.argv.slice(3));
      } else if (action === 'install') {
        main(action);
      } else if (action === 'create') {
        main(action, ...process.argv.slice(3));
      }
    });
});
function help() {
  console.log('\r\n    how to use');
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].examples.forEach((examples) => {
      console.log(`   -${examples}`);
    });
  });
}
program.on('-h', help);
program.on('--help', help);

program.version(VERSION, '-v --version').parse(process.argv);
