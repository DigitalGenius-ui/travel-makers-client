import { CloseButton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import useCreateData from "../../../../Hooks/useCreateData";
import {
  profileDetailsUpdate,
  updateProfileImage,
} from "../../../../FetchData/User/UserDetailsClient";
import { useParams } from "react-router-dom";
import axios from "axios";

const ImagePicker = ({ isEdit, setForm, form }) => {
  const [getImgUrl, setGetImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
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

  const { submitForm } = useCreateData({
    key: "user",
    func: profileDetailsUpdate,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (getImgUrl) {
        const res = await axios.post(`/api/user/uploadImage`, {
          userImg: getImgUrl,
        });
        const values = {
          userId: form.userId,
          userImg: res.data.result.secure_url,
        };
        await submitForm({
          inputData: values,
          dataMessage: "Image has been updated!",
        });
      }
      setLoading(false);
      setGetImgUrl("");
    })();
  }, [getImgUrl]);

  return (
    <>
      <input
        onChange={(e) => handleImageUpload(e)}
        ref={imgPick}
        hidden
        type="file"
      />
      {!isEdit && (
        <div className="relative w-fit">
          <label className="text-xs text-gray-500">Choose Profile Image</label>
          <div
            onClick={imagePicker}
            style={{
              backgroundImage: `url(${getImgUrl || form.userImg})`,
              cursor: "pointer",
            }}
            className={`w-[7rem] h-[7rem] bg-gray-100 text-xs grid 
            place-items-center bg-no-repeat bg-cover mt-2 border
            ${classNames({ "opacity-45": loading })}
            `}>
            {!getImgUrl && !form.userImg && "Choose Image"}
          </div>
          {getImgUrl && (
            <CloseButton
              onClick={() => setGetImgUrl("")}
              size="sm"
              pos="absolute"
              top={5}
              right={0}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ImagePicker;
