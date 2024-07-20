'use server'
import prisma from '@/prisma'
import { revalidatePath } from 'next/cache'
import { getVideoDetails } from './getVideoDetails';

export async function addNewVideo(url: string) {
    try {
        const videoDetails = await getVideoDetails(url);
        //console.log(videoDetails); // this.title is apne kaam ka
        const newVideo = await prisma.video.create({
            data: {
                videoLink: url,
                title: videoDetails.title,
                imgUrl: videoDetails.thumbnail
            },
        })
        revalidatePath('/convert')
        return newVideo.id;
    } catch (error) {
        console.error('Error adding pending video:', error)
        throw new Error(`message: ${error}`)
    }

}