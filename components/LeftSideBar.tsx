"use client";

import React from "react";
import LeftSideBarItem from "./navigation/navbar/LeftSideBarItem";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const LeftSideBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <section
      className="hidden sm:flex flex-col justify-between bg-dark-200 text-white px-6 pt-[60px] h-auto
     md:w-[266px] mt-[53px]"
    >
      <div className="flex flex-col gap-3 bg-dark-200">
        <LeftSideBarItem href="/" text="Home" icon="/icons/home.svg" />
        <LeftSideBarItem
          href="/community"
          text="Community"
          icon="/icons/users.svg"
        />
        <LeftSideBarItem
          href="/collection"
          text="Collections"
          icon="/icons/star.svg"
        />
        <LeftSideBarItem
          href="/jobs"
          text="Find Jobs"
          icon="/icons/suitcase.svg"
        />
        <LeftSideBarItem href="/tags" text="Tags" icon="/icons/tag.svg" />
        <LeftSideBarItem
          href="/ask-question"
          text="Ask a Questions"
          icon="/icons/question.svg"
        />
      </div>

      {!isSignedIn && (
        <div className="flex flex-col gap-3 my-8">
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/sign-in")}
          >
            <span className="primary-text-gradient paragraph-medium">
              Login
            </span>
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/sign-up")}
          >
            <span className="paragraph-medium">Signup</span>
          </Button>
        </div>
      )}
    </section>
  );
};

export default LeftSideBar;
