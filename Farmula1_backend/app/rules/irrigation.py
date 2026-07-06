def irrigation_recommendation(weather):
    if not weather or len(weather) < 2:
        return "Normal irrigation schedule recommended."

    tomorrow = weather[1]

    if tomorrow["rain"] >= 50:
        return "Skip irrigation tomorrow due to expected rainfall. Resume next day."

    if tomorrow["temp"] >= 30:
        return "Irrigate early morning to reduce water loss."

    return "Normal irrigation schedule recommended."
