export const textColumn = (
  accessorKey,
  header,
  size = 40,
  enableColumnFilter = false,
  filterVariant = "auto",
  enableSorting = false,
  enableEditing = false
) => {
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
    Cell: ({ renderedCellValue, row }) => {
      return <span>{renderedCellValue}</span>;
    },
  };
};
