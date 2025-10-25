import { useState, useEffect, useRef } from 'react';
import { convertToEmbedUrl, getPlayerType } from '../utils/urlConverter';
import { useVolume } from '../contexts/VolumeContext';
import './ResourceTile.css';

// Load YouTube IFrame API
if (typeof window !== 'undefined' && !window.YT) {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

const ResourceTile = ({ resource }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [ytPlayer, setYtPlayer] = useState(null);
  const [fileError, setFileError] = useState(false);
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const audioVideoRef = useRef(null);
  const playerId = `player-${resource.id}`;

  const { masterVolume, registerPlayer, unregisterPlayer } = useVolume();
  const embedUrl = convertToEmbedUrl(resource.url);
  const playerType = getPlayerType(resource.url);

  // Extract YouTube video ID
  const getYouTubeVideoId = () => {
    try {
      const url = new URL(embedUrl);
      const pathParts = url.pathname.split('/');
      return pathParts[pathParts.length - 1];
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (isPlaying && playerType === 'youtube' && !ytPlayer) {
      const initPlayer = () => {
        if (window.YT && window.YT.Player) {
          const videoId = getYouTubeVideoId();
          if (videoId && playerContainerRef.current) {
            const player = new window.YT.Player(playerId, {
              videoId: videoId,
              playerVars: {
                autoplay: 1,
                controls: 1,
                modestbranding: 1,
              },
              events: {
                onReady: (event) => {
                  event.target.setVolume(masterVolume);
                  setVolume(masterVolume);
                  registerPlayer(playerId, event.target);
                  setYtPlayer(event.target);
                },
              },
            });
            playerRef.current = player;
          }
        } else {
          // YouTube API not ready, try again
          setTimeout(initPlayer, 100);
        }
      };

      initPlayer();
    }

    return () => {
      if (playerRef.current && ytPlayer) {
        unregisterPlayer(playerId);
        playerRef.current.destroy();
        setYtPlayer(null);
      }
    };
  }, [isPlaying, playerType]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (ytPlayer) {
      ytPlayer.stopVideo();
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
      ytPlayer.setVolume(newVolume);
    }
    if (audioVideoRef.current) {
      audioVideoRef.current.volume = newVolume / 100;
    }
  };

  const handleFileError = () => {
    setFileError(true);
  };

  return (
    <div className={`resource-tile ${isPlaying ? 'playing' : ''}`}>
      {!isPlaying ? (
        <div
          className="tile-preview"
          style={{ background: `linear-gradient(135deg, ${resource.color}dd, ${resource.color}55)` }}
          onClick={handlePlay}
        >
          <div className="tile-icon">{resource.icon}</div>
          <h3 className="tile-title">{resource.title}</h3>
          <div className="play-button">▶</div>
        </div>
      ) : (
        <div className="tile-player">
          <div className="player-header" style={{ backgroundColor: resource.color }}>
            <span className="player-icon">{resource.icon}</span>
            <span className="player-title">{resource.title}</span>
            <button onClick={handleStop} className="btn-stop">
              ✕
            </button>
          </div>
          <div className="player-content" ref={playerContainerRef}>
            {playerType === 'youtube' && (
              <>
                <div id={playerId}></div>
                <div className="player-controls">
                  <span className="control-icon">🔊</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="player-volume-slider"
                  />
                  <span className="control-value">{volume}%</span>
                </div>
              </>
            )}
            {playerType === 'spotify' && (
              <iframe
                src={embedUrl}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title={resource.title}
              />
            )}
            {playerType === 'local-audio' && (
              <>
                {!fileError ? (
                  <>
                    <div className="local-player">
                      <div className="local-player-icon">🎵</div>
                      <p className="local-player-title">{resource.title}</p>
                      <p className="local-player-subtitle">Local Audio File</p>
                      <audio
                        ref={audioVideoRef}
                        src={resource.url}
                        controls
                        autoPlay
                        onError={handleFileError}
                        onLoadedMetadata={(e) => {
                          e.target.volume = volume / 100;
                        }}
                        className="local-audio-player"
                      />
                    </div>
                    <div className="player-controls">
                      <span className="control-icon">🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="player-volume-slider"
                      />
                      <span className="control-value">{volume}%</span>
                    </div>
                  </>
                ) : (
                  <div className="file-error">
                    <div className="error-icon">⚠️</div>
                    <h4>File Not Found</h4>
                    <p>The audio file couldn't be loaded. It may not exist on this device.</p>
                    <p className="error-path">{resource.url}</p>
                    <small>Local files only work on the device where they're stored.</small>
                  </div>
                )}
              </>
            )}
            {playerType === 'local-video' && (
              <>
                {!fileError ? (
                  <>
                    <video
                      ref={audioVideoRef}
                      src={resource.url}
                      controls
                      autoPlay
                      onError={handleFileError}
                      onLoadedMetadata={(e) => {
                        e.target.volume = volume / 100;
                      }}
                      className="local-video-player"
                    />
                    <div className="player-controls">
                      <span className="control-icon">🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="player-volume-slider"
                      />
                      <span className="control-value">{volume}%</span>
                    </div>
                  </>
                ) : (
                  <div className="file-error">
                    <div className="error-icon">⚠️</div>
                    <h4>File Not Found</h4>
                    <p>The video file couldn't be loaded. It may not exist on this device.</p>
                    <p className="error-path">{resource.url}</p>
                    <small>Local files only work on the device where they're stored.</small>
                  </div>
                )}
              </>
            )}
            {(playerType === 'generic' || playerType === 'local-file') && (
              <div className="generic-player">
                <p>Unsupported player type</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Open in new tab
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceTile;
