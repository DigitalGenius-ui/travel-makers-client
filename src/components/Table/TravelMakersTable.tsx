import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
} from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { FaCircleNotch } from "react-icons/fa";
import clsx from "clsx";

// to get the auto suggestion

/**
 * @template T
 * @param {{
 *   columns: import('material-react-table').MRT_ColumnDef<T>[],
 *   data: T[],
 * } & Partial<import('material-react-table').MRT_TableOptions<T>>} props
 */

type tableProps<TColumns, TData, TOther> = {
  columns: MRT_ColumnDef<MRT_RowData, TColumns>[];
  data: MRT_RowData[];
  isPending: boolean;
  others: TOther;
};

const TravleMakersTable = <TColumns, TData, TOther>({
  columns,
  data,
  isPending,
  ...others
}: tableProps<TColumns, TData, TOther>) => {
  const tableTheme = createTheme();
  return (
    <ThemeProvider theme={tableTheme}>
      <div
        className={clsx(
          "!relative",
          isPending && "opacity-70 pointer-events-none"
        )}
      >
        {isPending && (
          <p
            className="absolute top-0 left-[40%] bg-white p-2 flex items-center gap-1 
          shadow-md rounded-md animate-pulse pointer-events-none"
          >
            <span className="animate-spin">
              <FaCircleNotch />
            </span>
            Loading...
          </p>
        )}
        <MaterialReactTable
          columns={columns}
          data={data}
          initialState={{
            showGlobalFilter: true,
            pagination: { pageSize: 25, pageIndex: 1 },
          }}
          muiPaginationProps={{
            rowsPerPageOptions: [5, 10, 20],
          }}
          {...others}
        />
      </div>
    </ThemeProvider>
  );
};

TravleMakersTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
};

export default TravleMakersTable;
