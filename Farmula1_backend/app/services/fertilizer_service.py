from datetime import datetime, timedelta

def fertilizer_decision(soil, weather, days_since_last):
    reasons = []

    # Rule 1
    if soil["nitrogen"] < 60:
        reasons.append("Low nitrogen level")

    # Rule 2
    if weather["rain_probability_next_24h"] > 50:
        reasons.append("Heavy rain expected")
        next_time = datetime.now() + timedelta(days=2)
    # Rule 3
    elif soil["moisture"] > 75:
        reasons.append("Soil moisture already high")
        next_time = datetime.now() + timedelta(days=2)
    # Rule 4
    elif days_since_last < 5:
        reasons.append("Recently fertilized")
        next_time = datetime.now() + timedelta(days=3)
    else:
        reasons.append("Optimal conditions")
        next_time = datetime.now() + timedelta(days=1)

    # Always schedule at 6 AM
    next_time = next_time.replace(hour=6, minute=0, second=0)

    return {
        "next_time": next_time.strftime("%A at %I:%M %p"),
        "reason": ", ".join(reasons)
    }
