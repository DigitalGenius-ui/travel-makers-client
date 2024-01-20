import { CloseButton } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { uploadSingleImage } from "../../../../Helpers/uploadImage";
import classNames from "classnames";
import useCreateData from "../../../../Hooks/useCreateData";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import { profileDetailsUpdate } from "../../../../FetchData/Profile/profile";

const ImagePicker = ({ isEdit, setForm, form }) => {
  const [getImgUrl, setGetImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const imgPick = useRef();
  const currentUser = useCurrentUser();

  const imagePicker = () => {
    imgPick?.current?.click();
  };

  const { submitForm } = useCreateData({
    key: "profile",
    func: profileDetailsUpdate,
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (getImgUrl) {
        const imageUrl = await uploadSingleImage(form.userImg);
        const values = { userId: form.userId, userImg: imageUrl };
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
        onChange={(e) => {
          setGetImgUrl(URL.createObjectURL(e.target.files[0]));
          setForm((prev) => ({ ...prev, userImg: e.target.files[0] }));
        }}
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
