const co = require("co");
const { spawn } = require("child_process");

const promisifyProcessCloseListener = (process, event) => 
  new Promise((resolve, reject) =>
    process.on(event, exitCode => {
      return exitCode ? reject(exitCode) : resolve(exitCode)
    })
  );

const nodeTask = co.wrap(function* nodeTask(args) {
  const task = spawn("node", args, {stdio:[process.stdin, process.stdout, process.stderr]});

  task.on("error", err => {
    console.log(err);
  });

  task.on('uncaughtException', (err) => {
    console.log("UNCAUGHTE_XCEPTION: ", err);
  })
  
  const exitCode = yield promisifyProcessCloseListener(task, "close");
  exitCode && process.exit(exitCode);
  return Promise.resolve(); 
});

module.exports = nodeTask;
