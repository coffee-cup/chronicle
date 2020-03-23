/** @jsx jsx */
import * as React from "react";
import { Box, Flex, jsx } from "theme-ui";
import { LogProtocol } from "../../types";
import Calendar from "../Calendar";
import Editor from "../Editor";
import LogList from "./LogList";

const Log: React.FC<LogProtocol> = props => {
  const [date, setDate] = React.useState<Date>(new Date());

  const dateChanged = (date: Date) => {
    setDate(date);
  };

  const submitForm = (text: string) => {
    props.createLog(text, date);
  };

  return (
    <Box className="log">
      <Flex
        sx={{
          flexWrap: ["wrap", "nowrap"],
          flexDirection: ["column-reverse", "row"],
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pr: [0, 3],
            width: ["100%"],
          }}
        >
          <Editor date={date} submitForm={submitForm} />

          <LogList {...props} />
        </Box>

        <Box sx={{ width: ["100%", "300px", "400px"] }}>
          <Calendar
            initialValue={date}
            onDateChanged={dateChanged}
            highlighted={Object.values(props.logs).map(l => new Date(l.date))}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Log;
