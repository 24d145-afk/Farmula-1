from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import FarmerLogin, FarmerSignup, TokenResponse
from app.services.auth_service import authenticate_farmer, register_farmer
from fastapi import Depends
from app.core.security import decode_access_token
from app.db.mongo import farmer_collection
from bson import ObjectId

router = APIRouter()


@router.post("/farmer/login")
def farmer_login(data: FarmerLogin):
    print("====== FRONTEND → BACKEND DEBUG ======")
    print("EMAIL RECEIVED:", repr(data.email))
    print("PASSWORD RECEIVED:", repr(data.password))
    print("====================================")

    token, farmer = authenticate_farmer(data.email, data.password)

    if not token or not farmer:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": token,
        "token_type": "bearer",
        "farmer": {
            "full_name": farmer["full_name"],
            "email": farmer["email"]
        }
    }



@router.post("/farmer/signup", status_code=201)
def farmer_signup(data: FarmerSignup):
    try:
        user = register_farmer(data)
        return {
            "message": "Farmer registered successfully",
            "email": user["email"]
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print("SIGNUP ERROR:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/farmer/me")
def get_current_farmer(token: dict = Depends(decode_access_token)):
    farmer_id = token.get("sub")

    if not farmer_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    farmer = farmer_collection.find_one(
        {"_id": ObjectId(farmer_id)},  # ✅ FIX HERE
        {"hashed_password": 0}
    )

    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    farmer["_id"] = str(farmer["_id"])
    return farmer

