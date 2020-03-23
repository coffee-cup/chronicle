/** @jsx jsx */
import { isSameDay } from "date-fns";
import { enGB } from "date-fns/locale";
import * as React from "react";
import { DatePickerCalendar } from "react-nice-dates";
import { Box, Button, jsx } from "theme-ui";

export interface Props {
  initialValue?: Date;
  onDateChanged: (date: Date) => void;
  highlighted?: Date[];
}

const Calendar: React.FC<Props> = props => {
  const [date, setDate] = React.useState(props.initialValue);

  const onDateChanged = (date: Date) => {
    setDate(date);
    props.onDateChanged(date);
  };

  const setToday = () => {
    const today = new Date(new Date().toDateString());
    props.onDateChanged(today);
    setDate(today);
  };

  const modifiers = {
    highlight: (date: Date) =>
      (props.highlighted || []).some(selectedDate =>
        isSameDay(selectedDate, date),
      ),
  };

  const modifiersClassNames = {
    highlight: "-highlight",
  };

  return (
    <Box
      sx={{
        color: "blue",
        textAlign: "right",
        ".nice-dates-day": {
          color: "grey.600",
        },
        ".nice-dates-navigation": {
          color: "text",
        },
        ".-outside": {
          color: "grey.400",
        },
        ".-today": {
          fontWeight: "bold",
        },
        ".-highlight": {
          color: "text",
          fontWeight: "bold",
        },
      }}
      className="calendar"
    >
      <DatePickerCalendar
        date={date}
        onDateChange={onDateChanged}
        locale={enGB}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />

      <Button
        variant="subtle"
        sx={{ mt: 2, display: ["none", "inline-block"] }}
        onClick={setToday}
      >
        today
      </Button>
    </Box>
  );
};

export default Calendar;
