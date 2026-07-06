from pydantic import BaseModel
from typing import List

class SoilData(BaseModel):
    moisture: float
    ph: float
    nitrogen: float
    phosphorus: float

class WeatherDay(BaseModel):
    day: str
    temp: float
    rain: float

class RuleRequest(BaseModel):
    soil: SoilData
    weather: List[WeatherDay]
