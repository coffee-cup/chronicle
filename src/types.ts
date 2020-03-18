export interface ILog {
  id: string;
  date: Date;
  text: string;
}

export type KeyedLogs = { [id: string]: ILog };

export interface LogProtocol {
  logs: KeyedLogs;
  createLog: (text: string, date: Date) => void;
  deleteLog: (id: string) => void;
}
