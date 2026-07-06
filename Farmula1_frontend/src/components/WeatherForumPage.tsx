import { useEffect, useState } from "react";
import { MapPin, RefreshCw } from "lucide-react";

export function WeatherForumPage() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const fetchWeather = async (selectedCity?: string) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${selectedCity || city}`
      );
      const data = await res.json();

      if (data.error) {
        setError("City not found");
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `http://127.0.0.1:8000/api/cities?q=${value}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const current = weatherData?.list?.[0];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1679930348703-f94efd6ad369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwc2t5JTIwY2xvdWRzfGVufDF8fHx8MTc2ODc2NDk4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
      }}
    >
      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        <div className="grid md:grid-cols-2 gap-8 h-[550px]">

          {/* LEFT SECTION */}
          <div className="flex flex-col justify-between h-full">
            {/* SEARCH BOX */}
            <div className="relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    fetchCities(e.target.value);
                  }}
                  placeholder="Enter a city (by default, New Delhi)"
                  className="w-full pl-10 pr-3 py-2.5 text-sm rounded-full border border-gray-300 bg-white outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* AUTOCOMPLETE DROPDOWN */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border z-50 max-h-48 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setCity(s.name);
                        setSuggestions([]);
                        fetchWeather(s.name);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                    >
                      <b>{s.name}</b>, {s.country}
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => fetchWeather()}
                className="mt-3 w-full px-4 py-2 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {loading ? "Loading..." : "Search"}
              </button>

              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            {/* CITY INFO */}
            <div className="flex flex-col justify-center items-center text-center flex-1 py-4">
              <h2 className="text-5xl mb-1 text-gray-900">
                {weatherData?.city?.name || "New Delhi"}
              </h2>
              <p className="text-sm text-gray-700">
                {weatherData?.city?.country || "India"}
              </p>

              <p className="text-lg text-gray-700 capitalize mt-6 mb-4">
                {current?.weather?.[0]?.description || "Clear"}
              </p>

              <div className="flex items-center gap-3">
                <p className="text-7xl text-gray-900">
                  {current ? Math.round(current.main.temp) : "14"}°C
                </p>
                <RefreshCw
                  className="w-7 h-7 text-blue-500 cursor-pointer hover:rotate-180 transition-transform duration-500"
                  onClick={() => fetchWeather()}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col justify-between h-full gap-6">

            {/* HOURLY FORECAST */}
            <div>
              <h3 className="text-lg mb-3 text-gray-900">
                Hourly forecast
              </h3>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex justify-between items-center">
                  {weatherData?.list?.slice(0, 6).map((hour: any) => (
                    <div key={hour.dt} className="flex flex-col items-center">
                      <span className="text-base mb-1 text-gray-800">
                        {new Date(hour.dt * 1000).getHours()}
                      </span>
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                        alt="weather"
                        className="w-10 h-10"
                      />
                      <span className="text-base mt-1 text-gray-800">
                        {Math.round(hour.main.temp)}°
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5 DAYS FORECAST */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-lg mb-3 text-gray-900">
                5 days forecast
              </h3>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex-1">
                <div className="space-y-2.5 h-full overflow-y-auto">
                  {weatherData?.list
                    ?.filter((_: any, i: number) => i % 8 === 0)
                    .slice(0, 10)
                    .map((day: any) => (
                      <div key={day.dt} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 w-24">
                          {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                          className="w-9 h-9"
                          alt="weather"
                        />
                        <span className="text-sm text-gray-700 w-14 text-right">
                          {Math.round(day.main.temp)}°C
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}