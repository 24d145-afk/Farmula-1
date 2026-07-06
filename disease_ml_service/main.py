from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import io
import os
import json

# -----------------------------
# App initialization
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model", "plant_disease_model.h5")
GUIDELINE_PATH = os.path.join(BASE_DIR, "disease_guidelines.json")

# -----------------------------
# Load model
# -----------------------------
model = load_model(MODEL_PATH)

# -----------------------------
# Load disease guidelines
# -----------------------------
with open(GUIDELINE_PATH, "r", encoding="utf-8") as f:
    DISEASE_GUIDELINES = json.load(f)

# -----------------------------
# CLASS NAMES (MUST MATCH TRAINING ORDER)
# ⚠️ Replace this list ONLY with the exact order used in training
# -----------------------------
CLASS_NAMES = list(DISEASE_GUIDELINES.keys())

NUM_CLASSES = model.output_shape[-1]
if len(CLASS_NAMES) != NUM_CLASSES:
    raise RuntimeError(
        f"❌ CLASS_NAMES count ({len(CLASS_NAMES)}) "
        f"does not match model output classes ({NUM_CLASSES})"
    )

# -----------------------------
# Image config
# -----------------------------
IMG_SIZE = 224

def preprocess(img: Image.Image):
    img = img.resize((IMG_SIZE, IMG_SIZE))
    arr = image.img_to_array(img) / 255.0
    return np.expand_dims(arr, axis=0)

# -----------------------------
# Prediction endpoint
# -----------------------------
@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")

    input_tensor = preprocess(img)
    preds = model.predict(input_tensor)[0]

    idx = int(np.argmax(preds))
    confidence = float(preds[idx]) * 100

    disease_key = CLASS_NAMES[idx]
    print("Predicted class:", disease_key)
    print("Guideline exists:", disease_key in DISEASE_GUIDELINES)


    # 🔑 Fetch disease-specific guideline
    guideline = DISEASE_GUIDELINES.get(disease_key)

    # Safety fallback (should NOT trigger if JSON is correct)
    if guideline is None:
        guideline = {
            "treatment": [
                "Consult agricultural expert",
                "Remove infected plant parts",
                "Apply recommended fungicide",
                "Monitor crop condition regularly"
            ],
            "prevention": [
                "Use certified seeds",
                "Maintain field hygiene",
                "Practice crop rotation",
                "Monitor plants regularly"
            ]
        }

    return {
        "disease": disease_key.replace("_", " "),
        "confidence": round(confidence, 2),
        "severity": (
            "High" if confidence > 85 else
            "Moderate" if confidence > 60 else
            "Low"
        ),
        "affectedArea": "15-20%",
        "treatment": guideline["treatment"],
        "prevention": guideline["prevention"]
    }
