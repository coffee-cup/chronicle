/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui";
import { LogsType } from "../types";
import Link from "./Link";

export interface Props {
  logsType: LogsType;
}

const Greeting: React.FC<Props> = props => {
  const now = new Date();
  const hour = now.getHours();

  let word = "Day";
  if (hour < 3) {
    word = "Night";
  } else if (hour < 12) {
    word = "Morning";
  } else if (hour < 17) {
    word = "Afternoon";
  } else if (hour < 20) {
    word = "Evening";
  } else if (hour < 24) {
    word = "Night";
  }

  return (
    <Box sx={{ pb: 3 }}>
      <Styled.h1 sx={{ mb: 3 }}>Good {word}</Styled.h1>

      <Box sx={{ maxWidth: "measure" }}>
        {props.logsType === "local" && (
          <Styled.p>
            These logs are only persisted in this browser's local storage. If
            you want to be able to access them on multiple devices,{" "}
            <Link to="/signup">create an account</Link> or{" "}
            <Link to="/login">login</Link>.
          </Styled.p>
        )}

        {props.logsType === "firebase" && (
          <Styled.p>Remember what you've done with your life.</Styled.p>
        )}
      </Box>
    </Box>
  );
};

export default Greeting;
