/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, Button, Flex, jsx, Text, Textarea } from "theme-ui";
import { LogProtocol } from "../../types";
import Calendar from "../Calendar";
import LogList from "./LogList";

const textLimit = 140;

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

  const changeText = (text: string) => {
    if (text.length <= textLimit) {
      setText(text);
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
            sx={{ maxWidth: "500px" }}
          >
            <Box sx={{ mb: 2, flexGrow: 1 }}>
              <Textarea
                value={text}
                placeholder={`What did you do on ${format(
                  date,
                  "iiii, MMMM do",
                )}?`}
                onChange={e => changeText(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                textAlign: "right",
              }}
            >
              <Text sx={{ pr: 3 }}>
                {text.length} / {textLimit}
              </Text>
              <Button>Submit</Button>
            </Box>
          </Box>

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
