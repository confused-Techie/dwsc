const fs = require("fs");
const path = require("path");
const Log = require("./log.js");
const API = require("./api.js");

module.exports =
class Server {
  static locateUserInit(cwd) {
    if (fs.existsSync(path.join(cwd, "dwsc.config.js"))) {
      return require(path.join(cwd, "dwsc.config.js"));
    } else {
      // If we can't find their function, lets just
      // provide a shim
      return () => {};
    }
  }

  constructor({ args, cwd }) {
    this._args = args;
    this._cwd = cwd;

    this.log = new Log(this);
    this.api = new API(this);

    this.config;
    this.controllers;
    this.data;
    this.tasks;
    this.cache;
  }

  async initialize() {
    this.log.addLogMethod(this.log.console);
    this.log.addLogMethod(this.log.cache);

    await this.api.initialize();

    // Call user init func
    const userInitFunc = this.locateUserInit(this._cwd);

    userInitFunc(this);

    this.api.route(this.controllers);
  }

  async start() {
    this.api.listen(this.config.port);
  }

  async stop() {
    await this.api.stop();
  }

  // Utility functions
  getExpressInstance() {
    return this.api.app;
  }

  assignControllers(arr) {
    if (!Array.isArray(arr)) {
      arr = Array.from(arr);
    }

    this.controllers = arr;
  }
}
