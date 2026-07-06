from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.core.security import SECRET_KEY, ALGORITHM

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/farmer/login")


def get_current_farmer(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        farmer_id = payload.get("sub")
        if not farmer_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return farmer_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/farmer/dashboard")
def farmer_dashboard(farmer_id: str = Depends(get_current_farmer)):
    return {
        "farmer_id": farmer_id,
        "soil": {
            "moisture": 68,
            "ph": 6.8,
            "nitrogen": 72,
            "phosphorus": 58,
        },
        "weather": [
            {"day": "Mon", "temp": 28, "rain": 20},
            {"day": "Tue", "temp": 30, "rain": 10},
            {"day": "Wed", "temp": 27, "rain": 60},
            {"day": "Thu", "temp": 26, "rain": 40},
            {"day": "Fri", "temp": 29, "rain": 15},
        ],
        "alerts": [
            "Heavy rainfall expected on Wednesday",
            "New subsidy announced for wheat farmers",
        ],
    }
