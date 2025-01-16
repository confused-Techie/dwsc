#!/usr/bin/env node

const process = require("node:process");
const Server = require("../src/server.js");
const args = process.argv.slice(2);

const server = new Server({
  args: args,
  cwd: process.cwd()
});

(async () => {
  await server.initialize();
  await server.start();
})();

process.on("SIGTERM", async () => {
  // Termination signal
  await server.stop();
  process.exit(0); // TODO issues closing server
});

process.on("SIGINT", async () => {
  // Keyboard Interrupt
  await server.stop();
  process.exit(0); // TODO issues closing server
});
