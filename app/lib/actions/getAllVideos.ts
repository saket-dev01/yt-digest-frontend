import prisma from "@/prisma";

export const getAllVideos = async () => {
    const videos = await prisma.video.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 20
    });
    return videos;
};