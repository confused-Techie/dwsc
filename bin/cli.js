#!/usr/bin/env node

const process = require("node:process");
const serverHandler = require("../src/server_handler.js");
const args = process.argv.slice(2);

let server;

(async () => {
  server = await serverHandler.start({
    args: args,
    cwd: process.cwd();
  });
})();

process.on("SIGTERM", async () => {
  // Termination signal
  await serverHandler.stop(server);
});

process.on("SIGINT", async () => {
  // Keyboard Interrupt
  await serverHandler.stop(server);
});
