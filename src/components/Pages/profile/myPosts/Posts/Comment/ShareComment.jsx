import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useCreateData from "../../../../../../Hooks/useCreateData";
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";
import { momentPostCommentCreate } from "../../../../../../FetchData/User/UserDetails";

const ShareComment = () => {
  const { id: postId } = useParams();
  const { currentUser } = useCurrentUser();

  const [comment, setComment] = useState("");
  const { submitForm, isPending } = useCreateData({
    key: "user",
    func: momentPostCommentCreate,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;

    const inputData = {
      comment,
      userId: currentUser?.id,
      momentId: postId,
    };
    await submitForm({ inputData, dataMessage: "Comment has been added" });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <InputGroup size="md">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          pr="6rem"
          placeholder="Leave a comment"
          py="1.5rem"
          fontSize="sm"
        />
        <InputRightElement width="5rem">
          <Button
            isDisabled={!currentUser}
            type="submit"
            isLoading={isPending}
            h="1.75rem"
            size="sm"
            mt={3}
            color="blue"
            variant="ghost">
            Submit
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default ShareComment;
