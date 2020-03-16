/** @jsx jsx */
import { Styled, Button, Grid, Flex, Input, Box, jsx } from "theme-ui";
import * as React from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";
import { ILog } from "../types";
import LogItem from "./LogItem";
import * as uuid from "uuid";

const LogList: React.FC<{
  logs: ILog[];
}> = props => {
  return (
    <Box
      className="log-list"
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "2px",
          bg: "grey.200",
          zIndex: -1,
          top: 0,
          bottom: 0,
          left: 2,
        }}
      />

      {props.logs.map(log => (
        <LogItem log={log} key={log.id} />
      ))}
    </Box>
  );
};

const Log: React.FC<{
  logs: ILog[];
  createLog: (log: ILog) => void;
}> = props => {
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());

  const dateChanged = (date: Date) => {
    setDate(date);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (text !== "") {
      const newLog: ILog = {
        id: uuid.v4(),
        text,
        date: new Date().toISOString(),
      };
      props.createLog(newLog);
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
              <Button sx={{ width: "100%" }}>Submit</Button>
            </Box>
          </Box>

          <LogList logs={props.logs} />
        </Box>

        <Box sx={{ width: ["100%", "300px", "400px"] }}>
          <Calendar initialValue={date} onDateChanged={dateChanged} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Log;
