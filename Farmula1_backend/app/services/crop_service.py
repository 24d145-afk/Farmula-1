"""
Crop Service Layer
------------------
This file acts as a bridge between:
- API routes (controllers)
- ML inference logic

No ML code should be written directly in routes.
"""

from app.ml.crop_model.crop_inference import predict_crop


def get_crop_prediction(data: dict) -> str:
    """
    Get crop prediction from ML model.

    Parameters:
    data (dict): {
        "N": float,
        "P": float,
        "K": float,
        "temperature": float,
        "humidity": float,
        "ph": float,
        "rainfall": float
    }

    Returns:
    str: recommended crop name
    """

    # Call ML inference
    crop_name = predict_crop(data)

    return crop_name
