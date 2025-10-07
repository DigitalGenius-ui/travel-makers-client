import { format } from "date-fns";
import { type MRT_ColumnDef, type MRT_RowData } from "material-react-table";
import type { ReactNode } from "react";

type FilterVariant = MRT_ColumnDef<any>["filterVariant"];

type textProps<TData extends MRT_RowData> = {
  accessorKey: string;
  header: string;
  size?: number;
  enableColumnFilter?: boolean;
  filterVariant?: FilterVariant;
  enableSorting?: boolean;
  enableEditing?: boolean;
  muiEditTextFieldProps?: () => void;
  render?: (params: { cellValue: ReactNode; rowData: TData }) => ReactNode;
  editVariant?: "text" | "select" | undefined;
};

export const textColumn = <T extends MRT_RowData>({
  accessorKey,
  header,
  size = 40,
  enableColumnFilter = false,
  filterVariant = "text",
  enableSorting = true,
  enableEditing = false,
  render,
  editVariant = "text",
}: textProps<T>): MRT_ColumnDef<T> => {
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
    Cell: ({ renderedCellValue: cellValue, row }) => {
      const rowData = row.original;
      return <>{render ? render({ cellValue, rowData }) : (cellValue ?? "")}</>;
    },
  };
};

type dateColType = {
  accessorKey: string;
  header: string;
  size?: number;
  enableColumnFilter?: boolean;
  filterVariant?: FilterVariant;
  enableSorting?: boolean;
  enableEditing?: boolean;
};

export const dateColumn = <T extends MRT_RowData>({
  accessorKey,
  header,
  size = 40,
  enableColumnFilter = false,
  filterVariant = "text",
  enableSorting = false,
  enableEditing = false,
}: dateColType): MRT_ColumnDef<T> => {
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
      if (
        typeof renderedCellValue === "string" ||
        renderedCellValue instanceof Date
      ) {
        const date = new Date(renderedCellValue);
        const formatted = format(date, "E, MMM dd, yy");
        return <span>{formatted}</span>;
      }
      return <span>{renderedCellValue ?? ""}</span>;
    },
  };
};
