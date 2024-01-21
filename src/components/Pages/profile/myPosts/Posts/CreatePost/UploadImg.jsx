import React, { useRef, useState } from "react";
import { CloseButton, Image } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

const UploadImg = ({ formik, imageName }) => {
  const [imageUrl, setImageUrl] = useState([]);
  const imgRef = useRef(null);

  const handleChange = (e) => {
    let selectedImage = e.target.files;

    if (selectedImage && selectedImage.length <= 5) {
      formik.setFieldValue(imageName, [...selectedImage]);

      Array.from(selectedImage).map((file) => {
        const newData = URL.createObjectURL(file);
        return setImageUrl((prev) => [...prev, newData]);
      });
    }
  };

  const handleCancel = (url) => {
    setImageUrl((prev) => prev.filter((item) => item !== url));
  };

  return (
    <div className="flex items-center gap-2">
      {/* upload image box  */}
      {imageUrl.length < 5 && (
        <div
          style={{
            width: "10rem",
            height: "10rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="bg-gray-100 shadow-sm cursor-pointer"
          onClick={() => imgRef?.current?.click()}>
          <div className="text-gray-500 flex items-center flex-col">
            <span style={{ fontSize: "3rem" }}>
              <FaCamera />
            </span>
            <span style={{ fontSize: "1.5rem" }}>{imageUrl.length}/5</span>
          </div>
        </div>
      )}
      <input
        name={imageName}
        onChange={handleChange}
        multiple
        ref={imgRef}
        type="file"
        hidden
      />
      {/* display images  */}
      {imageUrl.map((item, i) => (
        <div
          key={i}
          style={{ width: "10rem", height: "10rem" }}
          className="relative border">
          <Image
            w="100%"
            h="100%"
            objectFit="cover"
            src={item}
            key={i}
            alt="upload-image"
          />
          <CloseButton
            onClick={() => handleCancel(item)}
            size="sm"
            pos="absolute"
            variant="solid"
            top="-20px"
            right="-10px"
          />
        </div>
      ))}
    </div>
  );
};

export default UploadImg;
