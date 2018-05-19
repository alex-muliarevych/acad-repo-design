const config = require(process.env.TESTCAFE_CONFIG_PATH);
const path = require('path');
const createTestCafe = require('testcafe');
const testControllerHolder = require('../../../decorators/testControllerHolder');
const { AfterAll, BeforeAll, setDefaultTimeout, Before, After, Status } = require('cucumber');

let testcafe = null;

function runTest(browser, port1, port2) {
  let runner = null;

  createTestCafe('localhost', port1, port2)
    .then(function (tc) {
      testcafe = tc;
      runner = tc.createRunner();
      return runner
        .src(path.resolve(__dirname, `test.js`))
        .browsers(browser)
        .run()
        .catch(function (error) {
          console.log(error);
        });
    });
}


setDefaultTimeout(config.asyncStepTimeout);

BeforeAll(function () {
  runTest(config.browser, config.port1, config.port2);
});

Before(async function () {
  this.testController = await this.waitForTestController;
});

AfterAll(function () {
  testControllerHolder.free();
  testcafe.close();
});
