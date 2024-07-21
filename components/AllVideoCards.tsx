import { revalidatePath } from "next/cache";
import VideoCard from "./VideoCard"
import { getAllVideos } from "@/app/lib/actions/getAllVideos"
export default async function AllVideoCards() {
    revalidatePath("/convert"); // maybe will stop catching
    const videos = await getAllVideos();
    return (
        <div>
            {videos.map((video) => (
                <VideoCard key={video.id} id={video.id} status={video.processStatus} title= {video.title} imgUrl={video.imgUrl} />
            ))}
        </div>
    )
}
