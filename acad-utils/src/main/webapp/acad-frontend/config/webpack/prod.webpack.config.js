const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ALIASES = require('./static/aliases');
const PATHS = require('./static/paths');

const version = fs.readFileSync(path.resolve(PATHS.ROOT_PATH, '.version'));
const revisionDate = fs.readFileSync(path.resolve(PATHS.ROOT_PATH, '.revision'));
const revisionName = `app.frontend.${version}.${revisionDate}`;

const target = 'web';

module.exports = (mode = 'production') => {
  return {
    mode,
    context: PATHS.ROOT_PATH,
    entry: {
      'app.frontend': path.resolve(PATHS.CLIENT_PATH, 'app.frontend.js')
    },
    output: {
      path: `${PATHS.ROOT_PATH}/public`,
      publicPath: '/',
      filename: `${revisionName}.js`,
      chunkFilename: `[name].${revisionName}.js`
    },
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
                '@babel/preset-react',
                /**
                 * TODO: make an additional research for an updated version of react-optimize plugin
                 * suitable for ^7.x.x version of @babel
                 * @see https://github.com/jamiebuilds/babel-react-optimize
                 */
                // 'react-optimize'
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
          test: /\.(eot|svg|ttf|woff|woff2)$/,
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
            name: `vendor`,
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
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.NormalModuleReplacementPlugin(/^(helpers|components|services)[\/\\]\w+$/, (result) => {
        result.request = result.request.replace(/^(helpers|components|services)([\/\\])(\w+)$/, '$1$2$3$2$3');
      }),
      new ExtractTextPlugin({
        filename: `style/[name].${version}.${revisionDate}.css`,
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(PATHS.CLIENT_PATH, 'app.frontend.html')
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
        DEBUG: false
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
