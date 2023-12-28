"use client";
import React, { useState } from "react";
import UserProfile from "@/components/user/UserProfile";
import { useParams } from "next/navigation";
import Posts from "@/components/Posts";
import EditUserProfile from "@/components/user/EditUserProfile";

const User = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const toggleEditProfileOpen = () => {
    setIsEditProfileModalOpen((prevState) => !prevState);
  };

  const { id } = useParams();

  return (
    <div>
      {<UserProfile id={id} toggleEditProfileOpen={toggleEditProfileOpen} />}

      <div className="flex min-h-screen flex-col items-center  p-24">
        <Posts userId={id} />
      </div>
      {isEditProfileModalOpen && (
        <EditUserProfile id={id} toggleEditProfileOpen={toggleEditProfileOpen} />
      )}
    </div>
  );
};

export default User;
