from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io

from app.ml.models.disease_model.disease_predictor import predict_disease

router = APIRouter()

@router.post("/predict-disease")
async def disease_detection(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    result = predict_disease(image)
    return result


















