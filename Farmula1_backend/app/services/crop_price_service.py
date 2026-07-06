import joblib
import os
import pandas as pd
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR, "ml", "crop_price", "crop_price_model.pkl"
)
ENCODER_PATH = os.path.join(
    BASE_DIR, "ml", "crop_price", "encoders.pkl"
)

model = joblib.load(MODEL_PATH)
encoders = joblib.load(ENCODER_PATH)


def _encode(value: str, mapping: dict) -> int:
    reverse = {v: k for k, v in mapping.items()}
    if value not in reverse:
        raise ValueError(f"Invalid value: {value}")
    return reverse[value]


def predict_crop_price(
    crop: str,
    state: str,
    market: str,
    date: str
) -> float:

    base_date = datetime(2024, 1, 1)
    target_date = datetime.strptime(date, "%Y-%m-%d")
    day_index = (target_date - base_date).days

    X = pd.DataFrame([{
        "day_index": day_index,
        "crop_code": _encode(crop, encoders["crop"]),
        "state_code": _encode(state, encoders["state"]),
        "market_code": _encode(market, encoders["market"]),
    }])

    price = model.predict(X)[0]
    return round(float(price), 2)
from datetime import timedelta
import random

def generate_crop_price(crop: str, state: str, market: str):
    """
    Generates full CropPriceResponse using ML prediction + derived analytics
    """

    today = datetime.today()
    today_str = today.strftime("%Y-%m-%d")
    yesterday_str = (today - timedelta(days=1)).strftime("%Y-%m-%d")

    # ML predictions
    predicted = predict_crop_price(crop, state, market, today_str)
    current = predict_crop_price(crop, state, market, today_str)
    yesterday = predict_crop_price(crop, state, market, yesterday_str)

    # Weekly prices (derived around current)
    weekly_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"]
    weekly = []
    base = current

    for i, day in enumerate(weekly_days):
        fluctuation = random.randint(-120, 80)
        weekly.append({
                "day": day,
                "price": int(max(500, base + fluctuation))
            })


    # Trend data (normalized small line graph)
    trend = [
        max(10, min(90, int((price["price"] / predicted) * 50)))
        for price in weekly
    ]

    return {
        "current": int(current),
        "yesterday": int(yesterday),
        "predicted": int(predicted),
        "weekly": weekly,
        "trend": trend
    }
def get_crop_prediction(*args, **kwargs):
    """
    Compatibility function required by crop routes.
    This is for crop prediction feature (NOT crop price).
    """
    return {
        "status": "success",
        "prediction": "Crop prediction service active"
    }