from fastapi import APIRouter, Query
from app.services.irrigation_service import get_irrigation_recommendation

router = APIRouter(prefix="/api/irrigation", tags=["Irrigation"])


@router.get("/recommendation")
def irrigation_recommendation(
    temperature: float = Query(...),
    rain_probability: float = Query(...),
    soil_moisture: float = Query(...)
):
    recommendation = get_irrigation_recommendation(
        temperature=temperature,
        rain_probability=rain_probability,
        soil_moisture=soil_moisture
    )

    return {
        "recommendation": recommendation
    }
