import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Newspaper,
  Clock,
  ExternalLink,
  Search,
  Sprout,
} from "lucide-react";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { API_BASE } from "../config";
/* =========================
   Backend News Interface
========================= */
interface NewsArticle {
  title: string;
  description: string;
  image: string | null;
  source: string;
  published_at: string;
  url: string;
}

/* =========================
   COMPONENT (NAMED EXPORT)
========================= */
export function AgriNewsPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [farmerName, setFarmerName] = useState(" ");

  useEffect(() => {
    // Load farmer profile
    fetch("`${API_BASE}/auth/farmer/me", {
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
    fetch("`${API_BASE}/farmer/theme", {
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


  /* =========================
     Fetch news from backend
  ========================= */
  useEffect(() => {
    fetch("`${API_BASE}/api/agriculture-news")
      .then((res) => res.json())
      .then((data) => {
        setNewsArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load agriculture news", err);
        setLoading(false);
      });
  }, []);

  /* =========================
     Search filter
  ========================= */
  const filteredNews = newsArticles.filter((article) => {
    const title = article.title?.toLowerCase() || "";
    const description = article.description?.toLowerCase() || "";

    return (
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
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
          <div className="p-10 text-center text-lg text-white backdrop-blur-sm bg-black/30 mt-20 mx-auto max-w-md rounded-xl">
            Loading agriculture news...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
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
                  await fetch("`${API_BASE}/farmer/theme", {
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

        {/* News Section Header */}
        <div className="backdrop-blur-xl bg-white/90 border-b border-gray-300/50 shadow-lg">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-lg">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl">Latest Agriculture News</h2>
                <p className="text-gray-700">
                  Real-time agriculture news from trusted sources
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search agriculture news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:text-gray-900 focus:bg-white rounded-xl border-gray-300 shadow-md"
              />
            </div>
          </div>
        </div>

        {/* ================= NEWS LIST ================= */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <AnimatePresence>
            {filteredNews.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="mb-6"
              >
                <Card className="p-6 hover:shadow-2xl transition backdrop-blur-xl bg-white/95 border-gray-200/50">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* ================= IMAGE ================= */}
                    <div className="md:w-48 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-md">
                      <ImageWithFallback
                        src={
                          article.image && article.image.startsWith("http")
                            ? article.image
                            : "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                        }
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="flex-1">
                      <Badge className="mb-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shadow-sm">
                        {article.source}
                      </Badge>

                      <h3 className="text-xl mb-2">{article.title}</h3>

                      <p className="text-gray-600 mb-4">
                        {article.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(article.published_at).toLocaleDateString()}
                        </span>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(article.url, "_blank")}
                            className="hover:bg-green-50 hover:text-green-700 hover:border-green-300 shadow-sm"
                          >
                            Read More
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredNews.length === 0 && (
            <div className="text-center mt-10 py-20 backdrop-blur-xl bg-white/90 rounded-2xl shadow-xl">
              <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-700">No agriculture news found.</p>
              <p className="text-sm mt-2 text-gray-500">Try adjusting your search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}