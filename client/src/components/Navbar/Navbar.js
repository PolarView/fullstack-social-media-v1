"use client";
import React from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import userState from "@/atoms/userAtom";
import Image from "next/image";

const Navbar = () => {
  const user = useRecoilValue(userState);

  return (
    <nav class="fixed top-0 left-0 mb-4 bg-slate-300 select-none bg-grey lg:flex z-200 lg:items-stretch w-full">
      {user.id ? (
        <Link href={`/user/${user.id}`}>
          <div className="flex items-center gap-5">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
              {user.profile_picture ? (
                <Image fill src={user.profile_picture} />
              ) : (
                <Image fill src="/assets/default-avatar-photo.jpg" />
              )}
            </div>
            <div className="text-xl">{user.username}</div>
          </div>
        </Link>
      ) : (
        <div class="flex flex-no-shrink items-stretch h-12">
          <Link
            href="/login"
            class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
            Login
          </Link>
          <Link
            href="/registration"
            class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
            Register
          </Link>
        </div>
      )}

      <div class="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
        <div class="lg:flex lg:items-stretch lg:justify-end ml-auto">
          <a
            href="#"
            class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
            Item 1
          </a>
          <a
            href="#"
            class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
            Item 2
          </a>
          <a
            href="#"
            class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">
            Item 3
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
