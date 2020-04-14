/** @jsx jsx */
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  Input,
  jsx,
  Label,
  Spinner,
  Styled,
} from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";
import LoginWithTwitter from "../components/LoginWithTwittter";
import useUser from "../hooks/use-user";
import { emailRegex } from "../utils";

interface FormData {
  email: string;
  password: string;
}

const Signup = () => {
  const { createAccount, cameFromTwitter } = useUser();
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const [error, setError] = React.useState<null | string>(null);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setError(null);

    try {
      await createAccount(email, password);
      router.push("/journal");
    } catch (e) {
      setError(e.message ?? "Error signing up");
    }
  });

  return (
    <Layout title="Signup">
      <Flex
        sx={{
          py: [4, 5],
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {cameFromTwitter ? (
          <Box>
            <Spinner />
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              maxWidth: "measure",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Styled.h1 sx={{ mb: 0 }}>Create an account</Styled.h1>
              <Styled.p>As free as a walk in a park.</Styled.p>
            </Box>
            <Box as="form" onSubmit={onSubmit}>
              <Box>
                {error && <Box sx={{ color: "red", pb: 2 }}>{error}</Box>}

                <Label htmlFor="email">email</Label>
                {errors.email && errors.email.type === "pattern" && (
                  <span sx={{ color: "error", fontSize: 1 }}>
                    invalid email
                  </span>
                )}
                <Input
                  name="email"
                  mb={3}
                  placeholder="something unique"
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
                  ref={register({ required: true })}
                />
              </Box>

              <p>
                Already have an account? <Link to="/login">Login</Link>.
              </p>

              <Flex sx={{ alignItems: "center", flexWrap: "wrap" }}>
                <Button sx={{ mr: 2 }}>Create</Button> or{" "}
                <LoginWithTwitter sx={{ ml: 2 }} />
              </Flex>
            </Box>
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

export default Signup;
