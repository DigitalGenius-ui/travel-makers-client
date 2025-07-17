import { createTheme, ThemeProvider } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const TravleMakersTable = ({ columns, data, ...others }) => {
  const tableTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={data}
        initialState={{
          showGlobalFilter: true,
        }}
        {...others}
      />
    </ThemeProvider>
  );
};

export default TravleMakersTable;
