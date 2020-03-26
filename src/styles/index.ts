import { system } from "@theme-ui/presets";
import { Theme } from "theme-ui";

const heading = {
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
};

const font = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

const baseLink = {
  color: "text",
  textDecoration: "underline",
  transition: "all 150ms ease-in-out",
  cursor: "pointer",

  "&:hover,&:focus": {
    color: "text",
    bg: "accent",
  },
};

const baseInput = {
  borderRadius: 0,
  borderWidth: 2,

  "&:focus": {
    borderColor: "accent",
  },

  "&.error": {
    borderColor: "error",
  },
};

const baseButton = {
  color: "secondary",
  bg: "primary",
  cursor: "pointer",
  py: 1,
  borderRadius: 0,
  border: "solid 2px",
  borderColor: "primary",
  transition: "all 150ms ease-in-out",

  "&:hover": {
    color: "primary",
    bg: "secondary",
    boxShadow: "4px 4px 0px 0px black",
  },
};

const darkColor = "#171717";
const lightColor = "white";

const theme: Theme = {
  ...system,
  colors: {
    text: darkColor,
    background: lightColor,
    primary: darkColor,
    secondary: lightColor,
    accent: "#fbba72",
    muted: "#eff0f6",
    highlight: "green",
    grey: {
      200: "#dfdfdf",
      400: "#cecece",
      500: "#a2a2a2",
      600: "#999999",
      700: "#666565",
    },
    error: "red",

    modes: {
      dark: {
        text: lightColor,
        background: darkColor,
        primary: lightColor,
        secondary: darkColor,
        muted: "#313030",
        accent: "#c37620",
      },
    },
  },

  breakpoints: ["40em", "52em", "64em"],

  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },

  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],

  fonts: {
    body: font,
    heading: `"Montserrat", ${font}`,
    monospace: "Consolas, Liberation Mono, Menlo, Courier, monospace",
  },

  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],

  sizes: {
    container: "1000px",
    logList: "400px",
    measure: "32em",
    header: "6rem",
  },

  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },

  buttons: {
    primary: baseButton,
    secondary: {
      color: "text",
      backgroundColor: "muted",
      cursor: "pointer",

      "&:hover": {
        bg: "black",
        color: "white",
      },
    },
    icon: {
      cursor: "pointer",
    },
    subtle: {
      ...baseButton,
      color: "text",
      bg: "transparent",
      py: 1,
      borderColor: "text",

      "&:hover": {
        boxShadow: "none",
      },
    },
  },

  links: {
    button: {
      ...baseButton,
      px: 3,
      textDecoration: "none",
      display: "inline-block",
    },
    header: {
      ...baseLink,
      textDecoration: "none",
      px: 3,
      py: 2,

      "&:hover": {
        ...baseLink["&:hover"],
        color: "text",
        bg: "accent",
      },
    },
    mdxItem: {
      ...baseLink,
      textDecoration: "none",

      "&:hover": {
        ...baseLink["&:hover"],
        bg: "accent",
      },
    },
    nav: {
      ...baseLink,
      px: 2,
      py: 1,
      fontSize: 2,
      textDecoration: "none",

      "&:hover": {
        ...baseLink["&:hover"],
      },
    },
    empty: {
      ...baseLink,
      textDecoration: "none",

      "&:hover": {
        ...baseLink["&:hover"],
      },
    },
  },

  forms: {
    input: baseInput,
    logInput: {
      ...baseInput,
    },
    slider: {
      color: "primary",
    },
    textarea: {
      borderRadius: 0,
      borderColor: "grey.600",
      resize: "vertical",
      maxHeight: "200px",
      fontSize: 2,
      fontFamily: "body",
    },
  },

  text: {
    heading,
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "heading",
      letterSpacing: "-0.03em",
      mt: 3,
    },
  },

  styles: {
    ...system.styles,
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "textStyles.display",
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3,
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2,
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1,
    },
    a: baseLink,
    p: {
      code: {
        color: "text",
        p: "2px",
        borderRadius: "4px",
      },
    },
    pre: {
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      backgroundColor: "muted",
      p: 2,
      borderRadius: "4px",
      fontSize: 2,
    },
    blockquote: {
      mt: 0,
      mx: 0,
      py: 0,
      pr: 0,
      pl: 3,
      borderLeft: "solid 4px hsla(0,0%,0%,0.13)",
      color: "hsla(0,0%,0%,0.53)",
    },
    ul: {
      pl: 0,
    },
    li: {
      pb: 1,
    },
  },
};

export default theme;
