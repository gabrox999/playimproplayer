export const convertToEmbedUrl = (url) => {
  try {
    const urlObj = new URL(url);

    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId;

      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.pathname.includes('/embed/')) {
        return url; // Already an embed URL
      } else {
        videoId = urlObj.searchParams.get('v');
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Spotify
    if (urlObj.hostname.includes('spotify.com')) {
      if (urlObj.pathname.includes('/embed/')) {
        return url; // Already an embed URL
      }

      // Convert open.spotify.com/track/... to embed
      const match = urlObj.pathname.match(/\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
      if (match) {
        return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
      }
    }

    // Return original URL if no conversion needed
    return url;
  } catch (error) {
    console.error('Error converting URL:', error);
    return url;
  }
};

export const getPlayerType = (url) => {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      return 'youtube';
    }

    if (urlObj.hostname.includes('spotify.com')) {
      return 'spotify';
    }

    // Check for local files
    if (urlObj.protocol === 'file:') {
      const ext = url.split('.').pop().toLowerCase();
      if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(ext)) {
        return 'local-audio';
      }
      if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext)) {
        return 'local-video';
      }
      return 'local-file';
    }

    return 'generic';
  } catch (error) {
    // If URL parsing fails, check if it looks like a local path
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.startsWith('file://') || lowerUrl.match(/^[a-z]:\\/i) || lowerUrl.startsWith('/')) {
      const ext = url.split('.').pop().toLowerCase();
      if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(ext)) {
        return 'local-audio';
      }
      if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext)) {
        return 'local-video';
      }
      return 'local-file';
    }
    return 'generic';
  }
};

export const getFileExtension = (url) => {
  try {
    return url.split('.').pop().toLowerCase();
  } catch {
    return '';
  }
};
