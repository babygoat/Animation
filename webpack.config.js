var path = require( 'path' );
// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([{
   from: 'src/assets',
   to: 'assets'
 }]);

// entry 為進入點，output 為進行完 eslint、babel loader 轉譯後的檔案位置
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.gif/,
        exclude: /(node_modules)/,
        loader: "url-loader?limit=10000&mimetype=image/gif&name=assets/[hash].[ext]"
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: true,
              camelCase: true
            },
          },
          'postcss-loader'
        ],
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
            ]
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
  },
  plugins: [HTMLWebpackPluginConfig, CopyWebpackPluginConfig],
};
