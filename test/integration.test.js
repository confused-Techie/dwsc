const path = require("path");
const supertest = require("supertest");
const Server = require("../src/server.js");
const serverHandler = require("../src/server_handler.js");

describe("integration: project-1", () => {

  let request, server;

  beforeAll(async () => {
    // server = new Server({
    //   args: null,
    //   cwd: path.resolve("./test/fixtures/project-1")
    // });
    //
    // await server.initialize();
    // await server.start();
    server = await serverHandler.start({
      args: null,
      cwd: path.resolve("./test/fixtures/project-1")
    });

    request = supertest("http://localhost:8080");
  });

  afterAll(async () => {
    //await server.stop();
    await serverHandler.stop(server);
  });

  test("server started up and is listening", (done) => {
    request
      .get("/")
      .expect(200, done);
  });

  test("x-responder.pass data applied", (done) => {
    request
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  test("parameters functional", (done) => {
    request
      .get("/")
      .expect(200, {
        token: "Some kind of value"
      }, done);
  });

  test("grab data from internal API", (done) => {
    request
      .get("/data")
      .expect(200, {
        data: "Hello World!"
      }, done);
  });
});
