import Table from "../../../utils/Table";
import { TicketsTableRow } from "./TableRow";
import useTicketsData from "../../../Hooks/useTicketsData";
import Pagination from "../../../utils/Pagination";

const th = ["Owner", "Email", "Phone", "Status", "Created", "Actions"];

const RecentBookings = ({ showMore }) => {
  const { data, isPending } = useTicketsData();
  return (
    <>
      <Table isPending={isPending} title={"Recent Bookings"} th={th} viewAll>
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
      {showMore && (
        <div className="!pt-5">
          {data?.totalPages > 1 && (
            <Pagination
              totalPages={data?.totalPages}
              setCurrentPage={() => {}}
              currentPage={1}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RecentBookings;
