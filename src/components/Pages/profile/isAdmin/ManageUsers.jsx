import { useQuery } from "@tanstack/react-query";
import { USERS_KEYS } from "../../../../constants/react-query";
import { getAllUsers } from "../../../../api-call/user-api";
import { useState } from "react";
import { UserTableRow } from "../../../Dashboard/Main/TableRow";
import Pagination from "../../../../utils/Pagination";
import Table from "../../../../utils/Table";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isPending } = useQuery({
    queryKey: [USERS_KEYS, page, limit],
    queryFn: async () => await getAllUsers(page, limit),
    placeholderData: {
      keepPreviousData: true,
    },
  });

  const th = ["Avatar", "Email", "Verified", "Role", "Created", "Actions"];

  return (
    <section className="!p-4">
      <Table isPending={isPending} title={"Manage Users"} th={th}>
        {data?.users?.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No users found.
            </td>
          </tr>
        )}
        {data?.users?.map((user, i) => (
          <UserTableRow key={`${user.id}_${i}`} user={user} />
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

export default ManageUsers;
