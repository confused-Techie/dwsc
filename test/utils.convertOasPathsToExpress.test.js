const func = require("../src/utils/convertOasPathsToExpress.js");

describe("convertOasPathsToExpress", () => {

  test("handles normal paths", () => {
    const have = "/users/username";
    const want = have;
    const got = func(have);
    expect(got).toBe(want);
  });

  test("handles single replacements", () => {
    const have = "/users/{id}";
    const want = "/users/:id";
    const got = func(have);
    expect(got).toBe(want);
  });

  test("handles multiple replacements", () => {
    const have = "/organizations/{orgId}/members/{memberId}";
    const want = "/organizations/:orgId/members/:memberId";
    const got = func(have);
    expect(got).toBe(want);
  });

  test("handles replacements with uncommong characters", () => {
    const have = "/report.{format}";
    const want = "/report.:format";
    const got = func(have);
    expect(got).toBe(want);
  });

});
