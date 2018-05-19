const path = require('path');
const fs = require('fs');
const glob = require('glob');
const through2 = require('through2');
const run = require('../helpers/runCucumberFeatures/run');

class CucumberRunnerPlugin {
  /**
   * @param {Object} options - object with plugin options
   */
  constructor(options = {}) {
    /**
     * @type {Object}
     * @property {Array} importPaths - paths to directories with configs
     * @property {String|Function} filename - bundled config filename
     */
    this.options = options;
    this._runOptions = [];
    this._features = [];

    this.collectCucumberParameters = this.collectCucumberParameters.bind(this);
    this.run = this.run.bind(this);
  }


  _getFiles(patterns) {
    return glob.sync(patterns).map(file=>path.resolve(process.cwd(), file))
  }

  collectCucumberParameters(file, enc, cb) {
    const config = JSON.parse(file);
    this._features = this._getFiles(config.features);

    cb();
  }
  
  /**
   * Webpack plugin lifecycle hook callback.
   * Plugin entry point.
   * @param {Object} compilation
   * @param {Function} callback - async callback that notifies webpack about plugin execution finish
   */
  runWabpackCucumber(compilation, callback = () => {}) {
    this.cucumberRunner(this.options.cucumber);

    callback();
  }

  cucumberRunner() {
    return through2.obj(this.collectCucumberParameters, this.run);
  }

  run() {
    const {testCafeConfig, testCafeConfigPath} = this.options;
    
    process.env.TESTCAFE_CONFIG_PATH = testCafeConfigPath;
    run(testCafeConfig, this._features);
  }

  /**
   * Webpack plugin lifecycle method
   * @param {Object} compiler - provided by webpack, represents process compiler data
   */
  apply(compiler) {
    this.context = compiler.context;

    compiler.plugin('emit', this.runWabpackCucumber);
  }
}

module.exports = CucumberRunnerPlugin;
