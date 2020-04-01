/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Log from "../components/Log";
import { LogsProvider } from "../hooks/use-logs";
import useLogsType from "../hooks/use-logs-type";

const LogsPage = () => {
  const logsType = useLogsType();

  return (
    <Layout>
      <Box sx={{ pt: 2 }}>
        <Greeting logsType={logsType} />

        {logsType !== "loading" && (
          <LogsProvider>
            <Log />
          </LogsProvider>
        )}
      </Box>
    </Layout>
  );
};

export default LogsPage;
