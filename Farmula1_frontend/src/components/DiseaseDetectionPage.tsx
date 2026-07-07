import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Scan,
  AlertTriangle,
  CheckCircle,
  Sprout,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { API_BASE } from "../config";
export function DiseaseDetectionPage() {
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(false);
  /* 🔴 ML STATES (UNCHANGED) */
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [farmerName, setFarmerName] = useState("Farmer");

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

  /* 🔴 IMAGE UPLOAD (UNCHANGED) */
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setDetected(false);
  };

  /* 🔴 SCAN HANDLER (UNCHANGED) */
  const handleScan = async () => {
    if (!imageFile) {
      alert("Please upload an image first");
      return;
    }
    setScanning(true);
    setDetected(false);
    const scanStart = Date.now();
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const response = await fetch(
        `${API_BASE}/api/predict-disease`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const elapsed = Date.now() - scanStart;
      const delay = Math.max(0, 3000 - elapsed);
      setTimeout(() => {
        setResult({
          ...data,
          affectedArea: "15-20%",
        });
        setScanning(false);
        setDetected(true);
      }, delay);
    } catch (error) {
      console.error(error);
      setScanning(false);
      alert("Disease prediction failed");
    }
  };

  const detectionResult = result;

  return (
    <div className="min-h-screen relative">
      {/* Full-screen agricultural background */}
      <div className="fixed inset-0 -z-10">
        <ImageWithFallback
          src="https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg"
          alt="Regenerative agriculture field background"
          className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* New Farmer Dashboard Header */}
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
              {theme === "dark" ? "Dark" : "Light"} Mode
            </Button>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Sprout className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-70 pb-10 relative z-0">
        

        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAIN AREA – centered content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-none shadow-xl backdrop-blur-sm bg-white/80 mx-auto max-w-4xl">
              {!detected ? (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-green-900 mb-6">
                    Upload or Capture Crop Image
                  </h3>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="image-upload"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="relative mb-8">
                    <div className="aspect-video bg-gradient-to-br from-gray-100/80 to-gray-50/80 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                      {!scanning ? (
                        <div className="text-center">
                          <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                          <p className="text-gray-700 mb-2 text-lg">
                            Drag and drop image here
                          </p>
                          <p className="text-sm text-gray-600">
                            or click to browse files
                          </p>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1716725330092-be290229e5f5"
                            alt="Scanning crop leaves"
                            className="w-full h-full object-cover"
                          />
                          {/* HOLOGRAPHIC SCAN EFFECT */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 p-4">
                            {[...Array(48)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="border border-cyan-400/50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.02,
                                }}
                              />
                            ))}
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-6 py-3 rounded-full">
                            <div className="flex items-center gap-3 text-white text-base font-medium">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Scan className="w-5 h-5" />
                              </motion.div>
                              Analyzing crop health...
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-full"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <Upload className="mr-2 w-5 h-5" />
                      Upload Image
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleScan}
                      disabled={scanning || !imageFile}
                      className="rounded-full"
                    >
                      <Camera className="mr-2 w-5 h-5" />
                      {scanning ? "Scanning..." : "Detect Disease"}
                    </Button>
                  </div>
                </div>
              ) : (
                /* RESULTS */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDetected(false)}
                    className="mb-6 rounded-full"
                  >
                    ← Scan Another Image
                  </Button>
                  <Card className="p-6 bg-gradient-to-br from-red-50/90 to-orange-50/90 border-red-200 mb-6 backdrop-blur-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-red-900 text-xl font-bold mb-1">
                          {detectionResult?.disease} Detected
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-red-100 text-red-700 text-base">
                            {detectionResult?.confidence}% Confidence
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-700 text-base">
                            {detectionResult?.severity} Severity
                          </Badge>
                          <Badge className="bg-amber-100 text-amber-700 text-base">
                            Affected Area: {detectionResult?.affectedArea}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-green-900 font-semibold mb-3 text-lg">
                          Recommended Treatment
                        </h4>
                        <ul className="space-y-2">
                          {detectionResult?.treatment?.map((item: string, index: number) => (
                            <li
                              key={index}
                              className="flex gap-2 text-sm text-green-800"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-green-900 font-semibold mb-3 text-lg">
                          Prevention Tips
                        </h4>
                        <ul className="space-y-2">
                          {detectionResult?.prevention?.map((item: string, index: number) => (
                            <li
                              key={index}
                              className="flex gap-2 text-sm text-green-800"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </Card>
          </div>

          {/* SIDEBAR – only stats + common diseases */}
          <div className="space-y-6">
            <Card className="p-6 border-none shadow-xl backdrop-blur-sm bg-white/80">
              <h3 className="text-green-900 mb-4 text-xl font-semibold">Detection Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-800">
                  <span>Total Scans</span>
                  <Badge className="bg-green-100 text-green-700">47</Badge>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Diseases Found</span>
                  <Badge className="bg-red-100 text-red-700">12</Badge>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Healthy Scans</span>
                  <Badge className="bg-blue-100 text-blue-700">35</Badge>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Accuracy Rate</span>
                  <Badge className="bg-purple-100 text-purple-700">96%</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-none shadow-xl backdrop-blur-sm bg-white/80">
              <h3 className="text-green-900 mb-4 text-xl font-semibold">Common Diseases</h3>
              {[
                { name: "Leaf Rust", risk: "High", color: "red" },
                { name: "Powdery Mildew", risk: "Medium", color: "orange" },
                { name: "Blight", risk: "Low", color: "yellow" },
              ].map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-50/80 rounded-lg mb-2 backdrop-blur-sm"
                >
                  <span className="font-medium">{d.name}</span>
                  <Badge className={`bg-${d.color}-100 text-${d.color}-700`}>
                    {d.risk} Risk
                  </Badge>
                </motion.div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}