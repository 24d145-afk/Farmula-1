from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.fertilizer import router as fertilizer_router
from app.routes.irrigation import router as irrigation_router
from app.routes.weather import router as weather_router
from app.routes import disease_proxy_routes
from app.routes.policy import router as policy_router
from app.routes.crop import router as crop_router
from app.routes.ecommerce import router as ecommerce_router
from app.routes.news import router as news_router
from app.routes.marketplace import router as marketplace_router
from app.routes.forum import router as forum_router
#from app.routes.crop_price import router as crop_price_router
from app.routes.crop_price import router as crop_price_router
from app.routes.chatbot import router as chatbot_router
from dotenv import load_dotenv
load_dotenv()
import os

app = FastAPI(
    title="Farmula_1 Backend",
    allow_headers=["*"],
)

print("=" * 50)
print("ENVIRONMENT CHECK")
print("=" * 50)
gemini_key = os.getenv("GEMINI_API_KEY")
if gemini_key:
    print(f"✅ GEMINI_API_KEY loaded (length: {len(gemini_key)})")
else:
    print("❌ GEMINI_API_KEY not found in environment!")
    print("   Check your .env file")
print("=" * 50)

app = FastAPI(
    title="Farmula_1 Backend",
    description="AI-powered Smart Farming Backend",
    version="1.0.0"
)

# ✅ CORS CONFIG (THIS IS THE FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(dashboard_router, prefix="/api", tags=["Dashboard"])
app.include_router(fertilizer_router, prefix="/api")
app.include_router(irrigation_router)
app.include_router(disease_proxy_routes.router, prefix="/api")
app.include_router(policy_router, tags=["Policy"])
app.include_router(crop_router)
app.include_router(weather_router, prefix="/api")
app.include_router(ecommerce_router)
app.include_router(news_router)
app.include_router(marketplace_router, prefix="/api/marketplace")
app.include_router(forum_router)
# app.include_router(crop_price_router)
app.include_router(crop_price_router)
app.include_router(chatbot_router)
@app.get("/")
def root():
    return {"status": "Backend running successfully", "message": "Welcome to Farmula_1 API"}
