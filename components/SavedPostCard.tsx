'use client'
import Image from "next/image";
import React,{useState,useEffect} from "react";
import { UserTypes } from "@/types/user";
import { savedTypes } from "@/types/saved";

const SavedPostCard = ({saved}:{saved:savedTypes}) => {
    return (
        <div className="h-[300px] w-[300px] border rounded-md relative">
            <Image
                src={saved.imageUrl}
                layout="fill"
                objectFit="cover"
                alt="SavedPost card"
            />
            <Image
                src={saved.profileImage || "/assets/icons/profile-placeholder.svg"}
                width={28}
                height={28}
                alt="profileImage"
                className="absolute bottom-4 left-2"
            />
        </div>

    );
};

export default SavedPostCard;
