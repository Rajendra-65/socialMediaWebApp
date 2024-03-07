"use client";
import CreatePost from "@/components/CreatePost";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex m-auto place-content-center justify-center align-middle">
      <div className="flex flex-col place-content-center justify-center align-middle">
        <div className="flex gap-2 flex-col">
          <div className="flex">
            <Image
              src="/assets/icons/add-post.svg"
              height={28}
              width={28}
              alt="AddPost Page"
            />
            <h1 className="ml-1 flex m-auto text-center">Create Post</h1>
          </div>
          <div className="mt-2 place-content-center items-center justify-center">
            <CreatePost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
