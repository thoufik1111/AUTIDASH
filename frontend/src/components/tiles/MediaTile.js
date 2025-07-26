import React from 'react';

const MediaTile = ({ media, onClick }) => {
  return (
    <div className="glassmorphism tile-container media-tile" onClick={onClick}>
      <div className="media-content">
        <div className="media-icon-container youtube-play-animation">
          <svg className="media-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.923.029 12s.459 8.55 4.356 8.816c3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.077 23.971 12s-.459-8.55-4.356-8.816zM9.75 16.5V7.5l6.5 4.5-6.5 4.5z" />
          </svg>
        </div>
        
        <p className="media-label">Media</p>
        
        <div className="media-info">
          <div className="current-source">
            <span className="source-label">Current Source</span>
            <span className="source-name">{media.currentSource}</span>
          </div>
          
          <div className="playlist-info">
            <span className="playlist-count">{media.playlist.length} playlists</span>
            {media.isLoading && (
              <div className="loading-indicator">
                <div className="loading-dot"></div>
                <span className="loading-text">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .media-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          background: linear-gradient(135deg, var(--tile-bg), rgba(220, 38, 38, 0.05));
        }

        .media-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          gap: 1rem;
        }

        .media-icon-container {
          margin-bottom: 0.5rem;
        }

        .media-icon {
          height: 8rem;
          width: 8rem;
          color: #dc2626;
        }

        .youtube-play-animation {
          animation: youtube-play 1s ease-in-out infinite;
        }

        .media-label {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
        }

        .media-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .current-source {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 1rem;
          background: rgba(220, 38, 38, 0.1);
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
        }

        .source-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .source-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .playlist-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .playlist-count {
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          background: rgba(var(--text-secondary-rgb, 96, 165, 250), 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(var(--theme-accent-rgb, 59, 130, 246), 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .loading-dot {
          width: 0.5rem;
          height: 0.5rem;
          background: var(--theme-accent);
          border-radius: 50%;
          animation: pulse-loading 1.5s ease-in-out infinite;
        }

        .loading-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        @keyframes youtube-play {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.1); 
          }
        }

        @keyframes pulse-loading {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .media-tile:hover .media-icon {
          color: #b91c1c;
          transform: scale(1.05);
          transition: all 0.3s ease;
        }

        .media-tile:hover .youtube-play-animation {
          animation-duration: 0.5s;
        }

        @media (max-width: 768px) {
          .media-icon {
            height: 6rem;
            width: 6rem;
          }

          .media-label {
            font-size: 1.25rem;
          }

          .source-label {
            font-size: 0.75rem;
          }

          .source-name {
            font-size: 0.875rem;
          }

          .playlist-count {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MediaTile;