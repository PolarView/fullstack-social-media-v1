import React from "react";
import Image from "next/image";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import userState from "@/atoms/userAtom";
import { MdDelete } from "react-icons/md";
import { makeRequest } from "@/axios";

const Comment = ({ id, body, created_at, user_avatar, username, userId }) => {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => {
      return makeRequest.delete(`/comments/deleteComment?commentId=${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(id);
  };

  return (
    <div className="flex w-full p-10 h-[20px] items-center justify-center gap-8">
      <div className="w-[30px] relative h-[30px] rounded-full">
        <Image fill src={user_avatar ? user_avatar : "/assets/default-avatar-photo.jpg"} />
      </div>
      <div className="text-2xl text-center">
        {body}
        <br />
        <span className="text-[20px]">{username}</span>
        <br />
        <span className="text-[20px]">{moment(created_at).fromNow()}</span>
      </div>
      {user.id === userId && (
        <div onClick={handleDeleteComment} className="hover:text-red-500 cursor-pointer">
          <MdDelete fontSize={20} />
        </div>
      )}
    </div>
  );
};

export default Comment;
