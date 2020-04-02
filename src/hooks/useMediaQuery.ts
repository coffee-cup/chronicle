import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const mediaQuery = window.matchMedia(query);

  const [value, setValue] = useState(mediaQuery.matches);
  useEffect(() => {
    const handler = () => {
      setValue(mediaQuery.matches);
    };

    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return value;
};

export default useMediaQuery;
