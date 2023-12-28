import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import userState from "@/atoms/userAtom";

const UserProfile = ({ id, toggleEditProfileOpen }) => {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);

  const { isLoading, error, data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => makeRequest.get(`/users/getUserProfile/${id}`).then((res) => res.data)
  });

  const {
    isLoading: followersIsLoading,
    error: getFollowersError,
    data: followersData
  } = useQuery({
    queryKey: ["followers"],
    queryFn: () =>
      makeRequest
        .get(`/relationships/getRelationships/?followedUserId=${id}`)
        .then((res) => res.data)
  });

  const mutation = useMutation({
    mutationFn: (isFollowed) => {
      if (isFollowed) {
        return makeRequest.delete(`/relationships/unfollowUser?followedUserId=${id}`);
      } else {
        return makeRequest.post("/relationships/followUser", { followedUserId: id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["followers"]);
    }
  });

  const handleFollow = () => {
    mutation.mutate(followersData?.includes(user.id));
  };

  return (
    <div class="h-full bg-gray-200 p-8">
      <div class="bg-white rounded-lg shadow-xl pb-8 relative">
        <div class="bg-slate-300 w-full  h-[250px]">
          {/* <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            class="w-full h-full rounded-tl-lg rounded-tr-lg"
          /> */}
        </div>
        <div class="flex flex-col items-center -mt-20">
          {data?.profile_picture ? (
            <img src={data.profile_picture} class="w-40 border-4 border-white rounded-full" />
          ) : (
            <img
              src="/assets/default-avatar-photo.jpg"
              class="w-40 border-4 border-white rounded-full"
            />
          )}

          {Number(id) === user.id && (
            <button
              onClick={toggleEditProfileOpen}
              className="bg-[#2a2f34] py-2 m-4 px-4 h-9 text-center absolute top-0 right-0  rounded-md  text-white hover:bg-black">
              edit profile
            </button>
          )}

          <div class="flex items-center space-x-2 mt-2">
            <p class="text-2xl">{data?.username}</p>
            <span class="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M5 13l4 4L19 7"></path>
              </svg>
            </span>
          </div>
          <p class="text-xl p-1 rounded-sm border border-gray-500">
            Followers: {followersData?.length}
          </p>
          <p class="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
          <p class="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
          {Number(id) === user.id || (
            <button
              onClick={handleFollow}
              className="bg-[#2a2f34] py-2 m-4 px-4 h-9 text-center rounded-md  text-white hover:bg-black">
              {followersData?.includes(user.id) ? "Unfollow" : "follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
