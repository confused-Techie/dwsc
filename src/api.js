/**
  The API is the main web route manager and host. In charge of setting up the
  web server itself, and managing setting up every single route.
*/

const path = require("path");
const express = require("express");
const compression = require("compression");
const Route = require("./route.js");

module.exports =
class API {
  constructor(server) {
    this.server = server;

    this.app;
    this.routes = [];
    this.serve;
  }

  async initialize() {
    this.app = express();

    // Basic Setup
    this.app.use(compression());

    // TODO call conf based setup function
  }

  route(obj) {
    // TODO maybe validate?
    for (const routePath in obj.paths) {
      this.routes.push(
        new Route({
          routePath: routePath,
          oapi: obj,
          express: this.app,
          server: this.server
        })
      );
    }
  }

  listen(port) {
    this.serve = this.app.listen(port, () => {
      this.server.log.notice(`Server Listening on port ${port}`);
    });
  }

  stop() {
    // TODO investigate stop issues here
    this.serve.close(() => {
      this.server.log.notice("HTTP Server Closed.");
    });
    setImmediate(() => {
      this.serve.emit("close");
    });
  }
}
