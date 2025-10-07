import { useMemo, useState } from "react";
import TravleMakersTable from "../../components/Table/TravelMakersTable";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import {
  MRT_GlobalFilterTextField,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";
import { Avatar, Button, MenuItem } from "@mui/material";
import { dateColumn, textColumn } from "../../components/Table/textColumn";
import { UserStatus } from "../../utils/StatusBox";
import useCreateData from "../../hooks/useCreateData";
import { USERS_KEYS } from "../../constants/react-query";
import { userDetailsUpdate } from "../../api-call/user-api";
import type { roleType, vertifyType } from "../../types/user-type";

const statusSelectOptions = ["VERIFIED", "UNVERIFIED", "BLOCKED"];
const roleSelectOptions = ["USER", "ADMIN", "EDITOR"];

type User = {
  fullName: string;
  id: string;
  email: string;
  phoneNumber: string;
  verified: vertifyType;
  role: roleType;
  createAt: Date;
  userImg: string;
};

const Travlers = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { pageIndex: page, pageSize: limit } = pagination;
  const { data, isPending, isFetching } = useGetAllUsers({
    page,
    limit,
    type: "travler",
    search: globalFilter,
  });

  const newData = data?.users?.map((item) => {
    const profile = item?.profile;
    // console.log(item);
    return {
      ...item,
      fullName: `${profile ? profile?.firstName : "No Name"} ${profile ? profile?.lastName : ""}`,
      phoneNumber: `${item?.profile?.phoneNumber}`,
      gender: `${profile ? profile?.gender : "No gender specified"}`,
    };
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      textColumn({
        accessorKey: "fullName",
        header: "Full Name",
        render: ({ rowData }) => {
          return (
            <div className="flex items-center gap-2">
              <Avatar
                src={rowData.userImg}
                alt="user profile"
                sx={{ width: 40, height: 40 }}
              />
              <h4>{rowData.fullName === null ? "User" : rowData.fullName}</h4>
            </div>
          );
        },
      }),
      textColumn({
        accessorKey: "id",
        header: "User ID",
      }),
      textColumn({
        accessorKey: "email",
        header: "Email",
        filterVariant: "text",
      }),
      textColumn({
        accessorKey: "phoneNumber",
        header: "Phone Number",
      }),
      textColumn({
        accessorKey: "role",
        header: "Role",
        enableEditing: true,
        editVariant: "select",
        muiEditTextFieldProps: () => ({
          select: true,

          children: roleSelectOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )),
        }),
      }),
      textColumn({
        accessorKey: "verified",
        header: "Verified",
        enableEditing: true,
        render: ({ cellValue }) => {
          return <UserStatus status={cellValue as vertifyType} />;
        },
        editVariant: "select",
        muiEditTextFieldProps: () => ({
          select: true,
          children: statusSelectOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )),
        }),
      }),
      dateColumn({
        accessorKey: "createAt",
        header: "Created At",
      }),
    ],
    []
  );

  // handle update data
  const { submitForm: updateUser, isPending: userPending } = useCreateData({
    key: USERS_KEYS,
    func: userDetailsUpdate,
  });

  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = async ({
    table,
    values,
  }) => {
    await updateUser({
      inputData: {
        userId: values.id,
        role: values.role,
        verified: values.verified,
      },
      dataMessage: "User has been updated",
    });
    table.setEditingRow(null);
  };
  return (
    <section>
      <TravleMakersTable
        columns={columns}
        data={newData || []}
        isPending={isPending || userPending}
        manualPagination={true}
        rowCount={data?.totalPages}
        onPaginationChange={setPagination}
        onGlobalFilterChange={setGlobalFilter}
        paginationDisplayMode="default"
        state={{ pagination, globalFilter, showProgressBars: isFetching }}
        renderTopToolbar={({ table }) => {
          return (
            <div className="p-5 flex items-center gap-2 justify-end">
              <MRT_GlobalFilterTextField
                table={table}
                placeholder="Search by Email..."
              />
              <Button variant="contained" color="primary">
                Add Travler
              </Button>
            </div>
          );
        }}
        enableRowActions={true}
        enableEditing={true}
        editDisplayMode="row"
        onEditingRowSave={handleSaveUser}
      />
    </section>
  );
};

export default Travlers;
