from fastapi import APIRouter
from app.services.fertilizer_service import fertilizer_decision

router = APIRouter()

@router.get("/fertilizer/schedule")
def get_fertilizer_schedule():
    soil = {
        "moisture": 68,
        "ph": 6.8,
        "nitrogen": 72,
        "phosphorus": 58
    }

    weather = {
        "rain_probability_next_24h": 60
    }

    days_since_last = 6

    result = fertilizer_decision(soil, weather, days_since_last)

    return {
        "status": "Active",
        "next_fertilization": result["next_time"],
        "reason": result["reason"]
    }
