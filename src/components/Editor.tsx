/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, Button, jsx, Text, Textarea, useThemeUI } from "theme-ui";
import { IKeyedLogs, LogProtocol } from "../types";
import { getClosestDate } from "../utils";
import { scrollTo } from "../utils/scrollTo";
import Calendar from "./Calendar";
import DatePicker from "./DatePicker";
import { useLogs } from "../hooks/use-logs";
import useMediaQuery from "../hooks/useMediaQuery";

const textLimit = 140;

const scrollToClosestDate = (logs: IKeyedLogs, date: Date): Date | null => {
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

const Editor: React.FC = props => {
  const { selectedDate, logs, setSelectedDate, createLog } = useLogs();
  const [text, setText] = React.useState("");
  const [scrolledDate, setScrolledDate] = React.useState<Date | null>(null);

  const { theme } = useThemeUI();
  const isSmall = useMediaQuery(
    `(max-width: ${theme.breakpoints[0].toString()})`,
  );

  React.useEffect(() => {
    if (
      scrolledDate != null &&
      scrolledDate.toDateString() !== selectedDate.toDateString()
    ) {
      scrollToClosestDate(logs, selectedDate);
    }
  }, [logs, selectedDate]);

  const changeText = (text: string) => {
    if (text.length <= textLimit) {
      setText(text);
    }
  };

  const changeDate = (date: Date, scroll: boolean = false) => {
    setSelectedDate(date);

    if (scroll) {
      const closestDate = scrollToClosestDate(logs, date);
      setScrolledDate(closestDate);
    }
  };

  const submitForm = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (text != null && text.trim() !== "") {
      createLog(text, selectedDate);
      setText("");
    }
  };

  const textareaLabel = React.useMemo(
    () => `What did you do on ${format(selectedDate, "iiii, MMMM do")}?`,
    [selectedDate],
  );

  const highlightedDates = React.useMemo(
    () => Object.values(logs).map(l => new Date(l.date)),
    [logs],
  );

  const changeDateScroll = React.useCallback(
    (date: Date) => changeDate(date, true),
    [],
  );
  const changeDateNoScroll = React.useCallback(
    (date: Date) => changeDate(date, false),
    [],
  );

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
          aria-label={textareaLabel}
          value={text}
          placeholder={textareaLabel}
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
          {isSmall && (
            <DatePicker
              initialValue={selectedDate}
              onDateChanged={changeDateNoScroll}
              highlighted={highlightedDates}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Text sx={{ pr: 3, fontSize: [1, 2] }}>
            {text.length} / {textLimit}
          </Text>
          <Button name="submit journal entry">Submit</Button>
        </Box>
      </Box>

      <Box sx={{ pt: 2, display: ["none", "block"] }}>
        {!isSmall && (
          <Calendar
            initialValue={selectedDate}
            onDateChanged={changeDateScroll}
            highlighted={highlightedDates}
          />
        )}
      </Box>
    </Box>
  );
};

export default Editor;
