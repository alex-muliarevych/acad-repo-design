const path = require('path');
const fs = require('fs');
const appDir = path.resolve(__dirname, '../../');
const configPath = path.resolve(appDir, 'config/test');

function runCucumber() {
  const cucumberConfigPath = path.resolve(configPath, 'cucumber.json');
  const CucumberRunnerPlugin = require('./plugins').CucumberRunnerPlugin;

  const testCafeConfigPath = path.resolve(configPath, 'testcafe.json');
  let testCafeConfig = require(testCafeConfigPath);
  
  const options = {
    testCafeConfigPath,
    testCafeConfig
  };
  
  fs.createReadStream(cucumberConfigPath, 'utf8').pipe(
    new CucumberRunnerPlugin(options).cucumberRunner()
  );
};


runCucumber();
