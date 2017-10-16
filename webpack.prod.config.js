var path = require( 'path' );
var webpack = require('webpack');
// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
  entry: {
    app: './src/index.js',
    'vendor.bodymovin': ['bodymovin/build/player/bodymovin.min.js'],
    'vendor.tone': ['tone/build/Tone.min.js'],
    vendor:[
      'react',
      'react-dom',
      'react-responsive-modal',
      'react-window-resize-listener',
      'prop-types',
      'mobile-detect/mobile-detect.min.js',
      'keymaster',
    ],
  },
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
  plugins: [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor.bodymovin','vendor.tone','vendor'],
        minChunks: Infinity,
    }),
    /*new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor.bodymovin',
        chunk: ['app'],
        filename: 'bodymovin-chunk.js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunk: ['vendor.bodymovin'],
        filename: 'vendor-chunk.js',
    }),*/
    /*new webpack.optimize.CommonsChunkPlugin({
        name: 'node-static',
        filename: 'node-static.js',
        minChunks(module, count) {
            var context = module.context;
            return context && context.indexOf('node_modules') >= 0;
        },
    }),*/
    new WebpackCleanupPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    HTMLWebpackPluginConfig,
    CopyWebpackPluginConfig,
  ],
};
