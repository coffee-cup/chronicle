/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, Button, Flex, Input, jsx } from "theme-ui";
import { LogProtocol } from "../../types";
import Calendar from "../Calendar";
import LogList from "./LogList";

const Log: React.FC<LogProtocol> = props => {
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());

  const dateChanged = (date: Date) => {
    setDate(date);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (text !== "") {
      props.createLog(text, date);
      setText("");
    }
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
          <Box
            as="form"
            onSubmit={submitForm}
            className="log-form"
            sx={{
              display: ["block", "flex"],
            }}
          >
            <Box sx={{ mb: 2, flexGrow: 1 }}>
              <Input
                value={text}
                placeholder={`What did you do on ${format(
                  date,
                  "iiii, MMMM do",
                )}?`}
                variant="logInput"
                onChange={e => setText(e.target.value)}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Button sx={{ width: "100%", borderLeft: 0 }}>Submit</Button>
            </Box>
          </Box>

          <LogList logs={props.logs} />
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
