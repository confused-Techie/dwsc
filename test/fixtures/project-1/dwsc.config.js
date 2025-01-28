/**
  This module exports the configuration for DWSC.
  Exporting a single function that will be called during the server setup, allowing
  use to modify whatever we want in order to ensure functionality.
*/

module.exports = (server) => {
  server.controllers = require("./api.js");
  server.config = {
    port: 8080
  };
  server.data = {
    get: "Hello World!"
  };
};
