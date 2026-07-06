import { useState } from "react";
import "./FarmingCalendarPage.css";

type Activity = "sow" | "grow" | "harvest" | null;

type CropCalendar = {
  crop: string;
  months: Activity[];
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CALENDAR_DATA: CropCalendar[] = [
  {
    crop: "Wheat",
    months: [null, null, "sow", "grow", "grow", "grow", null, null, null, "harvest", "harvest", null],
  },
  {
    crop: "Rice",
    months: [null, null, null, "sow", "grow", "grow", "grow", "grow", null, null, "harvest", "harvest"],
  },
  {
    crop: "Maize",
    months: [null, "sow", "grow", "grow", "grow", null, null, "sow", "grow", "grow", "harvest", null],
  },
  {
    crop: "Cotton",
    months: [null, null, "sow", "grow", "grow", "grow", "grow", "grow", null, "harvest", "harvest", null],
  },
];

export function FarmingCalendarPage() {
  const [selectedCrop, setSelectedCrop] = useState("all");

  const visibleCrops =
    selectedCrop === "all"
      ? CALENDAR_DATA
      : CALENDAR_DATA.filter(c => c.crop === selectedCrop);

  return (
    <main className="calendar-page">
      {/* Crop Filter */}
      <div className="filter-container">
        <label>
          <strong>Choose a Crop:</strong>{" "}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="all">All Crops</option>
            {CALENDAR_DATA.map(c => (
              <option key={c.crop} value={c.crop}>
                {c.crop}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Legend */}
      <div className="legend">
        <span className="legend-item sow">🌱 Sowing</span>
        <span className="legend-item grow">🌿 Growing</span>
        <span className="legend-item harvest">🌾 Harvesting</span>
      </div>

      {/* Calendar */}
      <div className="calendar-wrapper">
        <div className="calendar">
          {/* Header Row */}
          <div className="month crop-name">Crop</div>
          {MONTHS.map(m => (
            <div key={m} className="month">{m}</div>
          ))}

          {/* Crop Rows */}
          {visibleCrops.map(row => (
            <>
              <div key={row.crop} className="crop-name">
                {row.crop}
              </div>
              {row.months.map((activity, i) => (
                <div
                  key={i}
                  className={`month-cell ${activity ?? ""}`}
                >
                  {activity === "sow" && "🌱"}
                  {activity === "grow" && "🌿"}
                  {activity === "harvest" && "🌾"}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
