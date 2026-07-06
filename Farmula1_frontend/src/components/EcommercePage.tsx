import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Phone, MapPin, Star, ShoppingBag } from "lucide-react";

type Shop = {
  shop_name: string;
  category: string;
  district: string;
  contact: string;
  rating: number;
  map_url: string;
};

/* Simple Button component */
const Button = ({
  variant,
  className,
  onClick,
  children,
}: {
  variant?: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

export function EcommercePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [farmerName, setFarmerName] = useState("Farmer");

  useEffect(() => {
    // Load farmer profile
    fetch("http://127.0.0.1:8000/auth/farmer/me", {
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
      .catch(() => {
        setFarmerName("Farmer");
      });

    // Load saved theme
    fetch("http://127.0.0.1:8000/farmer/theme", {
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
      .catch(() => { });
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    let url = "http://127.0.0.1:8000/shops";

    const params = new URLSearchParams();
    if (district) params.append("district", district);
    if (category) params.append("category", category);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setShops(data);
    } catch (error) {
      const mockShops: Shop[] = [
        {
          shop_name: "Green Valley Agro Store",
          category: "Fertilizer",
          district: "Erode",
          contact: "+91 9876543210",
          rating: 4.5,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "Farmers Choice Seeds",
          category: "Seed dealers",
          district: "Salem",
          contact: "+91 9876543211",
          rating: 4.8,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "AgriTech Equipment Hub",
          category: "Equipment",
          district: "Coimbatore",
          contact: "+91 9876543212",
          rating: 4.3,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "Pest Control Solutions",
          category: "Pesticide & Insecticide",
          district: "Madurai",
          contact: "+91 9876543213",
          rating: 4.6,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "Tractor Rental Services",
          category: "Tractor rental",
          district: "Thanjavur",
          contact: "+91 9876543214",
          rating: 4.7,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "Organic Fertilizers Co",
          category: "Fertilizer",
          district: "Erode",
          contact: "+91 9876543215",
          rating: 4.9,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "Premium Seeds Market",
          category: "Seed dealers",
          district: "Salem",
          contact: "+91 9876543216",
          rating: 4.4,
          map_url: "https://maps.google.com",
        },
        {
          shop_name: "Modern Farm Equipment",
          category: "Equipment",
          district: "Coimbatore",
          contact: "+91 9876543217",
          rating: 4.5,
          map_url: "https://maps.google.com",
        },
      ];

      let filteredShops = mockShops;
      if (district) {
        filteredShops = filteredShops.filter((shop) => shop.district === district);
      }
      if (category) {
        filteredShops = filteredShops.filter((shop) => shop.category === category);
      }
      setShops(filteredShops);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* CINEMATIC SINGLE BACKGROUND SYSTEM */}
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
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section – no heading, reduced top spacing */}
        <div className="text-center mb-8">
          {/* Filter Section – aligned in row with perfect bottom alignment */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto animate-slideUp border-t-4 border-green-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-left">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Select District
                </label>
                <select
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">All Districts</option>
                  <option value="Erode">Erode</option>
                  <option value="Salem">Salem</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Thanjavur">Thanjavur</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                  Select Category
                </label>
                <select
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:ring-2 focus:ring-green-500 transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Fertilizer">Fertilizer</option>
                  <option value="Pesticide & Insecticide">Pesticide & Insecticide</option>
                  <option value="Seed dealers">Seed dealers</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Tractor rental">Tractor rental</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 invisible">
                  Search
                </label>
                <button
                  onClick={fetchShops}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 
                    text-white px-8 py-4 text-xl font-bold rounded-xl shadow-xl
                    hover:shadow-green-500/40 transition-all hover:scale-105 active:scale-95"
                >
                  🔍 Search Shops
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mb-12">
            <p className="text-green-800 text-lg font-bold bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg animate-pulse">
              Loading shops...
            </p>
          </div>
        )}

        {/* Shop Cards Grid – with motion animations and fixed heights for consistency */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shops.map((shop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col h-full"
            >
              <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 border border-gray-200 hover:border-green-400 flex flex-col h-full"
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Header: Fixed height */}
                  <div className="flex items-start justify-between mb-4 h-16">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                      <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0">
                      {shop.category}
                    </span>
                  </div>

                  {/* Shop Name: Fixed height with consistent clamping */}
                  <h2 className="text-lg font-bold text-green-800 mb-3 h-12 flex items-center line-clamp-2">
                    {shop.shop_name}
                  </h2>

                  {/* Info Sections: Fixed heights for consistency */}
                  <div className="flex items-center gap-2 mb-2 h-6 text-gray-600 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{shop.district}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2 h-6 text-gray-700 flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{shop.contact}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 h-6">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                      {shop.rating} / 5.0
                    </span>
                  </div>

                  {/* Spacer to push button to bottom consistently */}
                  <div className="flex-grow min-h-0" />

                  {/* Button: Fixed size and position */}
                  <a
                    href={shop.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md h-12 flex-shrink-0"
                  >
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {shops.length === 0 && !loading && (
          <div className="text-center mt-16 animate-fadeIn">
            <div className="bg-white inline-block px-10 py-8 rounded-3xl shadow-xl border border-gray-200">
              <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 text-xl font-bold">No shops found matching your criteria</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
        .animate-slideDown { animation: slideDown 0.8s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}
