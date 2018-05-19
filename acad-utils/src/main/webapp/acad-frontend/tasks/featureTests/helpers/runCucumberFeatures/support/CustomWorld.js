const { setWorldConstructor } = require('cucumber');
const testControllerHolder = require('../../../decorators/testControllerHolder');

function CustomWorld({ attach, parameters }) {
  this.waitForTestController = testControllerHolder.get();
  this.attach = attach;
}

setWorldConstructor(CustomWorld);
