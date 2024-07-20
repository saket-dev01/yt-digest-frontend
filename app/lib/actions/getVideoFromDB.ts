'use server'

import prisma from "@/prisma";



export async function getVideoFromDB(id: string) {
  try {
    const video = await prisma.video.findFirst({
        where:{
            id
        }
    })
    return video;
  } catch (error) {
    console.error('Error getting video with this id', error);
    throw new Error('Error getting video with this id');
  }
}