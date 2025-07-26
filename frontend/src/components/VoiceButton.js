import React from 'react';

const VoiceButton = ({ isListening, onToggle }) => {
  return (
    <div className="voice-button-container">
      <button 
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={onToggle}
        aria-label={isListening ? 'Stop listening' : 'Start voice command'}
      >
        <svg className="mic-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" strokeLinecap="round" strokeLinejoin="round" />
          <line strokeLinecap="round" strokeLinejoin="round" x1="12" x2="12" y1="19" y2="23" />
        </svg>
      </button>
      
      <div className="voice-pulse-ring"></div>

      <style jsx>{`
        .voice-button-container {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          z-index: 50;
        }

        .voice-button {
          width: 5rem;
          height: 5rem;
          background: var(--theme-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .voice-button:hover {
          transform: scale(1.1);
        }

        .voice-button.listening {
          background: var(--accent-red);
          animation: pulse-mic 2s infinite;
        }

        .mic-icon {
          width: 2.5rem;
          height: 2.5rem;
        }

        .voice-pulse-ring {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: -1;
        }

        .voice-pulse-ring::before {
          content: '';
          width: 5rem;
          height: 5rem;
          background: var(--theme-accent);
          opacity: 0.5;
          border-radius: 50%;
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes pulse-mic {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); 
          }
          50% { 
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); 
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .voice-button-container {
            bottom: 1rem;
            right: 1rem;
          }

          .voice-button, .voice-pulse-ring::before {
            width: 4rem;
            height: 4rem;
          }

          .mic-icon {
            width: 2rem;
            height: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceButton;