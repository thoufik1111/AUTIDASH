import React from 'react';

const FuelTile = ({ fuel, onClick }) => {
  return (
    <div className="glassmorphism tile-container fuel-tile" onClick={onClick}>
      <div className="fuel-tank">
        <div className="fuel-tank-border">
          <div className="fuel-level" style={{ height: `${fuel}%` }}>
            <div className="fuel-wave fuel-wave-animation"></div>
          </div>
        </div>
        <div className="fuel-cap"></div>
        
        <svg className="fuel-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M7.5 12.5A2.5 2.5 0 1 1 12.5 12.5V17.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.5 17.5h-1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.25 17.5H7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 17.5V7.5a5 5 0 0 1 5-5h.001a5 5 0 0 1 5 5v10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 12.5H2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.5 12.5h-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      <p className="fuel-text">Fuel: {fuel}%</p>

      <style jsx>{`
        .fuel-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .fuel-tank {
          width: 12rem;
          height: 8rem;
          position: relative;
          margin-bottom: 1rem;
        }

        .fuel-tank-border {
          width: 100%;
          height: 100%;
          border: 4px solid var(--text-secondary);
          border-radius: 0.5rem;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          position: relative;
        }

        .fuel-level {
          width: 100%;
          background: var(--accent-green);
          position: relative;
          transition: height 0.5s ease;
          min-height: 2px;
        }

        .fuel-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: var(--accent-green);
          opacity: 0.5;
          border-radius: 50%;
        }

        .fuel-cap {
          position: absolute;
          top: -0.5rem;
          right: -1rem;
          width: 2rem;
          height: 1rem;
          background: var(--text-secondary);
          border-radius: 0.375rem 0.375rem 0 0;
        }

        .fuel-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 3rem;
          width: 3rem;
          color: var(--text-primary);
          z-index: 10;
        }

        .fuel-text {
          margin-top: 1rem;
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-align: center;
        }

        .fuel-tile:hover .fuel-wave {
          animation-duration: 3s;
        }

        @media (max-width: 768px) {
          .fuel-tank {
            width: 8rem;
            height: 6rem;
          }

          .fuel-icon {
            height: 2rem;
            width: 2rem;
          }

          .fuel-text {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FuelTile;