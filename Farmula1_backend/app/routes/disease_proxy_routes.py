from fastapi import APIRouter, UploadFile, File
from app.services.disease_ml_client import call_disease_ml

router = APIRouter()

@router.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = call_disease_ml(image_bytes, file.filename)
    return result
