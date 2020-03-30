import * as localForage from "localforage";
import { DeserializeFn, SerializeFn } from "./types";

const defaultSerializeFn: SerializeFn = JSON.stringify;
const defaultDeserializeFn: DeserializeFn = JSON.parse;

export const getItem = async <T>(
  key: string,
  defaultValue: T,
  deserializeFn: DeserializeFn = defaultDeserializeFn,
): Promise<T> => {
  try {
    const item = await localForage.getItem<any>(key);
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
    localForage.setItem(key, item);
  } catch (e) {}
};

export const clearItem = (key: string) => {
  try {
    localForage.removeItem(key);
  } catch (e) {}
};
