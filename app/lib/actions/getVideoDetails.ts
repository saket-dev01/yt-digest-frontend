import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; 

export const getVideoDetails = async (url: string) => {
    // Extract the video ID from the URL
    const videoId = extractVideoId(url);
    //console.log(videoId)
    if (!videoId) {
        throw new Error('Invalid YouTube URL');
    }

    try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`;
        const response = await axios.get(apiUrl);

        const data = response.data;

        if (!data.items || data.items.length === 0) {
            throw new Error('Video not found or is restricted.');
        }

        const videoDetails = {
            title: data.items[0].snippet.title,
            author: data.items[0].snippet.channelTitle,
            description: data.items[0].snippet.description,
            thumbnail: data.items[0].snippet.thumbnails?.high?.url || '',
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

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|v\/|embed\/|shorts\/|.+\?v=))([^&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
