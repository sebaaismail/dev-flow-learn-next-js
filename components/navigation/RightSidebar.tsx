"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { set } from "zod";

const RightSidebar = () => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setQuestions([
      {
        id: 1,
        text: "Would it be appropriate to point out an error in another paper during a referee report?",
      },
      {
        id: 2,
        text: "How can an airconditioning machine exist?",
      },
      {
        id: 3,
        text: "Interrogated every time crossing UK Border as citizen",
      },
      { id: 4, text: "Low digit addition generator" },
      {
        id: 5,
        text: "What is an example of 3 numbers that do not make up a vector?",
      },
    ]);
    setTags([
      {
        id: 1,
        name: "javascript",
        icon: "/icons/javascript.svg",
        count: 12200,
      },
      { id: 2, name: "typescript", icon: "/icons/typescript.svg", count: 9800 },
      { id: 3, name: "three js", icon: "/icons/threejs.svg", count: 8700 },
      {
        id: 4,
        name: "tailwind css",
        icon: "/icons/tailwindcss.svg",
        count: 6500,
      },
      { id: 5, name: "react js", icon: "/icons/reactjs.svg", count: 5400 },
    ]);
  }, []);

  return (
    <div
      className="hidden lg:flex flex-col background-light900_dark200 right-0 top-0 gap-10 sticky min-h-screen lg:w-[330px]
    border-l gap-16 p-6 pt-40 shadow-light-300 dark:shadow-none"
    >
      {/* section Hot Network */}
      <section
        className=" flex-col overflow-y-auto w-full light-border
     "
      >
        <h3 className="text-dark200_light900 font-bold text-[20px] ">
          Hot Network
        </h3>
        <div className="flex flex-col gap-6 mt-6">
          {questions.map((question, i) => (
            <div className="flex items-start gap-2.5">
              <Image
                src={
                  i % 2 === 0
                    ? "/icons/question-orange.svg"
                    : "/icons/question-blue.svg"
                }
                alt="Question"
                width={18}
                height={18}
              />
              <p className="text-dark500_light700 body-medium leading-[1.4] ">
                {question.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* section Hot Network */}
      <section className="flex-col overflow-y-auto w-full light-border">
        <h3 className="text-dark200_light900 font-bold text-[20px] ">
          Popular Tags
        </h3>
        <div className="flex flex-col gap-6 mt-6">
          {tags.map((tag) => (
            <div className="flex items-center gap-2.5">
              <div className="flex p-2 px-4 gap-4 background-light800_dark300 rounded-1.5">
                <Image src={tag.icon} alt={tag.name} width={16} height={16} />
                <span className="text-dark500_light700 body-medium">
                  {tag.name}
                </span>
              </div>
              <span className=" text-dark400_light900 small-medium ml-auto">
                {tag.count}+
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RightSidebar;
