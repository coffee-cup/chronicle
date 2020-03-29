/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui";
import { LogsType } from "../types";
import Link from "./Link";

export interface Props {
  logsType: LogsType;
}

const Greeting: React.FC<Props> = props => {
  return (
    <Box sx={{ pb: 3 }}>
      <Styled.h1 sx={{ mb: 3 }}>Chronicle</Styled.h1>

      <Box sx={{ maxWidth: "measure" }}>
        {props.logsType === "local" && (
          <Styled.p sx={{ my: 2 }}>
            <Link href="/login">Login</Link> or{" "}
            <Link href="/signup">signup</Link> to access your journal on
            multiple devices.
          </Styled.p>
        )}
      </Box>
    </Box>
  );
};

export default Greeting;
