import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LoginToast from "@/components/LoginToast";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";
import { title } from "process";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description:
      "I am new to web development and want to learn React. Any suggestions?",
    tags: [
      {
        _id: 1,
        name: "javascript",
        typeIcon: "plain",
        questions: 12200,
      },
      { _id: 2, name: "react", icon: "react", questions: 5400 },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    },
    upvotes: 10,
    answers: 2,
    views: 150,
    createdAt: new Date("2025-11-01"),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description:
      "I am new to programming and want to learn JavaScript. Any suggestions?",
    tags: [
      {
        _id: 1,
        name: "javascript",
        typeIcon: "plain",
        questions: 12200,
      },
      {
        _id: 2,
        name: "programming",
        typeIcon: "plain",
        questions: 4400,
      },
    ],
    author: { _id: "2", name: "Jane Smith" },
    upvotes: 5,
    answers: 1,
    views: 100,
    createdAt: new Date("2025-11-13"),
  },
];

const test = async () => {
  try {
    throw new Error("Test error for logging");
  } catch (error) {
    return handleError(error);
  }
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();

  const result = await test();
  console.log("Error handling result:", result);

  const { query = "", filter = "" } = await searchParams;

  // const data = await axios.get("/api/questions", {
  //   query: {
  //     search: query ,
  //   },
  // });

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const filterValue = String(filter || "")
      .trim()
      .toLowerCase();

    const matchesFilter = filterValue
      ? question.tags
          .map((t) => (t && t.name ? String(t.name).toLowerCase() : ""))
          .includes(filterValue)
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex flex-col-reverse w-full justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark200_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          route="/"
          placeholder="Search Questions ... "
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="flex flex-col gap-6 w-full mt-10">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
