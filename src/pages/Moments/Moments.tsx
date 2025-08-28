import { useCurrentUser } from "../../Context/UserContext";
import { Avatar } from "@chakra-ui/react";
import Screen from "../../utils/Screen";

const Moments = () => {
  const { currentUser } = useCurrentUser();
  const fullName = `${currentUser?.firstName} ${currentUser?.firstName}`;
  return (
    <section className="bg-darkBlue w-full">
      <Screen>
        <div>
          <div>
            <Avatar
              src={currentUser?.userImg}
              mt={2}
              name={fullName}
              size="sm"
              zIndex={10}
            />
          </div>
        </div>
      </Screen>
    </section>
  );
};

export default Moments;
