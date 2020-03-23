/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { animateScroll } from "react-scroll";
import { Box, Button, jsx, Text, Textarea } from "theme-ui";
import { LogProtocol } from "../types";
import { getClosestDate } from "../utils";
import Calendar from "./Calendar";

const textLimit = 140;

const Editor: React.FC<LogProtocol> = props => {
  const [text, setText] = React.useState("");
  const [date, setDate] = React.useState(props.selectedDate);

  const changeText = (text: string) => {
    if (text.length <= textLimit) {
      setText(text);
    }
  };

  const changeDate = (date: Date) => {
    setDate(date);
    props.setSelectedDate(date);

    const closestDate = getClosestDate(
      Object.values(props.logs).map(l => l.date),
      date,
    );

    if (closestDate != null) {
      const id = format(closestDate, "yyyy-MM-dd");
      const el = document.getElementById(id);
      if (el != null) {
        animateScroll.scrollTo(el.offsetTop, {
          duration: 350,
          smooth: "easeInOut",
        });
      }
    }
  };

  const submitForm = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (text != null && text !== "") {
      props.createLog(text, date);
      setText("");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={submitForm}
      className="log-form"
      sx={{ position: "sticky", top: 3 }}
    >
      <Box sx={{ mb: 2, flexGrow: 1 }}>
        <Textarea
          sx={{ minHeight: "90px" }}
          value={text}
          placeholder={`What did you do on ${format(date, "iiii, MMMM do")}?`}
          onChange={e => changeText(e.target.value)}
          onKeyPress={e => {
            if (e.charCode === 13 && !e.shiftKey) {
              e.preventDefault();
              submitForm();
            }
          }}
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

      <Box sx={{ pt: 2 }}>
        <Calendar
          initialValue={props.selectedDate}
          onDateChanged={changeDate}
          highlighted={Object.values(props.logs).map(l => new Date(l.date))}
        />
      </Box>
    </Box>
  );
};

export default Editor;
