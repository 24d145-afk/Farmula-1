"""
Crop Prediction Routes
----------------------
Handles HTTP requests related to crop prediction
and delegates logic to the service layer.
"""

from fastapi import APIRouter
from app.schemas.crop import CropPredictionRequest, CropPredictionResponse
from app.services.crop_service import get_crop_prediction

# Create router
router = APIRouter(
    prefix="/crop",
    tags=["Crop Prediction"]
)


@router.post("/predict", response_model=CropPredictionResponse)
def predict_crop(payload: CropPredictionRequest):
    """
    API endpoint to predict best crop based on soil & climate data.
    """
    crop_name = get_crop_prediction(payload.dict())
    return CropPredictionResponse(recommended_crop=crop_name)
