const Log = require("../src/log.js");

describe("log", () => {
  let log, msg;

  beforeAll(() => {
    log = new Log();
    log.addLogMethod((data) => {
      msg = data;
    });
  });

  beforeEach(() => {
    log.addLogMethod((data) => {
      msg = data;
    });
  });

  afterEach(() => {
    msg = null;
    log.send = [];
  });

  test("adds log methods", () => {
    log.send = [];
    log.addLogMethod(function (_data) {});

    expect(log.send).toBeArray();
    expect(log.send.length).toBe(1);
  });

  test("debug: string", () => {
    log.debug("debug: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("debug: string");
    expect(msg.level).toBe(7);
    expect(msg.timestamp).toBeDefined();
  });

  test("debug: object", () => {
    log.debug({ full_message: "debug: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("debug: object");
    expect(msg.level).toBe(7);
    expect(msg.timestamp).toBeDefined();
  });

  test("info: string", () => {
    log.info("info: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("info: string");
    expect(msg.level).toBe(6);
    expect(msg.timestamp).toBeDefined();
  });

  test("info: object", () => {
    log.info({ full_message: "info: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("info: object");
    expect(msg.level).toBe(6);
    expect(msg.timestamp).toBeDefined();
  });

  test("notice: string", () => {
    log.notice("notice: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("notice: string");
    expect(msg.level).toBe(5);
    expect(msg.timestamp).toBeDefined();
  });

  test("notice: object", () => {
    log.notice({ full_message: "notice: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("notice: object");
    expect(msg.level).toBe(5);
    expect(msg.timestamp).toBeDefined();
  });

  test("warn: string", () => {
    log.warn("warn: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("warn: string");
    expect(msg.level).toBe(4);
    expect(msg.timestamp).toBeDefined();
  });
});
