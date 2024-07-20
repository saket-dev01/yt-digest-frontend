import {YoutubeForm} from "@/components/YoutubeForm";
import AllVideoCards from "@/components/AllVideoCards";
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10">
      <div className="flex flex-col items-center w-full max-w-lg">
        <YoutubeForm />
        <div className="mt-6">
          <AllVideoCards/>
        </div>
      </div>
    </div>
  );
}


  