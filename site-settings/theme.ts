import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Cairo", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#d3af37",
    },
    secondary: {
      main: "#1b1b1b",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#00962a",
    },
    background: {
      default: "#F1F1F1",
    },
  },
});

export default theme;
