import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { API_BASE } from "../config";
import {
    Sprout,
    TrendingUp,
    Cloud,
    ShoppingCart,
    Leaf,
    Users,
    DollarSign,
    Calendar
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ExplorePageProps {
    onNavigate: (page: string) => void;
}

export function ExplorePage({ onNavigate }: ExplorePageProps) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");
    const [farmerName, setFarmerName] = useState("Ramya E");

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
            })
            .catch(() => { });

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

    const features = [
        {
            title: "Weather Forum",
            description: "Discuss and track weather conditions, rainfall, monsoon updates and weather alerts.",
            id: "weather-forum",
            icon: Cloud,
            badge: "Community",
            badgeColor: "bg-cyan-100 text-cyan-700",
        },
        {
            title: "Agri Marketplace",
            description: "Buy and sell agricultural products, crops, seeds, fertilizers and equipment.",
            id: "marketplace",
            icon: ShoppingCart,
            badge: "Market",
            badgeColor: "bg-orange-100 text-orange-700",
        },
        {
            title: "Plantation Guidance",
            description: "Step-by-step plantation support for crops like coconut, rubber and tea.",
            id: "plantation-guide",
            icon: Sprout,
            badge: "Guide",
            badgeColor: "bg-teal-100 text-teal-700",
        },
        {
            title: "Farmer Forum",
            description: "Connect and share with fellow farmers, ask questions and learn from experiences.",
            id: "farmer-forum",
            icon: Users,
            badge: "Forum",
            badgeColor: "bg-indigo-100 text-indigo-700",
        },
        {
            title: "Crop Price Tracker",
            description: "Track daily crop market prices, check live mandi prices and market trends.",
            id: "crop-price",
            icon: TrendingUp,
            badge: "Live",
            badgeColor: "bg-yellow-100 text-yellow-700",
        },
        {
            title: "Farming Calendar",
            description: "Plan farming activities by season with season-wise farming schedule and reminders.",
            id: "farming-calendar",
            icon: Calendar,
            badge: "Planner",
            badgeColor: "bg-purple-100 text-purple-700",
        },
    ];

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

            {/* Hero Section */}
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
                    Explore Features
                </motion.h1>

                {/* Subtitle with enhanced visibility */}
                <p
                    className="text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
                    style={{
                        textShadow: '0 1px 10px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7)',
                        color: '#047857',
                    }}
                >
                    Discover tools and resources to enhance your farming journey with community support and expert guidance.
                </p>
            </motion.section>

            {/* Feature Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 py-6 relative z-10" style={{ perspective: '1000px' }}>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.id}
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
                                    onClick={() => onNavigate(feature.id)}
                                >
                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1 bg-white">
                                        {/* Icon Badge with glow effect */}
                                        <motion.div
                                            className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl mb-4"
                                            style={{
                                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 10px rgba(34, 197, 94, 0.3)',
                                            }}
                                            whileHover={{
                                                scale: 1.2,
                                                rotate: [0, -10, 10, -10, 0],
                                                boxShadow: '0 6px 30px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.5)',
                                                transition: { duration: 0.5 }
                                            }}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </motion.div>

                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                                                {feature.title}
                                            </h3>
                                            <Badge className={`${feature.badgeColor} text-xs font-semibold transition-transform duration-300 group-hover:scale-110 shadow-sm ml-2`}>
                                                {feature.badge}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3 font-medium flex-1">
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
        </div>
    );
}