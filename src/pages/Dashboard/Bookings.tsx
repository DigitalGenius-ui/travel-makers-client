import { useEffect, useMemo, useState } from "react";
import TravleMakersTable from "../../components/Table/TravelMakersTable";
import useTicketsData from "../../Hooks/useTicketsData";
import { dateColumn, textColumn } from "../../components/Table/textColumn";
import { parsDateHandler } from "../../utils/Date";
import { format, isAfter } from "date-fns";
import useCreateData from "../../Hooks/useCreateData";
import { removeUserTicket, updateUserTickets } from "../../api-call/user-api";
import TicketCard from "../../components/Pages/profile/myBookings/TicketCard";
import { TICKETS_KEYS } from "../../constants/react-query";
import { Button, TextField } from "@mui/material";
import { TicketStatus } from "../../utils/StatusBox";
import {
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  type MRT_Row,
} from "material-react-table";
import CustomeMenu from "../../utils/CustomeMenu";
import Insight from "../../components/Dashboard/Main/Insight";
import { useNavigate, useParams } from "react-router-dom";

type bookingProps = {
  mainBooking?: boolean;
};

const Bookings = ({ mainBooking }: bookingProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isPending, isFetching } = useTicketsData(
    pagination.pageSize,
    pagination.pageIndex,
    globalFilter
  );

  const newData = data?.tickets?.map((item: any) => ({
    ...item,
    owner: `${item.firstName} ${item.lastName}`,
    ticketNumber: item.verifyNumber,
  }));

  const columns = useMemo(
    () => [
      textColumn({
        accessorKey: "owner",
        header: "Owner",
        enableSorting: true,
      }),
      textColumn({
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      }),
      textColumn({
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
        render: ({ rowData }) => {
          return (
            <TicketStatus
              status={rowData.status}
              travelDate={rowData.travelDate}
            />
          );
        },
      }),
      textColumn({
        accessorKey: "ticketNumber",
        header: "Ticket Number",
        enableSorting: true,
      }),
      dateColumn({
        accessorKey: "createAt",
        header: "Created",
        enableSorting: true,
      }),
    ],
    []
  );

  const [edit, setEdit] = useState(false);

  const menus = ["verified", "pending", "canceled"];

  function renderDetails({ row }) {
    const { status, travelDate, id } = row.original;

    const { parsDate } = parsDateHandler(travelDate);
    const isTicketExpired = isAfter(new Date(), parsDate);

    const [data, setData] = useState({
      status,
      travelDate: "",
      id,
    });

    useEffect(() => {
      if (travelDate) {
        const tDate = new Date(travelDate);
        const formatted = format(new Date(tDate), "yyyy-MM-dd'T'HH:mm");
        setData((prev) => ({ ...prev, travelDate: formatted }));
      }
    }, [travelDate]);

    const { submitForm, isPending } = useCreateData({
      key: TICKETS_KEYS,
      func: updateUserTickets,
    });

    const { submitForm: removeTicket, isPending: isRemoving } = useCreateData({
      key: TICKETS_KEYS,
      func: removeUserTicket,
    });

    const handleUpdate = async () => {
      const convertedDate = format(data.travelDate, "E, MMM dd yyyy HH:mm:ss");
      await submitForm({
        inputData: {
          ...data,
          travelDate: convertedDate,
        },
        dataMessage: "Ticket has been updated!",
      });
    };

    const handleRemove = async () => {
      await removeTicket({
        inputData: id,
        dataMessage: "Ticket has been removed!",
      });
    };

    return (
      <>
        <div className="py-4 w-full flex items-end justify-end gap-3">
          {edit && (
            <>
              <Button
                disabled={isRemoving}
                onClick={handleRemove}
                variant={"outlined"}
                size={"small"}
                color="warning"
              >
                {isRemoving ? "Deleting..." : "Delete"}
              </Button>
              <Button
                onClick={handleUpdate}
                variant={"contained"}
                color="success"
                disabled={isPending}
                size="small"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </>
          )}
          <Button
            onClick={() => setEdit((prev) => !prev)}
            variant={"contained"}
            size={"small"}
            color="primary"
          >
            {edit ? "Close Edit" : "Edit"}
          </Button>
        </div>
        {/* edit part  */}
        {edit && (
          <div className="p-6 flex items-center gap-4">
            <div className="space-y-3">
              <h2>Is ticket Verified?</h2>
              <CustomeMenu
                disabled={isTicketExpired}
                value={data.status}
                menus={menus}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-3">
              <h2>Trip date :</h2>
              <TextField
                className="border border-gray-200 p-1 text-sm rounded-sm"
                value={data.travelDate}
                type="datetime-local"
                size="small"
                slotProps={{
                  htmlInput: { min: format(new Date(), "yyyy-MM-dd'T'HH:mm") },
                }}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    travelDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        )}
        <TicketCard book={row} />
      </>
    );
  }

  function renderToolbar({ table }: { table: any }) {
    return (
      <div className="p-5 flex items-center gap-2 justify-end">
        <MRT_GlobalFilterTextField table={table} />
        {!mainBooking ? (
          <>
            <CustomeMenu
              value={globalFilter}
              setValue={setGlobalFilter}
              menus={menus}
            />
          </>
        ) : (
          <Button
            onClick={() => navigate(`/bookings/${id}`)}
            variant="contained"
            color="primary"
          >
            See All Bookings
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="my-5 space-y-4">
      {!mainBooking && <Insight booking={true} />}
      <TravleMakersTable
        columns={columns}
        data={newData || []}
        isPending={isPending}
        renderDetailPanel={({ row }) => renderDetails({ row: row })}
        enablePagination={mainBooking ? false : true}
        manualPagination={true}
        rowCount={data?.totalTickets}
        onPaginationChange={setPagination}
        onGlobalFilterChange={setGlobalFilter}
        paginationDisplayMode="default"
        state={{ pagination, globalFilter, showProgressBars: isFetching }}
        renderTopToolbar={({ table }) => renderToolbar({ table })}
      />
    </div>
  );
};

export default Bookings;
