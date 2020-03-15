/** @jsx jsx */
import { enGB } from "date-fns/locale";
import * as React from "react";
import { DatePickerCalendar } from "react-nice-dates";
import { jsx, Button, Box } from "theme-ui";

export interface Props {
  initialValue?: Date;
  onDateChanged: (date: Date) => void;
}

const Calendar: React.FC<Props> = props => {
  const [date, setDate] = React.useState(props.initialValue);

  const onDateChanged = (date: Date) => {
    setDate(date);
    props.onDateChanged(date);
  };

  const setToday = () => {
    const today = new Date();
    props.onDateChanged(today);
    setDate(today);
  };

  return (
    <Box
      sx={{
        textAlign: "right",
      }}
      className="calendar"
    >
      <DatePickerCalendar
        date={date}
        onDateChange={onDateChanged}
        locale={enGB}
      />

      <Button variant="subtle" sx={{ mt: 2 }} onClick={setToday}>
        today
      </Button>
    </Box>
  );
};

export default Calendar;
