import * as React from "react";
import copy from "copy-to-clipboard";

const useCopy = (): [boolean, (text: string) => void] => {
  const [showCopied, setShowCopied] = React.useState(false);
  const copyText = (text: string) => {
    copy(text);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1500);
  };

  return [showCopied, copyText];
};

export default useCopy;
