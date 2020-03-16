/** @jsx jsx */
import { Box, Flex, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";

const Faq = () => {
  return (
    <Layout title="FAQ">
      <Flex
        sx={{
          py: 5,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: [null, "measure"],
          }}
        >
          <Styled.h1>FAQ</Styled.h1>

          <Styled.p>Nothing here yet.</Styled.p>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Faq;
