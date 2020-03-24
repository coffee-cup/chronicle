/** @jsx jsx */
import { useRouter } from "next/router";
import * as React from "react";
import { Box, jsx, Spinner } from "theme-ui";
import Layout from "../components/Layout";
import useUser from "../hooks/use-user";

const Logout = () => {
  const { logout } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    logout();
    router.push("/");
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          pt: 6,
        }}
      >
        <Spinner />
      </Box>
    </Layout>
  );
};

export default Logout;
