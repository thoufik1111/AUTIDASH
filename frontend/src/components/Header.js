import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ currentPage, onPageChange }) => {
  const { currentTheme, cycleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="time-display">{formatTime(currentTime)}</span>
        <div className="divider"></div>
        <div className="weather-display">
          <svg className="weather-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="temperature">{temperature}°C</span>
        </div>
      </div>

      <nav className="navigation">
        <button 
          className={`nav-button ${currentPage === 'main' ? 'active' : ''}`}
          onClick={() => onPageChange('main')}
        >
          Main
        </button>
        <button 
          className={`nav-button ${currentPage === 'alt' ? 'active' : ''}`}
          onClick={() => onPageChange('alt')}
        >
          Alternate
        </button>
      </nav>

      <div className="header-right">
        <span className="theme-label">Theme</span>
        <button className="theme-button" onClick={cycleTheme}>
          <svg className="theme-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-radius: 3rem 3rem 0 0;
          background: var(--header-bg);
          color: var(--text-secondary);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .time-display {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .divider {
          width: 1px;
          height: 1.5rem;
          background: var(--text-secondary);
          opacity: 0.5;
        }

        .weather-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .weather-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: var(--accent-blue);
        }

        .temperature {
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .navigation {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--tile-bg);
          border-radius: 9999px;
          padding: 0.25rem;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        }

        .nav-button {
          padding: 0.5rem 1.5rem;
          border-radius: 9999px;
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--text-primary);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.5s ease-in-out;
        }

        .nav-button.active {
          background-color: var(--theme-accent);
          color: white;
        }

        .nav-button:hover:not(.active) {
          background-color: var(--tile-border);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-label {
          font-size: 1.125rem;
          color: var(--text-primary);
        }

        .theme-button {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: var(--theme-accent);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .theme-button:hover {
          transform: scale(1.1);
        }

        .theme-icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 1rem;
            padding: 0.75rem;
          }

          .theme-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;