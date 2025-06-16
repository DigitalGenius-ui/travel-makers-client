import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { USERS_KEYS } from "../../../../constants/react-query";
import { getAllUsers } from "../../../../api-call/user-api";
import { useState } from "react";
import TableRow from "./TableRow";
import Pagination from "../../../../utils/Pagination";
import clsx from "clsx";

const ManageUsers = () => {
  const [page, setPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: [USERS_KEYS, page],
    queryFn: async () => await getAllUsers(page),
    placeholderData: {
      keepPreviousData: true,
    },
  });

  return (
    <section className="!p-4">
      <h1
        className="border border-slate-200 p-5 rounded-t-lg text-lg bg-slate-100 
        text-gray-700 uppercase font-semibold"
      >
        Manage Users
      </h1>
      <div className="border border-slate-200 p-2">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Avatar</th>
              <th className="p-2">Email</th>
              <th className="p-2">Verified</th>
              <th className="p-2">Role</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className={clsx(isPending && "opacity-50")}>
            {data?.users?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
            {data?.users?.map((user) => (
              <TableRow key={`${user.id}_${i}`} user={user} />
            ))}
          </tbody>
        </table>

        <div className="!pt-5">
          {data?.totalPages > 1 && (
            <Pagination
              totalPages={data?.totalPages}
              setCurrentPage={setPage}
              currentPage={page}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageUsers;
