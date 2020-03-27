/** @jsx jsx */
import { Clock } from "react-feather";
import { Box, Flex, Grid, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Feature: React.FC<{ title: string; comingSoon?: boolean }> = props => (
  <Box
    sx={{
      maxWidth: "narrow",
      mx: ["auto", 0],
      ...(props.comingSoon
        ? {
            color: "grey.600",
          }
        : {}),
    }}
  >
    <Styled.h3 sx={{ mb: 2 }}>{props.title}</Styled.h3>
    <Styled.p>{props.children}</Styled.p>
    {props.comingSoon && (
      <Flex sx={{ alignItems: "center" }}>
        <Clock size={18} sx={{ mr: 2 }} /> Coming soon
      </Flex>
    )}
  </Box>
);

const Features: React.FC = () => (
  <Box sx={{ pt: 3 }}>
    <Styled.h2>Features</Styled.h2>
    <Box sx={{ maxWidth: "measure" }}>
      <Styled.p>
        Chronicle journals are designed to be short and to the point. No fluff
        or hooey. Think, point-form lists of your day.
      </Styled.p>
    </Box>
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
        No tracking, ads, or pushy recommendations. Delete your account and data
        at any time.
      </Feature>
      <Feature title="Dark mode">
        Use while lying in bed without waking your date.
      </Feature>
      <Feature title="Export" comingSoon>
        Export your journal to markdown or text format.
      </Feature>
    </Grid>
  </Box>
);

const Home = () => (
  <Layout>
    <Box sx={{ pb: [5, 6], textAlign: ["center", "left"] }}>
      <Grid gap={4} sx={{ py: [5, 6] }}>
        <Styled.h1 sx={{ my: 0 }}>No-Nonsense Journaling</Styled.h1>

        <Styled.p sx={{ fontSize: [2, 3], maxWidth: "28rem", my: 0 }}>
          Chronicle is a lightweight journaling app where you record highlights
          of your day
        </Styled.p>

        <Box>
          <Link
            href="/journal"
            variant="button"
            sx={{ width: ["100%", "auto"] }}
          >
            Start Journalling
          </Link>
        </Box>
      </Grid>

      <Features />
    </Box>
  </Layout>
);

export default Home;
