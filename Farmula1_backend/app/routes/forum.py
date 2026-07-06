from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/forum", tags=["Farmer Forum"])

# ---------------- MODELS ---------------- #

class ForumPost(BaseModel):
    id: int
    name: str
    message: str
    likes: int = 0
    created_at: datetime

# ---------------- IN-MEMORY DB ---------------- #

forum_db: List[ForumPost] = []
post_id_counter = 1

# ---------------- DEFAULT POSTS ---------------- #

DEFAULT_POSTS = [
    "Crop yield improved after switching to drip irrigation.",
    "Neem oil helped control pests naturally.",
    "Soil testing before sowing made a huge difference.",
    "Organic compost improved soil texture.",
    "Weather alerts saved my crops last season.",
    "Intercropping reduced pest attacks.",
    "Using mulching helped retain soil moisture.",
    "Crop rotation improved productivity.",
    "AI weather forecast is very accurate.",
    "Marketplace helped me sell directly to buyers."
]

for msg in DEFAULT_POSTS:
    forum_db.append(
        ForumPost(
            id=len(forum_db) + 1,
            name="Farmer Community",
            message=msg,
            likes=0,
            created_at=datetime.now()
        )
    )

post_id_counter = len(forum_db) + 1

# ---------------- ROUTES ---------------- #

@router.get("")
def get_posts():
    return forum_db

@router.post("")
def add_post(post: ForumPost):
    global post_id_counter
    post.id = post_id_counter
    post.created_at = datetime.now()
    post_id_counter += 1
    forum_db.insert(0, post)
    return post

@router.post("/{post_id}/like")
def like_post(post_id: int):
    for post in forum_db:
        if post.id == post_id:
            post.likes += 1
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@router.delete("/{post_id}")
def delete_post(post_id: int):
    global forum_db
    forum_db = [p for p in forum_db if p.id != post_id]
    return {"message": "Post deleted"}
