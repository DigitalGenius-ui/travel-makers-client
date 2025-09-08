import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions,
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

type tableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isPending: boolean;
} & Partial<MRT_TableOptions<T>>;

const TravleMakersTable = <T extends MRT_RowData>({
  columns,
  data,
  isPending,
  ...others
}: tableProps<T>) => {
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
