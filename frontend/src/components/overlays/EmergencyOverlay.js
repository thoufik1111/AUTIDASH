import React, { useEffect } from 'react';

const EmergencyOverlay = ({ emergency, onClose }) => {
  useEffect(() => {
    // Auto-close after 10 seconds for demo purposes
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="overlay-backdrop">
      <div className="emergency-overlay">
        <div className="emergency-content emergency-call-animation">
          <svg className="emergency-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <h2 className="emergency-title">EMERGENCY CALL</h2>
          <p className="emergency-message">Contacting emergency services...</p>
          
          <div className="emergency-contacts">
            {emergency.contacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <span className="contact-name">{contact.name}</span>
                <span className="contact-number">{contact.number}</span>
              </div>
            ))}
          </div>
        </div>
        
        <button className="cancel-button" onClick={onClose}>
          CANCEL
        </button>
      </div>

      <style jsx>{`
        .overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(239, 68, 68, 0.9);
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

        .emergency-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          width: 100%;
        }

        .emergency-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .emergency-call-animation {
          animation: emergency-call-pulse 1s infinite ease-in-out;
        }

        .emergency-icon {
          width: 12rem;
          height: 12rem;
          margin-bottom: 2rem;
        }

        .emergency-title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          letter-spacing: 0.05em;
        }

        .emergency-message {
          font-size: 1.875rem;
          font-weight: 500;
          margin: 0 0 2rem 0;
        }

        .emergency-contacts {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .contact-name {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .contact-number {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .cancel-button {
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

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        @keyframes emergency-call-pulse {
          0% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.9; 
          }
          100% { 
            transform: scale(1); 
            opacity: 1; 
          }
        }

        @media (max-width: 768px) {
          .emergency-icon {
            width: 8rem;
            height: 8rem;
          }

          .emergency-title {
            font-size: 2.5rem;
          }

          .emergency-message {
            font-size: 1.25rem;
          }

          .contact-name {
            font-size: 1rem;
          }

          .contact-number {
            font-size: 1.25rem;
          }

          .cancel-button {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EmergencyOverlay;