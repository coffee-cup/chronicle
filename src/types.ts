export interface ILog {
  id: string;
  date: Date;
  text: string;
}

export type KeyedLogs = { [id: string]: ILog };

export interface LogProtocol {
  logs: KeyedLogs;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  createLog: (text: string, date: Date) => void;
  deleteLog: (id: string) => void;
}

export type SerializeFn<T = any> = (data: T) => string;
export type DeserializeFn<T = any> = (item: string) => T;
