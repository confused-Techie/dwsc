const Operation = require("../src/operation.js");

describe("operation", () => {
  let operation;

  afterEach(() => {
    operation = null;
  });

  test("calls all supported functions", async () => {
    let xHandlerCalled = false;
    let xPrehandlerCalled = false;
    let xPosthandlerCalled = false;

    operation = new Operation({
      method: "GET",
      route: {},
      server: {
        log: { err: () => {} }
      },
      operationConfig: {
        // This is the config just after declaring the method
        summary: "A GET Method configuration",
        parameters: [],
        "x-handler": () => { xHandlerCalled = true; },
        "x-prehandler": () => { xPrehandlerCalled = true; },
        "x-posthandler": () => { xPosthandlerCalled = true; }
      }
    });

    await operation.handle();

    expect(xHandlerCalled).toBe(true);
    expect(xPrehandlerCalled).toBe(true);
    expect(xPosthandlerCalled).toBe(true);
  });

  test("provides expected arguments", async () => {
    let args = {};

    operation = new Operation({
      method: "GET",
      route: {},
      server: { log: { err: () => {} } },
      operationConfig: {
        summary: "A GET Method configration",
        parameters: [
          {
            name: "token",
            in: "query",
            description: "Some value",
            required: false,
            schema: { type: "string" },
            "x-parse": (value, spec) => {
              if (spec.required) {
                return value;
              } else {
                return spec.description;
              }
            }
          }
        ],
        "x-handler": (params, env) => { args = { params: params, env: env }; }
      }
    });

    await operation.handle(
      { // Req
        query: { token: "test-token-value" }
      },
      { /* Res */ }
    );

    expect(args.params).toBeDefined();
    expect(args.params).toBeTypeof("object");
    const Parameter = require("../src/parameter.js");
    expect(args.params.token).toBeDefined();
    expect(args.params.token).toBeInstanceOf(Parameter);

    expect(args.env).toBeDefined();
    const Env = require("../src/env.js");
    expect(args.env).toBeInstanceOf(Env);
  });
});
