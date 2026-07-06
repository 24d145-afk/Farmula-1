from fastapi import APIRouter, Query
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

@router.get("/weather")
def get_weather(city: str = Query(default="New Delhi")):
    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    res = requests.get(url, params=params)
    data = res.json()

    if res.status_code != 200:
        return {"error": "City not found"}

    return data
@router.get("/cities")
def get_cities(q: str):
    url = "https://api.openweathermap.org/geo/1.0/direct"
    params = {
        "q": q,
        "limit": 5,
        "appid": API_KEY
    }

    res = requests.get(url, params=params)

    if res.status_code != 200:
        return []

    data = res.json()

    return [
        {
            "name": c.get("name"),
            "country": c.get("country"),
            "lat": c.get("lat"),
            "lon": c.get("lon"),
        }
        for c in data
    ]
