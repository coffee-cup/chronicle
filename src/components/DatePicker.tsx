/** @jsx jsx */
import { isSameDay } from "date-fns";
import { enGB } from "date-fns/locale";
import * as React from "react";
import { DatePicker as NiceDatePicker } from "react-nice-dates";
import { Box, Input, jsx } from "theme-ui";

export interface Props {
  initialValue?: Date;
  onDateChanged: (date: Date) => void;
  highlighted?: Date[];
}

const DatePicker: React.FC<Props> = props => {
  const [date, setDate] = React.useState(props.initialValue);

  const onDateChanged = (date: Date) => {
    setDate(date);
    props.onDateChanged(date);
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
        textAlign: "right",
        ".nice-dates-popover": {
          bg: "background",
          border: "solid 2px",
          borderColor: "grey.600",
        },
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
    >
      <NiceDatePicker
        date={date}
        onDateChange={onDateChanged}
        locale={enGB}
        format="MMM dd yyyy"
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      >
        {({ inputProps, focused }) => (
          <Input
            aria-label="Date picker for journal entry"
            sx={{ p: 0, border: 0, maxWidth: "140px", cursor: "pointer" }}
            className={"input" + (focused ? " -focused" : "")}
            {...inputProps}
          />
        )}
      </NiceDatePicker>
    </Box>
  );
};

export default DatePicker;
