import React, { useState, useEffect } from 'react';

const MediaOverlay = ({ media, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overlay-backdrop">
      <div className="media-overlay">
        <div className="media-content">
          {isLoading ? (
            <div className="loading-content youtube-loading-animation">
              <svg className="media-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.923.029 12s.459 8.55 4.356 8.816c3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.077 23.971 12s-.459-8.55-4.356-8.816zM9.75 16.5V7.5l6.5 4.5-6.5 4.5z" />
              </svg>
              <h2 className="loading-title">LOADING MEDIA...</h2>
              <p className="loading-message">Please wait a moment.</p>
            </div>
          ) : (
            <div className="playlist-content">
              <h2 className="playlist-title">Media Library</h2>
              <div className="playlist-grid">
                {media.playlist.map((item, index) => (
                  <div key={index} className="playlist-item">
                    <div className="playlist-thumbnail">
                      <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="playlist-info">
                      <h3 className="playlist-item-title">{item.title}</h3>
                      <p className="playlist-item-artist">{item.artist}</p>
                      <span className="playlist-duration">{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <button className="back-button" onClick={onClose}>
          BACK
        </button>
      </div>

      <style jsx>{`
        .overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(40, 40, 40, 0.95);
          backdrop-filter: blur(8px);
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          padding: 2rem;
          border-radius: 3rem;
        }

        .media-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          width: 100%;
        }

        .media-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          width: 100%;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .youtube-loading-animation {
          animation: youtube-loading-pulse 1.5s infinite ease-in-out;
        }

        .media-icon {
          height: 12rem;
          width: 12rem;
          margin-bottom: 2rem;
          color: #dc2626;
        }

        .loading-title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          letter-spacing: 0.05em;
        }

        .loading-message {
          font-size: 1.875rem;
          font-weight: 500;
          margin: 0;
        }

        .playlist-content {
          width: 100%;
          max-width: 48rem;
        }

        .playlist-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 2rem 0;
          color: #dc2626;
        }

        .playlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .playlist-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .playlist-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .playlist-thumbnail {
          width: 4rem;
          height: 4rem;
          background: rgba(220, 38, 38, 0.3);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .play-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #dc2626;
        }

        .playlist-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          flex: 1;
        }

        .playlist-item-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          color: white;
          text-align: left;
        }

        .playlist-item-artist {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          text-align: left;
        }

        .playlist-duration {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .back-button {
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        @keyframes youtube-loading-pulse {
          0% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.8; 
          }
          100% { 
            transform: scale(1); 
            opacity: 1; 
          }
        }

        @media (max-width: 768px) {
          .media-icon {
            width: 8rem;
            height: 8rem;
          }

          .loading-title {
            font-size: 2.5rem;
          }

          .loading-message {
            font-size: 1.25rem;
          }

          .playlist-title {
            font-size: 2rem;
          }

          .playlist-grid {
            grid-template-columns: 1fr;
          }

          .back-button {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MediaOverlay;