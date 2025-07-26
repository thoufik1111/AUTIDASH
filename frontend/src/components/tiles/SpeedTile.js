import React from 'react';

const SpeedTile = ({ speed, onClick }) => {
  return (
    <div className="glassmorphism tile-container speed-tile" onClick={onClick}>
      <div className="speed-display">
        <span className="speed-number">{speed}</span>
        <span className="speed-unit">km/h</span>
        
        <div className="road-animation">
          <div className="road-line"></div>
          <div className="car-animation">
            <svg className="car-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H3.375" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .speed-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
          position: relative;
        }

        .speed-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 100%;
        }

        .speed-number {
          font-size: 5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .speed-unit {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-top: -0.5rem;
        }

        .road-animation {
          position: absolute;
          bottom: 1rem;
          width: 100%;
          height: 2.5rem;
          overflow: hidden;
        }

        .road-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--text-secondary),
            transparent
          );
          opacity: 0.5;
        }

        .car-animation {
          position: absolute;
          bottom: 0.25rem;
          animation: drive 3s linear infinite;
        }

        .car-icon {
          width: 5rem;
          height: 5rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }

        @keyframes drive {
          0% { 
            transform: translateX(-12rem); 
          }
          100% { 
            transform: translateX(12rem); 
          }
        }

        .speed-tile:hover .car-animation {
          animation-duration: 1.5s;
        }

        .speed-tile:hover .speed-number {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        @media (max-width: 768px) {
          .speed-number {
            font-size: 3.5rem;
          }

          .speed-unit {
            font-size: 1.25rem;
          }

          .car-icon {
            width: 3rem;
            height: 3rem;
          }

          @keyframes drive {
            0% { 
              transform: translateX(-8rem); 
            }
            100% { 
              transform: translateX(8rem); 
            }
          }
        }
      `}</style>
    </div>
  );
};

export default SpeedTile;