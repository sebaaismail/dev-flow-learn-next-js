"use client";

import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { set } from "zod";
import TagCard from "../cards/TagCard";

const RightSidebar = () => {
  const [questions, setQuestions] = useState( [
      {
        _id: 1,
        text: "Would it be appropriate to point out an error in another paper during a referee report?",
      },
      {
        _id: 2,
        text: "How can an airconditioning machine exist?",
      },
      {
        _id: 3,
        text: "Interrogated every time crossing UK Border as citizen",
      },
      { _id: 4, text: "Low digit addition generator" },
      {
        _id: 5,
        text: "What is an example of 3 numbers that do not make up a vector?",
      },
    ]);

  const [tags, setTags] = useState([
      {
        _id: 1,
        name: "javascript",
        typeIcon: "plain",
        questions: 12200,
      },
      {
        _id: 2,
        name: "typescript",
        questions: 9800,
      },
      { _id: 3, name: "three.js", icon: "threejs", questions: 8700 },
      {
        _id: 4,
        name: "tailwindcss",
        questions: 6500,
      },
      { _id: 5, name: "react.js", icon:"react", questions: 5400 },
    ]);

  return (
    <section
      className="flex flex-col background-light900_dark200 right-0 top-0 gap-10 sticky min-h-screen w-[340px]
    border-l gap-16 p-6 pt-40 shadow-light-300 dark:shadow-none max-md:hidden"
    >
      {/* section Hot Network */}
      <div
        className=" flex-col overflow-y-auto w-full light-border
     "
      >
        <h3 className="text-dark200_light900 h3-bold">Top Questions</h3>
        <div className="flex flex-col gap-6 mt-6">
          {questions.map(({ _id, text }, i) => (
            <div key={_id} className="flex items-start gap-2.5">
              <Image
                src={
                  i % 2 === 0
                    ? "/icons/question-orange.svg"
                    : "/icons/question-blue.svg"
                }
                alt="Question"
                width={18}
                height={18}
                className="flex-shrink-0"
              />
              <Link
                href={ROUTES.PROFILE(String(_id))}
                className="flex items-start justify-between gap-5 flex-1" // Added flex-1
              >
                <p className="text-dark500_light700 body-medium flex-1">
                  {text}
                </p>
                <Image
                  src="/icons/chevron-right.svg"
                  alt="Go to question"
                  width={20}
                  height={20}
                  className="invert-colors flex-shrink-0"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* section Popular tags */}

      <div className="mt-16">
        <h3 className="text-dark200_light900 h3-bold">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7">
          {tags.map(({ _id, name, questions, icon?, typeIcon? }) => (
            <TagCard
              key={String(_id)}
              _id={String(_id)}
              name={name}
              icon={icon}
              typeIcon={typeIcon}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
