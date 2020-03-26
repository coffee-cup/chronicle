/** @jsx jsx */
import { Moon, Sun } from "react-feather";
import { Button, Flex, jsx, NavLink, Spinner, useColorMode } from "theme-ui";
import useUser from "../hooks/use-user";
import Link from "./Link";

const ThemeSwitcher: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const size = 18;

  return (
    <Button
      onClick={() => setColorMode(colorMode === "default" ? "dark" : "default")}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "text",
        bg: "transparent",
        border: "none",
        px: 2,
        py: 1,

        "&:hover": {
          color: "text",
          bg: "transparent",
          boxShadow: "none",
        },
      }}
    >
      {colorMode === "default" ? <Moon size={size} /> : <Sun size={size} />}
    </Button>
  );
};

const Nav: React.FC = () => {
  const { user, loading } = useUser();

  return (
    <Flex as="nav">
      <NavLink as={Link} href="/logs">
        logs
      </NavLink>

      <NavLink as={Link} href="/faq">
        faq
      </NavLink>

      <NavLink as={Link} href={user == null ? "/login" : "/logout"}>
        {loading ? <Spinner size={22} /> : user == null ? "login" : "logout"}
      </NavLink>

      <ThemeSwitcher />
    </Flex>
  );
};

export default Nav;
