const testControllerHolder = {
  testController: null,
  captureResolver: null,
  getResolver: null,

  capture(testController) {
    testControllerHolder.testController = testController;

    if (testControllerHolder.getResolver) {
      testControllerHolder.getResolver(testController);
    }

    return new Promise((resolve) => {
      testControllerHolder.captureResolver = resolve;
    });
  },

  free() {
    testControllerHolder.testController = null;

    if (testControllerHolder.captureResolver) {
      testControllerHolder.captureResolver();
    }
  },

  get() {
    return new Promise((resolve) => {
      if (testControllerHolder.testController) {
        return resolve(testControllerHolder.testController);
      }

      testControllerHolder.getResolver = resolve;
    });
  }
};

module.exports = testControllerHolder;
