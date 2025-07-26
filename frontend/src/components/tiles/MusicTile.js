import React from 'react';

const MusicTile = ({ music, onClick }) => {
  return (
    <div className="glassmorphism tile-container music-tile" onClick={onClick}>
      <div className="music-content">
        <div className="album-art" style={{ backgroundImage: `url(${music.albumArt})` }}>
          <div className="album-overlay"></div>
        </div>
        
        <div className="music-info">
          <h3 className="music-title">{music.title}</h3>
          <p className="music-artist">{music.artist}</p>
        </div>
      </div>
      
      <button className={`play-button ${music.isPlaying ? 'playing' : ''}`}>
        {music.isPlaying ? (
          <svg className="control-icon" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="control-icon" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <style jsx>{`
        .music-tile {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem;
        }

        .music-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .album-art {
          width: 8rem;
          height: 8rem;
          border-radius: 1rem;
          background-size: cover;
          background-position: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .album-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .music-tile:hover .album-overlay {
          opacity: 1;
        }

        .music-info {
          flex: 1;
        }

        .music-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
        }

        .music-artist {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .play-button {
          width: 5rem;
          height: 5rem;
          background: rgba(var(--text-primary-rgb, 0, 0, 0), 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .play-button:hover {
          background: rgba(var(--text-primary-rgb, 0, 0, 0), 0.2);
          transform: scale(1.05);
        }

        .play-button.playing {
          background: var(--theme-accent);
          color: white;
          animation: pulse-play 2s ease-in-out infinite;
        }

        .control-icon {
          width: 2.5rem;
          height: 2.5rem;
        }

        @keyframes pulse-play {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .music-tile {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .music-content {
            flex-direction: column;
            gap: 1rem;
          }

          .album-art {
            width: 6rem;
            height: 6rem;
          }

          .music-title {
            font-size: 1.5rem;
          }

          .music-artist {
            font-size: 1rem;
          }

          .play-button {
            width: 4rem;
            height: 4rem;
          }

          .control-icon {
            width: 2rem;
            height: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MusicTile;