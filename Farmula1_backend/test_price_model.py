from app.services.crop_price_service import predict_crop_price

price = predict_crop_price(
    crop="Maize",
    state="Karnataka",
    market="APMC",
    date="2024-07-10"
)

print("Predicted price:", price)
