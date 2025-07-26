import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { mockDashboardData } from '../mock/dashboardData';
import FuelTile from './tiles/FuelTile';
import SpeedTile from './tiles/SpeedTile';
import MusicTile from './tiles/MusicTile';
import ParkingTile from './tiles/ParkingTile';
import MapTile from './tiles/MapTile';
import CallTile from './tiles/CallTile';
import SOSTile from './tiles/SOSTile';
import MediaTile from './tiles/MediaTile';
import VoiceButton from './VoiceButton';
import Header from './Header';
import EmergencyOverlay from './overlays/EmergencyOverlay';
import MediaOverlay from './overlays/MediaOverlay';
import './Dashboard.css';

const Dashboard = () => {
  const { currentTheme, isHighContrast } = useTheme();
  const { isListening, transcript, speak, processCommand, startListening, stopListening } = useVoiceAssistant();
  
  const [currentPage, setCurrentPage] = useState('main');
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  const [showEmergencyOverlay, setShowEmergencyOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);

  // Handle voice commands
  useEffect(() => {
    if (transcript) {
      const result = processCommand(transcript);
      handleVoiceCommand(result);
    }
  }, [transcript, processCommand]);

  const handleVoiceCommand = useCallback((result) => {
    const { action, command } = result;
    
    switch (action) {
      case 'navigation':
        setCurrentPage('alt');
        speak('Opening navigation');
        break;
        
      case 'music':
        if (command.includes('play')) {
          setDashboardData(prev => ({
            ...prev,
            music: { ...prev.music, isPlaying: true }
          }));
          speak('Playing music');
        } else if (command.includes('pause') || command.includes('stop')) {
          setDashboardData(prev => ({
            ...prev,
            music: { ...prev.music, isPlaying: false }
          }));
          speak('Music paused');
        }
        break;
        
      case 'emergency':
        setShowEmergencyOverlay(true);
        speak('Activating emergency mode');
        break;
        
      case 'fuel':
        speak(`Current fuel level is ${dashboardData.vehicle.fuel} percent`);
        break;
        
      case 'speed':
        speak(`Current speed is ${dashboardData.vehicle.speed} kilometers per hour`);
        break;
        
      case 'call':
        setCurrentPage('alt');
        speak('Opening call log');
        break;
        
      case 'media':
        setShowMediaOverlay(true);
        speak('Opening media player');
        break;
        
      default:
        speak('Command not recognized. Try saying navigation, music, emergency, or fuel status');
    }
  }, [dashboardData, speak]);

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentPage('alt');
    } else if (direction === 'right') {
      setCurrentPage('main');
    }
  };

  const handleTileClick = (tileType) => {
    switch (tileType) {
      case 'music':
        setDashboardData(prev => ({
          ...prev,
          music: { ...prev.music, isPlaying: !prev.music.isPlaying }
        }));
        speak(dashboardData.music.isPlaying ? 'Music paused' : 'Playing music');
        break;
        
      case 'map':
        setCurrentPage('alt');
        speak('Opening navigation');
        break;
        
      case 'sos':
        setShowEmergencyOverlay(true);
        speak('Emergency activated');
        break;
        
      case 'media':
        setShowMediaOverlay(true);
        speak('Opening media');
        break;
        
      case 'call':
        setCurrentPage('alt');
        speak('Opening call log');
        break;
        
      default:
        break;
    }
  };

  return (
    <div className={`dashboard ${currentTheme} ${isHighContrast ? 'high-contrast' : ''}`}>
      <div className="dashboard-container">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <div className="dashboard-content">
          <div className={`swipe-container ${currentPage === 'alt' ? 'shifted' : ''}`}>
            {/* Main Page */}
            <div className="page">
              <div className="tiles-grid">
                <FuelTile 
                  fuel={dashboardData.vehicle.fuel} 
                  onClick={() => handleTileClick('fuel')} 
                />
                <SpeedTile 
                  speed={dashboardData.vehicle.speed} 
                  onClick={() => handleTileClick('speed')} 
                />
                <MusicTile 
                  music={dashboardData.music} 
                  onClick={() => handleTileClick('music')} 
                />
                <ParkingTile 
                  navigation={dashboardData.navigation} 
                  onClick={() => handleTileClick('parking')} 
                />
              </div>
            </div>
            
            {/* Alternate Page */}
            <div className="page">
              <div className="tiles-grid">
                <MapTile 
                  map={dashboardData.map} 
                  onClick={() => handleTileClick('map')} 
                />
                <CallTile 
                  callLog={dashboardData.callLog} 
                  onClick={() => handleTileClick('call')} 
                />
                <SOSTile 
                  emergency={dashboardData.emergency} 
                  onClick={() => handleTileClick('sos')} 
                />
                <MediaTile 
                  media={dashboardData.media} 
                  onClick={() => handleTileClick('media')} 
                />
              </div>
            </div>
          </div>
        </div>
        
        <VoiceButton 
          isListening={isListening}
          onToggle={isListening ? stopListening : startListening}
        />
        
        {showEmergencyOverlay && (
          <EmergencyOverlay 
            emergency={dashboardData.emergency}
            onClose={() => setShowEmergencyOverlay(false)}
          />
        )}
        
        {showMediaOverlay && (
          <MediaOverlay 
            media={dashboardData.media}
            onClose={() => setShowMediaOverlay(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;