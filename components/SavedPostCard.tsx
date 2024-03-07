import Image from "next/image";
import React from "react";

const SavedPostCard = () => {
    return (
        <div className="h-[300px] w-[300px] border rounded-md relative">
            <Image
                src="/assets/images/mountain.jpg"
                layout="fill"
                objectFit="cover"
                alt="SavedPost card"
            />
            <Image
                src="/assets/icons/profile-placeholder.svg"
                width={28}
                height={28}
                alt="profileImage"
                className="absolute bottom-4 left-2"
            />
        </div>

    );
};

export default SavedPostCard;
