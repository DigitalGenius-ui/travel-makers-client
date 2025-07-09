import { Button } from "@chakra-ui/react";
import { TableLoading } from "./Loadings";

const Table = ({ children, title, th, isPending, viewAll }) => {
  return (
    <div>
      <div
        className="flex items-center justify-between bg-slate-100 
        border border-slate-200 p-5 rounded-t-lg "
      >
        <h1 className="text-lg uppercase font-semibold text-gray-700">
          {title}
        </h1>
        {viewAll && (
          <Button
            variant={"solid"}
            bgColor={"blue.500"}
            color={"white"}
            size={"sm"}
          >
            View All
          </Button>
        )}
      </div>
      {isPending ? (
        <TableLoading />
      ) : (
        <div className="border border-slate-200 p-2">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                {th.map((header, index) => (
                  <th key={`header_${index}`} className="p-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
