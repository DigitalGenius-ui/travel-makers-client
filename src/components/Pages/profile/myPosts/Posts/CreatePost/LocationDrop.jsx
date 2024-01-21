import React, { useEffect, useState } from "react";

const LocationDrop = ({ formik, data }) => {
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.title.toLowerCase().startsWith(formik.values.location.toLowerCase())
    );
    setNewData(filteredData);
  }, [data, formik.values.location, setNewData]);

  const handleClick = (item) => {
    formik.setFieldValue("location", item);
    setNewData([]);
  };

  return (
    <div className="bg-gray-100 absolute top-[3.5rem] left-0 right-0 z-[9999] shadow-md">
      {newData?.length > 0 && formik.values.location !== "" && (
        <div className="flex flex-col max-h-[10rem] overflow-y-auto">
          {newData?.map((item) => (
            <span
              onClick={() => handleClick(item.title)}
              key={item.title}
              className="hover:bg-gray-200 cursor-pointer p-2 text-xs">
              {item.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDrop;
