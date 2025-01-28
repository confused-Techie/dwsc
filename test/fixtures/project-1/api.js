/**
  This file exports our OpenAPI Schema, being extended by the features of DWSC
  to ensure it is able to provide nearly all components of a functional REST API.
*/

module.exports = {
  openapi: "3.1.0",
  "x-dwsc": "1.0.0",
  info: {
    title: "Project 1",
    license: "MIT",
    version: "0.0.1"
  },
  paths: {
    "/": {
      summary: "Root path",
      get: {
        summary: "Get the homepage.",
        "x-responder": {
          pass: { statusCode: 200, contentType: "json" }
        },
        parameters: [
          {
            name: "token",
            in: "query",
            description: "Some kind of value",
            required: false,
            schema: {
              type: "string"
            },
            "x-parse": (value, spec) => {
              return spec.description;
            }
          }
        ],
        "x-handler": async function (params, env) {
          env.pass({
            token: params.token.parse()
          });
        }
      }
    },
    "/data": {
      summary: "Get data from the internal API",
      get: {
        summary: "Lets grab some data",
        "x-handler": async (params, env) => {
          env.OK({
            data: env.server.data.get
          });
        }
      }
    }
  }
};
