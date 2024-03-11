"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { AllUsersTypes, UserTypes } from "@/types/user";
import { getLogInUser, makeFollow } from "@/service/user/userServiece";
import PageLoader from "./PageLoader";

const PeopleCard = ({
  user,
  currentUser,
}: {
  user: UserTypes;
  currentUser: UserTypes;
}) => {
  const [currentFollow, setCurrentFollow] = useState<boolean>(false);
  // const [finalEffect, setFinalEffect] = useState<boolean>(false);
  console.log(user);
  console.log(currentUser);

  // useEffect(() => {
  //   console.log("Second UseEffect Reached...");
  //   if (currentUser?.following.includes(user._id)) {
  //     setCurrentFollow(true);
  //     setFinalEffect(true);
  //   }
  // }, []);

  const handleFollow = async (followingId: any) => {
    try {
      setCurrentFollow(!currentFollow);
      const response = await makeFollow(followingId);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="w-[200px] h-[200px] border border-b-4 border-r-4 rounded-md border-b-white border-r-white place-content-center justify-center align-middle">
        <div className="flex flex-col items-center place-content-center justify-between mt-5 ">
          <Image
            src={user.profileImage || "/assets/icons/profile-placeholder.svg"}
            height={42}
            width={42}
            alt="ProfileImage of the User"
          />
          <h1 className="mt-2">@{user.userName}</h1>
          <h1 className="mt-1 text-sm">@{user.userName}</h1>
          {currentUser.following.includes(user._id) ? (
            currentFollow ? (
              <Button
                className="bg-purple-600 text-center mt-2"
                onClick={() => {
                  handleFollow(user._id);
                }}
              >
                follow
              </Button>
            ) : (
              <Button
                className="bg-white text-center mt-2"
                onClick={() => {
                  handleFollow(user._id);
                }}
              >
                following
              </Button>
            )
          ) : currentFollow ? (
            <Button
              className="bg-white text-center mt-2"
              onClick={() => {
                handleFollow(user._id);
              }}
            >
              following
            </Button>
          ) : (
            <Button
              className="bg-purple-600 text-center mt-2"
              onClick={() => {
                handleFollow(user._id);
              }}
            >
              follow
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PeopleCard;