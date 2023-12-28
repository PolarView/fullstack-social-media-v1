"use client";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/axios";
import Post from "./Post";
import { Skeleton } from "@/components/ui/skeleton";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      if (userId) return makeRequest.get(`/users/getUserPosts/${userId}`).then((res) => res.data);
      return makeRequest.get("/posts").then((res) => res.data);
    }
  });

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-8">
      {error
        ? "error"
        : isLoading
        ? [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className=" bg-slate-600 h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className=" bg-slate-600 h-4 w-[250px]" />
                <Skeleton className=" bg-slate-600 h-4 w-[200px]" />
              </div>
            </div>
          ))
        : data.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              description={post.description}
              image={post.image}
              date={post.created_at}
              id={post.id}
              userId={post.user_id}
              userProfileAvatar={post.profile_picture}
              username={post.username}
            />
          ))}
    </div>
  );
};

export default Posts;
