import pandas as pd
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Paths
BASE_DIR = Path(__file__).resolve().parent
DATA_PATH = BASE_DIR / "data" / "irrigation_dataset.csv"
MODEL_DIR = BASE_DIR / "models"
MODEL_PATH = MODEL_DIR / "irrigation_model.pkl"

def train_irrigation_model():
    # Load dataset
    df = pd.read_csv(DATA_PATH)

    # Features and target
    X = df[
        ["temperature", "rain_probability", "soil_moisture"]
    ]
    y = df["decision"]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Model (robust + interpretable)
    model = RandomForestClassifier(
        n_estimators=150,
        max_depth=6,
        random_state=42
    )

    # Train
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)

    # Ensure model directory exists
    MODEL_DIR.mkdir(exist_ok=True)

    # Save model
    joblib.dump(model, MODEL_PATH)

    print("✅ Irrigation ML model trained successfully")
    print(f"📊 Validation accuracy: {acc:.2f}")
    print(f"💾 Model saved at: {MODEL_PATH}")

if __name__ == "__main__":
    train_irrigation_model()
