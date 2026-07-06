import os
import joblib
import numpy as np

# Absolute path safety
BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "..", "models", "crop_model")

MODEL_PATH = os.path.join(MODEL_DIR, "crop_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")

# Load once (VERY IMPORTANT for performance)
crop_model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)


def predict_crop(features: dict) -> str:
    """
    features = {
        "N": float,
        "P": float,
        "K": float,
        "temperature": float,
        "humidity": float,
        "ph": float,
        "rainfall": float
    }
    """

    X = np.array([[
        features["N"],
        features["P"],
        features["K"],
        features["temperature"],
        features["humidity"],
        features["ph"],
        features["rainfall"]
    ]])

    prediction_index = crop_model.predict(X)[0]
    crop_name = label_encoder.inverse_transform([prediction_index])[0]

    return crop_name
