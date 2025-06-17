import React from "react";
import Pagination from "../../../../utils/Pagination";
import Table from "../../../../utils/Table";

const th = ["Avatar", "Email", "Verified", "Role", "Created", "Actions"];

const ManageTickets = () => {
  return (
    <section className="!p-4">
      <Table title={"Manage Users"} th={th}>
        {data?.users?.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No users found.
            </td>
          </tr>
        )}
        {data?.users?.map((user, i) => (
          <TableRow key={`${user.id}_${i}`} user={user} />
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
