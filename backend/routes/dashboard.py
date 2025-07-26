from fastapi import APIRouter, HTTPException
from typing import List
from ..models import *
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

# Get database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/state", response_model=DashboardState)
async def get_dashboard_state():
    """Get the complete dashboard state"""
    try:
        # Get or create default data for each component
        vehicle_data = await db.vehicle_data.find_one() or VehicleData().dict()
        music_data = await db.music_data.find_one() or MusicData().dict()
        navigation_data = await db.navigation_data.find_one() or NavigationData().dict()
        call_log_data = await db.call_log_data.find_one() or CallLogData().dict()
        media_data = await db.media_data.find_one() or MediaData().dict()
        emergency_data = await db.emergency_data.find_one() or EmergencyData().dict()
        map_data = await db.map_data.find_one() or MapData().dict()

        # Remove MongoDB _id fields if they exist
        for data in [vehicle_data, music_data, navigation_data, call_log_data, media_data, emergency_data, map_data]:
            data.pop('_id', None)

        dashboard_state = DashboardState(
            vehicle=VehicleData(**vehicle_data),
            music=MusicData(**music_data),
            navigation=NavigationData(**navigation_data),
            call_log=CallLogData(**call_log_data),
            media=MediaData(**media_data),
            emergency=EmergencyData(**emergency_data),
            map_data=MapData(**map_data)
        )

        return dashboard_state
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get dashboard state: {str(e)}")

@router.post("/vehicle", response_model=VehicleData)
async def update_vehicle_data(vehicle_update: VehicleDataCreate):
    """Update vehicle data"""
    try:
        existing_data = await db.vehicle_data.find_one()
        if existing_data:
            # Update existing data
            update_dict = {k: v for k, v in vehicle_update.dict().items() if v is not None}
            update_dict['timestamp'] = datetime.utcnow()
            await db.vehicle_data.update_one({"id": existing_data["id"]}, {"$set": update_dict})
            updated_data = await db.vehicle_data.find_one({"id": existing_data["id"]})
            updated_data.pop('_id', None)
            return VehicleData(**updated_data)
        else:
            # Create new data
            vehicle_data = VehicleData(**vehicle_update.dict())
            await db.vehicle_data.insert_one(vehicle_data.dict())
            return vehicle_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update vehicle data: {str(e)}")

@router.put("/music", response_model=MusicData)
async def update_music_data(music_update: MusicDataUpdate):
    """Update music data"""
    try:
        existing_data = await db.music_data.find_one()
        if existing_data:
            # Update existing data
            update_dict = {k: v for k, v in music_update.dict().items() if v is not None}
            update_dict['timestamp'] = datetime.utcnow()
            await db.music_data.update_one({"id": existing_data["id"]}, {"$set": update_dict})
            updated_data = await db.music_data.find_one({"id": existing_data["id"]})
            updated_data.pop('_id', None)
            return MusicData(**updated_data)
        else:
            # Create new data with defaults, then update
            music_data = MusicData()
            music_dict = music_data.dict()
            music_dict.update({k: v for k, v in music_update.dict().items() if v is not None})
            music_data = MusicData(**music_dict)
            await db.music_data.insert_one(music_data.dict())
            return music_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update music data: {str(e)}")

@router.put("/navigation", response_model=NavigationData)
async def update_navigation_data(nav_update: NavigationDataUpdate):
    """Update navigation data"""
    try:
        existing_data = await db.navigation_data.find_one()
        if existing_data:
            # Update existing data
            update_dict = {k: v for k, v in nav_update.dict().items() if v is not None}
            update_dict['timestamp'] = datetime.utcnow()
            await db.navigation_data.update_one({"id": existing_data["id"]}, {"$set": update_dict})
            updated_data = await db.navigation_data.find_one({"id": existing_data["id"]})
            updated_data.pop('_id', None)
            return NavigationData(**updated_data)
        else:
            # Create new data with defaults, then update
            nav_data = NavigationData()
            nav_dict = nav_data.dict()
            nav_dict.update({k: v for k, v in nav_update.dict().items() if v is not None})
            nav_data = NavigationData(**nav_dict)
            await db.navigation_data.insert_one(nav_data.dict())
            return nav_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update navigation data: {str(e)}")

