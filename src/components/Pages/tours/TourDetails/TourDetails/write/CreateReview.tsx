import Head from "../../../../../../utils/Head";
import WhiteBg from "../../../../../../utils/WhiteBg";
import { Link, useParams } from "react-router-dom";
import useGetTours from "../../../../../../Hooks/useGetTours";
import Form from "./Form";
import { useCurrentUser } from "../../../../../../Context/UserContext";
import ErrorLabel from "../../../../../../utils/ErrorLabel";

const CreateReview = () => {
  const { id } = useParams();
  const { tourData } = useGetTours();
  const getSingleBook = tourData?.find((item) => item?.id === id);
  const { currentUser } = useCurrentUser();

  const isProfileExist = currentUser?.profile !== null;

  return (
    <div className="bg-darkBlue h-full">
      <Head />
      <WhiteBg write={true}>
        {!isProfileExist && (
          <ErrorLabel
            message={
              <>
                You havn&apos;t set profile yet!
                <Link
                  to={`/profile/profileDetails/${currentUser.id}`}
                  className="font-bold"
                >
                  Please set profile here!
                </Link>
              </>
            }
          />
        )}
        <h2 className="font-bold text-xl">{getSingleBook?.title}</h2>
        <Form />
      </WhiteBg>
    </div>
  );
};

export default CreateReview;
