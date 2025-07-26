import React from 'react';

const MapTile = ({ map, onClick }) => {
  const nearbyPlaces = map?.nearby_places || [
    { name: "Gas Station", distance: "0.5 miles", type: "fuel" },
    { name: "Parking Garage", distance: "200m", type: "parking" }
  ];
  
  return (
    <div className="glassmorphism tile-container map-tile" onClick={onClick}>
      <div className="map-content">
        <div className="map-icon-container">
          <svg className="map-icon" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13V7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 10V7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <div className="location-ping map-ping-animation"></div>
          <div className="location-dot"></div>
        </div>
        
        <p className="map-label">Map</p>
        
        <div className="nearby-places">
          {nearbyPlaces.slice(0, 2).map((place, index) => (
            <div key={index} className="nearby-place">
              <span className="place-name">{place.name}</span>
              <span className="place-distance">{place.distance}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .map-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          overflow: hidden;
          position: relative;
        }

        .map-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          gap: 1rem;
        }

        .map-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .map-icon {
          height: 8rem;
          width: 8rem;
          color: var(--accent-blue);
          z-index: 2;
        }

        .location-ping {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2rem;
          height: 2rem;
          background: var(--theme-accent);
          border-radius: 50%;
          z-index: 1;
        }

        .location-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1rem;
          height: 1rem;
          background: white;
          border-radius: 50%;
          z-index: 3;
        }

        .map-ping-animation {
          animation: map-ping 2s ease-out infinite;
        }

        .map-label {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
        }

        .nearby-places {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .nearby-place {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          background: rgba(var(--theme-accent-rgb, 59, 130, 246), 0.1);
          border-radius: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .place-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .place-distance {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        @keyframes map-ping {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        .map-tile:hover .map-icon {
          color: var(--theme-accent);
          transform: scale(1.05);
          transition: all 0.3s ease;
        }

        .map-tile:hover .map-ping-animation {
          animation-duration: 1s;
        }

        @media (max-width: 768px) {
          .map-icon {
            height: 6rem;
            width: 6rem;
          }

          .map-label {
            font-size: 1.25rem;
          }

          .place-name {
            font-size: 0.75rem;
          }

          .place-distance {
            font-size: 0.625rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MapTile;