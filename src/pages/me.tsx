/** @jsx jsx */
import { useRouter } from "next/router";
import { Box, Button, jsx, Spinner, Styled, Text } from "theme-ui";
import Layout from "../components/Layout";
import useUser from "../hooks/use-user";

const Me = () => {
  const { user, loading, logout } = useUser();
  const router = useRouter();

  return (
    <Layout>
      <Box
        className="home"
        sx={{
          pt: 6,
        }}
      >
        {loading && <Spinner />}

        {user && (
          <Box>
            <Text sx={{ fontSize: 4 }}>Hello</Text>
            <Styled.h3 sx={{ mt: 2 }}>{user.email}</Styled.h3>

            <Button
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default Me;
