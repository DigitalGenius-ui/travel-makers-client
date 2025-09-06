import { CloseButton } from "@chakra-ui/react";
import React, { type SetStateAction } from "react";
import CustomeModal from "../../../../utils/CustomeModal";
import { ticketCondition } from "../../../../../HomeData.json";
import Screen from "../../../../utils/Screen";

type conditionProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  title?: string;
  tourTitle?: string;
};

const Conditions = ({
  showModal,
  setShowModal,
  title,
  tourTitle,
}: conditionProps) => {
  return (
    <CustomeModal showModal={showModal}>
      <Screen>
        <div className="bg-white h-fit p-4 relative">
          <h2 className="text-lg font-bold">Booking Information</h2>
          <h2 className="font-bold py-6 mt-3 capitalize">
            {tourTitle} {title} Ticket
          </h2>
          <div className="border-t border-gray-400">
            <h2 className="pt-5 font-bold">Booking Info :</h2>
            <ul className="flex flex-col  gap-2 mt-[1rem] h-[24rem] overflow-y-auto">
              {ticketCondition.map((item, i) => {
                const desc = item?.desc;
                return (
                  <div key={i}>
                    <li className="flex items-center gap-1 font-bold pb-3 text-sm">
                      <span>•</span>
                      {item.title}
                    </li>
                    <div className="pl-4 text-sm">
                      <li>{desc[0]}</li>
                      <li>{desc[1]}</li>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <CloseButton
            onClick={() => setShowModal(false)}
            colorScheme="red"
            pos="absolute"
            top="1rem"
            right="2rem"
            fontSize="sm"
          />
        </div>
      </Screen>
    </CustomeModal>
  );
};

export default Conditions;
