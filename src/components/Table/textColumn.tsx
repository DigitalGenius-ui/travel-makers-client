import { format } from "date-fns";
import { type MRT_RowData } from "material-react-table";

type textProps = {
  accessorKey: string;
  header: string;
  size?: number;
  enableColumnFilter?: boolean;
  filterVariant?: string;
  enableSorting?: boolean;
  enableEditing?: boolean;
  render?: (data: MRT_RowData) => void;
  editVariant?: "text" | "select" | undefined;
  other?: any;
};

export const textColumn = ({
  accessorKey,
  header,
  size = 40,
  enableColumnFilter = false,
  filterVariant = "auto",
  enableSorting = true,
  enableEditing = false,
  render,
  editVariant = "text",
  ...other
}: textProps) => {
  return {
    accessorKey,
    header,
    enableSorting,
    enableColumnFilter,
    filterVariant,
    grow: true,
    enableEditing,
    editVariant,
    minSize: size,
    maxSize: size > 100 ? size - 70 : size,
    ...other,
    Cell: ({ renderedCellValue: cellValue, row }) => {
      const rowData = row.original;
      return <>{render ? render({ cellValue, rowData }) : (cellValue ?? "")}</>;
    },
  };
};

export const dateColumn = ({
  accessorKey,
  header,
  size = 40,
  enableColumnFilter = false,
  filterVariant = "auto",
  enableSorting = false,
  enableEditing = false,
}) => {
  return {
    accessorKey,
    header,
    enableSorting,
    enableColumnFilter,
    filterVariant,
    grow: true,
    enableEditing,
    minSize: size,
    maxSize: size > 100 ? size - 70 : size,
    Cell: ({ renderedCellValue }) => {
      const formateDate = format(renderedCellValue, "E, MMM dd, yy");
      return <span>{formateDate}</span>;
    },
  };
};
