import React from 'react';

const SOSTile = ({ emergency, onClick }) => {
  const emergencyContacts = emergency?.contacts || [
    { name: "Emergency Services", number: "911" }
  ];

  return (
    <div className="glassmorphism tile-container sos-tile" onClick={onClick}>
      <div className="sos-content">
        <div className="sos-button-container">
          <button className="sos-button sos-pulse-animation">
            SOS
          </button>
        </div>
        
        <p className="sos-label">Emergency</p>
        
        <div className="emergency-info">
          <div className="emergency-contacts">
            <span className="contacts-label">{emergencyContacts[0]?.name || "Emergency Services"}</span>
            <span className="contacts-number">{emergencyContacts[0]?.number || "911"}</span>
          </div>
          
          <div className="status-indicator">
            <div className={`status-dot ${emergency?.isActive ? 'active' : 'inactive'}`}></div>
            <span className="status-text">
              {emergency?.isActive ? 'Active' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sos-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          background: linear-gradient(135deg, var(--tile-bg), rgba(239, 68, 68, 0.05));
        }

        .sos-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          gap: 1rem;
        }

        .sos-button-container {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .sos-button {
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          font-size: 1.875rem;
          font-weight: 700;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
          position: relative;
          z-index: 2;
        }

        .sos-pulse-animation {
          animation: sos-pulse 1.5s infinite;
        }

        .sos-label {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .emergency-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .emergency-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
        }

        .contacts-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .contacts-number {
          font-size: 1.125rem;
          font-weight: 700;
          color: #ef4444;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(var(--text-secondary-rgb, 96, 165, 250), 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .status-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }

        .status-dot.active {
          background: #ef4444;
          animation: pulse-dot 1s infinite;
        }

        .status-dot.inactive {
          background: #10b981;
        }

        .status-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        @keyframes sos-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(239, 68, 68, 0);
          }
        }

        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .sos-tile:hover .sos-button {
          transform: scale(1.05);
          box-shadow: 0 12px 35px rgba(239, 68, 68, 0.4);
          transition: all 0.3s ease;
        }

        .sos-tile:hover .sos-pulse-animation {
          animation-duration: 1s;
        }

        @media (max-width: 768px) {
          .sos-button {
            width: 5rem;
            height: 5rem;
            font-size: 1.5rem;
          }

          .sos-label {
            font-size: 1.25rem;
          }

          .contacts-label {
            font-size: 0.75rem;
          }

          .contacts-number {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SOSTile;