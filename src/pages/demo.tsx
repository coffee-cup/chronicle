/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Log from "../components/Log";
import { DemoProvider, useDemo } from "../hooks/use-demo";

const Demo = () => {
  const { logs, createLog } = useDemo();

  return (
    <Layout title="Demo">
      <Box className="demo">
        <Styled.h1>Demo</Styled.h1>

        <Log logs={logs} createLog={createLog} />
      </Box>
    </Layout>
  );
};

export default () => (
  <DemoProvider>
    <Demo />
  </DemoProvider>
);
