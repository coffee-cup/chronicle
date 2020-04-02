export interface ILog {
  id: string;
  date: Date;
  text: string;
  created: Date;
  order: number;
  userId?: string;
}

export type IKeyedLogs = { [id: string]: ILog };

export type ILogGroup = ILog[];
export type ILogGroups = { [key: string]: ILogGroup };

export interface LogProtocol {
  loading: boolean;
  error: string | null;
  logs: IKeyedLogs;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  createLog: (text: string, date: Date, order?: number) => void;
  deleteLog: (id: string) => void;
  deleteAllLogs: () => void;
}

export type SerializeFn<T = any> = (data: T) => string;
export type DeserializeFn<T = any> = (item: string) => T;

export type LogsType = "loading" | "local" | "firebase";
