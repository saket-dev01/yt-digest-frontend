import ytdl from 'ytdl-core';

export const getVideoDetails = async (url: string) => {
  if (!ytdl.validateURL(url)) {
    throw new Error('Invalid YouTube URL');
  }

  const info = await ytdl.getInfo(url);
  const videoDetails = {
    title: info.videoDetails.title,
    author: info.videoDetails.author.name,
    description: info.videoDetails.description,
    thumbnail: info.videoDetails.thumbnails[0].url,
  };
  return videoDetails;
};
