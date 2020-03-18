/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Log from "../components/Log";
import { DemoProvider, useDemo } from "../hooks/use-demo";

const Demo = () => {
  const demoLogs = useDemo();

  return (
    <Layout title="Demo">
      <Box className="demo">
        <Styled.h1>Demo</Styled.h1>

        <Log {...demoLogs} />
      </Box>
    </Layout>
  );
};

export default () => (
  <DemoProvider>
    <Demo />
  </DemoProvider>
);
