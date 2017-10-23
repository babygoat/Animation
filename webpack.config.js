var path = require( 'path' );
// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const jsOutputDir = require('./path.config.js').jsOutputDir;
const cssOutputDir = require('./path.config.js').cssOutputDir;
const assetOutputDir = require('./path.config.js').assetOutputDir;

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  files: {
    css: ['style.css'],
    js: ['bundle.js'],
  },
  filename: 'index.html',
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  {from: 'src/assets/musics', to: assetOutputDir+'musics'},
  {from: 'src/assets/animation', to: assetOutputDir+'animation'}
]);

const ExtractCssTextPlugin = new ExtractTextPlugin(cssOutputDir+'[name].css');

// entry 為進入點，output 為進行完 eslint、babel loader 轉譯後的檔案位置
module.exports = {
  resolve: {
    alias: {
      Assets: path.resolve(__dirname,'src/assets'),
      Root: process.cwd(),
    }
  },
  entry: [
    'babel-polyfill','./src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, '10moresocks'),
    filename: jsOutputDir+'[name].bundle.js',
    publicPath:'/'
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
            name: assetOutputDir+'[hash:8].[ext]'
          }
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
            'postcss-loader'
          ]
        }),
      },
      {
        enforce: 'pre',
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/src`,
        exclude: /bundle\.js$/
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {modules: false}],
              'react',
              'stage-0'
            ],
          }
        }
      ]
      }
    ]
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
    CopyWebpackPluginConfig
  ],
};
