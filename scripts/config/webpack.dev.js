const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const proxySetting = require('../proxySetting.js');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，默认localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    inline: true,
    proxy: { ...proxySetting },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()], // 局部替代刷新而不是重新请求
});
