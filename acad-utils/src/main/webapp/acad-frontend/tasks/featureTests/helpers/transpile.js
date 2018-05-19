const path = require('path');
const appDir = path.resolve(__dirname, '../../../');
const transform = require(path.resolve(appDir, 'config/test/test.preprocessor'));

const register = require('@babel/register')(transform.config);
