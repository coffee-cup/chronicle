/** @jsx jsx */
import { Styled, jsx, Flex, Button, Box, Label, Input } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Signup = () => (
  <Layout title="Signup">
    <Flex
      sx={{
        py: 5,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "measure"
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Styled.h1 sx={{ mb: 0 }}>Create an account</Styled.h1>
          <Styled.p>As free as a walk in a park. No email required.</Styled.p>
        </Box>
        <Box as="form" onSubmit={e => e.preventDefault()}>
          <Box>
            <Label htmlFor="username">username</Label>
            <Input name="username" mb={3} placeholder="something unique" />

            <Label htmlFor="password">password</Label>
            <Input
              type="password"
              name="password"
              mb={3}
              placeholder="something secure"
            />

            <Label htmlFor="password_confirm">password again</Label>
            <Input
              type="password_confirm"
              name="password_confirm"
              mb={3}
              placeholder="double check you know it"
            />
          </Box>

          <p>
            Already have an account? <Link to="/login">Login</Link>.
          </p>

          <Button>Create</Button>
        </Box>
      </Box>
    </Flex>
  </Layout>
);

export default Signup;
