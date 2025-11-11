import { auth } from "@/auth";
import LoginToast from "@/components/LoginToast";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import { de, ta, vi } from "zod/locales";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description:
      "I am new to web development and want to learn React. Any suggestions?",
    tags: ["react", "javascript"],
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 2,
    views: 150,
    createdAt: new Date("2024-01-01"),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description:
      "I am new to programming and want to learn JavaScript. Any suggestions?",
    tags: ["javascript", "programming"],
    author: { _id: "2", name: "Jane Smith" },
    upvotes: 5,
    answers: 1,
    views: 100,
    createdAt: new Date("2024-02-01"),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();

  const { query = "" } = await searchParams;

  // const data = await axios.get("/api/questions", {
  //   query: {
  //     search: query ,
  //   },
  // });

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query.toLowerCase())
  );

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
      HomeFilter
      <div className="flex flex-col gap-6 w-full mt-10">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
