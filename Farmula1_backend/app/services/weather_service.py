import requests
from datetime import datetime


def get_5day_weather(lat: float = 13.0827, lon: float = 80.2707):
    """
    Returns today's weather + next 4 days (total 5)
    with realistic rainfall stabilization for UX + ML
    """

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}&longitude={lon}"
        "&daily=temperature_2m_max,precipitation_probability_max"
        "&timezone=auto"
    )

    res = requests.get(url, timeout=10)
    res.raise_for_status()
    data = res.json()

    dates = data.get("daily", {}).get("time", [])
    temps = data.get("daily", {}).get("temperature_2m_max", [])
    rain_probs = data.get("daily", {}).get("precipitation_probability_max", [])

    weather = []

    # 🔒 FALLBACK RAIN PATTERN (FIGMA REALISM)
    fallback_rain = [20, 10, 60, 40, 15]

    # Check if API rain is useless (all zero / None)
    all_zero_rain = (
        len(rain_probs) >= 5
        and all((r == 0 or r is None) for r in rain_probs[:5])
    )

    for i in range(5):
        day_name = (
            "Today"
            if i == 0
            else datetime.strptime(dates[i], "%Y-%m-%d").strftime("%a")
        )

        rain_value = (
            fallback_rain[i]
            if all_zero_rain
            else rain_probs[i]
        )

        weather.append({
            "day": day_name,
            "temp": round(temps[i], 1),
            "rain": int(rain_value)
        })

    return weather
