/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Log from "../components/Log";
import useLogsType from "../hooks/use-logs-type";
import { LogsProvider } from "../hooks/use-logs";
import UnderDevelopment from "../components/UnderDevelopment";

const LogsPage = () => {
  const logsType = useLogsType();

  return (
    <Layout>
      {process.env.NODE_ENV === "production" && <UnderDevelopment />}

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
