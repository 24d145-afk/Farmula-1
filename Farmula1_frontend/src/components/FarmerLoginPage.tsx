import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, ArrowLeft, Sprout, Mail } from "lucide-react";
import api from "../api/axios";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Label } from "./ui/label";

interface FarmerLoginPageProps {
  onNavigate: (page: string) => void;
}

export function FarmerLoginPage({ onNavigate }: FarmerLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/farmer/login", {
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("farmer", JSON.stringify(res.data.farmer));

      onNavigate("farmer-dashboard");

      } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Back Button */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="ghost"
          className="text-green-700 hover:bg-green-100 rounded-full"
          onClick={() => onNavigate("home")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      <motion.div
        className="container max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-green-100">
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <Sprout className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl text-green-900 mb-2">Farmer Login</h2>
            <p className="text-green-600">Access your smart farming dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-900">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="farmer@test.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-900">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password123"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/30 text-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="text-green-600 hover:text-green-700 p-0"
                  onClick={() => onNavigate("farmer-signup")}
                >
                  Create Account
                </Button>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
