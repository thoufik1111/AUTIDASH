import React from 'react';

const CallTile = ({ callLog, onClick }) => {
  const recentCall = callLog?.[0] || { name: "No calls", number: "", time: "", type: "contact" };

  return (
    <div className="glassmorphism tile-container call-tile" onClick={onClick}>
      <div className="call-content">
        <div className="call-icon-container call-ring-animation">
          <svg className="call-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        <p className="call-label">Call Log</p>
        
        <div className="recent-calls">
          <div className="recent-call">
            <div className="call-info">
              <span className="call-name">{recentCall.name}</span>
              <span className="call-time">{recentCall.time}</span>
            </div>
            <div className={`call-type ${recentCall.type}`}>
              {recentCall.type === 'emergency' ? (
                <svg className="call-type-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75Zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="call-type-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0ZM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          
          <div className="call-count">
            {callLog?.length || 0} total calls
          </div>
        </div>
      </div>

      <style jsx>{`
        .call-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
        }

        .call-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          gap: 1rem;
        }

        .call-icon-container {
          margin-bottom: 0.5rem;
        }

        .call-icon {
          height: 8rem;
          width: 8rem;
          color: var(--accent-green);
        }

        .call-ring-animation {
          animation: call-ring 1s ease-in-out infinite;
        }

        .call-label {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
        }

        .recent-calls {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .recent-call {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(var(--theme-accent-rgb, 59, 130, 246), 0.1);
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
        }

        .call-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
        }

        .call-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .call-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .call-type {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }

        .call-type.emergency {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .call-type.contact {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .call-type-icon {
          width: 1rem;
          height: 1rem;
        }

        .call-count {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          background: rgba(var(--text-secondary-rgb, 96, 165, 250), 0.1);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        @keyframes call-ring {
          0%, 100% { 
            transform: rotate(0deg); 
          }
          25% { 
            transform: rotate(15deg); 
          }
          75% { 
            transform: rotate(-15deg); 
          }
        }

        .call-tile:hover .call-ring-animation {
          animation-duration: 0.5s;
        }

        .call-tile:hover .call-icon {
          color: var(--theme-accent);
          transform: scale(1.05);
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .call-icon {
            height: 6rem;
            width: 6rem;
          }

          .call-label {
            font-size: 1.25rem;
          }

          .call-name {
            font-size: 0.75rem;
          }

          .call-time {
            font-size: 0.625rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CallTile;