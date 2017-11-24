const path = require('path');
// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  jsDir,
  cssDir,
  assetDir,
  musicDir,
  animationDir,
} = require('./path.config.js');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  files: {
    css: ['style.css'],
    js: ['bundle.js'],
  },
  filename: 'index.html',
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: 'src/assets/music', to: musicDir },
  { from: 'src/assets/animation', to: animationDir },
]);

const ExtractCssTextPlugin = new ExtractTextPlugin(`${cssDir}[name].css`);

module.exports = {
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    alias: {
      Assets: path.resolve(__dirname, 'src/assets'),
      Root: process.cwd(),
    },
  },
  entry: [
    'babel-polyfill', './src/index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, '10moresocks'),
    filename: `${jsDir}[name].bundle.js`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.gif/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/gif',
            name: `${assetDir}[hash:8].[ext]`,
          },
        }],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractCssTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
                camelCase: true,
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.jsx$|\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }],
              'react',
              'stage-0',
            ],
            plugins: [
              'transform-es2015-shorthand-properties',
            ],
          },
        },
        ],
      },
    ],
  },
  // 啟動開發測試用 server 設定（不能用在 production）
  devServer: {
    inline: true,
    port: 8008,
    open: true,
    contentBase: '10moresocks',
  },
  plugins: [
    ExtractCssTextPlugin,
    HTMLWebpackPluginConfig,
    CopyWebpackPluginConfig,
  ],
};
