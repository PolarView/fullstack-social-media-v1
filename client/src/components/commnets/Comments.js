import React from "react";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/axios";

const Comments = ({ postId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => makeRequest.get("/comments?postId=" + postId).then((res) => res.data)
  });

  return (
    <div className="p-5 m-4 flex flex-col justify-center items-center gap-8">
      {error
        ? "error"
        : isLoading
        ? "Loading"
        : data.map((comment) => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                body={comment.body}
                created_at={comment.created_at}
                user_avatar={comment.user_avatar}
                username={comment.username}
                userId={comment.userId}
              />
            );
          })}
    </div>
  );
};

export default Comments;
