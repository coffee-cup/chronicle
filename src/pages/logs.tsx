/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import Greeting from "../components/Greeting";
import Layout from "../components/Layout";
import Log from "../components/Log";
import { FirebaseProvider, useFirebase } from "../hooks/use-firebase";
import useUser from "../hooks/use-user";

const LogsPage = () => {
  const { user, loading } = useUser();
  const firebaseLogs = useFirebase();

  return (
    <Layout>
      <Box>
        <Greeting />
        <Log {...firebaseLogs} />
      </Box>
    </Layout>
  );
};

export default () => (
  <FirebaseProvider>
    <LogsPage />
  </FirebaseProvider>
);
