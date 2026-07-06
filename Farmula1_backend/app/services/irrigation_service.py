import joblib
from pathlib import Path

# Absolute path resolution (FIX)
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "ml" / "models" / "irrigation_model.pkl"

# Load model safely
if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Irrigation model not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)


def get_irrigation_recommendation(
    temperature: float,
    rain_probability: float,
    soil_moisture: float
):
    """
    Returns formatted irrigation recommendation text
    """

    prediction = model.predict([[
        temperature,
        rain_probability,
        soil_moisture
    ]])[0]

    # Text formatting (Figma-style)
    if prediction == 1:
        return (
            "Skip irrigation on Wednesday due to expected rainfall. "
            "Resume on Thursday morning based on weather and rainfall."
        )

    if prediction == 2:
        return (
            "Delay irrigation and monitor soil moisture levels. "
            "Resume irrigation once soil moisture drops further."
        )

    return (
        "Proceed with normal irrigation schedule "
        "based on current weather and soil conditions."
    )
