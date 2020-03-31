/** @jsx jsx */
import * as React from "react";
import { Box, Button, Flex, jsx, Spinner, Text, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { LogsProvider, useLogs } from "../hooks/use-logs";
import useUser from "../hooks/use-user";

const Section: React.FC = props => <Box {...props} sx={{ pb: 4 }} />;

const Options: React.FC = () => {
  const { user, logout } = useUser();
  const { deleteAllLogs } = useLogs();

  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (message !== "") {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  const deleteAllData = () => {
    const result = window.confirm(
      "Are you sure you want to delete your journal?",
    );
    if (result) {
      deleteAllLogs();
      setMessage("Journal data was deleted");
    }
  };

  return (
    <Box className="options">
      {message !== "" && (
        <Box
          sx={{
            py: 2,
            px: 3,
            mb: 3,
            bg: "accent",
          }}
        >
          {message}
        </Box>
      )}
      <Section>
        {user != null ? (
          <Box>
            <Text>You are logged in as</Text>
            <Text variant="heading" sx={{ my: 2, fontSize: 4 }}>
              {user.email}
            </Text>

            <Box sx={{ pt: 2 }}>
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ maxWidth: "measure" }}>
            <Text>You are not logged in</Text>
            <Text sx={{ mt: 2 }}>
              Chronicle accounts allow you to access your journal on all
              devices.
            </Text>

            <Flex sx={{ pt: 3 }}>
              <Link href="/login" variant="button" sx={{ mr: 2 }}>
                Login
              </Link>

              <Link href="/signup" variant="button">
                Signup
              </Link>
            </Flex>
          </Box>
        )}
      </Section>

      <Section>
        <Text sx={{ mb: 2, fontSize: 4, fontWeight: "bold" }}>Danger Zone</Text>
        <Text>Careful, this is permanent</Text>

        <Box sx={{ pt: 3 }}>
          <Button onClick={() => deleteAllData()}>Delete all data</Button>
        </Box>
      </Section>
    </Box>
  );
};

const Profile = () => {
  const { loading } = useUser();

  return (
    <Layout>
      <Box
        sx={{
          pt: [4, 5],
        }}
      >
        <Styled.h1>Profile</Styled.h1>

        {loading ? (
          <Spinner />
        ) : (
          <LogsProvider>
            <Options />
          </LogsProvider>
        )}
      </Box>
    </Layout>
  );
};

export default Profile;
