import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRef, useState } from "react";
import classNames from "classnames";
import useCreateData from "../../../../Hooks/useCreateData";
import { updateProfileImage } from "../../../../api-call/user-api";
import { USER_KEY } from "../../../../constants/react-query";
import { useCurrentUser } from "../../../../Context/UserContext";
import { FiUpload } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const ImagePicker = ({ isEdit, form }) => {
  const { currentUser } = useCurrentUser();
  const [getImgUrl, setGetImgUrl] = useState("");
  const imgPick = useRef();

  const imagePicker = () => {
    imgPick?.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    imageBase24(file);
  };

  const imageBase24 = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setGetImgUrl(reader.result);
      };
    } else {
      setGetImgUrl("");
    }
  };

  const { submitForm, isPending } = useCreateData({
    key: USER_KEY,
    func: updateProfileImage,
  });

  const userImg = getImgUrl;

  const handleUpload = async () => {
    if (getImgUrl) {
      await submitForm({
        dataMessage: "image profile has been updated!",
        inputData: userImg,
      });
    }
    setGetImgUrl("");
  };

  return (
    <>
      <input
        onChange={(e) => handleImageUpload(e)}
        ref={imgPick}
        hidden
        type="file"
      />
      {!isEdit && (
        <div className="flex gap-4">
          <div className="relative w-fit">
            <label className="text-xs text-gray-500">
              Choose Profile Image
            </label>
            <div
              onClick={imagePicker}
              style={{
                backgroundImage: `url(${
                  getImgUrl || form.userImg || currentUser?.userImg
                })`,
                cursor: "pointer",
              }}
              className={`w-[7rem] h-[7rem] bg-gray-100 text-xs grid hover:opacity-80
              place-items-center bg-no-repeat bg-cover mt-2 border
              ${classNames({ "opacity-45 pointer-events-none": isPending })}
              `}
            >
              {!getImgUrl && !form.userImg && "Choose Image"}
            </div>
          </div>
          <div className="space-x-2">
            {getImgUrl && (
              <>
                <Tooltip label="Rest image">
                  <IconButton size={"sm"} onClick={() => setGetImgUrl("")}>
                    <IoCloseOutline size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip label="Upload Image">
                  <IconButton
                    onClick={handleUpload}
                    size={"sm"}
                    color={"green"}
                  >
                    <FiUpload />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePicker;
