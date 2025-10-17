import { auth, signOut } from "@/auth";
import LoginToast from "@/components/LoginToast";
import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();

  console.log(session);

  return (
    <div className="px-10 pt-[100px]">
      <h1 className="h1-bold mb-6">
        {session?.user?.name} Welcome to the world of Next.js
      </h1>

      {session ? <LogoutButton /> : <p>No session detected</p>}
      <LoginToast />
    </div>
  );
};

export default Home;
