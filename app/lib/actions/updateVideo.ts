'use server'
import prisma from '@/prisma'
import { Status } from '@prisma/client';

export async function updateVideo(id: string, text: string) {

    //also check if the status is pending or not
    try {
        const updatedVideo = await prisma.video.update({
            data: {
                text:text,
                processStatus: Status.COMPLETED
            },
            where:{
                id
            }
        })

        return true;
    } catch (error) {
        console.error('Error adding pending video:', error)
        throw error
    }

}