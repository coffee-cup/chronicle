/** @jsx jsx */
import { Styled, Box, Spinner, Text, jsx, Button } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import useUser from "../hooks/use-user";
import { useRouter } from "next/router";

const Me = () => {
  const { user, initialising, logout } = useUser();
  const router = useRouter();

  return (
    <Layout>
      <div className="home">
        <Box
          sx={{
            pt: 6,
          }}
        >
          {initialising && <Spinner />}

          {user && (
            <Box>
              <Text sx={{ fontSize: 4 }}>Hello</Text>
              <Styled.h3 sx={{ mt: 2 }}>{user.email}</Styled.h3>

              <Button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </div>
    </Layout>
  );
};

export default Me;
