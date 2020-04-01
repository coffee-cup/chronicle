import { KeyedLogs, ILog } from "../src/types";
import { newLog, serializeLogs, deserializeLogs, groupKey } from "../src/logs";

let id = 0;

const createLog = (text: string, date: Date, order?: number): ILog => ({
  ...newLog(text, date, order ?? 0),
  id: `${id++}`,
});

const createDummyLogs = (logs: ILog[]): KeyedLogs =>
  logs.reduce(
    (acc, log) => ({
      ...acc,
      [log.id]: log,
    }),
    {},
  );

beforeEach(() => {
  id = 0;
});

describe("logs", () => {
  describe("new log", () => {
    it("deafult log", () => {
      const today = new Date();
      const log = newLog("hello", today, 0);
      expect(log.text).toBe("hello");
      expect(log.order).toBe(0);
      expect(log.userId).toBeUndefined();
      expect(log.date).toBe(today);
    });

    it("log with user id", () => {
      const log = newLog("test", new Date(), 0, "1234");
      expect(log.userId).toBe("1234");
    });
  });

  describe("serialize/deserialize", () => {
    it("serializes empty logs", () => {
      expect(serializeLogs({})).toEqual("{}");
    });

    it("serializes logs", () => {
      serializeLogs(
        createDummyLogs([
          createLog("1", new Date(), 0),
          createLog("2", new Date(), 1),
        ]),
      );
    });

    it("deserializes back", () => {
      const logs = createDummyLogs([
        createLog("1", new Date(), 0),
        createLog("2", new Date(), 1),
      ]);
      expect(deserializeLogs(serializeLogs(logs))).toEqual(logs);
    });
  });

  describe("groups", () => {
    it("gets group key", () => {
      expect(groupKey(new Date("2020-04-01T16:59:48.421Z"))).toBe("92-2020");
    });
  });
});
