import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/axios";

const CreateComment = ({ postId }) => {
  const [commentInput, setCommentInput] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      console.log(newComment);
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"]);
    }
  });

  const onChangeHandler = (e) => {
    setCommentInput(e.target.value);
  };

  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();
    mutation.mutate({ commentBody: commentInput, postId });
    setCommentInput("");
  };

  return (
    <div className="grid w-full gap-2">
      <textarea
        value={commentInput}
        onChange={onChangeHandler}
        name="comment"
        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <div onClick={onSubmitButtonHandler}>
        <Button>Send comment</Button>
      </div>
    </div>
  );
};

export default CreateComment;
