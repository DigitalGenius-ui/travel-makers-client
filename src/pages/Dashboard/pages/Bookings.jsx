import { useEffect, useMemo, useState } from "react";
import TravleMakersTable from "../../../components/Table/TravelMakersTable";
import useTicketsData from "../../../Hooks/useTicketsData";
import { dateColumn, textColumn } from "../../../components/Table/textColumn";
import { parsDateHandler } from "../../../utils/Date";
import { format, isAfter } from "date-fns";
import useCreateData from "../../../Hooks/useCreateData";
import {
  removeUserTicket,
  updateUserTickets,
} from "../../../api-call/user-api";
import TicketCard from "../../../components/Pages/profile/myBookings/TicketCard";
import { TICKETS_KEYS } from "../../../constants/react-query";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TicketStatus from "../../../utils/TicketStatus";
import { MRT_GlobalFilterTextField } from "material-react-table";
import CustomeMenu from "../../../utils/CustomeMenu";
import Insight from "../../../components/Dashboard/Main/Insight";

const Bookings = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const { data, isPending } = useTicketsData(
    pagination.pageSize,
    pagination.pageIndex,
    globalFilter
  );

  const newData = data?.tickets?.map((item) => ({
    ...item,
    owner: `${item.firstName} ${item.lastName}`,
    ticketNumber: item.verifyNumber,
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
        enableColumnFilter: true,
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
      textColumn(
        "ticketNumber",
        "Ticket Number",
        30,
        false,
        "text",
        true,
        false
      ),
      dateColumn("createAt", "Created", 30, false, "text", true, false),
    ],
    []
  );

  const [edit, setEdit] = useState(false);

  const renderDetails = ({ row }) => {
    const { status, travelDate, id } = row;

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
                menus={["verified", "pending", "canceled"]}
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
  };

  const renderToolbar = ({ table }) => {
    return (
      <div className="p-5 flex items-center gap-2 justify-end">
        <MRT_GlobalFilterTextField table={table} />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="status-select-small-label">Status</InputLabel>
          <Select
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            size="small"
            labelId="status-select-small-label"
          >
            <MenuItem value="verified">Verify</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="canceled">Cancel</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <div className="my-5 space-y-4">
      <Insight booking={true} />
      <TravleMakersTable
        columns={columns}
        data={newData || []}
        renderDetailPanel={({ row }) => renderDetails({ row: row?.original })}
        manualPagination={true}
        rowCount={data?.totalTickets}
        onPaginationChange={setPagination}
        onGlobalFilterChange={setGlobalFilter}
        paginationDisplayMode="default"
        state={{ pagination, globalFilter, showProgressBars: isPending }}
        renderTopToolbar={({ table }) => renderToolbar({ table })}
      />
    </div>
  );
};

export default Bookings;
