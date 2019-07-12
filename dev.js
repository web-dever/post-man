const Service = require('@vue/cli-service');

var service = new Service(process.cwd());

service.init('development');

var webpackConfig = service.resolveWebpackConfig();

console.log(JSON.stringify(webpackConfig));
