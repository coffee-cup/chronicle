/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, Button, jsx, Text, Textarea } from "theme-ui";
import { KeyedLogs, LogProtocol } from "../types";
import { getClosestDate } from "../utils";
import { scrollTo } from "../utils/scrollTo";
import Calendar from "./Calendar";
import DatePicker from "./DatePicker";

const textLimit = 140;

const scrollToClosestDate = (logs: KeyedLogs, date: Date): Date | null => {
  const closestDate = getClosestDate(
    Object.values(logs).map(l => l.date),
    date,
  );

  if (closestDate != null) {
    const id = format(closestDate, "yyyy-MM-dd");
    scrollTo(id);

    return closestDate;
  }

  return null;
};

const Editor: React.FC<LogProtocol> = props => {
  const [text, setText] = React.useState("");
  const [scrolledDate, setScrolledDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (
      scrolledDate != null &&
      scrolledDate.toDateString() !== props.selectedDate.toDateString()
    ) {
      scrollToClosestDate(props.logs, props.selectedDate);
    }
  }, [props.logs, props.selectedDate]);

  const changeText = (text: string) => {
    if (text.length <= textLimit) {
      setText(text);
    }
  };

  const changeDate = (date: Date, scroll: boolean = false) => {
    props.setSelectedDate(date);

    if (scroll) {
      const closestDate = scrollToClosestDate(props.logs, date);
      setScrolledDate(closestDate);
    }
  };

  const submitForm = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (text != null && text !== "") {
      props.createLog(text, props.selectedDate);
      setText("");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={submitForm}
      className="log-form"
      sx={{ position: "sticky", top: 3, pb: 3 }}
    >
      <Box sx={{ mb: 2, flexGrow: 1 }}>
        <Textarea
          sx={{ minHeight: "90px" }}
          value={text}
          placeholder={`What did you do on ${format(
            props.selectedDate,
            "iiii, MMMM do",
          )}?`}
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
          justifyContent: ["space-between", "flex-end"],
          textAlign: "right",
        }}
      >
        <Box sx={{ display: ["block", "none"] }}>
          <DatePicker
            initialValue={props.selectedDate}
            onDateChanged={date => changeDate(date, false)}
            highlighted={Object.values(props.logs).map(l => new Date(l.date))}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Text sx={{ pr: 3, fontSize: [1, 2] }}>
            {text.length} / {textLimit}
          </Text>
          <Button>Submit</Button>
        </Box>
      </Box>

      <Box sx={{ pt: 2, display: ["none", "block"] }}>
        <Calendar
          initialValue={props.selectedDate}
          onDateChanged={date => changeDate(date, true)}
          highlighted={Object.values(props.logs).map(l => new Date(l.date))}
        />
      </Box>
    </Box>
  );
};

export default Editor;
