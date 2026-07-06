from datetime import timedelta

from app.core.security import (
    create_access_token,
    get_password_hash
)
from app.db.mongo import farmer_collection
from passlib.context import CryptContext
from app.db.mongo import farmer_collection
from app.core.security import verify_password
pwd_context = CryptContext(
    schemes=["bcrypt", "pbkdf2_sha256"],
    deprecated="auto"
)

def authenticate_farmer(email: str, password: str):
    farmer = farmer_collection.find_one({"email": email})

    if not farmer:
        return None, None

    if not verify_password(password, farmer["hashed_password"]):
        return None, None

    token = create_access_token({"sub": str(farmer["_id"])})
    return token, farmer


def register_farmer(data):
    # Check if email already exists
    existing = farmer_collection.find_one({"email": data.email})
    if existing:
        raise ValueError("Farmer with this email already exists")

    farmer = {
        "full_name": data.full_name,
        "mobile": data.mobile,
        "email": data.email,
        "location": data.location,
        "hashed_password": get_password_hash(data.password),
        "role": "farmer",
        "is_active": True
    }

    result = farmer_collection.insert_one(farmer)
    farmer["_id"] = result.inserted_id

    return farmer
