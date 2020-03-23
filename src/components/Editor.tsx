/** @jsx jsx */
import { format } from "date-fns";
import * as React from "react";
import { Box, Button, jsx, Text, Textarea } from "theme-ui";

const textLimit = 140;

export interface Props {
  date: Date;
  submitForm: (text: string) => void;
}

const Editor: React.FC<Props> = props => {
  const [text, setText] = React.useState("");

  const changeText = (text: string) => {
    if (text.length <= textLimit) {
      setText(text);
    }
  };

  const submitForm = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (text != null && text !== "") {
      props.submitForm(text);
      setText("");
    }
  };

  return (
    <Box as="form" onSubmit={submitForm} className="log-form">
      <Box sx={{ mb: 2, flexGrow: 1 }}>
        <Textarea
          sx={{ minHeight: "90px" }}
          value={text}
          placeholder={`What did you do on ${format(
            props.date,
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
  );
};

export default Editor;
