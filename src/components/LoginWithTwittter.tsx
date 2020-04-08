/** @jsx jsx */
import * as React from "react";
import { jsx, Button, Text } from "theme-ui";
import { Twitter } from "react-feather";
import useUser from "../hooks/use-user";

const LoginWithTwitter: React.FC = (props) => {
  const { loginWithTwitter } = useUser();

  return (
    <Button
      {...props}
      sx={{
        display: "flex",
        alignItems: "center",
        bg: "#00acee",
      }}
      onClick={(e) => {
        e.preventDefault();
        loginWithTwitter();
      }}
    >
      <Twitter size={18} sx={{ mr: 2 }} />
      <Text>Login with twitter</Text>
    </Button>
  );
};

export default LoginWithTwitter;
