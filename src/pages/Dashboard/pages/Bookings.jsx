import { useMemo, useState } from "react";
import TravleMakersTable from "../../../components/Table/TravelMakersTable";
import useTicketsData from "../../../Hooks/useTicketsData";
import { textColumn } from "../../../components/Table/textColumn";
import { parsDateHandler } from "../../../utils/Date";
import { format, isAfter, parse } from "date-fns";
import useCreateData from "../../../Hooks/useCreateData";
import {
  removeUserTicket,
  updateUserTickets,
} from "../../../api-call/user-api";
import TicketCard from "../../../components/Pages/profile/myBookings/TicketCard";
import { TICKETS_KEYS } from "../../../constants/react-query";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import TicketStatus from "../../../utils/TicketStatus";

const Bookings = () => {
  const { data, isPending } = useTicketsData();

  const newData = data?.tickets?.map((item) => ({
    ...item,
    owner: `${item.firstName} ${item.lastName}`,
  }));

  const columns = useMemo(
    () => [
      textColumn("owner", "Owner", 30, false, "text", true, false),
      textColumn("email", "Email", 30, false, "text", true, false),
      {
        accessorKey: "status",
        header: "Status",
        size: 40,
        filterVariant: "text",
        enableSorting: true,
        Cell: ({ row }) => {
          const rowData = row.original;
          return (
            <TicketStatus
              status={rowData.status}
              travelDate={rowData.travelDate}
            />
          );
        },
      },
      textColumn("createAt", "Created", 30, false, "text", true, false),
    ],
    []
  );

  const [edit, setEdit] = useState(false);

  const RenderDetails = ({ row }) => {
    const { status, travelDate, id } = row;

    const { parsDate } = parsDateHandler(travelDate);
    const isTicketExpired = isAfter(new Date(), parsDate);

    // convet date
    const year = new Date().getFullYear();
    const parsedDate = parse(
      `${travelDate} ${year}`,
      "EEE, MMM dd yyyy",
      new Date()
    );
    const formattedDate = format(parsedDate, "yyyy-MM-dd");

    const [data, setData] = useState({
      status,
      travelDate: formattedDate,
      id,
    });

    const { submitForm, isPending } = useCreateData({
      key: TICKETS_KEYS,
      func: updateUserTickets,
    });

    const { submitForm: removeTicket, isPending: isRemoving } = useCreateData({
      key: TICKETS_KEYS,
      func: removeUserTicket,
    });

    const handleUpdate = async () => {
      await submitForm({
        inputData: {
          ...data,
          travelDate: format(data.travelDate, "E, MMM dd"),
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
              <Select
                disabled={isTicketExpired}
                bg="white"
                value={data.status}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                size="small"
              >
                <MenuItem value="verified">Verify</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="canceled">Cancel</MenuItem>
              </Select>
            </div>
            <div className="space-y-3">
              <h2>Trip date :</h2>
              <TextField
                className="border border-gray-200 p-1 text-sm rounded-sm"
                value={data.travelDate}
                type="date"
                size="small"
                min={format(new Date(), "yyyy-MM-dd")}
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
  };

  return (
    <div className="my-5">
      <TravleMakersTable
        columns={columns}
        data={newData || []}
        renderDetailPanel={({ row }) => <RenderDetails row={row?.original} />}
      />
    </div>
  );
};

export default Bookings;
