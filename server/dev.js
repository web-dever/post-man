import path from 'path';
import webpack from 'webpack';
import express from 'express';
import Service from '@vue/cli-service';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackBar from 'webpackbar';

import { print, ipAddress } from './util';

var app = express();
var webpackConfig = null;
var compiler = null;
var service = new Service(process.cwd());
var port = 3000;

process.on('unhandledRejection', (msg) => {
  console.log('错误信息: ', msg);
  process.exit(1);
});

service.init('development');
webpackConfig = service.resolveWebpackConfig();
webpackConfig.stats = {
  colors: true,
  timings: true,
  exclude: /node_modules/,
  builtAt: false,
  context: webpackConfig.context,
  modules: false,
  reasons: false,
  cachedAssets: true,
  children: false,
};
Object.keys(webpackConfig.entry).forEach(key => {
  webpackConfig.entry[key] = ['webpack-hot-middleware/client'].concat(webpackConfig.entry[key]);
});
// 去掉FriendlyErrorsWebpackPlugin插件
webpackConfig.plugins = webpackConfig.plugins.filter(
  (plugin) => plugin.__pluginConstructorName !== 'FriendlyErrorsWebpackPlugin'
);
webpackConfig.plugins = webpackConfig.plugins.map((plugin) => {
  if (plugin.__pluginConstructorName === 'ProgressPlugin') {
    // 使用WebpackBar替换webpack自带的ProgressPlugin
    return new WebpackBar({
      name: 'vue',
      reporters: ['fancy'],
    });
  } else {
    return plugin;
  }
});

compiler = webpack(webpackConfig);
compiler.hooks.compile.tap('compile', function() {
  print(`[${new Date().toLocaleTimeString()}] 开始执构建开发环境...`, 'yellow');
});

var compilerPromise = new Promise((resolve, reject) => {
  compiler.hooks.done.tap('done', (stats) => {
    var endTime = new Date();
    var { errors = [], warnings = [] } = stats.compilation || {};
    var lines = '='.repeat(50);
    var color = 'green';

    if (errors.length) {
      print(`[${endTime.toLocaleTimeString()}]: 编译失败`, 'red');
      errors.forEach((error) => print(error.message, 'red'));
      reject(new Error('编译失败'));
      return;
    }

    print(lines, 'white');
    print(stats.toString(webpackConfig.stats), color);
    print(lines, 'white');
    print(`[${endTime.toLocaleTimeString()}]: 构建成功`, color);

    if (warnings.length) {
      warnings.forEach(console.warn);
    }

    resolve(stats);
  });
});

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'silent',
    wacthOptions: {
      ignored: /node_modules/,
    },
  })
);

app.use(webpackHotMiddleware(compiler));

async function start() {
  // 等待编译完成
  await compilerPromise;

  // 为了兼容browserhistory
  app.get('*', (req, res, next) => {
    var filename = path.join(webpackConfig.output.path, 'index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        // 这里err必须存在，否则进入404页面
        return next(err);
      }

      res.set('Content-Type', 'text/html');
      res.send(result);
      res.end();
    });
  });

  app.use((req, res) => {
    res.status(404);
    res.send(`请求${req.url}时未找到相应资源`);
  });

  app.use((err, req, res) => {
    res.status(500);
    res.send(`请求${req.url}时发生服务器错误\n${err.stack}`);
  });

  app.listen(port, function() {
    print(`服务器已经启动在: http://${ipAddress()}:${port}`, 'yellow');
  });
}

start();
