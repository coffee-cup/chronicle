/** @jsx jsx */
import { Styled, jsx, Flex, Button, Box, Label, Input } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Login = () => (
  <Layout title="Login">
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
          maxWidth: [null, "measure"]
        }}
      >
        <Styled.h1>Login to Chronicle</Styled.h1>
        <Box as="form" onSubmit={e => e.preventDefault()}>
          <Box>
            <Label htmlFor="username">username</Label>
            <Input name="username" mb={3} placeholder="jim" />

            <Label htmlFor="password">password</Label>
            <Input
              type="password"
              name="password"
              mb={3}
              placeholder="something secure"
            />
          </Box>

          <p>
            New to Chronicle? <Link to="/signup">Create an account</Link>.
          </p>

          <Button>Create</Button>
        </Box>
      </Box>
    </Flex>
  </Layout>
);

export default Login;
