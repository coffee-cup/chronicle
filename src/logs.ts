import * as uuid from "uuid";
import { DeserializeFn, ILog, KeyedLogs, SerializeFn } from "./types";

export const serializeLogs: SerializeFn<KeyedLogs> = (
  logs: KeyedLogs,
): string => {
  return JSON.stringify(logs);
};

export const deserializeLogs: DeserializeFn<KeyedLogs> = (
  logString: string,
): KeyedLogs => {
  const items = JSON.parse(logString);
  const logs: KeyedLogs = {};

  for (const k of Object.keys(items)) {
    logs[k] = {
      date: new Date(new Date(items[k].date).toDateString()),
      created: new Date(items[k].created),
      id: items[k].id,
      text: items[k].text,
    };
  }

  return logs;
};

export const newLog = (text: string, date: Date, userId?: string): ILog => {
  const log: ILog = {
    id: uuid.v4(),
    text,
    date,
    created: new Date(),
    userId,
  };

  return log;
};
