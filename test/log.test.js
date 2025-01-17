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

  test("warn: object", () => {
    log.warn({ full_message: "warn: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("warn: object");
    expect(msg.level).toBe(4);
    expect(msg.timestamp).toBeDefined();
  });

  test("err: string", () => {
    log.err("err: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("err: string");
    expect(msg.level).toBe(3);
    expect(msg.timestamp).toBeDefined();
  });

  test("err: object", () => {
    log.err({ full_message: "err: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("err: object");
    expect(msg.level).toBe(3);
    expect(msg.timestamp).toBeDefined();
  });

  test("crit: string", () => {
    log.crit("crit: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("crit: string");
    expect(msg.level).toBe(2);
    expect(msg.timestamp).toBeDefined();
  });

  test("crit: object", () => {
    log.crit({ full_message: "crit: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("crit: object");
    expect(msg.level).toBe(2);
    expect(msg.timestamp).toBeDefined();
  });

  test("alert: string", () => {
    log.alert("alert: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("alert: string");
    expect(msg.level).toBe(1);
    expect(msg.timestamp).toBeDefined();
  });

  test("alert: object", () => {
    log.alert({ full_message: "alert: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("alert: object");
    expect(msg.level).toBe(1);
    expect(msg.timestamp).toBeDefined();
  });

  test("panic: string", () => {
    log.panic("panic: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("panic: string");
    expect(msg.level).toBe(0);
    expect(msg.timestamp).toBeDefined();
  });

  test("panic: object", () => {
    log.panic({ full_message: "panic: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("panic: object");
    expect(msg.level).toBe(0);
    expect(msg.timestamp).toBeDefined();
  });

  test("log: string", () => {
    log.log("log: string");

    expect(msg).toBeTypeof("object");
    expect(msg.short_message).toBe("log: string");
    expect(msg.level).toBe(1);
    expect(msg.timestamp).toBeDefined();
  });

  test("log: object", () => {
    log.log({ full_message: "log: object" });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("log: object");
    expect(msg.level).toBe(1);
    expect(msg.timestamp).toBeDefined();
  });

  test("log accepts standard gelf keys", () => {
    log.log({
      full_message: "log accepts standard gelf keys",
      version: "1.1",
      host: "test suite"
    });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("log accepts standard gelf keys");
    expect(msg.version).toBe("1.1");
    expect(msg.host).toBe("test suite");
  });

  test("log accepts extended gelf keys", () => {
    log.log({
      full_message: "log accepts extended gelf keys",
      _extended_key: "should exist"
    });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("log accepts extended gelf keys");
    expect(msg._extended_key).toBe("should exist");
  });

  test("log discards invalid gelf keys", () => {
    log.log({
      full_message: "log discards invalid gelf keys",
      invalid_key: "shouldn't exist"
    });

    expect(msg).toBeTypeof("object");
    expect(msg.full_message).toBe("log discards invalid gelf keys");
    expect(msg.invalid_key).not.toBeDefined();
  });

  test("log fills required gelf fields if missing", () => {
    log.log({ _extended_key: "lonely extended key" });

    expect(msg).toBeTypeof("object");
    expect(msg._extended_key).toBe("lonely extended key");
    expect(msg.level).toBe(1);
    expect(msg.version).toBe("1.1");
    expect(msg.short_message).toBe("No data being logged...");
    expect(msg.timestamp).toBeDefined();
    expect(msg._level_string).toBe("alert");
    expect(msg.host).toBe("logger");
  });

  test("logMethod: console", () => {
    log.addLogMethod(log.console);

    const spy = jest.spyOn(global.console, "log");

    log.log("logMethod: console");

    expect(spy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  test("logMethod: cache", () => {
    log.addLogMethod(log.cacheFunc.bind(log));

    log.log("logMethod: cache");

    expect(log.cache.length).toBe(1);
  });
});
