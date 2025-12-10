import React, { useRef, useState } from "react";
import { CloseButton, Image } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

type unploadProps = {
  formik: any;
  imageName: string;
};

const UploadImg = ({ formik, imageName }: unploadProps) => {
  type imgUrlType = (string | ArrayBuffer | null)[];
  const [imageUrl, setImageUrl] = useState<imgUrlType>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = e.target.files;

    if (selectedImages && selectedImages.length <= 5) {
      imageBase64(selectedImages);
    }
  };

  const imageBase64 = (selectedImages: FileList) => {
    let base64 = [];

    if (selectedImages.length > 0) {
      Array.from({ length: selectedImages.length }).forEach((_, index) => {
        const reader = new FileReader();

        const file = selectedImages[index];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          base64.push(reader.result);

          if (base64.length === selectedImages.length) {
            setImageUrl(base64);
            formik.setFieldValue(imageName, [...base64]);
          }
        };
      });
    } else {
      setImageUrl([]);
    }
  };

  const handleCancel = (url: string) => {
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
          onClick={() => imgRef?.current?.click()}
        >
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
          className="relative border"
        >
          <Image
            w="100%"
            h="100%"
            objectFit="cover"
            src={item as string}
            key={i}
            alt="upload-image"
          />
          <CloseButton
            onClick={() => handleCancel(item as string)}
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
