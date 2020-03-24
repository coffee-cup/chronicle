/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui";

const Greeting = () => {
  const now = new Date();
  const hour = now.getHours();

  let word = "Day";
  if (hour < 12) {
    word = "Morning";
  } else if (hour < 17) {
    word = "Afternoon";
  } else if (hour < 20) {
    word = "Evening";
  } else if (hour < 24) {
    word = "Night";
  }

  return (
    <Box>
      <Styled.h1>Good {word}</Styled.h1>
    </Box>
  );
};

export default Greeting;
