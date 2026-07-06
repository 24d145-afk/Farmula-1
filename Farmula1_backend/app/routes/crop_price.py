from fastapi import APIRouter
from app.schemas.crop_price import CropPriceRequest, CropPriceResponse
from app.services.crop_price_service import generate_crop_price

router = APIRouter(
    prefix="/crop-price",
    tags=["Crop Price Intelligence"]
)

@router.post("/analyze", response_model=CropPriceResponse)
def analyze_crop_price(payload: CropPriceRequest):
    return generate_crop_price(
        payload.crop,
        payload.state,
        payload.market
    )
