import requests

ML_SERVICE_URL = "http://127.0.0.1:8001/predict-disease"

def call_disease_ml(image_bytes: bytes, filename: str):
    files = {
        "file": (filename, image_bytes, "image/jpeg")
    }

    response = requests.post(ML_SERVICE_URL, files=files, timeout=60)
    response.raise_for_status()

    return response.json()
