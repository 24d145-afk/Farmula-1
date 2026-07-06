from pydantic import BaseModel
from typing import List

class CropPriceRequest(BaseModel):
    crop: str
    state: str
    market: str

class WeeklyPrice(BaseModel):
    day: str
    price: int

class CropPriceResponse(BaseModel):
    current: int
    yesterday: int
    predicted: int
    weekly: List[WeeklyPrice]
    trend: List[int]