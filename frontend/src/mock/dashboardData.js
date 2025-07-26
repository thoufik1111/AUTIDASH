// Mock data for DriveAssist Dashboard
export const mockDashboardData = {
  vehicle: {
    fuel: 50,
    speed: 110,
    temperature: 15,
    location: "Downtown Area"
  },
  
  music: {
    title: "Lofi Beats",
    artist: "Chillhop Music",
    isPlaying: false,
    albumArt: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgUR7uwK7emxcpo8_l-018Uz4k78YYdpQoggYzIDD5GQyW9i_XTCfbfj4s0W-Dey0SSNvaNwTlzllINVD_QPCakgxWBp_lVMMLixtIuzEsLq9z1jS3ZsvZZ_GvMhrbkvxtIgsHlsm6Am7lG1w0z5JvAC2sLV_Yqrl8kux7NiVAHGglirrtwmJ-CIgKzweGsf-oKCIWAcp-PrOG2dZIE3nLOz878V4iupsszpAijhBesUzs5l1_FXcAJoBGzPIh1dFV80488i7ZoOKu"
  },

  navigation: {
    currentDirection: "right",
    destination: "Parking Lot A",
    distance: "200m ahead",
    directions: [
      { type: "straight", instruction: "Continue straight" },
      { type: "right", instruction: "Turn right at parking" },
      { type: "left", instruction: "Take left exit" },
      { type: "uturn", instruction: "Make U-turn ahead" }
    ]
  },

  callLog: [
    { name: "Emergency Services", number: "911", time: "10:30 AM", type: "emergency" },
    { name: "John Doe", number: "+1-555-0123", time: "9:45 AM", type: "contact" },
    { name: "Jane Smith", number: "+1-555-0456", time: "8:30 AM", type: "contact" }
  ],

  media: {
    currentSource: "YouTube Music",
    isLoading: false,
    playlist: [
      { title: "Lofi Hip Hop", artist: "ChilledCow", duration: "2:30:00" },
      { title: "Jazz Essentials", artist: "Blue Note", duration: "1:45:00" },
      { title: "Road Trip Hits", artist: "Various", duration: "3:15:00" }
    ]
  },

  emergency: {
    isActive: false,
    contacts: [
      { name: "Emergency Services", number: "911" },
      { name: "Roadside Assistance", number: "1-800-AAA-HELP" },
      { name: "Emergency Contact", number: "+1-555-HELP" }
    ]
  },

  map: {
    currentLocation: { lat: 40.7128, lng: -74.0060 },
    destination: { lat: 40.7589, lng: -73.9851 },
    isNavigating: false,
    nearbyPlaces: [
      { name: "Gas Station", distance: "0.5 miles", type: "fuel" },
      { name: "Parking Garage", distance: "200m", type: "parking" },
      { name: "Restaurant", distance: "0.3 miles", type: "food" }
    ]
  }
};

export const voiceCommands = {
  navigation: [
    "navigate to", "go to", "directions to", "take me to", "show map", "open map"
  ],
  music: [
    "play music", "pause music", "stop music", "next song", "previous song", "play"
  ],
  emergency: [
    "emergency", "help", "sos", "call for help", "call emergency"
  ],
  fuel: [
    "fuel level", "gas level", "how much fuel", "fuel status"
  ],
  speed: [
    "current speed", "how fast", "speed check"
  ],
  call: [
    "make call", "call", "phone", "dial", "call log"
  ],
  media: [
    "open media", "youtube", "videos", "entertainment"
  ],
  theme: [
    "change theme", "switch theme", "dark mode", "light mode"
  ]
};