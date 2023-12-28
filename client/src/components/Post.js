import React from "react";
import Image from "next/image";
import moment from "moment";
import Comments from "./commnets/Comments";
import CreateComment from "./commnets/CreateComment";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/axios";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userAtom";
import Link from "next/link";

const Post = ({ title, description, image, userProfileAvatar, date, id, userId, username }) => {
  const queryClient = useQueryClient();

  const user = useRecoilValue(userState);

  const mutation = useMutation({
    mutationFn: (isLiked) => {
      console.log(isLiked);
      if (isLiked) {
        return makeRequest.delete(`/likes/deleteLike?postId=${id}`);
      } else {
        return makeRequest.post("/likes/addLike", { postId: id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    }
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", id],
    queryFn: () => makeRequest.get(`/likes?postId=${id}`).then((res) => res.data)
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete(`/posts/deletePost?postId=${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  const handleDeletePost = () => {
    deletePostMutation.mutate(id);
  };

  return (
    <>
      <div className="bg-gray-100 border p-5 border-black rounded-sm my-6 w-full flex-col gap-4 items-center">
        <div className="flex justify-between items-center">
          <Link href={`/user/${userId}`}>
            <div className="flex gap-2">
              <div className="w-[30px] relative h-[30px] rounded-full">
                <Image
                  fill
                  src={userProfileAvatar ? userProfileAvatar : "/assets/default-avatar-photo.jpg"}
                />
              </div>
              <div className="text-xl text-slate-400">{username}</div>
            </div>
          </Link>
          {user.id === userId && (
            <div onClick={handleDeletePost} className="hover:text-red-500 cursor-pointer">
              <MdDelete fontSize={20} />
            </div>
          )}
        </div>

        <div>
          Название: <span className="font-semibold">{title}</span>
        </div>
        <div>
          Описание: <span className="font-semibold">{description}</span>
        </div>
        {image && (
          <div className="w-40 h-40 relative">
            <Image alt="post related picture" fill src={`/upload/${image}`}></Image>
          </div>
        )}
        {date && <div className="py-2"> {moment(date).fromNow()}</div>}
        <div className="flex p-2 items-center justify-items-start gap-2">
          <div className="text-xl">likes:</div>
          <div className="text-xl">{data ? data.length : 0}</div>
          <div onClick={() => mutation.mutate(data?.includes(user.id))}>
            {data?.includes(user.id) ? (
              <AiFillHeart color="red" fontSize={20} />
            ) : (
              <AiOutlineHeart fontSize={20} />
            )}
          </div>
        </div>
        <CreateComment postId={id} />
        <Comments postId={id} />
      </div>
    </>
  );
};

export default Post;
