const CallStack = require("./callStack.js");
const craftResponse = require("./utils/craftResponse.js");

module.exports =
class Env {
  constructor(opts = {}) {
    this._opts = opts;

    this.callstack = new CallStack();
    this.http = {
      req: opts.req,
      res: opts.res
    };
    this.operation = opts.operation; // Data about the object containing the current endpoint
    this.server = opts.server;
  }

  // Here we should setup all possible methods to expose to the user, as well
  // as find a way to load a configured list of modules to expose as well.

  // A flexible response method being able to many parameters and convert them
  // into a proper response
  respond(content, respObj) {
    const fullRespObj = craftResponse.combineResponses(respObj, this.operation.config?.responses ?? {});
    craftResponse.applySpec(fullRespObj, this.http.res);

    if (content) {
      this.http.res.send(content);
    } else {
      this.http.res.send();
    }
  }

  // Specific HTTP Status Code Response Helpers
  // -- 1xx: Informational
  Continue(d) { return this.respond(d, 100); }
  // -- 2xx: Success
  OK(d) { return this.respond(d, 200); }
  // -- 3xx: Redirection
  MultipleChoices(d) { return this.respond(d, 300); }
  // -- 4xx: Client Error
  BadRequest(d) { return this.respond(d, 400); }
  Unauthorized(d) { return this.respond(d, 401); }
  PaymentRequired(d) { return this.respond(d, 402); }
  Forbidden(d) { return this.respond(d, 403); }
  NotFound(d) { return this.respond(d, 404); }
  // -- 5XX: Server Error
  InternalServerError(d) { return this.respond(d, 500); }
  NotImplemented(d) { return this.respond(d, 501); }
  BadGateway(d) { return this.respond(d, 502); }
  ServiceUnavailable(d) { return this.respond(d, 503); }
  GatewayTimeout(d) { return this.respond(d, 504); }
  HTTPVersionNotSupported(d) { return this.respond(d, 505); }
  VariantAlsoNegotiates(d) { return this.respond(d, 506); }
  InsufficientStorage(d) { return this.respond(d, 507); }
  LoopDetected(d) { return this.respond(d, 508); }
  NotExtended(d) { return this.respond(d, 510); } // OBSOLETED
  NetworkAuthenticationRequired(d) { return this.respond(d, 511); }
}
