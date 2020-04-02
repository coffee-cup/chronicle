/** @jsx jsx */
import { Clock } from "react-feather";
import { Box, Flex, Grid, Text, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Section: React.FC = props => (
  <Box sx={{ py: [4] }} {...props}>
    {props.children}
  </Box>
);

const Feature: React.FC<{ title: string; comingSoon?: boolean }> = props => (
  <Box
    sx={{
      maxWidth: ["100%", "narrow"],
      width: "100%",
      fontSize: 3,
      mx: ["auto", 0],
      ...(props.comingSoon
        ? {
            color: "grey.600",
          }
        : {}),
    }}
  >
    <Styled.h3>{props.title}</Styled.h3>
    <Text>{props.children}</Text>
    {props.comingSoon && (
      <Flex sx={{ alignItems: "center", pt: 2 }}>
        <Clock size={18} sx={{ mr: 2 }} /> Coming soon
      </Flex>
    )}
  </Box>
);

const Features: React.FC = () => (
  <Section>
    <Styled.h2 sx={{ mb: 0 }}>Features</Styled.h2>

    <Text sx={{ maxWidth: "measure", fontSize: 3, py: 3 }}>
      Chronicle journals are designed to be short and to the point. <br />
      No fluff or hooey. Think, point-form lists of your day.
    </Text>

    <Grid gap={3} columns={[null, 2]}>
      <Feature title="Clean">
        Minimal interface that stays our of your way.
      </Feature>
      <Feature title="No account needed">
        Journals can be used locally without an account. All data is stored in
        the browser.
      </Feature>
      <Feature title="Use anywhere">
        Create an account when you want to access your journal on more than one
        device.
      </Feature>
      <Feature title="Privacy first">
        No tracking, ads, or pushy recommendations. Delete your account data at
        any time
      </Feature>
      <Feature title="Dark mode">
        Use while lying in bed without waking your date.
      </Feature>
      <Feature title="Export">
        Export your journal to markdown or json format.
      </Feature>
    </Grid>
  </Section>
);

const Home = () => (
  <Layout>
    <Box>
      <Box sx={{ py: [5, 6], textAlign: ["center", "left"] }}>
        <Styled.h1 sx={{ mb: 3 }}>No-Nonsense Journaling</Styled.h1>

        <Text
          sx={{
            fontSize: [3],
            maxWidth: "28rem",
            mt: 0,
            mb: 4,
            mx: ["auto", 0],
          }}
        >
          Chronicle is a lightweight journaling app where you record highlights
          of your day
        </Text>

        <Box>
          <Link
            href="/journal"
            variant="button"
            sx={{ width: ["100%", "auto"], py: 2 }}
          >
            Start Journaling
          </Link>
        </Box>
      </Box>

      <Features />
    </Box>
  </Layout>
);

export default Home;
