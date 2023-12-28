"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/axios";

const CreatePost = () => {
  const [createPostForm, setCreatePostForm] = useState({
    title: "",
    description: ""
  });

  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      console.log(newPost);
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    }
  });

  const onChangeInputHandler = (e) => {
    setCreatePostForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    console.log(createPostForm);
  };

  const onChangeFileHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log(file);
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const createFormHandler = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) imageUrl = await uploadFile();
    mutation.mutate({ ...createPostForm, image: imageUrl });
    setCreatePostForm({
      title: "",
      description: ""
    });
    setFile(null);
  };

  const removeImage = () => {
    setFile(null);
  };

  return (
    <>
      <div className="w-72 pt-10">
        <div className="text-center text-3xl my-4">Create New Post</div>
        <div className="relative h-10  w-full min-w-[200px]">
          <input
            onChange={onChangeInputHandler}
            value={createPostForm.name}
            name="title"
            className=" h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" title"
          />
        </div>
        <div className="relative h-10 w-full min-w-[200px]">
          <input
            onChange={onChangeInputHandler}
            value={createPostForm.description}
            name="description"
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" description"
          />
        </div>
      </div>
      <div className="bg-gray-100  flex items-center justify-center p-3">
        <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
          {file ? (
            <div className="w-full h-full relative">
              <img src={URL.createObjectURL(file)}></img>
              <div
                className="absolute cursor-pointer text-3xl text-red-400 top-0 right-0"
                onClick={removeImage}>
                x
              </div>
            </div>
          ) : (
            <>
              <div
                className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                id="dropzone">
                <label
                  for="fileInput"
                  className="cursor-pointer flex flex-col items-center space-y-2">
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
                <input
                  type="file"
                  onChange={onChangeFileHandler}
                  id="fileInput"
                  className="hidden"
                  multiple
                />
              </div>
              <div className="mt-6 text-center" id="fileList"></div>
            </>
          )}
        </div>
      </div>
      <button
        onClick={createFormHandler}
        className="relative text-4xl text-center h-10 w-full min-w-[200px]">
        Create post
      </button>
    </>
  );
};

export default CreatePost;
