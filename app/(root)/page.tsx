import { auth } from "@/auth";
import LoginToast from "@/components/LoginToast";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

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
        <p>QuestionCard 1</p>
        <p>QuestionCard 2</p>
        <p>QuestionCard 3</p>
        <p>QuestionCard 4</p>
      </div>
    </>
  );
};

export default Home;
