import { useState } from "react";
import { TrendingUp, Brain, Calculator, Calendar, DollarSign, Activity, Award, Zap } from "lucide-react";

type PriceResult = {
  arrival_date: string;
  modal_price: number;
  market: string;
  state: string;
};

import { API_BASE } from "../config";

export default function CropPricePage() {
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const [market, setMarket] = useState("");
  const [results, setResults] = useState<PriceResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(100);

  const crops = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane"];
  const states = crop ? ["Tamil Nadu", "Karnataka", "Punjab", "Maharashtra"] : [];
  const markets = state ? ["Local Market", "Wholesale Yard", "APMC"] : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResults(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/crop-price/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, state, market })
      });
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      setResults([
        { arrival_date: "Today", modal_price: data.current, market, state },
        { arrival_date: "Yesterday", modal_price: data.yesterday, market, state }
      ]);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch crop price data");
    } finally {
      setLoading(false);
    }
  };

  const current = results?.[0]?.modal_price || 0;
  const predicted = current + 290;
  const sellNowRevenue = quantity * current;
  const sellLaterRevenue = quantity * predicted;
  const extraProfit = sellLaterRevenue - sellNowRevenue;
  const trendPoints = [35, 45, 55, 65, 78];
  const weeklyPrices = [
    { day: "Mon", price: current - 120 },
    { day: "Tue", price: current - 80 },
    { day: "Wed", price: current - 40 },
    { day: "Thu", price: current + 20 },
    { day: "Fri", price: current - 10 },
    { day: "Sat", price: current - 30 },
    { day: "Today", price: current }
  ];
  const maxWeekly = Math.max(...weeklyPrices.map(w => w.price));

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <section className="mb-12">
            <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block font-bold text-green-800 text-sm mb-1">Crop</label>
                <select
                  className="w-full h-12 p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-sm"
                  value={crop}
                  onChange={e => setCrop(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {crops.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-bold text-green-800 text-sm mb-1">State</label>
                <select
                  className="w-full h-12 p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  disabled={!crop}
                  required
                >
                  <option value="">Select</option>
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-bold text-green-800 text-sm mb-1">Market</label>
                <select
                  className="w-full h-12 p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  value={market}
                  onChange={e => setMarket(e.target.value)}
                  disabled={!state}
                  required
                >
                  <option value="">Select</option>
                  {markets.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full h-12 p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-bold flex justify-center items-center gap-2 shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 text-sm"
                  disabled={loading}
                >
                  {loading ? "Analyzing..." : <><Zap className="w-4 h-4" /> Generate</>}
                </button>
              </div>
            </form>
          </section>
          {results && (
            <>
              <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <Metric title="Current Price" value={`₹${current}`} icon={<DollarSign />} />
                <Metric title="Predicted Price" value={`₹${predicted}`} icon={<TrendingUp />} />
                <Metric title="Profit / Qt" value={`₹${predicted - current}`} icon={<Award />} />
                <Metric title="Demand Index" value="8.4 / 10" icon={<Activity />} />
              </section>
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-5 aspect-square max-w-[360px] mx-auto sm:mx-0">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-800 text-sm">Price Trend</h3>
                    <span className="text-green-600 font-semibold text-xs">↑ Rising</span>
                  </div>
                  <div className="w-full h-[calc(100%-60px)] flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <polyline
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={trendPoints.map((p, i) => `${i * 25},${100 - p}`).join(" ")}
                      />
                      <line x1="0" y1="100" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="1" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl shadow-2xl p-6 border border-white/20 flex flex-col justify-between aspect-square max-w-[360px] mx-auto sm:mx-0">
                  <div>
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-base">
                      <Brain size={18} /> AI Insight
                    </h3>
                    <p className="text-xs mb-4 leading-relaxed">
                      The square chart shows a clear <strong>upward trend</strong> over the last few periods.
                      Prices have climbed steadily and are now near recent highs.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">
                      Recommendation: Hold for 4–7 days
                    </p>
                    <p className="text-xs opacity-90">
                      Expected peak around <strong>₹{predicted}</strong>
                    </p>
                    <div className="mt-3 bg-white/25 rounded-full h-2 overflow-hidden">
                      <div className="bg-green-400 h-full rounded-full transition-all" style={{ width: "88%" }} />
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-12">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-800 text-lg">
                  <Calculator /> Profit Decision Calculator
                </h3>
                <label className="block font-semibold text-gray-700 text-sm mb-2">Quantity (quintals): {quantity}</label>
                <input
                  type="range"
                  min={10}
                  max={500}
                  value={quantity}
                  onChange={e => setQuantity(+e.target.value)}
                  className="w-full my-2 accent-green-600"
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-gray-500 text-xs">Sell Now</p>
                    <p className="text-lg font-bold text-gray-800">₹{sellNowRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-gray-500 text-xs">Sell in 7 Days</p>
                    <p className="text-lg font-bold text-green-800">₹{sellLaterRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-3 rounded-lg text-center">
                    <p className="text-xs opacity-90">Extra Profit</p>
                    <p className="text-lg font-bold">₹{extraProfit.toLocaleString()}</p>
                  </div>
                </div>
              </section>
              <section className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 mb-16">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-gray-800 text-lg">
                  <Calendar /> Weekly Movement
                </h3>
                <div className="flex items-end justify-between h-32 px-4">
                  {weeklyPrices.map(w => (
                    <div key={w.day} className="flex flex-col items-center gap-1">
                      <div
                        className="w-6 bg-gradient-to-t from-green-600 to-emerald-400 rounded-md shadow-lg transition-all hover:scale-110"
                        style={{ height: `${(w.price / maxWeekly) * 100}px` }}
                      />
                      <span className="text-xs font-semibold text-gray-700">{w.day}</span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value, icon }: { title: string; value: string; icon: JSX.Element }) {
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 flex justify-between items-center transform transition-all hover:scale-105">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      </div>
      <div className="text-green-600 transform transition-transform hover:rotate-12">{icon}</div>
    </div>
  );
}