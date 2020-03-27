/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Log from "../components/Log";
import useFirebaseLogs from "../hooks/use-firebase-logs";
import useLocalLogs from "../hooks/use-local-logs";
import useLogsType from "../hooks/use-logs-type";
import { LogsProvider } from "../hooks/use-logs";
import UnderDevelopment from "../components/UnderDevelopment";

const FirebaseLogs: React.FC = props => {
  const logs = useFirebaseLogs();
  return <LogsProvider protocol={logs}>{props.children}</LogsProvider>;
};

const LocalLogs: React.FC = props => {
  const logs = useLocalLogs();
  return <LogsProvider protocol={logs}>{props.children}</LogsProvider>;
};

const LogsPage = () => {
  const logsType = useLogsType();

  const LogsComp: React.FC = logsType === "firebase" ? FirebaseLogs : LocalLogs;

  return (
    <Layout>
      <UnderDevelopment />

      <Box sx={{ pt: 2 }}>
        <Greeting logsType={logsType} />

        {logsType !== "loading" && (
          <LogsComp>
            <Log />
          </LogsComp>
        )}
      </Box>
    </Layout>
  );
};

export default LogsPage;
