import React, { useState, useEffect } from 'react';

const ParkingTile = ({ navigation, onClick }) => {
  const [currentDirectionIndex, setCurrentDirectionIndex] = useState(1); // Start with right arrow

  const directions = [
    {
      type: 'straight',
      icon: (
        <svg className="direction-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
        </svg>
      )
    },
    {
      type: 'right',
      icon: (
        <svg className="direction-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      type: 'left',
      icon: (
        <svg className="direction-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      type: 'uturn',
      icon: (
        <svg className="direction-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDirectionIndex((prevIndex) => (prevIndex + 1) % directions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [directions.length]);

  return (
    <div className="glassmorphism tile-container parking-tile" onClick={onClick}>
      <div className="parking-content">
        <div className="arrow-container arrow-animation">
          {directions[currentDirectionIndex].icon}
        </div>
        
        <div className="parking-info">
          <p className="parking-title">Parking Ahead</p>
          <p className="parking-subtitle">Follow the arrow</p>
          <p className="parking-distance">{navigation.distance}</p>
        </div>
      </div>

      <style jsx>{`
        .parking-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .parking-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        .arrow-container {
          margin-bottom: 1rem;
        }

        .direction-arrow {
          height: 7rem;
          width: 7rem;
          color: var(--accent-blue);
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        .arrow-animation {
          animation: arrow-pulse 2s ease-in-out infinite;
        }

        .parking-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .parking-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.2;
        }

        .parking-subtitle {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin: 0;
        }

        .parking-distance {
          font-size: 1rem;
          color: var(--text-secondary);
          margin: 0;
          padding: 0.5rem 1rem;
          background: rgba(var(--theme-accent-rgb, 59, 130, 246), 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        @keyframes arrow-pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.8; 
          }
        }

        .parking-tile:hover .arrow-animation {
          animation-duration: 1s;
        }

        .parking-tile:hover .direction-arrow {
          color: var(--theme-accent);
          transform: scale(1.05);
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .direction-arrow {
            height: 5rem;
            width: 5rem;
          }

          .parking-title {
            font-size: 1.5rem;
          }

          .parking-subtitle {
            font-size: 1rem;
          }

          .parking-distance {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ParkingTile;