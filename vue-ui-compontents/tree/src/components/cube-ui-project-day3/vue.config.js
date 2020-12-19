const path = require('path');

module.exports = {
  // vue-cli3 里的配置文件
  // resolve: {
  //   alias: { '@': path.resolve(__dirname, 'src') },
  // },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme',
        ],
      },
    },
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true,
    },
  },
};
