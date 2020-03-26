import { DeserializeFn, SerializeFn, KeyedLogs } from "./types";
import { deserializeLogs, serializeLogs } from "./logs";

const defaultSerializeFn: SerializeFn = JSON.stringify;
const defaultDeserializeFn: DeserializeFn = JSON.parse;

export const getItem = <T>(
  key: string,
  defaultValue: T,
  deserializeFn: DeserializeFn = defaultDeserializeFn,
): T => {
  try {
    const item = localStorage.getItem(key);
    return deserializeFn(item);
  } catch (e) {
    return defaultValue;
  }
};

export const saveItem = <T>(
  key: string,
  value: T,
  serializeFn: SerializeFn = defaultSerializeFn,
) => {
  try {
    const item = serializeFn(value);
    localStorage.setItem(key, item);
  } catch (e) {}
};

export const clearItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
};
