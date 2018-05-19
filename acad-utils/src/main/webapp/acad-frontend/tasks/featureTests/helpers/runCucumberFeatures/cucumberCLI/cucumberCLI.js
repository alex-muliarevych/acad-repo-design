const path = require('path');
const { Cli } = require(require.resolve('cucumber'));
const argv = [...process.argv.slice(2)];

if(argv && argv.length) {
  const cli = new Cli({
    argv,
    cwd: process.cwd(),
    stdout: process.stdout
  });
  
  cli.run()
    .then((success) => {
      console.log('Killing.... process.pid: ', process.pid);
      process.kill(process.pid);
    })
    .catch((err) => {
      console.log('Cucumber CLI error: ', err);
    });
}
