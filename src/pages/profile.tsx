/** @jsx jsx */
import { useRouter } from "next/router";
import { Box, Button, jsx, Spinner, Styled, Text, Flex } from "theme-ui";
import Layout from "../components/Layout";
import useUser from "../hooks/use-user";
import Link from "../components/Link";

const Me = () => {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  return (
    <Layout>
      <Box
        sx={{
          pt: 6,
        }}
      >
        {loading && <Spinner />}

        {!loading && user != null && (
          <Box>
            <Text sx={{ fontSize: 4 }}>You are logged in as</Text>
            <Styled.h3 sx={{ mt: 3 }}>{user.email}</Styled.h3>

            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Box>
        )}

        {!loading && user == null && (
          <Box>
            <Text sx={{ fontSize: 4 }}>You are not logged in</Text>
            <Flex sx={{ mt: 3 }}>
              <Link href="/login" variant="button" sx={{ mr: 2 }}>
                Login
              </Link>

              <Link href="/signup" variant="button">
                Signup
              </Link>
            </Flex>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Me;
