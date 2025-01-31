const Operation = require("./operation.js");
const parameters = require("./parameters.js");
const convertOasPathsToExpress = require("./utils/convertOasPathsToExpress.js");

module.exports =
class Route {
  constructor({ routePath, oapi, express, server}) {
    this.routePath = routePath; // The string path of our specific route
    this.oapi = oapi; // The full OpenAPI object
    this.express = express; // An instance of ExpressJS
    this.server = server; // An instance of the main Server

    this.operations = [];
    this.rootParameters = {};

    this.initialize();
  }

  initialize() {
    // Setup the route we've been given per operationObject

    // Since some items, like `parameters` are able to waterfall down, we need to
    // check what/if it's been declared on the top level here
    if (this.oapi.paths[this.routePath]?.parameters) {
      // Decode 'Path Item Object' parameters
      // Add to this.rootParameters
      this.rootParameters = parameters(this.oapi.paths[this.routePath].parameters);
    }

    // Now to handle the Operation Object based on method
    for (const key in this.oapi.paths[this.routePath]) {
      if (["summary", "description", "parameters", "servers"].includes(key)) {
        // Skip keys that have no effect on how we handle the endpoint.
        // Which we've already decoded 'parameters' (Which we do first to ensure order doesn't matter)
        continue;
      }

      // First we need to configure any middleware that should be active on this operation
      let middleware = [];
      // Then define our operation helper
      const operation = new Operation({
        operationConfig: this.oapi.paths[this.routePath][key], // The object at this path and method
        method: key,
        route: this,
        server: this.server
      });
      this.operations.push(operation);

      // Then setup the endpoint in ExpressJS depending on the method
      // (We bind each operation to it's own self, otherwise it inherits ExpressJS)
      let func;

      switch(key) {
        case "get":
          func = "get";
          break;
        case "put":
          func = "put";
          break;
        case "post":
          func = "post";
          break;
        case "delete":
          func = "delete";
          break;
        case "options":
          // TODO Should we handle here? Or pass along?
          break;
        case "head":
          func = "head";
          break;
        case "patch":
          func = "patch";
          break;
        case "trace":
          func = "trace";
          break;
        // Begin supporting ExpressJS specific supported methods, even if Swagger doesn't
        case "x-checkout":
          func = "checkout";
          break;
        case "x-copy":
          func = "copy";
          break;
        case "x-lock":
          func = "lock";
          break;
        case "x-merge":
          func = "merge";
          break;
        case "x-mkactivity":
          func = "mkactivity";
          break;
        case "x-mkcol":
          func = "mkcol";
          break;
        case "x-move":
          func = "move";
          break;
        case "x-m-search":
          func = "m-search";
          break;
        case "x-notify":
          func = "notify";
          break;
        case "x-purge":
          func = "purge";
          break;
        case "x-report":
          func = "report";
          break;
        case "x-search":
          func = "search";
          break;
        case "x-subscribe":
          func = "subscribe";
          break;
        case "x-unlock":
          func = "unlock";
          break;
        case "x-unsubscribe":
          func = "unsubscribe";
          break;
        // Maybe look at other official methods neither don't support?
      }

      this.express[func](convertOasPathsToExpress(this.routePath), middleware, operation.handle.bind(operation));

    }
  }
}
