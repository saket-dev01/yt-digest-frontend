"use server"
import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const getAllVideos = async () => {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const videos = await prisma.video.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                userId: userId
            },
            take: 20
        });

        if (!videos || videos.length === 0) {
            console.log('No videos found for the user');
            return [];
        }

        return videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to fetch videos: ${error.message}`);
        } else {
            throw new Error('Failed to fetch videos: Unknown error');
        }
    }
};