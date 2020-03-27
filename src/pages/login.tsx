/** @jsx jsx */
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, Input, jsx, Label, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import useUser from "../hooks/use-user";
import { emailRegex } from "../utils";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useUser();
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const [error, setError] = React.useState<null | string>(null);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setError(null);

    try {
      await login(email, password);
      router.push("/journal");
    } catch (e) {
      setError(e.message ?? "error logging in");
    }
  });

  return (
    <Layout title="Login">
      <Flex
        sx={{
          py: 5,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: [null, "measure"],
          }}
        >
          <Styled.h1>Login to Chronicle</Styled.h1>
          <Box as="form" onSubmit={onSubmit}>
            <Box>
              {error && <Box sx={{ color: "red", pb: 2 }}>{error}</Box>}

              <Label htmlFor="username">username</Label>
              {errors.email && errors.email.type === "pattern" && (
                <span sx={{ color: "error", fontSize: 1 }}>invalid email</span>
              )}
              <Input
                name="email"
                mb={3}
                placeholder="hello@gmail.com"
                className={errors.email ? "error" : ""}
                ref={register({ required: true, pattern: emailRegex })}
              />

              <Label htmlFor="password">password</Label>
              {errors.password && errors.password.type === "minLength" && (
                <span sx={{ color: "error", fontSize: 1 }}>
                  must be 8 characters long
                </span>
              )}
              <Input
                type="password"
                name="password"
                mb={3}
                placeholder="something secure"
                className={errors.password ? "error" : ""}
                ref={register({ required: true, minLength: 8 })}
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
};

export default Login;
