import { useState, useEffect } from 'react';
import {
  Sprout,
  Bell,
  Scan,
  Newspaper,
  Video,
  ShoppingCart,
  FileText,
  MessageCircle,
  CloudRain,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { API_BASE } from "../config";
type FeatureCard = {
  title: string;
  description: string;
  icon: any;
  badge: string;
  badgeColor: string;
  image: string;
  page: string;
};

interface FarmerDashboardProps {
  onNavigate: (page: string) => void;
}

export function FarmerDashboard({ onNavigate }: FarmerDashboardProps) {
  const [farmerName, setFarmerName] = useState<string>("Farmer");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showFertilizerBox, setShowFertilizerBox] = useState(false);

  const features: FeatureCard[] = [
    {
      title: 'Automatic Fertilization',
      description: 'Smart hardware system that automatically applies fertilizers based on soil and weather.',
      icon: Sprout,
      badge: 'IoT Hardware',
      badgeColor: 'bg-green-100 text-green-700',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/027/731/259/small_2x/nature-beauty-in-summer-outdoors-agriculture-water-sunset-rural-scene-generated-by-ai-free-photo.jpg',
      page: 'auto-fertilizer',
    },
    {
      title: 'Crop Prediction',
      description: 'Find the best crop to cultivate based on your soil and weather conditions using advanced AI algorithms.',
      icon: Sprout,
      badge: 'AI Powered',
      badgeColor: 'bg-green-100 text-green-700',
      image: 'https://www.agmatix.com/wp-content/uploads/2023/12/Advancing-Sustainable-Growth-The-Role-of-Agriculture-Data-Analytics-in-Regenerative-Agriculture_Inside_01.jpg',
      page: 'crop-predictor',
    },
    {
      title: 'Disease Detection',
      description: 'Detect plant diseases early and get preventive measures and treatment advice to protect your crops.',
      icon: Scan,
      badge: 'Early Detection',
      badgeColor: 'bg-red-100 text-red-700',
      image: 'https://www.planetnatural.com/wp-content/uploads/2012/12/anthracnose-1.jpg',
      page: 'disease-detection',
    },
    {
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your farming questions with our intelligent multilingual AI-powered chatbot.',
      icon: MessageCircle,
      badge: 'Live Support',
      badgeColor: 'bg-cyan-100 text-cyan-700',
      image: 'https://miro.medium.com/v2/resize:fit:770/1*_IzbZstkacUwaekiLd2tzQ.jpeg',
      page: 'chatbot',
    },
    {
      title: 'Agri News & Updates',
      description: 'Stay informed with the latest agricultural news, government schemes, and farming innovations.',
      icon: Newspaper,
      badge: 'Daily Updates',
      badgeColor: 'bg-purple-100 text-purple-700',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
      page: 'agri-news',
    },
    {
      title: 'Agri Shorts',
      description: 'Learn sustainable organic practices through video tutorials and expert guidance.',
      icon: Video,
      badge: 'Sustainable',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      image: 'https://img.freepik.com/premium-photo/farmer-using-tablet-computer-checking-data-agriculture-sugarcene_34152-591.jpg',
      page: 'organic-reels',
    },
    {
      title: 'E-Commerce Store',
      description: 'Buy quality seeds, fertilizers, and farming equipment at the best prices from verified sellers.',
      icon: ShoppingCart,
      badge: 'Shop Now',
      badgeColor: 'bg-orange-100 text-orange-700',
      image: 'https://img.freepik.com/premium-photo/male-farmer-with-tablet-soybean-field-technology-advancements-agriculture_444642-29394.jpg',
      page: 'ecommerce',
    },
    {
      title: 'Government Schemes',
      description: 'Explore available subsidies, loans, and government support programs for farmers.',
      icon: FileText,
      badge: 'Benefits',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
      page: 'policy',
    },
    {
      title: 'Weather Forum',
      description: 'Discuss rainfall, monsoon updates and weather alerts.',
      icon: CloudRain,
      badge: 'Community',
      badgeColor: 'bg-cyan-100 text-cyan-700',
      image: 'https://t3.ftcdn.net/jpg/07/38/39/28/360_F_738392875_yBuG6L3pUbm5IejPaB4G3ymSi1lVwj1g.jpg',
      page: 'weather-forum',
    },
    {
      title: 'Agri Marketplace',
      description: 'Buy & sell crops, seeds, fertilizers and equipment.',
      icon: ShoppingCart,
      badge: 'Market',
      badgeColor: 'bg-orange-100 text-orange-700',
      image: 'https://biovoicenews.com/wp-content/uploads/2016/08/agri-market.jpg',
      page: 'marketplace',
    },
    {
      title: 'Plantation Guide',
      description: 'Guidance on plantation crops like coconut, rubber and tea.',
      icon: Sprout,
      badge: 'Guide',
      badgeColor: 'bg-teal-100 text-teal-700',
      image: 'https://cdn.shopify.com/s/files/1/0724/4598/5057/files/BlogNow__imagine_prompt___A_gardener_planting_a_young_elm_5e059cf0-e946-47c2-8794-9f9d87cd342b_480x480.jpg?v=1728459446',
      page: 'plantation-guide',
    },
    {
      title: 'Farmer Forum',
      description: 'Ask questions, share experiences and learn from farmers.',
      icon: MessageCircle,
      badge: 'Forum',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      image: 'https://tse3.mm.bing.net/th/id/OIP.8chuCLW0RMoJJMB8kYqX9AAAAA?w=474&h=315&rs=1&pid=ImgDetMain&o=7&rm=3',
      page: 'farmer-forum',
    },
    {
      title: 'Crop Prices',
      description: 'Check live mandi prices and market trends.',
      icon: TrendingUp,
      badge: 'Live',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      image: 'https://tse1.mm.bing.net/th/id/OIP.c41T6mqHKcHEr2jKjEVAMgHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3',
      page: 'crop-price',
    },
    {
      title: 'Farming Calendar',
      description: 'Season-wise farming schedule and reminders.',
      icon: Calendar,
      badge: 'Planner',
      badgeColor: 'bg-purple-100 text-purple-700',
      image: 'https://intergardening.co.uk/wp-content/uploads/2025/02/VeniceAI_8BiuMDb-300x300.png',
      page: 'farming-calendar',
    },
  ];

  useEffect(() => {
    // Load farmer profile
    fetch("${API_BASE}/auth/farmer/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.full_name) {
          setFarmerName(data.full_name);
        }
      });
    // Load saved theme
    fetch("${API_BASE}/farmer/theme", {
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

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${theme === "dark"
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
            <h1 className="text-3xl font-bold mb-1">Farmer </h1>
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
                await fetch("${API_BASE}/farmer/theme", {
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
      {/* Dashboard Hero Section */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-12 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Title with enhanced visibility */}
        <motion.h1 
          className="text-5xl font-bold mb-4 leading-tight"
          style={{
            textShadow: '0 2px 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)',
            color: '#065F46',
          }}
          animate={{
            textShadow: [
              '0 2px 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)',
              '0 2px 25px rgba(255, 255, 255, 0.9), 0 0 50px rgba(255, 255, 255, 0.6)',
              '0 2px 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.5)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Smart Agricultural Formula
        </motion.h1>

        {/* Subtitle with enhanced visibility */}
        <p 
          className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
          style={{
            textShadow: '0 1px 10px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7)',
            color: '#047857',
          }}
        >
          AI-powered farming tools for smarter crop decisions, automation, real-time insights, and sustainable agriculture.
        </p>

        {/* Small stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Tools', value: '14' },
            { label: 'AI Features', value: '4+' },
            { label: 'Community Access', value: '24/7' },
            { label: 'Live Data', value: 'Real-time' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="p-5 rounded-xl backdrop-blur-xl shadow-xl border-2 bg-white/90"
              style={{
                borderColor: 'rgba(34, 197, 94, 0.3)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 15px 50px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-3xl font-bold text-green-700 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-700">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
        
      {/* Feature Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10" style={{ perspective: '1000px' }}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
  
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 3,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="group overflow-hidden cursor-pointer rounded-2xl bg-white/95 backdrop-blur-xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] h-full"
                  style={{
                    borderColor: 'rgba(34, 197, 94, 0.2)',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  }}
                  onClick={() => {
                    if (feature.page === "auto-fertilizer") {
                      setShowFertilizerBox(true);
                    } else {
                      onNavigate(feature.page);
                    }
                  }}
                >
                  
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
                    <motion.img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400';
                      }}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
                    {/* Icon Badge with glow effect */}
                    <motion.div
                      className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl"
                      style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 10px rgba(34, 197, 94, 0.3)',
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        boxShadow: '0 6px 30px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.5)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Icon className="w-6 h-6 text-green-600" />
                    </motion.div>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 bg-white">
                    
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                        {feature.title}
                      </h3>
                      <Badge className={`${feature.badgeColor} text-xs font-semibold transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                        {feature.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3 font-medium">
                      {feature.description}
                    </p>
                    {/* Arrow indicator with animation */}
                    <motion.div
                      className="flex items-center text-green-700 text-sm font-bold mt-auto"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <span>Explore</span>
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      {showFertilizerBox && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-xl w-full p-6 relative shadow-2xl"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ perspective: '1000px' }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl transition-transform duration-300 hover:rotate-90"
              onClick={() => setShowFertilizerBox(false)}
            >
              ✕
            </button>
            {/* Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1587049352847-5e8c07c45b81?w=800"
              alt="Automatic Fertilization System"
              className="w-full h-48 object-cover rounded-xl mb-4"
              initial={{ opacity: 0, rotateY: -10 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }}
            />
            {/* Content */}
            <h2 className="text-2xl text-green-800 mb-2">
              Automatic Fertilization System
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The Automatic Fertilization System is an IoT-based smart farming hardware
              that automatically applies fertilizers based on soil conditions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Sensors continuously monitor soil nutrients, moisture, and weather data.
              Based on this, the system decides the exact quantity and timing of
              fertilizer application.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This reduces fertilizer wastage, lowers cost, improves yield, and
              minimizes environmental impact — all without manual effort.
            </p>
            <div className="flex justify-end">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:shadow-lg"
                onClick={() => setShowFertilizerBox(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}