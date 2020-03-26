import useUser from "./use-user";
import { LogsType } from "../types";

const useLogsType = (): LogsType => {
  const value = useUser();

  const { user, loading } = useUser();

  return loading ? "loading" : user != null ? "firebase" : "local";
};

export default useLogsType;
