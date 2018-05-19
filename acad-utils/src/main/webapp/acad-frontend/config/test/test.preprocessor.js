const babel = require('@babel/core');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../../');
const CLIENT_PATH = path.resolve(ROOT_PATH, 'src/client');

/**
 * These helpers allow cutting of import path of some modules, where filename of module corresponds
 * to its foldername.
 * @example
 *    import getData from 'helpers/getData' -> import getData from 'helpers/getData/getData'
 *
 * Familiar '$#' expression used in RegExp to correspond to matched expressions in replace method
 * is changed to '\\#' in module-resolver plugin.
 * Same escaping strategy allows usage of backslack character
 * @see https://github.com/tleunen/babel-plugin-module-resolver/blob/master/DOCS.md#regular-expressions
 */
const getRepeatableRegExpAlias = (alias) => `^(${alias})([\\/\\\\])(\\w+)$`;
const getResolvedRepeatableAlias = (alias) => `${alias}\\2\\3\\2\\3`;

const config = {
  retainLines: true,
  presets: [
    '@babel/preset-es2015',
    '@babel/preset-react',
    '@babel/preset-stage-0'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'dynamic-import-node',
    [
      'module-resolver',
      {
        alias: {
          [getRepeatableRegExpAlias('helpers')]: getResolvedRepeatableAlias(`${CLIENT_PATH}/helpers`),
          [getRepeatableRegExpAlias('components')]: getResolvedRepeatableAlias(`${CLIENT_PATH}/components`),
          [getRepeatableRegExpAlias('services')]: getResolvedRepeatableAlias(`${CLIENT_PATH}/services`),
          'pages': `${CLIENT_PATH}/pages`,
          'flows': `${CLIENT_PATH}/flows`,
          'constants': `${CLIENT_PATH}/constants`,
          'styles': `${CLIENT_PATH}/styles`
        }
      }
    ],
    [
      'babel-plugin-transform-require-ignore',
      { 'extensions': ['.less'] }
    ]
  ]
};

module.exports = {
  config,

  /**
   * Override jest process method to transpile ES6 modules
   * @param  {String} src      - contents of the file
   * @param  {String} filename - path to the file
   * @return {Object} transpiled module
   */
  process: function (src, filename) {
    return babel.transform(src, {
      ...config,
      filename
    }).code;
  }
};
