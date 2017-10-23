var path = require( 'path' );
var webpack = require('webpack');
// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

//extract stylesheet into a separate file
const ExtractCssTextPlugin = new ExtractTextPlugin(cssOutputDir+'[contenthash].css');

// entry 為進入點，output 為進行完 eslint、babel loader 轉譯後的檔案位置
module.exports = {
  entry: {
    app: ['./src/index.js'],
    'vendor.bodymovin': ['bodymovin/build/player/bodymovin.min.js'],
    vendor:[
      'babel-polyfill',
      'react',
      'react-dom',
      'react-responsive-modal',
      'react-window-resize-listener',
      'howler',
      'prop-types',
      'mobile-detect/mobile-detect.min.js',
      'keymaster',
    ],
  },
  resolve: {
    alias: {
      Assets: path.resolve(__dirname,'src/assets'),
      Root: process.cwd(),
    }
  },
  output: {
    path: path.resolve(__dirname, '10moresocks'),
    filename: jsOutputDir+'[chunkhash].bundle.js',
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
            ]
          }
        }
      ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename:'../tmp/report.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor.bodymovin','vendor.tone','vendor'],
        minChunks: Infinity,
    }),
    new WebpackCleanupPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    ExtractCssTextPlugin,
    HTMLWebpackPluginConfig,
    CopyWebpackPluginConfig,
  ],
};
