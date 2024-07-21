'use server'
import { generateNotes } from '@/app/lib/actions/generateNotes';
import { getVideoFromDB } from "./getVideoFromDB";
import prisma from '@/prisma';

export async function getVideoWithNotes(videoId: string) {
  try {
    const video = await getVideoFromDB(videoId);
    if (video?.summary === null) {
        throw new Error("No notes found")
    }else if(video?.summary!=null){
        //console.log("notes already here")
        return video.summary;
    }
   
  } catch (error) {
    console.error('Error get study notes:', error);
    throw new Error('Failed to get study notes');
  }
}