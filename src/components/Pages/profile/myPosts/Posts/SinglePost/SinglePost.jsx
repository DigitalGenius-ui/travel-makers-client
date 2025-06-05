import { Image } from "@chakra-ui/react";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Head from "../../../../../../utils/Head";
import Screen from "../../../../../../utils/Screen";
import PostData from "./PostData";
import ShareComment from "../Comment/ShareComment";
import LikePost from "../LikePost/LikePost";
import MentionedTrips from "./MentionTrips";
import Loading from "../../../../../../Loading";
import { getSingleMoment } from "../../../../../../api-call/user-api";
import { POST_KEYS } from "../../../../../../constants/react-query";

const SinglePost = () => {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [POST_KEYS],
    queryFn: () => getSingleMoment(id),
  });

  const postData = data;
  const postImages = postData?.postImages;

  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    if (postImages) {
      setActiveImg(postImages[0]);
    }
  }, [postImages]);

  return (
    <section className="bg-darkBlue">
      {isPending && <Loading />}
      <Head />
      <div className="bg-white mt-8">
        <Screen>
          <div className="flex flex-col md:flex-row gap-5 py-5">
            <div
              style={{
                backgroundImage: `linear-gradient(#0000009d, #000000fc), url(${activeImg})`,
              }}
              className="flex-[1.5] bg-no-repeat bg-cover bg-center md:pt-[2rem] grid place-items-center max-h-[800px]"
            >
              <Image
                src={activeImg}
                alt="post-img"
                className="max-w-full h-[500px] object-scale-down"
              />
              <div className="max-w-full overflow-auto flex flex-col justify-center items-center py-2">
                <h2 className="text-white text-xl pb-2">
                  {postImages?.indexOf(activeImg) + 1}/{postImages?.length}
                </h2>
                <div className="flex items-center gap-3">
                  {postImages?.map((img, i) => (
                    <Image
                      onClick={() => setActiveImg(img)}
                      className={`w-[8rem] h-[8rem] object-cover cursor-pointer
                    ${classNames({
                      "border-solid border-4 border-blue-700":
                        activeImg === img,
                    })}`}
                      src={img && img}
                      alt="image-gallery"
                      key={i}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto scroll">
              <PostData getSinglePost={postData} />
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-md mt-3">
                <ShareComment />
                <LikePost likes={0} momentId={postData?.id} />
              </div>
              <MentionedTrips getSinglePost={postData} />
            </div>
          </div>
        </Screen>
      </div>
    </section>
  );
};

export default SinglePost;
