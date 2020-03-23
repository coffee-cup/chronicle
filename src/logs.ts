import { DeserializeFn, KeyedLogs, SerializeFn } from "./types";

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
      id: items[k].id,
      text: items[k].text,
    };
  }

  return logs;
};
