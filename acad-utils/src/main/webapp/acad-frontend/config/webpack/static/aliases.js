const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../../../');
const CLIENT_PATH = path.resolve(ROOT_PATH, './src/client');

module.exports = {
  constants: path.resolve(CLIENT_PATH, 'constants'),
  components: path.resolve(CLIENT_PATH, 'components'),
  pages: path.resolve(CLIENT_PATH, 'pages'),
  flows: path.resolve(CLIENT_PATH, 'flows'),
  helpers: path.resolve(CLIENT_PATH, 'helpers'),
  services: path.resolve(CLIENT_PATH, 'services'),
  styles: path.resolve(CLIENT_PATH, 'styles')
};
