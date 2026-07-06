from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
import json
import os

router = APIRouter(tags=["Marketplace"])

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

SELL_FILE = os.path.join(DATA_DIR, "sell.json")
BUY_FILE = os.path.join(DATA_DIR, "buy.json")
NOTIFICATION_FILE = os.path.join(DATA_DIR, "notifications.json")
TRANSACTION_FILE = os.path.join(DATA_DIR, "transactions.json")



os.makedirs(DATA_DIR, exist_ok=True)

# ---------------- MODELS ---------------- #

class SellItem(BaseModel):
    id: int | None = None
    name: str
    contact: str
    product: str
    quantity: str
    price: str

class BuyItem(BaseModel):
    id: int | None = None
    name: str
    contact: str
    product: str
    quantity: str

# ---------------- FILE HELPERS ---------------- #

def read_json(path):
    if not os.path.exists(path):
        return []
    with open(path, "r") as f:
        return json.load(f)

def write_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

def add_notification(notification):
    data = read_json(NOTIFICATION_FILE)
    notification["id"] = (data[0]["id"] + 1) if data else 1
    data.insert(0, notification)
    write_json(NOTIFICATION_FILE, data)

def add_transaction(transaction):
    data = read_json(TRANSACTION_FILE)
    transaction["id"] = (data[0]["id"] + 1) if data else 1
    data.insert(0, transaction)
    write_json(TRANSACTION_FILE, data)


# ---------------- GET ---------------- #

@router.get("/sell")
def get_sell_items():
    return read_json(SELL_FILE)

@router.get("/buy")
def get_buy_items():
    return read_json(BUY_FILE)

@router.get("/notifications")
def get_notifications():
    return read_json(NOTIFICATION_FILE)
@router.get("/transactions")
def get_transactions():
    return read_json(TRANSACTION_FILE)


# ---------------- POST ---------------- #

@router.post("/sell")
def add_sell_item(item: SellItem):
    data = read_json(SELL_FILE)
    item.id = (data[0]["id"] + 1) if data else 1
    data.insert(0, item.dict())
    write_json(SELL_FILE, data)

    # 🔔 Match against BUY requests
    buy_items = read_json(BUY_FILE)
    for buy in buy_items:
        if buy["product"].strip().lower() == item.product.strip().lower():
            add_notification({
                "type": "match",
                "product": item.product,
                "seller": item.name,
                "buyer": buy["name"],
                "seller_contact": item.contact,
                "buyer_contact": buy["contact"],
                "sell_quantity": item.quantity,
                "buy_quantity": buy["quantity"],
                "status": "pending"
            })

    return item


@router.post("/buy")
def add_buy_item(item: BuyItem):
    data = read_json(BUY_FILE)
    item.id = (data[0]["id"] + 1) if data else 1
    data.insert(0, item.dict())
    write_json(BUY_FILE, data)

    # 🔔 Match against SELL products
    sell_items = read_json(SELL_FILE)
    for sell in sell_items:
        if sell["product"].strip().lower() == item.product.strip().lower():
            add_notification({
                "type": "match",
                "product": item.product,
                "seller": sell["name"],
                "buyer": item.name,
                "seller_contact": sell["contact"],
                "buyer_contact": item.contact,
                "sell_quantity": sell["quantity"],
                "buy_quantity": item.quantity,
                "status": "pending"
            })

    return item


# ---------------- DELETE (OWNER ONLY) ---------------- #

@router.delete("/sell/{item_id}")
def delete_sell_item(item_id: int, name: str):
    data = read_json(SELL_FILE)
    updated = [i for i in data if not (i["id"] == item_id and i["name"] == name)]

    if len(updated) == len(data):
        raise HTTPException(status_code=403, detail="Not authorized to delete")

    write_json(SELL_FILE, updated)
    return {"message": "Sell product deleted"}

@router.delete("/buy/{item_id}")
def delete_buy_item(item_id: int, name: str):
    data = read_json(BUY_FILE)
    updated = [i for i in data if not (i["id"] == item_id and i["name"] == name)]

    if len(updated) == len(data):
        raise HTTPException(status_code=403, detail="Not authorized to delete")

    write_json(BUY_FILE, updated)
    return {"message": "Buy request deleted"}
@router.post("/match/{match_id}/accept")
def accept_match(match_id: int, accepter: str):
    notifications = read_json(NOTIFICATION_FILE)
    match = next((m for m in notifications if m["id"] == match_id), None)

    if not match:
        raise HTTPException(status_code=404, detail="Match not found")

    # First acceptance
    if match["status"] == "pending":
        match["status"] = "accepted_by_one"
        match["accepted_by"] = accepter
        write_json(NOTIFICATION_FILE, notifications)
        return {"message": "First acceptance recorded"}

    # Second acceptance → COMPLETE TRANSACTION
    if match["status"] == "accepted_by_one":
        sell_items = read_json(SELL_FILE)
        buy_items = read_json(BUY_FILE)

        sell_qty = int(match["sell_quantity"].split()[0])
        buy_qty = int(match["buy_quantity"].split()[0])

        traded_qty = min(sell_qty, buy_qty)

        # Update SELL
        for s in sell_items:
            if s["name"] == match["seller"] and s["product"] == match["product"]:
                if sell_qty > buy_qty:
                    s["quantity"] = f"{sell_qty - buy_qty} Kg"
                else:
                    sell_items.remove(s)
                break

        # Update BUY
        for b in buy_items:
            if b["name"] == match["buyer"] and b["product"] == match["product"]:
                if buy_qty > sell_qty:
                    b["quantity"] = f"{buy_qty - sell_qty} Kg"
                else:
                    buy_items.remove(b)
                break

        write_json(SELL_FILE, sell_items)
        write_json(BUY_FILE, buy_items)

        # Save transaction history
        add_transaction({
            "product": match["product"],
            "seller": match["seller"],
            "buyer": match["buyer"],
            "quantity_traded": f"{traded_qty} Kg"
        })

        # Remove notification
        notifications = [n for n in notifications if n["id"] != match_id]
        write_json(NOTIFICATION_FILE, notifications)

        return {"message": "Transaction completed"}
