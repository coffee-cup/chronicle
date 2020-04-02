import { getDayOfYear, getYear, format, lightFormat } from "date-fns";
import { groupBy, orderBy, sortBy } from "lodash";
import * as uuid from "uuid";
import { clearItem, getItem, saveItem } from "./local";
import {
  DeserializeFn,
  ILog,
  ILogGroup,
  IKeyedLogs,
  SerializeFn,
  ILogGroups,
} from "./types";

export const serializeLogs: SerializeFn<IKeyedLogs> = (
  logs: IKeyedLogs,
): string => {
  return JSON.stringify(logs);
};

export const deserializeLogs: DeserializeFn<IKeyedLogs> = (
  logString: string,
): IKeyedLogs => {
  const items = JSON.parse(logString);
  const logs: IKeyedLogs = {};

  for (const k of Object.keys(items)) {
    logs[k] = {
      date: new Date(items[k].date),
      created: new Date(items[k].created),
      order: items[k].order,
      id: items[k].id,
      text: items[k].text,
      userId: items[k].userId,
    };
  }

  return logs;
};

export const groupKey = (d: Date): string =>
  `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;

export const getLogGroups = (
  logs: IKeyedLogs,
): {
  keys: string[];
  groups: ILogGroups;
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
  logs: IKeyedLogs,
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

export const exportToMarkdown = (logs: IKeyedLogs): string => {
  const { keys, groups } = getLogGroups(logs);

  const dateFormat = "MMMM do, yyyy";

  let s = `# Chronicle journal
Exported from [chronicle.ink](https://chronicle.ink) on ${format(
    new Date(),
    dateFormat,
  )}\n`;

  for (const k of keys) {
    s += `\n## ${format(groups[k][0].date, dateFormat)}\n\n`;

    for (const log of groups[k]) {
      s += `- ${log.text}\n`;
    }
  }

  return s;
};

export const exportToJson = (logs: IKeyedLogs): string => {
  const { keys, groups } = getLogGroups(logs);

  const dateFormat = "yyyy-MM-dd";
  const obj: any = {};

  for (const k of keys) {
    const d = format(groups[k][0].date, dateFormat);
    obj[d] = [];

    for (const log of groups[k]) {
      obj[d].push({
        text: log.text,
        date: format(log.date, dateFormat),
        created: log.created,
      });
    }
  }

  return JSON.stringify(obj, null, 2);
};

const localLogKey = "@local-logs";

export const getLocalLogs = async (
  defaultValue: IKeyedLogs,
): Promise<IKeyedLogs> => getItem(localLogKey, defaultValue, deserializeLogs);

export const saveLocalLogs = (logs: IKeyedLogs) =>
  saveItem(localLogKey, logs, serializeLogs);

export const clearLocalLogs = () => clearItem(localLogKey);
