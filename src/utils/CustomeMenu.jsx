import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "14px",
    },
  },
});
const CustomeMenu = ({ value, menus = [], onChange, variant }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id={`select-small-label`}>Select</InputLabel>
        <Select
          variant={variant ?? "outlined"}
          value={value}
          onChange={onChange}
          size="small"
          labelId={`select-small-label`}
          sx={{ textTransform: "capitalize" }}
        >
          {menus.map((item, i) => (
            <MenuItem
              key={item + i}
              value={item}
              sx={{ textTransform: "capitalize" }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default CustomeMenu;
