from pydantic import BaseModel, EmailStr


# -------- SIGNUP --------
class FarmerSignup(BaseModel):
    full_name: str
    mobile: str
    email: EmailStr
    location: str
    password: str


# -------- LOGIN --------
class FarmerLogin(BaseModel):
    email: EmailStr
    password: str


# -------- TOKEN RESPONSE --------
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
