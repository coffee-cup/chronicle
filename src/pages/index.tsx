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
        <Styled.h1>Bullshit free personal logging</Styled.h1>

        <Link href="/logs" variant="button">
          Get Started
        </Link>
      </Box>
    </div>
  </Layout>
);

export default Home;
