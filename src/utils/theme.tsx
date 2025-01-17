import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#50B5FF",
              borderRadius: "10px",
            },
            "&:hover fieldset": {
              borderColor: "#50B5FF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#50B5FF",
              boxShadow: `0 0 0 1px #50B5FF`,
            },
          },
          "& .MuiInputLabel-root": {
            color: "#50B5FF",
            "&.Mui-focused": {
              color: "#50B5FF",
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Poppins",
    ].join(","),
  },
});
