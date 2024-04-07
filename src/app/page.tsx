import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { userId } = auth();

  if (userId) return redirect("/locker");
};

export default HomePage;
