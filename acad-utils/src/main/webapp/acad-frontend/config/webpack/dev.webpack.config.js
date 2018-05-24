const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ALIASES = require('./static/aliases');
const PATHS = require('./static/paths');

const target = 'web';

module.exports = (mode = 'development') => {
  return {
    mode,
    context: PATHS.ROOT_PATH,
    entry: {
      'app.frontend': [
        'webpack-hot-middleware/client', // Hot module replacement setting for client
        path.resolve(PATHS.CLIENT_PATH, 'app.frontend.js')
      ]
    },
    output: {
      path: `${PATHS.ROOT_PATH}/public`,
      publicPath: '/static/',
      filename: `app.frontend.js`
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                '@babel/preset-es2015',
                '@babel/preset-stage-0',
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-transform-runtime'
              ]
            }
          }]
        }, {
          test: /.(less)$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            allChunks: true,
            use: [
              {
                loader: 'css-loader',
                options: { minimize: true, url: false }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')({
                      browsers: [
                        '> 5%',
                        'last 2 versions'
                      ]
                    })
                  ]
                }
              },
              {
                loader: 'less-loader',
                options: { relativeUrls: false }
              }
            ]
          })
        }, {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
          use: [{ loader: 'ignore-loader' }]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    resolve: {
      alias: ALIASES
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: -20,
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.NormalModuleReplacementPlugin(/^(helpers|components|services)[\/\\]\w+$/, (result) => {
        result.request = result.request.replace(/^(helpers|components|services)([\/\\])(\w+)$/, '$1$2$3$2$3');
      }),
      new ExtractTextPlugin({
        filename: 'style/[name].css',
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(PATHS.CLIENT_PATH, 'app.frontend.html')
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: true
      }),
      new webpack.WatchIgnorePlugin([/node_modules/]),
      new webpack.HotModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin({
      //   openAnalyzer: true,
      //   analyzerPort: 9999
      // })
    ]
  };
};
