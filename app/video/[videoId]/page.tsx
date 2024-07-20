
import NotesRenderer from "@/components/NotesPage";
import { getVideoWithNotes } from "@/app/lib/actions/getVideoWithNotes";
import LoadingNotes from "@/components/LoadingNotes";



export default async function Page({ params }: { params: { videoId: string } }) {
    const videoId = params.videoId;
    const note = await getVideoWithNotes(videoId) || "No notes available";

    return (
        <LoadingNotes>
            <div>
                <NotesRenderer notes={note} />
            </div>
        </LoadingNotes>
    );
}