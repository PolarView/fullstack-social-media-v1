import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const EditUserProfile = ({ toggleEditProfileOpen, id }) => {
  const queryClient = useQueryClient();
  const [editProfileInputs, setEditProfileInputs] = useState({
    username: null,
    email: null,
    description: null,
    location: null
  });
  const [profilePictureInput, setProfilePictureInput] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["key"],
    queryFn: () => makeRequest.get(`/users/getUserProfile/${id}`).then((res) => res.data),
    onSuccess: () => {
      console.log(data, "success");
      setEditProfileInputs({
        username: data.username,
        email: data.email,
        description: data.description,
        location: data.location
      });
    }
  });

  console.log(data);

  const onChnageEditProfileInputs = () => {
    setEditProfileInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  return (
    <div className="absolute  w-[50%] h-[50%] gap-4 top-[50%] translate-x-[-50%] left-[50%]">
      <div onClick={toggleEditProfileOpen} className="text-xl cursor-pointer">
        x
      </div>
      <div class="w-full h-full bg-gray-300 rounded-xl  p-4 shadow-2xl shadow-white/40">
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="text" class="mb-2 font-semibold">
              Username
            </label>
            <input
              name="username"
              value={editProfileInputs.username}
              onChange={onChnageEditProfileInputs}
              type="text"
              class="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
          <div class="flex flex-col">
            <label for="text2" class="mb-2 font-semibold">
              Email
            </label>
            <input
              name="email"
              value={editProfileInputs.email}
              onChange={onChnageEditProfileInputs}
              type="text"
              class="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
        </div>

        <div class="mb-4 flex flex-col">
          <label for="email" class="mb-2 font-semibold">
            Description
          </label>
          <div class="relative">
            <textarea
              name="description"
              value={editProfileInputs.description}
              onChange={onChnageEditProfileInputs}
              class="w-full rounded-lg border border-slate-200 px-2 py-1 min-h-[150px] pl-8 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
            />
          </div>
        </div>
        <div class="mb-4 flex flex-col">
          <label for="age" class="mb-2 font-semibold">
            Location
          </label>
          <input
            name="location"
            value={editProfileInputs.location}
            onChange={onChnageEditProfileInputs}
            type="text"
            class="w-full max-w-[200px] rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
          />
        </div>
        <>
          <div
            className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
            id="dropzone">
            <label for="fileInput" className="cursor-pointer flex flex-col items-center space-y-2">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span className="text-gray-600">Drag and drop your files here</span>
              <span className="text-gray-500 text-sm">(or click to select)</span>
            </label>
            <input type="file" id="fileInput" className="hidden" multiple />
          </div>
          <div className="mt-6 text-center" id="fileList"></div>
        </>
      </div>
    </div>
  );
};

export default EditUserProfile;
