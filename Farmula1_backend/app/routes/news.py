import requests
from fastapi import APIRouter, HTTPException
from app.core.config import NEWS_API_KEY

router = APIRouter(prefix="/api", tags=["Agriculture News"])

NEWS_API_URL = "https://newsapi.org/v2/everything"

# Positive agriculture keywords
AGRI_QUERY = (
    "farmer OR farming OR agriculture OR crop OR crops OR irrigation "
    "OR fertilizer OR pesticide OR mandi OR harvest OR sowing "
    "OR kharif OR rabi OR agri"
)

# Words that should NEVER appear in agri news
BLOCK_WORDS = [
    "cyber", "hack", "hacker", "attack", "security",
    "politics", "election", "minister", "government speech",
    "california", "president", "war", "military",
    "technology", "software", "ai", "blockchain"
]


@router.get("/agriculture-news")
def get_agriculture_news():
    if not NEWS_API_KEY:
        raise HTTPException(status_code=500, detail="News API key not configured")

    params = {
        "q": AGRI_QUERY,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 40,
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(NEWS_API_URL, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch agriculture news")

    data = response.json()
    articles = data.get("articles", [])

    result = []

    AGRI_WORDS = [
        "farmer", "farming", "agriculture", "crop", "crops",
        "irrigation", "fertilizer", "pesticide", "mandi",
        "harvest", "sowing", "kharif", "rabi", "agri"
    ]

    for article in articles:
        title = (article.get("title") or "").lower()
        description = (article.get("description") or "").lower()
        content = title + " " + description

        # 🚫 Remove cyber / tech / politics news
        if any(word in content for word in BLOCK_WORDS):
            continue

        # ✅ Allow only agriculture-related content
        if not any(word in content for word in AGRI_WORDS):
            continue

        result.append({
            "title": article.get("title"),
            "description": article.get("description"),
            "image": article.get("urlToImage"),
            "source": article.get("source", {}).get("name"),
            "published_at": article.get("publishedAt"),
            "url": article.get("url")
        })

    return result
