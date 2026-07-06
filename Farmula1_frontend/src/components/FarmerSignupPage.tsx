import api from "../api/axios";
import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sprout,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface FarmerSignupPageProps {
  onNavigate: (page: string) => void;
}

export function FarmerSignupPage({ onNavigate }: FarmerSignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // ✅ REAL BACKEND CONNECTED SIGNUP
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert("Please agree to Terms & Conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/farmer/signup", {
        full_name: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        location: formData.location,
        password: formData.password,
      });


      alert("Signup successful! Please login.");
      console.log("Signup response:", response.data);

      onNavigate("farmer-login");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.detail || "Signup failed");
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
        className="container max-w-2xl mx-auto relative z-10"
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
            <h2 className="text-3xl text-green-900 mb-2">
              Join Farmula 1
            </h2>
            <p className="text-green-600">
              Create your farmer account and start smart farming
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* --- FORM FIELDS (UNCHANGED UI) --- */}
            {/* Full Name */}
            <Label className="text-green-900">Full Name</Label>
            <Input
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />

            {/* Email */}
            <Label className="text-green-900">Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            {/* Mobile Number */}
            <Label className="text-green-900">Mobile Number</Label>
            <Input
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              required
            />
            {/* Location */}
            <Label className="text-green-900">Location</Label>
            <Input
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />


            {/* Password */}
            <Label className="text-green-900">Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {/* Confirm Password */}
            <Label className="text-green-900">Confirm Password</Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />

            {/* Terms */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    agreeTerms: checked as boolean,
                  })
                }
              />
              <span className="text-sm text-gray-600">
                I agree to Terms & Conditions
              </span>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
