/** @jsx jsx */
import { Styled, Button, Grid, Flex, Input, Box, jsx } from "theme-ui";
import * as React from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";

export interface Props {}

const Log: React.FC<Props> = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const dateChanged = (date: Date) => {
    setDate(date);
  };

  return (
    <Box as="form" onSubmit={e => e.preventDefault()}>
      <Flex>
        <Box sx={{ flexGrow: 1, pr: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Input
              placeholder={`What did you do on ${format(
                date,
                "iiii, MMMM do",
              )}?`}
              variant="logInput"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Button variant="logButton">Save</Button>
          </Box>
        </Box>

        <Box sx={{ width: "400px" }}>
          <Calendar initialValue={date} onDateChanged={dateChanged} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Log;
