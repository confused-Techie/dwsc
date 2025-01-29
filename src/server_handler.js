const Server = require("../src/server.js");

async function start({ args, cwd }) {
  const server = new Server({
    args: args,
    cwd: cwd
  });

  await server.initialize();
  await server.start();

  return server;
}

async function stop(server) {
  await server.stop();
  //process.exit(0); // TODO issues closing server
}

module.exports = {
  start: start,
  stop: stop
};
