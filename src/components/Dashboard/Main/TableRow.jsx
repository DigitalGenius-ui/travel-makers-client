import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { format, isAfter, parse } from "date-fns";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useCreateData from "../../../Hooks/useCreateData";
import { TICKETS_KEYS, USERS_KEYS } from "../../../constants/react-query";
import {
  removeUser,
  removeUserTicket,
  updateUserTickets,
  userDetailsUpdate,
} from "../../../api-call/user-api";
import Bookings from "../../Pages/profile/myBookings/Bookings";
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import { parsDateHandler } from "../../../utils/Date";
import TicketStatus from "../../../utils/TicketStatus";

export const UserTableRow = ({ user }) => {
  const [edit, setEdit] = useState(false);

  const [data, setData] = useState({
    verified: user?.verified,
    role: user?.role,
    userId: user.id,
  });

  const { submitForm: updateUser, isPending: userPending } = useCreateData({
    key: USERS_KEYS,
    func: userDetailsUpdate,
  });

  const { submitForm: deletUser, isPending: deletePending } = useCreateData({
    key: USERS_KEYS,
    func: removeUser,
  });

  const handleUpdate = async () => {
    await updateUser({
      inputData: data,
      dataMessage: "User updated successfully!",
    });
    setEdit(false);
  };

  const handleDelete = async () => {
    await deletUser({
      inputData: user.id,
      dataMessage: "User deleted successfully!",
    });
    setEdit(false);
  };
  return (
    <tr className="border-b border-slate-200 hover:bg-gray-50 text-sm">
      <td className="p-2">
        <Avatar src={user?.userImg} size="sm" />
      </td>
      <td className="p-2">{user?.email}</td>
      <td className="p-2">
        {!edit ? (
          data?.verified
        ) : (
          <Select
            value={data.verified}
            onChange={(e) =>
              setData((prev) => ({ ...prev, verified: e.target.value }))
            }
            size="sm"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        )}
      </td>
      <td className="p-2">
        {!edit ? (
          data?.role
        ) : (
          <Select
            size="sm"
            value={data.role}
            onChange={(e) =>
              setData((prev) => ({ ...prev, role: e.target.value }))
            }
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
          </Select>
        )}
      </td>
      <td className="p-2">{format(user?.createAt, "LLL dd, yyyy")}</td>
      <td className="!w-full !h-[3rem] flex justify-center items-center">
        {!edit ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                <Tooltip label="edit">
                  <BsThreeDots />
                </Tooltip>
              }
              variant="outline"
              size={"sm"}
            />
            <MenuList color="black" fontSize="0.9rem">
              <MenuItem onClick={() => setEdit(true)}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>
                {deletePending ? "Deleting..." : "Delete"}
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              size={"sm"}
              isLoading={userPending}
              onClick={handleUpdate}
              className=" !bg-green-200 !text-green-600 "
            >
              <FaRegSave />
            </Button>
            <Button
              size={"sm"}
              onClick={() => setEdit(false)}
              className="!bg-rose-300 !text-rose-600"
            >
              <MdCancel />
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
};

export const TicketsTableRow = ({ ticket }) => {
  const [open, setOpen] = useState("");
  const [edit, setEdit] = useState(false);

  const {
    firstName,
    lastName,
    email,
    phone,
    status,
    createAt,
    verifyNumber,
    travelDate,
    id,
  } = ticket;

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

  const handleOpen = (num) => {
    setOpen((prev) => (prev !== num ? num : ""));
  };

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
      <tr className="-w-[]border-b border-slate-200 hover:bg-gray-50 text-sm">
        <td className="p-2">{`${firstName} ${lastName}`}</td>
        <td className="p-2">{email}</td>
        <td className="p-2">{phone}</td>
        <td className="">
          <TicketStatus status={status} travelDate={travelDate} />
        </td>
        <td className="p-2">{format(createAt, "LLL dd, yyyy")}</td>
        <td className="p-2 clear-startw-full h-ful grid place-items-center">
          <Tooltip label="expand more">
            <Button
              onClick={() => handleOpen(verifyNumber)}
              variant="outline"
              size={"sm"}
            >
              <span
                className={clsx(
                  `transition-all duration-500`,
                  open === verifyNumber && "rotate-180"
                )}
              >
                <IoIosArrowDown />
              </span>
            </Button>
          </Tooltip>
        </td>
      </tr>
      {/* edit part  */}
      {open === verifyNumber && (
        <tr className="bg-amber-50/40">
          <td colSpan={6} className={"p-4"}>
            <div className="py-4 w-full flex items-end justify-end gap-3">
              {edit && (
                <>
                  <Button
                    disabled={isRemoving}
                    onClick={handleRemove}
                    variant={"solid"}
                    size={"sm"}
                    colorScheme="red"
                  >
                    {isRemoving ? "Deleting..." : "Delete"}
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    variant={"solid"}
                    size={"sm"}
                    colorScheme="green"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
              <Button
                onClick={() => setEdit((prev) => !prev)}
                variant={"solid"}
                size={"sm"}
                colorScheme="blue"
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
                    size="sm"
                  >
                    <option value="verified">Verify</option>
                    <option value="pending">Pending</option>
                    <option value="canceled">Cancel</option>
                  </Select>
                </div>
                <div className="space-y-3">
                  <h2>Trip date :</h2>
                  <input
                    className="border border-gray-200 p-1 text-sm rounded-sm"
                    value={data.travelDate}
                    type="date"
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
            <Bookings book={ticket} />
          </td>
        </tr>
      )}
    </>
  );
};
