from fastapi import APIRouter, Depends
from app.services.jwt_service import get_current_farmer
from app.rules.fertilizer import calculate_fertilizer_schedule
from app.rules.irrigation import irrigation_recommendation
from app.schemas.rules import RuleRequest

router = APIRouter()


@router.get("/dashboard")
def farmer_dashboard(farmer_id: str = Depends(get_current_farmer)):
    return {
        "message": "Welcome to Farmer Dashboard",
        "farmer_id": farmer_id
    }
@router.post("/farmer/rules")
def farmer_rules(data: RuleRequest):
    fertilizer = calculate_fertilizer_schedule(
        soil=data.soil.dict(),
        weather=[w.dict() for w in data.weather]
    )

    irrigation = irrigation_recommendation(
        weather=[w.dict() for w in data.weather]
    )

    return {
        "next_fertilization": fertilizer,
        "irrigation_advice": irrigation
    }
