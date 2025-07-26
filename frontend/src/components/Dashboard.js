import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import axios from 'axios';
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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const { currentTheme, isHighContrast } = useTheme();
  const { isListening, transcript, speak, processCommand, startListening, stopListening } = useVoiceAssistant();
  
  const [currentPage, setCurrentPage] = useState('main');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmergencyOverlay, setShowEmergencyOverlay] = useState(false);
  const [showMediaOverlay, setShowMediaOverlay] = useState(false);

  // Fetch dashboard data from backend
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/state`);
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback to default structure if backend fails
      setDashboardData({
        vehicle: { fuel: 50, speed: 110, temperature: 15, location: "Downtown Area" },
        music: { 
          title: "Lofi Beats", 
          artist: "Chillhop Music", 
          is_playing: false,
          album_art: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgUR7uwK7emxcpo8_l-018Uz4k78YYdpQoggYzIDD5GQyW9i_XTCfbfj4s0W-Dey0SSNvaNwTlzllINVD_QPCakgxWBp_lVMMLixtIuzEsLq9z1jS3ZsvZZ_GvMhrbkvxtIgsHlsm6Am7lG1w0z5JvAC2sLV_Yqrl8kux7NiVAHGglirrtwmJ-CIgKzweGsf-oKCIWAcp-PrOG2dZIE3nLOz878V4iupsszpAijhBesUzs5l1_FXcAJoBGzPIh1dFV80488i7ZoOKu"
        },
        navigation: { current_direction: "right", destination: "Parking Lot A", distance: "200m ahead" },
        call_log: { entries: [{ name: "Emergency Services", number: "911", time: "10:30 AM", type: "emergency" }] },
        media: { current_source: "YouTube Music", is_loading: false, playlist: [] },
        emergency: { is_active: false, contacts: [{ name: "Emergency Services", number: "911" }] },
        map_data: { is_navigating: false, nearby_places: [] }
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle voice commands
  useEffect(() => {
    if (transcript && dashboardData) {
      const result = processCommand(transcript);
      handleVoiceCommand(result);
    }
  }, [transcript, processCommand, dashboardData]);

  const handleVoiceCommand = useCallback(async (result) => {
    const { action, command } = result;
    
    // Log voice command to backend
    try {
      await axios.post(`${API}/dashboard/voice-command`, {
        command: command,
        action: action,
        processed: true
      });
    } catch (error) {
      console.error('Failed to log voice command:', error);
    }
    
    switch (action) {
      case 'navigation':
        setCurrentPage('alt');
        speak('Opening navigation');
        try {
          await axios.put(`${API}/dashboard/map`, { is_navigating: true });
          await fetchDashboardData();
        } catch (error) {
          console.error('Failed to update navigation:', error);
        }
        break;
        
      case 'music':
        if (command.includes('play')) {
          try {
            await axios.put(`${API}/dashboard/music`, { is_playing: true });
            await fetchDashboardData();
            speak('Playing music');
          } catch (error) {
            console.error('Failed to update music:', error);
            speak('Playing music');
          }
        } else if (command.includes('pause') || command.includes('stop')) {
          try {
            await axios.put(`${API}/dashboard/music`, { is_playing: false });
            await fetchDashboardData();
            speak('Music paused');
          } catch (error) {
            console.error('Failed to update music:', error);
            speak('Music paused');
          }
        }
        break;
        
      case 'emergency':
        setShowEmergencyOverlay(true);
        speak('Activating emergency mode');
        try {
          await axios.put(`${API}/dashboard/emergency`, { is_active: true });
          await fetchDashboardData();
        } catch (error) {
          console.error('Failed to update emergency:', error);
        }
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
        try {
          await axios.put(`${API}/dashboard/media`, { is_loading: true });
          await fetchDashboardData();
        } catch (error) {
          console.error('Failed to update media:', error);
        }
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

  const handleTileClick = async (tileType) => {
    switch (tileType) {
      case 'music':
        try {
          const newPlayingState = !dashboardData.music.is_playing;
          await axios.put(`${API}/dashboard/music`, { is_playing: newPlayingState });
          await fetchDashboardData();
          speak(dashboardData.music.is_playing ? 'Music paused' : 'Playing music');
        } catch (error) {
          console.error('Failed to update music:', error);
          speak(dashboardData.music.is_playing ? 'Music paused' : 'Playing music');
        }
        break;
        
      case 'map':
        setCurrentPage('alt');
        speak('Opening navigation');
        try {
          await axios.put(`${API}/dashboard/map`, { is_navigating: true });
          await fetchDashboardData();
        } catch (error) {
          console.error('Failed to update map:', error);
        }
        break;
        
      case 'sos':
        setShowEmergencyOverlay(true);
        speak('Emergency activated');
        try {
          await axios.put(`${API}/dashboard/emergency`, { is_active: true });
          await fetchDashboardData();
        } catch (error) {
          console.error('Failed to update emergency:', error);
        }
        break;
        
      case 'media':
        setShowMediaOverlay(true);
        speak('Opening media');
        try {
          await axios.put(`${API}/dashboard/media`, { is_loading: true });
          await fetchDashboardData();
        } catch (error) {
          console.error('Failed to update media:', error);
        }
        break;
        
      case 'call':
        setCurrentPage('alt');
        speak('Opening call log');
        break;
        
      default:
        break;
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className={`dashboard ${currentTheme} ${isHighContrast ? 'high-contrast' : ''}`}>
        <div className="dashboard-container">
          <Header currentPage={currentPage} onPageChange={setCurrentPage} />
          <div className="dashboard-content">
            <div className="loading-spinner">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

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