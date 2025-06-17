import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useCreateData from "../../../../Hooks/useCreateData";
import { USERS_KEYS } from "../../../../constants/react-query";
import { removeUser, userDetailsUpdate } from "../../../../api-call/user-api";

const TableRow = ({ user }) => {
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
    <tr
      key={user._id}
      className="border-b border-slate-200 hover:bg-gray-50 text-sm"
    >
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
      <td>
        {!edit ? (
          <Menu>
            <MenuButton className="w-full py-2 !grid !place-items-center">
              <BsThreeDots />
            </MenuButton>
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

export default TableRow;
