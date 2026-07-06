import { useState } from "react";

type Activity = "sow" | "grow" | "harvest" | null;

type CropCalendar = {
  crop: string;
  months: Activity[];
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEATHER = [
  { icon: "❄️", temp: "18°C" },
  { icon: "🌤️", temp: "22°C" },
  { icon: "☀️", temp: "28°C" },
  { icon: "☀️", temp: "32°C" },
  { icon: "🌤️", temp: "30°C" },
  { icon: "🌦️", temp: "27°C" },
  { icon: "🌧️", temp: "25°C" },
  { icon: "🌧️", temp: "24°C" },
  { icon: "🌤️", temp: "26°C" },
  { icon: "☀️", temp: "28°C" },
  { icon: "🌤️", temp: "24°C" },
  { icon: "❄️", temp: "20°C" },
];

const DATA: CropCalendar[] = [
  { crop: "Wheat", months: [null, null, "sow", "grow", "grow", "grow", null, null, null, "harvest", "harvest", null] },
  { crop: "Rice", months: [null, null, null, "sow", "grow", "grow", "grow", "grow", null, null, "harvest", "harvest"] },
  { crop: "Maize", months: [null, "sow", "grow", "grow", "grow", null, null, "sow", "grow", "grow", "harvest", null] },
  { crop: "Barley", months: [null, null, "sow", "grow", "grow", "grow", null, null, null, "harvest", "harvest", null] },
  { crop: "Sugarcane", months: ["sow", "grow", "grow", "grow", "grow", "grow", "grow", "grow", "grow", "grow", "harvest", "harvest"] },
  { crop: "Cotton", months: [null, null, "sow", "grow", "grow", "grow", "grow", "grow", null, "harvest", "harvest", null] },
  { crop: "Groundnut", months: [null, "sow", "grow", "grow", "grow", null, null, null, "harvest", null, null, null] },
  { crop: "Soybean", months: [null, null, "sow", "grow", "grow", "grow", null, null, "harvest", null, null, null] },
  { crop: "Pulses", months: [null, null, "sow", "grow", "grow", null, null, null, "harvest", null, null, null] },
  { crop: "Mustard", months: [null, null, "sow", "grow", "grow", null, null, null, "harvest", null, null, null] },
  { crop: "Sunflower", months: [null, null, "sow", "grow", "grow", "grow", null, null, "harvest", null, null, null] },
  { crop: "Jute", months: [null, null, "sow", "grow", "grow", "grow", "grow", null, "harvest", null, null, null] },
];

export function FarmingCalendarPage() {
  const [selectedCrop, setSelectedCrop] = useState("all");

  const crops =
    selectedCrop === "all"
      ? DATA
      : DATA.filter(c => c.crop === selectedCrop);

  const bg = (a: Activity) => {
    if (!a) return "bg-transparent";

    if (a === "sow") return "bg-green-300";
    if (a === "harvest") return "bg-orange-300";

    return "bg-lime-300";
  };

  return (
    <div
      className="min-h-screen px-10 py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg')"
      }}
    >
      <div className="hidden bg-green-300 bg-orange-300 bg-lime-300"></div>
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-green-900 mb-4">
            Seasonal Crop Planner
          </h1>
          <p className="text-gray-800 text-lg mb-6 max-w-3xl mx-auto">
            A comprehensive visual guide to plan your farming activities throughout the year.
            Track planting schedules, growth periods, and harvest timings aligned with seasonal weather patterns.
          </p>

          {/* LEGEND WITH ICONS */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="font-semibold text-gray-800">Sowing Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="font-semibold text-gray-800">Growing Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span className="font-semibold text-gray-800">Harvest Phase</span>
            </div>
          </div>

          {/* CROP SELECTOR - CENTERED */}
          <div className="flex justify-center items-center gap-3">
            <label className="font-semibold text-gray-800">
              Select Crop:
            </label>
            <select
              className="px-5 py-2 rounded-xl shadow-md bg-white border-2 border-green-200 text-gray-800 font-medium"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option value="all">All Crops</option>
              {DATA.map(c => (
                <option key={c.crop} value={c.crop}>{c.crop}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="flex justify-center">
        <div className="max-w-[95vw] overflow-x-auto">
          <table className="border-separate border-spacing-y-4 border-spacing-x-3">

            <thead>
              <tr>
                <th className="text-left text-green-900">Crop</th>
                {MONTHS.map(m => (
                  <th key={m} className="px-4 py-2 rounded-xl bg-green-100 text-green-900">
                    {m}
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                {WEATHER.map((w, i) => (
                  <th key={i} className="text-center text-xs opacity-80">
                    {w.icon}<br />{w.temp}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {crops.map(row => (
                <tr key={row.crop}>
                  <td className="px-4 py-3 bg-yellow-100 rounded-xl font-semibold shadow">
                    🌱 {row.crop}
                  </td>

                  {row.months.map((a, i) => (
                    <td key={i} className="relative group">
                      <div
                        className={`h-12 rounded-xl flex items-center justify-center
                        ${bg(a)} transition-all duration-300
                        hover:scale-110 hover:shadow-xl`}
                      >
                        <span className="text-xl">
                          {a === "sow" && "🌱"}
                          {a === "grow" && "🌿"}
                          {a === "harvest" && "🌾"}
                        </span>
                      </div>

                      {/* TOOLTIP */}
                      {a && (
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                          bg-black text-white text-xs px-3 py-1 rounded
                          opacity-0 group-hover:opacity-100 transition-opacity
                          whitespace-nowrap z-50"
                        >
                          {a === "sow" && "Sowing Phase"}
                          {a === "grow" && "Growing Phase"}
                          {a === "harvest" && "Harvest Phase"}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}