@router.post("/call-log", response_model=CallLogData)
async def add_call_log_entry(call_entry: CallLogEntryCreate):
    """Add a new call log entry"""
    try:
        existing_data = await db.call_log_data.find_one()
        if existing_data:
            # Add new entry to existing call log
            existing_data.pop('_id', None)
            call_log = CallLogData(**existing_data)
            new_entry = CallLogEntry(**call_entry.dict())
            call_log.entries.insert(0, new_entry)  # Add to beginning
            call_log.timestamp = datetime.utcnow()
            await db.call_log_data.update_one({"id": call_log.id}, {"$set": call_log.dict()})
            return call_log
        else:
            # Create new call log with entry
            call_log = CallLogData()
            new_entry = CallLogEntry(**call_entry.dict())
            call_log.entries.insert(0, new_entry)
            await db.call_log_data.insert_one(call_log.dict())
            return call_log
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add call log entry: {str(e)}")

@router.put("/emergency", response_model=EmergencyData)
async def update_emergency_data(emergency_update: EmergencyDataUpdate):
    """Update emergency data"""
    try:
        existing_data = await db.emergency_data.find_one()
        if existing_data:
            # Update existing data
            update_dict = {k: v for k, v in emergency_update.dict().items() if v is not None}
            update_dict['timestamp'] = datetime.utcnow()
            await db.emergency_data.update_one({"id": existing_data["id"]}, {"$set": update_dict})
            updated_data = await db.emergency_data.find_one({"id": existing_data["id"]})
            updated_data.pop('_id', None)
            return EmergencyData(**updated_data)
        else:
            # Create new data with defaults, then update
            emergency_data = EmergencyData()
            emergency_dict = emergency_data.dict()
            emergency_dict.update({k: v for k, v in emergency_update.dict().items() if v is not None})
            emergency_data = EmergencyData(**emergency_dict)
            await db.emergency_data.insert_one(emergency_data.dict())
            return emergency_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update emergency data: {str(e)}")

@router.put("/media", response_model=MediaData)
async def update_media_data(media_update: MediaDataUpdate):
    """Update media data"""
    try:
        existing_data = await db.media_data.find_one()
        if existing_data:
            # Update existing data
            update_dict = {k: v for k, v in media_update.dict().items() if v is not None}
            update_dict['timestamp'] = datetime.utcnow()
            await db.media_data.update_one({"id": existing_data["id"]}, {"$set": update_dict})
            updated_data = await db.media_data.find_one({"id": existing_data["id"]})
            updated_data.pop('_id', None)
            return MediaData(**updated_data)
        else:
            # Create new data with defaults, then update
            media_data = MediaData()
            media_dict = media_data.dict()
            media_dict.update({k: v for k, v in media_update.dict().items() if v is not None})
            media_data = MediaData(**media_dict)
            await db.media_data.insert_one(media_data.dict())
            return media_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update media data: {str(e)}")

@router.put("/map", response_model=MapData)
async def update_map_data(map_update: MapDataUpdate):
    """Update map data"""
    try:
        existing_data = await db.map_data.find_one()
        if existing_data:
            # Update existing data
            update_dict = {k: v for k, v in map_update.dict().items() if v is not None}
            update_dict['timestamp'] = datetime.utcnow()
            await db.map_data.update_one({"id": existing_data["id"]}, {"$set": update_dict})
            updated_data = await db.map_data.find_one({"id": existing_data["id"]})
            updated_data.pop('_id', None)
            return MapData(**updated_data)
        else:
            # Create new data with defaults, then update
            map_data = MapData()
            map_dict = map_data.dict()
            map_dict.update({k: v for k, v in map_update.dict().items() if v is not None})
            map_data = MapData(**map_dict)
            await db.map_data.insert_one(map_data.dict())
            return map_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update map data: {str(e)}")

@router.post("/voice-command", response_model=VoiceCommand)
async def log_voice_command(voice_cmd: VoiceCommandCreate):
    """Log a voice command"""
    try:
        voice_command = VoiceCommand(**voice_cmd.dict())
        await db.voice_commands.insert_one(voice_command.dict())
        return voice_command
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to log voice command: {str(e)}")

@router.get("/voice-commands", response_model=List[VoiceCommand])
async def get_voice_commands(limit: int = 10):
    """Get recent voice commands"""
    try:
        commands = await db.voice_commands.find().sort("timestamp", -1).limit(limit).to_list(limit)
        for cmd in commands:
            cmd.pop('_id', None)
        return [VoiceCommand(**cmd) for cmd in commands]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get voice commands: {str(e)}")