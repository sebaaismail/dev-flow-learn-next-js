"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  console.log("Current query param:", searchParams.toString());

  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const newUrl = `${route}?query=${searchQuery}`;
    window.location.href = newUrl;
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div
        className={`flex background-light800_darkgradient min-h-14 grow px-4 items-center rounded-[10px] gap-4 ${otherClasses} `}
      >
        <Image
          src={imgSrc}
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          className="paragraph-regular !bg-transparent no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default LocalSearch;
