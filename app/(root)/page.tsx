import { auth } from "@/auth";
import LoginToast from "@/components/LoginToast";

const Home = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div className="px-10 pt-[100px]">
      <h1 className="h1-bold mb-6">
        {session?.user?.name} Welcome to the world of Next.js
      </h1>
      <LoginToast />
    </div>
  );
};

export default Home;
