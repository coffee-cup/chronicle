/** @jsx jsx */
import { Styled, Button, Flex, Input, Box, jsx } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Log from "../components/Log";
import { DemoProvider, useDemo } from "../hooks/use-demo";

const Demo = () => {
  const { logs, createLog } = useDemo();

  return (
    <Layout>
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
