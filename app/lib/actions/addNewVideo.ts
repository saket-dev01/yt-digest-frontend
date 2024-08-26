'use server'
import prisma from '@/prisma'
import { revalidatePath } from 'next/cache'
import { getVideoDetails } from './getVideoDetails';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export async function addNewVideo(url: string) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const videoDetails = await getVideoDetails(url);
        if (!videoDetails) {
            throw new Error('Failed to fetch video details');
        }

        const newVideo = await prisma.video.create({
            data: {
                videoLink: url,
                title: videoDetails.title,
                imgUrl: videoDetails.thumbnail,
                userId: userId
            },
        });

        revalidatePath('/convert')
        return newVideo.id;
    } catch (error) {
        console.error('Error adding pending video:', error)
        if (error instanceof Error) {
            throw new Error(`Failed to add new video: ${error.message}`);
        } else {
            throw new Error('Failed to add new video: Unknown error');
        }
    }
}