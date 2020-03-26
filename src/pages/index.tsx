/** @jsx jsx */
import { Styled, Box, jsx } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Home = () => (
  <Layout>
    <div className="home">
      <Box
        sx={{
          pt: 6,
        }}
      >
        <Box sx={{ pb: 2, maxWidth: "measure" }}>
          <Styled.h1 sx={{ mb: 0 }}>Bullshit Free Journaling</Styled.h1>

          <Styled.p sx={{ fontSize: 3 }}>
            Chronicle is a lightweight journaling app where you record
            highlights of your day.
          </Styled.p>
        </Box>

        <Link href="/logs" variant="button">
          Get Started
        </Link>
      </Box>
    </div>
  </Layout>
);

export default Home;
