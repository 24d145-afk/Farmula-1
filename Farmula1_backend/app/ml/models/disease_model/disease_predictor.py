from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import os

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "plant_disease_model.h5")

model = load_model(MODEL_PATH)

CLASS_NAMES = [
    'Potato___Late_blight',
    'Tomato__Target_Spot',
    'Tomato__Tomato_YellowLeaf__Curl_Virus',
    'Tomato_Spider_mites_Two_spotted_spider_mite',
    'Tomato_Early_blight',
    'Potato___Early_blight',
    'Potato___healthy',
    'Tomato_Bacterial_spot',
    'Tomato_Early_blight',
    'Tomato_Late_blight',
    'Tomato_Leaf_Mold',
    'Tomato_Septoria_leaf_spot',
    'Tomato__Tomato_mosaic_virus',
    'Tomato_healthy',
    'Pepper__bell___Bacterial_spot'
]

IMG_SIZE = 224

def predict_disease(img: Image.Image):
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array)[0]
    idx = np.argmax(preds)

    confidence = float(preds[idx]) * 100
    disease = CLASS_NAMES[idx]

    severity = "Low"
    if confidence > 85:
        severity = "High"
    elif confidence > 60:
        severity = "Moderate"

    return {
        "disease": disease.replace("_", " "),
        "confidence": round(confidence, 2),
        "severity": severity,
        "affectedArea": "15-20%",
        "treatment": [
            "Apply recommended fungicide",
            "Remove infected leaves",
            "Improve air circulation"
        ],
        "prevention": [
            "Use resistant varieties",
            "Avoid overhead irrigation",
            "Regular crop monitoring"
        ]
    }
