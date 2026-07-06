def calculate_fertilizer_schedule(soil, weather):
    nitrogen = soil.get("nitrogen", 0)
    phosphorus = soil.get("phosphorus", 0)

    rain_tomorrow = weather[1]["rain"] if len(weather) > 1 else 0

    if (nitrogen < 75 or phosphorus < 60) and rain_tomorrow < 40:
        return "tomorrow at 6:00 AM"

    return "in 2 days at 6:00 AM"
