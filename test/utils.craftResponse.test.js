const craftResponse = require("../src/utils/craftResponse.js");

describe("craftResponse.combineResponses", () => {

  test("handles http prov without spec", () => {
    const want = {
      "200": {}
    };

    const got = craftResponse.combineResponses(200, {});

    expect(want).toMatchObject(got);
  });

  test("handles http prov with spec", () => {
    const want = {
      "200": {
        description: "Success",
        content: {
          "application/json": {}
        }
      }
    };

    const spec = {
      "200": {
        description: "Success",
        content: { "application/json": {} }
      }
    };

    const got = craftResponse.combineResponses(200, spec);

    expect(want).toMatchObject(got);
  });

  test("handles spec prov without spec", () => {
    const want = {
      "200": {
        content: { "application/json": {} }
      }
    };

    const prov = { "200": { content: { "application/json": {} }}};

    const got = craftResponse.combineResponses(prov, {});

    expect(want).toMatchObject(got);
  });

  test("handles spec prov with spec", () => {
    const want = {
      "200": {
        content: { "application/json": {} },
        headers: { "X-Rate-Limit-Limit": {}, "X-Rate-Limit-Reset": {} }
       }
    };

    const prov = {
      200: { content: { "application/json": {} } }
    };

    const spec = {
      "200": {
        headers: { "X-Rate-Limit-Limit": {}, "X-Rate-Limit-Reset": {} }
      },
      "500": {
        content: "application/xml"
      }
    };

    const got = craftResponse.combineResponses(prov, spec);

    expect(want).toMatchObject(got);
  });

});

//describe("craftResponse.applySpec", () => { });
