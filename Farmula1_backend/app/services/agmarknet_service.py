import requests
from datetime import datetime

DATA_GOV_API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b"

BASE_URL = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24"

def fetch_crop_prices(crop: str, state: str, limit: int = 7):
    params = {
        "api-key": DATA_GOV_API_KEY,
        "format": "json",
        "filters[Commodity]": crop,
        "filters[State]": state,
        "limit": limit,
        "sort[Arrival_Date]": "desc"
    }

    response = requests.get(BASE_URL, params=params, timeout=10)
    response.raise_for_status()

    data = response.json()
    records = data.get("records", [])

    parsed = []
    for r in records:
        try:
            parsed.append({
                "date": datetime.strptime(r["Arrival_Date"], "%d/%m/%Y").date(),
                "modal_price": int(r["Modal_Price"]),
                "market": r["Market"]
            })
        except Exception:
            continue

    return parsed
