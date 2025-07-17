import { createTheme, ThemeProvider } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

// to get the auto suggestion

/**
 * @template T
 * @param {{
 *   columns: import('material-react-table').MRT_ColumnDef<T>[],
 *   data: T[],
 * } & Partial<import('material-react-table').MRT_TableOptions<T>>} props
 */

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
