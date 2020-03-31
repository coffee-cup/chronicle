/** @jsx jsx */
import { Box, Flex, jsx, Styled, Text } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import SEO from "../components/SEO";

const NotFoundPage = () => (
  <Layout>
    <SEO title="Page not found" />
    <Box sx={{ pt: [5, 6] }}>
      <Text sx={{ fontSize: 5 }}>(⌣_⌣”)</Text>
      <Styled.h1>Page Not Found</Styled.h1>
      <Styled.p>Maybe you were trying to go somewhere else?</Styled.p>
      <Flex>
        <Link href="/" variant="button">
          Home
        </Link>
        <Link href="/journal" variant="button">
          Journal
        </Link>
      </Flex>
    </Box>
  </Layout>
);

export default NotFoundPage;
