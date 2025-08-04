import { createTheme, MenuItem, Select, ThemeProvider } from "@mui/material";

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
      <Select
        variant={variant ?? "outlined"}
        value={value}
        onChange={onChange}
        size="small"
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
    </ThemeProvider>
  );
};

export default CustomeMenu;
