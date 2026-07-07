import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Award, TrendingUp, Droplet, Tractor, Warehouse, Sprout, CreditCard, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { API_BASE } from "../config";


/* ================= TYPES ================= */
type Scheme = {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  category: string;
  scheme_type: string;
  status: string;
  deadline: string;
  benefits: string[];
  apply_url: string;
};

export function PolicyPage() {
  /* ================= STATE ================= */
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [stats, setStats] = useState({ total_schemes: 0, applied_schemes: 0 });
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [farmerName, setFarmerName] = useState(" ");

  useEffect(() => {
    // Load farmer profile
    fetch(`${API_BASE}/auth/farmer/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.full_name) {
          setFarmerName(data.full_name);
        }
      })
      .catch(() => {});

    // Load saved theme
    fetch(`${API_BASE}/farmer/theme`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.theme) {
          setTheme(data.theme);
        }
      })
      .catch(() => {});
  }, []);

  /* ================= FETCH ================= */
  useEffect(() => {
    loadData();
  }, [filterType, filterCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase());
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const loadData = async () => {
    const params = new URLSearchParams();
    if (filterType) params.append('scheme_type', filterType);
    if (filterCategory) params.append('category', filterCategory);

    const schemesRes = await fetch(
      `${API_BASE}/policy/schemes?${params.toString()}`
    );
    const schemesData = await schemesRes.json();

    const appliedRes = await fetch(`${API_BASE}/policy/applied`);
    const appliedData = await appliedRes.json();

    const statsRes = await fetch(`${API_BASE}/policy/stats`);
    const statsData = await statsRes.json();

    setSchemes(schemesData);
    setAppliedIds(appliedData.applied_scheme_ids);
    setStats(statsData);
  };

  const normalizeCategory = (category: string) => category.toLowerCase().replace(/[\s-]+/g, '_');

  // ✅ Random fallback icons
  const RANDOM_ICONS = [
    Award,
    Shield,
    Tractor,
    Droplet,
    Warehouse,
    Sprout,
    CreditCard,
    TrendingUp,
    FileText,
  ];

  /* ================= UI MAP ================= */
  const iconMap: Record<string, any> = {
    subsidy: Award,
    insurance: Shield,
    equipment: Tractor,
    irrigation: Droplet,
    seed: Sprout,
    credit: CreditCard,
    storage: Warehouse,
    training: FileText,
    market: TrendingUp,
    organic: Sprout,
    fisheries: Droplet,
    infrastructure: Warehouse,
    technology: TrendingUp,
    export: TrendingUp,
    livestock: Sprout,
    dairy: Sprout,
    forestry: Sprout,
    energy: CreditCard,
    digital: TrendingUp,
    education: FileText,
    water: Droplet,
    conservation: Droplet,
    innovation: TrendingUp,
    livelihood: CreditCard,
    processing: Warehouse,
    seeds: Sprout,
    horticulture: Sprout,
    food: Sprout,
    cooperative: FileText,
    farming: Sprout,
    post_harvest: Warehouse,
    plant_protection: Shield,
    price_support: CreditCard,
  };

  // ✅ SEARCH FILTER LOGIC
  const filteredSchemes = useMemo(() => {
    if (!debouncedSearch) return schemes;
    return schemes.filter((scheme) => {
      const searchableText = `
        ${scheme.title} ${scheme.short_description} ${scheme.full_description} ${scheme.category} ${scheme.scheme_type} ${scheme.benefits.join(' ')}
      `.toLowerCase();
      return searchableText.includes(debouncedSearch);
    });
  }, [schemes, debouncedSearch]);

  const getSchemeTheme = (scheme: Scheme) => {
    const text = ` ${scheme.title} ${scheme.short_description} ${scheme.category} `.toLowerCase();

    if (text.includes("seed")) return { icon: Sprout, color: "from-green-500 to-emerald-600" };
    if (text.includes("storage") || text.includes("warehouse")) return { icon: Warehouse, color: "from-green-500 to-emerald-600" };
    if (text.includes("irrigation") || text.includes("water")) return { icon: Droplet, color: "from-green-500 to-emerald-600" };
    if (text.includes("drone") || text.includes("digital") || text.includes("iot")) return { icon: TrendingUp, color: "from-green-500 to-emerald-600" };
    if (text.includes("infrastructure")) return { icon: Warehouse, color: "from-green-500 to-emerald-600" };
    if (text.includes("bamboo") || text.includes("forestry")) return { icon: Sprout, color: "from-green-500 to-emerald-600" };
    if (text.includes("fish") || text.includes("aquaponics")) return { icon: Droplet, color: "from-green-500 to-emerald-600" };
    if (text.includes("mushroom")) return { icon: Sprout, color: "from-green-500 to-emerald-600" };
    if (text.includes("startup") || text.includes("innovation")) return { icon: Award, color: "from-green-500 to-emerald-600" };
    if (text.includes("training") || text.includes("education")) return { icon: FileText, color: "from-green-500 to-emerald-600" };

    // ✅ fallback always same color
    const index = Math.abs(Number(scheme.id)) % RANDOM_ICONS.length;
    return { icon: RANDOM_ICONS[index], color: "from-green-500 to-emerald-600" };
  };

  /* ================= RENDER ================= */
  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-lime-100 via-green-50 to-emerald-100 text-gray-900"
      }`}
    >
      {/* CINEMATIC BACKGROUND SYSTEM */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src="https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg"
          className="w-full h-full object-cover opacity-100"
          alt="Farm Background"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-4 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Farmer Dashboard</h1>
            <p className="text-green-100 text-sm">Welcome back, {farmerName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white hover:bg-green-700/50 rounded-full text-sm px-4 transition-transform hover:scale-105"
              onClick={() => {
                localStorage.removeItem("access_token");
                window.location.reload();
              }}
            >
              Logout
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-green-700/50 rounded-full text-sm px-3 transition-transform hover:scale-105"
              onClick={async () => {
                const newTheme = theme === "dark" ? "light" : "dark";
                setTheme(newTheme);
                await fetch(`${API_BASE}/farmer/theme`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                  body: JSON.stringify({ theme: newTheme }),
                });
              }}
            >
              {theme === "dark" ? "Dark" : "Light"}
            </Button>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </header>

      {/* STATUS + FILTERS */}
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6 items-start">
        {/* FILTERS */}
        <Card
          className={`lg:col-span-2 p-6 shadow-lg rounded-xl backdrop-blur-md ${
            theme === "dark" ? "bg-gray-800/90 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <h3 className={`mb-4 ${theme === "dark" ? "text-green-300" : "text-green-900"}`}>Filter Schemes</h3>
          <div className="flex flex-wrap gap-4">
            {/* ✅ SEARCH INPUT */}
            <input
              type="text"
              placeholder="Search schemes, benefits, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`p-2 rounded border w-full md:w-80 ${theme === "dark" ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />
            <select
              className={`p-2 rounded border ${theme === "dark" ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All (Central + State)</option>
              <option value="central">Central Schemes</option>
              <option value="state">State Schemes</option>
            </select>
            <select
              className={`p-2 rounded border ${theme === "dark" ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="subsidy">Subsidy</option>
              <option value="insurance">Insurance</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
        </Card>

        {/* STATUS */}
        <Card className="p-6 shadow-xl bg-white text-gray-900 h-fit border border-white-200">
          <h3 className="mb-4 font-semibold text-lg text-green-700">
            Your Status
          </h3>

          <div className="mb-4">
            <div className="flex justify-between text-sm font-medium mb-2 text-white-700">
              <span>Applied Schemes</span>
              <span>{stats.applied_schemes}</span>
            </div>

            {/* Progress Bar */}
            <Progress
              value={
                stats.total_schemes
                  ? (stats.applied_schemes / stats.total_schemes) * 100
                  : 0
              }
              className="h-3 bg-gray-200"
            />
          </div>

          <div className="text-sm font-medium text-gray-700">
            Total Schemes: {stats.total_schemes}
          </div>
        </Card>
        </div>

      {/* SCHEMES LIST */}
      <div className="container mx-auto px-4 space-y-6 pb-10">
        {filteredSchemes.map((scheme) => {
          const normalizedCategory = normalizeCategory(scheme.category);
          const schemeTheme = getSchemeTheme(scheme);
          const Icon = schemeTheme.icon;
          const gradient = schemeTheme.color;
          const applied = appliedIds.includes(scheme.id);

          return (
            <motion.div key={scheme.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card
                className={`shadow-lg overflow-hidden rounded-xl backdrop-blur-md ${
                  theme === "dark" ? "bg-gray-800/90 text-gray-100" : "bg-white text-gray-900"
                }`}
              >
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                <div className="p-6">
                  <div className="flex gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                    >
                      <Icon className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`${theme === "dark" ? "text-green-300" : "text-green-900"}`}>{scheme.title}</h3>
                        <Badge>{scheme.status}</Badge>
                      </div>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4`}>
                        {scheme.short_description}
                      </p>
                      {/* BENEFITS – 2x2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {scheme.benefits.slice(0, 4).map((b, i) => (
                          <div key={i} className={`flex items-center gap-2 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            <Check className={`w-4 h-4 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                            {b}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button
                          disabled={applied}
                          onClick={async () => {
                            await fetch(
                              `${API_BASE}/policy/apply/${scheme.id}`,
                              { method: 'POST' }
                            );
                            window.open(scheme.apply_url, '_blank');
                            loadData();
                          }}
                        >
                          {applied ? 'Applied' : 'Apply Now'}
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedScheme(scheme)}>
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {selectedScheme && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <Card
            className={`w-full max-w-2xl p-8 rounded-2xl shadow-xl backdrop-blur-md ${
              theme === "dark" ? "bg-gray-800/90 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            {/* Title */}
            <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-green-300" : "text-green-900"} mb-4`}>
              {selectedScheme.title}
            </h3>
            {/* Description */}
            <p className={` ${theme === "dark" ? "text-gray-400" : "text-gray-700"} leading-relaxed text-sm mb-8`}>
              {selectedScheme.full_description}
            </p>
            {/* Action */}
            <div className="flex justify-end">
              <Button className="px-8" onClick={() => setSelectedScheme(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}