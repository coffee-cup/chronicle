export interface ILog {
  id: string;
  date: Date;
  text: string;
  created: Date;
  order: number;
  userId?: string;
}

export type KeyedLogs = { [id: string]: ILog };

export type LogGroup = ILog[];

export interface LogProtocol {
  loading: boolean;
  error: string | null;
  logs: KeyedLogs;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  createLog: (text: string, date: Date, order?: number) => void;
  deleteLog: (id: string) => void;
}

export type SerializeFn<T = any> = (data: T) => string;
export type DeserializeFn<T = any> = (item: string) => T;

export type LogsType = "loading" | "local" | "firebase";
