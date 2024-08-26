import { YoutubeForm } from "@/components/YoutubeForm";
import AllVideoCards from "@/components/AllVideoCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin"); // Redirect to login page if not authenticated
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10">
      <div className="flex flex-col items-center w-full max-w-lg">
        <YoutubeForm />
        <div className="mt-6">
          <AllVideoCards />
        </div>
      </div>
    </div>
  );
}