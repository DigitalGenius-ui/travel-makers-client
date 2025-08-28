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

type menuProps = {
  value: string;
  menus: string[];
  setValue: React.Dispatch<React.SetStateAction<string>>;
  variant?: "outlined" | "filled" | "standard" | undefined;
  disabled?: boolean;
};

const CustomeMenu = ({
  value,
  menus = [],
  setValue,
  variant,
  disabled,
}: menuProps) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl
        disabled={disabled}
        sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
        size="small"
      >
        <InputLabel id={`select-small-label`}>Select</InputLabel>
        <Select
          variant={variant ?? "outlined"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
