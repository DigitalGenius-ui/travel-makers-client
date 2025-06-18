import Pagination from "../../../../utils/Pagination";
import Table from "../../../../utils/Table";
import { useQuery } from "@tanstack/react-query";
import { TICKETS_KEYS } from "../../../../constants/react-query";
import { getUserTickets } from "../../../../api-call/user-api";
import { TicketsTableRow } from "./TableRow";
import { useState } from "react";

const th = ["Owner", "Email", "Phone", "Verified", "Created", "Actions"];

const ManageTickets = () => {
  const [page, setPage] = useState(1);
  let limit = 8;

  const { data, isPending } = useQuery({
    queryKey: [TICKETS_KEYS, page, limit],
    queryFn: async () => await getUserTickets(page, limit),
  });

  return (
    <section className="!p-4">
      <Table isPending={isPending} title={"Manage Tickets"} th={th}>
        {data?.tickets?.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No ticket is found.
            </td>
          </tr>
        )}
        {data?.tickets?.map((ticket, i) => (
          <TicketsTableRow key={`${ticket.id}_${i}`} ticket={ticket} />
        ))}
      </Table>
      <div className="!pt-5">
        {data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            setCurrentPage={setPage}
            currentPage={page}
          />
        )}
      </div>
    </section>
  );
};

export default ManageTickets;
