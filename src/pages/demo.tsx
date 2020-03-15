/** @jsx jsx */
import { Styled, Button, Flex, Input, Box, jsx } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Log from "../components/Log";

const Demo = () => (
  <Layout>
    <Box className="demo">
      <Styled.h1>Demo</Styled.h1>

      <Log />
    </Box>
  </Layout>
);

export default Demo;
