from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Vehicle Data Models
class VehicleData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fuel: int = 50
    speed: int = 110
    temperature: int = 15
    location: str = "Downtown Area"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class VehicleDataCreate(BaseModel):
    fuel: Optional[int] = 50
    speed: Optional[int] = 110
    temperature: Optional[int] = 15
    location: Optional[str] = "Downtown Area"

# Music Models
class MusicData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = "Lofi Beats"
    artist: str = "Chillhop Music"
    is_playing: bool = False
    album_art: str = "https://lh3.googleusercontent.com/aida-public/AB6AXuBgUR7uwK7emxcpo8_l-018Uz4k78YYdpQoggYzIDD5GQyW9i_XTCfbfj4s0W-Dey0SSNvaNwTlzllINVD_QPCakgxWBp_lVMMLixtIuzEsLq9z1jS3ZsvZZ_GvMhrbkvxtIgsHlsm6Am7lG1w0z5JvAC2sLV_Yqrl8kux7NiVAHGglirrtwmJ-CIgKzweGsf-oKCIWAcp-PrOG2dZIE3nLOz878V4iupsszpAijhBesUzs5l1_FXcAJoBGzPIh1dFV80488i7ZoOKu"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class MusicDataUpdate(BaseModel):
    title: Optional[str] = None
    artist: Optional[str] = None
    is_playing: Optional[bool] = None
    album_art: Optional[str] = None

# Navigation Models
class NavigationDirection(BaseModel):
    type: str  # straight, right, left, uturn
    instruction: str

class NavigationData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    current_direction: str = "right"
    destination: str = "Parking Lot A"
    distance: str = "200m ahead"
    directions: List[NavigationDirection] = [
        NavigationDirection(type="straight", instruction="Continue straight"),
        NavigationDirection(type="right", instruction="Turn right at parking"),
        NavigationDirection(type="left", instruction="Take left exit"),
        NavigationDirection(type="uturn", instruction="Make U-turn ahead")
    ]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class NavigationDataUpdate(BaseModel):
    current_direction: Optional[str] = None
    destination: Optional[str] = None
    distance: Optional[str] = None

# Call Log Models
class CallLogEntry(BaseModel):
    name: str
    number: str
    time: str
    type: str  # emergency, contact

class CallLogData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    entries: List[CallLogEntry] = [
        CallLogEntry(name="Emergency Services", number="911", time="10:30 AM", type="emergency"),
        CallLogEntry(name="John Doe", number="+1-555-0123", time="9:45 AM", type="contact"),
        CallLogEntry(name="Jane Smith", number="+1-555-0456", time="8:30 AM", type="contact")
    ]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class CallLogEntryCreate(BaseModel):
    name: str
    number: str
    time: str
    type: str

# Media Models
class PlaylistItem(BaseModel):
    title: str
    artist: str
    duration: str

class MediaData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    current_source: str = "YouTube Music"
    is_loading: bool = False
    playlist: List[PlaylistItem] = [
        PlaylistItem(title="Lofi Hip Hop", artist="ChilledCow", duration="2:30:00"),
        PlaylistItem(title="Jazz Essentials", artist="Blue Note", duration="1:45:00"),
        PlaylistItem(title="Road Trip Hits", artist="Various", duration="3:15:00")
    ]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class MediaDataUpdate(BaseModel):
    current_source: Optional[str] = None
    is_loading: Optional[bool] = None

# Emergency Models
class EmergencyContact(BaseModel):
    name: str
    number: str

class EmergencyData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    is_active: bool = False
    contacts: List[EmergencyContact] = [
        EmergencyContact(name="Emergency Services", number="911"),
        EmergencyContact(name="Roadside Assistance", number="1-800-AAA-HELP"),
        EmergencyContact(name="Emergency Contact", number="+1-555-HELP")
    ]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class EmergencyDataUpdate(BaseModel):
    is_active: Optional[bool] = None

# Map Models
class Location(BaseModel):
    lat: float
    lng: float

class NearbyPlace(BaseModel):
    name: str
    distance: str
    type: str

class MapData(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    current_location: Location = Location(lat=40.7128, lng=-74.0060)
    destination: Location = Location(lat=40.7589, lng=-73.9851)
    is_navigating: bool = False
    nearby_places: List[NearbyPlace] = [
        NearbyPlace(name="Gas Station", distance="0.5 miles", type="fuel"),
        NearbyPlace(name="Parking Garage", distance="200m", type="parking"),
        NearbyPlace(name="Restaurant", distance="0.3 miles", type="food")
    ]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class MapDataUpdate(BaseModel):
    is_navigating: Optional[bool] = None
    current_location: Optional[Location] = None
    destination: Optional[Location] = None

# Voice Command Models
class VoiceCommand(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    command: str
    action: str
    processed: bool = True
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class VoiceCommandCreate(BaseModel):
    command: str
    action: str
    processed: bool = True

# Dashboard State Model - combines all data
class DashboardState(BaseModel):
    vehicle: VehicleData
    music: MusicData
    navigation: NavigationData
    call_log: CallLogData
    media: MediaData
    emergency: EmergencyData
    map_data: MapData