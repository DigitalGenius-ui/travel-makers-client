import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  type SelectChangeEvent,
} from "@mui/material";
import type { SetStateAction } from "react";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "14px",
    },
  },
});

type BaseProps = {
  value: string;
  menus: string[];
  variant?: "outlined" | "filled" | "standard" | undefined;
  disabled?: boolean;
};

// Either `setValue` or `onChange` must be provided
type WithSetValue = {
  setValue: React.Dispatch<SetStateAction<string>>;
  onChange?: never;
};

type WithOnChange = {
  onChange: (e: SelectChangeEvent<string>) => void;
  setValue?: never;
};

type menuProps = BaseProps & (WithSetValue | WithOnChange);

const CustomeMenu = ({
  value,
  menus = [],
  setValue,
  variant,
  disabled,
  onChange,
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
          onChange={(e) => {
            if (setValue) {
              setValue(e.target.value);
            }
            if (onChange) {
              onChange(e);
            }
          }}
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
