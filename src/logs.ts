import { getDayOfYear, getYear } from "date-fns";
import { groupBy, orderBy, sortBy } from "lodash";
import * as uuid from "uuid";
import { clearItem, getItem, saveItem } from "./local";
import {
  DeserializeFn,
  ILog,
  ILogGroup,
  KeyedLogs,
  SerializeFn,
} from "./types";

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
      order: items[k].order,
      id: items[k].id,
      text: items[k].text,
    };
  }

  return logs;
};

export const groupKey = (d: Date): string => `${getDayOfYear(d)}-${getYear(d)}`;

export const getLogGroups = (
  logs: KeyedLogs,
): {
  keys: string[];
  groups: { [key: string]: ILogGroup };
} => {
  const groups = groupBy(logs, l => groupKey(l.date));
  const keys = sortBy(Object.keys(groups), k => groups[k][0].date).reverse();

  // sort logs by order
  for (const k of keys) {
    groups[k] = orderBy(
      groups[k],
      [l => l.order, l => l.created],
      ["desc", "desc"],
    );
  }

  return { keys, groups };
};

export const getGroupForDate = (
  date: Date,
  logs: KeyedLogs,
): ILogGroup | undefined => {
  const { groups } = getLogGroups(logs);
  return groups[groupKey(date)];
};

export const newLog = (
  text: string,
  date: Date,
  order: number,
  userId?: string,
): ILog => {
  const log: ILog = {
    id: uuid.v4(),
    text,
    date,
    order,
    created: new Date(),
    userId,
  };

  return log;
};

const localLogKey = "@local-logs";

export const getLocalLogs = async (
  defaultValue: KeyedLogs,
): Promise<KeyedLogs> => getItem(localLogKey, defaultValue, deserializeLogs);

export const saveLocalLogs = (logs: KeyedLogs) =>
  saveItem(localLogKey, logs, serializeLogs);

export const clearLocalLogs = () => clearItem(localLogKey);
