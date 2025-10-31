"use client";
import Image from "next/image";
import React from "react";

// imageUrl is prop to be passed to Avatar component
const Avatar = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <Image
      src={imageUrl || "/icons/avatar.svg"}
      alt="User Avatar"
      width={32}
      height={32}
      className="rounded-full"
    />
  );
};

export default Avatar;
