import ytdl from 'ytdl-core';

export const getVideoDetails = async (url: string) => {
    if (!ytdl.validateURL(url)) {
        throw new Error('Invalid YouTube URL');
    }

    try {
        const info = await ytdl.getInfo(url);
        const videoDetails = {
            title: info.videoDetails.title,
            author: info.videoDetails.author.name,
            description: info.videoDetails.description,
            thumbnail: info.videoDetails.thumbnails[0]?.url || '',
        };
        return videoDetails;
    } catch (error) {
        console.error('Error fetching video details:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to get video details: ${error.message}`);
        } else {
            throw new Error('Failed to get video details: Unknown error');
        }
    }
};