const async = require('async');
const { spawn } = require('child_process');
const path = require('path');
const start = new Date().getTime();

const runTask = ({ features }, cb) => {
  let args = [
    'node', 'cucumber-js',
    '-r', path.resolve(process.cwd(), 'tasks/featureTests/helpers/transpile.js'),
    '-r', path.resolve(__dirname, 'support/CustomWorld.js'),
    '-r', path.resolve(__dirname, 'support/Hooks.js'),
    ...features
  ];

  const file = path.resolve(__dirname, 'cucumberCLI/cucumberCLI.js');
    args = [file, ...args];
    const cp = spawn('node', args);
    
    cp.stdout.on('data', function(data){
      process.stdout.write(`${data.toString()}`);
    });
  
    cp.on('close', function(){
      process.stdout.write(`Cucumber is done`);
      cb();
      cp.kill();
    });
};

const onTaskEnd = err => {
  if(err) {
    console.log(err);
  }
};

const onEnd = () => {
  console.log(`All tasks have been processed in ${new Date().getTime() - start}`);
};

function run({ concurrency = 1 }, features) {
  const tasks = async.queue(runTask, concurrency);

  features.forEach(featureFilename => {
    tasks.push({
      features: [
        '-r', path.resolve(`${featureFilename}.test.js`),
        featureFilename
      ]
    }, onTaskEnd);
  });

  tasks.drain = onEnd;
}

module.exports = run;
