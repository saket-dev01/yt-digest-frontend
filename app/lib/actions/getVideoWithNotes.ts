'use server'
import { generateNotes } from '@/app/lib/actions/generateNotes';
import { getVideoFromDB } from "./getVideoFromDB";
import prisma from '@/prisma';

export async function getVideoWithNotes(videoId: string) {
  try {
    const video = await getVideoFromDB(videoId);
    if (video?.summary === null) {
        if (video.text !== null) {
            const notes = await generateNotes(video.text);
            const upload = await prisma.video.update({
                data:{
                    summary:notes
                },
                where:{
                    id:video.id
                }
            });
            //console.log("new notes made")
            return notes;
        }
    }else if(video?.summary!=null){
        //console.log("notes already here")
        return video.summary;
    }
   
  } catch (error) {
    console.error('Error get study notes:', error);
    throw new Error('Failed to get study notes');
  }
}