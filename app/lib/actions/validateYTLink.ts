import ytdl from 'ytdl-core';

export const validateYTLink = async (url: string) => {
    if (!ytdl.validateURL(url)) {
      throw new Error('Invalid YouTube URL');
    }
  
    
    return true;
  };
  