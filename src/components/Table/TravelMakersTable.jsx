import { MaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";

// to get the auto suggestion

/**
 * @template T
 * @param {{
 *   columns: import('material-react-table').MRT_ColumnDef<T>[],
 *   data: T[],
 * } & Partial<import('material-react-table').MRT_TableOptions<T>>} props
 */

const TravleMakersTable = ({ columns, data, ...others }) => {
  const tableTheme = createTheme();
  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={data}
        initialState={{
          showGlobalFilter: true,
          pagination: { pageSize: 25, pageIndex: 2 },
        }}
        muiPaginationProps={{
          rowsPerPageOptions: [5, 10, 20],
        }}
        {...others}
      />
    </ThemeProvider>
  );
};

TravleMakersTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
};

export default TravleMakersTable;
