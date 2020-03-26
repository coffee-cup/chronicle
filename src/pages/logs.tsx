/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Log from "../components/Log";
import { FirebaseProvider, useFirebaseLogs } from "../hooks/use-firebase-logs";
import { LocalProvider, useLocalLogs } from "../hooks/use-local-logs";
import useLogsType from "../hooks/use-logs-type";

const FirebaseLogs = () => {
  const logs = useFirebaseLogs();
  return <Log {...logs} />;
};

const LocalLogs = () => {
  const logs = useLocalLogs();
  return <Log {...logs} />;
};

const LogsPage = () => {
  const logsType = useLogsType();

  return (
    <Layout>
      <Box>
        <Greeting logsType={logsType} />

        {logsType === "local" && (
          <LocalProvider>
            <LocalLogs />
          </LocalProvider>
        )}

        {logsType === "firebase" && (
          <FirebaseProvider>
            <FirebaseLogs />
          </FirebaseProvider>
        )}
      </Box>
    </Layout>
  );
};

export default LogsPage;
