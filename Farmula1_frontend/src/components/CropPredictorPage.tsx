import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Brain,
  Leaf,
  Droplets,
  Thermometer,
  CloudRain,
  Zap,
  Waves,
  TestTube,
  Sprout,
  Cpu,
  Gauge,
  BarChart3,
  Shield,
  TrendingUp,
  Calendar,
  MapPin,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

/* =======================================================================================
   CROP IMAGE MAP
======================================================================================= */
const cropImages: Record<string, string> = {
  rice: "https://images.unsplash.com/photo-1536304929831-6e0155be1b18?q=80&w=800",
  maize: "https://images.unsplash.com/photo-1603910234804-b8b63a5c5d62?q=80&w=800",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800",
  chickpea: "https://th.bing.com/th/id/OIP.feB7efvSkfYODGnPZWPp_gHaE7?w=299&h=199&c=7&r=0&o=7&pid=1.7&rm=3",
  kidneybeans: "https://images.unsplash.com/photo-1583926288670-f2eb8c9e9295?q=80&w=800",
  pigeonpeas: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=800",
  mothbeans: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=800",
  mungbean: "https://images.unsplash.com/photo-1607623488235-f6b391864c3e?q=80&w=800",
  blackgram: "https://images.unsplash.com/photo-1607623488235-f6b391864c3e?q=80&w=800",
  lentil: "https://images.unsplash.com/photo-1596527109917-97679a6e3e0e?q=80&w=800",
  pomegranate: "https://images.unsplash.com/photo-1603540075746-0fdaa011e4a5?q=80&w=800",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=800",
  mango: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=800",
  grapes: "https://images.unsplash.com/photo-1599819177442-2c94e489b78a?q=80&w=800",
  watermelon: "https://images.unsplash.com/photo-1587049352846-4a222e784343?q=80&w=800",
  muskmelon: "https://images.unsplash.com/photo-1621583832680-0e44d36d206b?q=80&w=800",
  apple: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=800",
  orange: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=800",
  papaya: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?q=80&w=800",
  coconut: "https://images.unsplash.com/photo-1598926411052-23e50c9ee92d?q=80&w=800",
  cotton: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800",
  jute: "https://images.unsplash.com/photo-1619057386228-c5c7c6e6f9c5?q=80&w=800",
  coffee: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800",
};

/* =======================================================================================
   TYPES
======================================================================================= */
type InputKey =
  | 'nitrogen'
  | 'phosphorus'
  | 'potassium'
  | 'pH'
  | 'temperature'
  | 'humidity'
  | 'rainfall';

type ParameterConfig = {
  key: InputKey;
  label: string;
  unit: string;
  icon: any;
  gradient: string;
  min: number;
  max: number;
  step: number;
  description: string;
};

/* =======================================================================================
   MAIN COMPONENT
======================================================================================= */
export function CropPredictorPage() {
  /* -----------------------------------------------------------------------------
     STATE
  ----------------------------------------------------------------------------- */
  const [inputValues, setInputValues] = useState({
    nitrogen: 45,
    phosphorus: 38,
    potassium: 42,
    pH: 6.8,
    temperature: 28,
    humidity: 65,
    rainfall: 180,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictedCrop, setPredictedCrop] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [farmerName, setFarmerName] = useState<string>("Farmer");
  const [theme, setTheme] = useState<"dark" | "light">("dark");;


  /* -----------------------------------------------------------------------------
     SCROLL ANIMATIONS
  ----------------------------------------------------------------------------- */
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
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
      .catch(() => { });

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

  /* -----------------------------------------------------------------------------
     BACKEND CALL (UNCHANGED)
  ----------------------------------------------------------------------------- */
  const handlePredict = async () => {
    setIsAnalyzing(true);
    setShowPrediction(false);
    setApiError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/crop/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          N: inputValues.nitrogen,
          P: inputValues.phosphorus,
          K: inputValues.potassium,
          temperature: inputValues.temperature,
          humidity: inputValues.humidity,
          ph: inputValues.pH,
          rainfall: inputValues.rainfall,
        }),
      });

      if (!response.ok) throw new Error('Prediction failed');
      const data = await response.json();

      setTimeout(() => {
        setPredictedCrop(data.recommended_crop);
        setIsAnalyzing(false);
        setShowPrediction(true);
      }, 2300);
    } catch (error) {
      setIsAnalyzing(false);
      setApiError('Unable to predict crop. Please try again.');
    }
  };

  const handleReset = () => {
    setShowPrediction(false);
    setIsAnalyzing(false);
  };

  const parameters: ParameterConfig[] = useMemo(
    () => [
      { key: 'nitrogen', label: 'Nitrogen', unit: 'kg/ha', icon: Leaf, gradient: 'from-emerald-500 to-teal-600', min: 0, max: 120, step: 1, description: 'Essential for leaf growth' },
      { key: 'phosphorus', label: 'Phosphorus', unit: 'kg/ha', icon: Waves, gradient: 'from-blue-500 to-cyan-600', min: 0, max: 120, step: 1, description: 'Supports root development' },
      { key: 'potassium', label: 'Potassium', unit: 'kg/ha', icon: Zap, gradient: 'from-violet-500 to-purple-600', min: 0, max: 120, step: 1, description: 'Improves disease resistance' },
      { key: 'pH', label: 'Soil pH', unit: '', icon: TestTube, gradient: 'from-lime-500 to-green-600', min: 3, max: 10, step: 0.1, description: 'Controls nutrient availability' },
      { key: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer, gradient: 'from-orange-500 to-red-600', min: 0, max: 50, step: 1, description: 'Ambient temperature' },
      { key: 'humidity', label: 'Humidity', unit: '%', icon: Droplets, gradient: 'from-sky-500 to-indigo-600', min: 0, max: 100, step: 1, description: 'Moisture content in air' },
      { key: 'rainfall', label: 'Rainfall', unit: 'mm', icon: CloudRain, gradient: 'from-cyan-500 to-blue-600', min: 0, max: 400, step: 1, description: 'Total rainfall received' },
    ],
    []
  );

  /* -----------------------------------------------------------------------------
     FLOATING PARTICLES
  ----------------------------------------------------------------------------- */
  const particles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      size: Math.random() * 7 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 35 + 25,
      delay: Math.random() * 12,
    }));
  }, []);

  /* -----------------------------------------------------------------------------
     RENDER
  ----------------------------------------------------------------------------- */
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* ====================== BACKGROUND IMAGE ====================== */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://wallpaperbat.com/img/9770247-regenerative-agriculture-illinois.jpg"
          alt="Regenerative agriculture field"
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.15]"
        />
        {/* Overlay gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />
      </div>

      {/* Floating particles - lighter version for dark background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-emerald-300/30 backdrop-blur-sm"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -140, 0],
              x: [0, 70, 0],
              opacity: [0.2, 0.55, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ====================== HEADER ====================== */}
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
                await fetch("http://127.0.0.1:8000/farmer/theme", {
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

      {/* ====================== MAIN CONTENT ====================== */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 md:px-8 pt-10 pb-24">
        {/* Hero */}
        <motion.div
          style={{ opacity, scale }}
          className="text-left mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            
          </motion.div>
        </motion.div>

        {/* Parameter Inputs - only when not showing prediction */}
        <AnimatePresence mode="wait">
          {!showPrediction && (
            <motion.div
              key="inputs"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {parameters.map((param, index) => {
                const Icon = param.icon;
                const value = inputValues[param.key];

                return (
                  <motion.div
                    key={param.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="relative group"
                  >
                    <div className="relative rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-emerald-800/40 shadow-2xl hover:shadow-emerald-900/40 transition-all duration-300 p-6">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${param.gradient} text-white shadow-lg`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-base">{param.label}</p>
                          <p className="text-xs text-emerald-200/70">{param.description}</p>
                        </div>
                      </div>

                      {/* Value + Slider */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-3xl font-bold text-white">{value}</span>
                          <span className="text-sm text-emerald-200/80">{param.unit}</span>
                        </div>

                        <input
                          type="range"
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          value={value}
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              [param.key]: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-emerald-500"
                          style={{
                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${((value - param.min) / (param.max - param.min)) * 100}%, rgba(255,255,255,0.2) ${((value - param.min) / (param.max - param.min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
                          }}
                        />
                      </div>

                      {/* Number input */}
                      <input
                        type="number"
                        min={param.min}
                        max={param.max}
                        step={param.step}
                        value={value}
                        onChange={(e) =>
                          setInputValues({
                            ...inputValues,
                            [param.key]: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg bg-gray-800/60 border border-emerald-700/50 px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Predict Button */}
        <AnimatePresence>
          {!showPrediction && (
            <motion.div
              key="predict-btn"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="flex justify-center mb-20"
            >
              <Button
                onClick={handlePredict}
                disabled={isAnalyzing}
                className="px-14 py-7 rounded-full text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-2xl hover:shadow-emerald-900/60 hover:scale-105 transition-all duration-300 border border-emerald-500/30"
              >
                <Brain className="w-7 h-7 mr-3" />
                Analyze & Predict Crop
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analyzing Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-8"
                >
                  <Cpu className="w-24 h-24 text-emerald-400" />
                </motion.div>
                <h3 className="text-white text-3xl font-bold mb-3 drop-shadow-lg">
                  Analyzing Parameters...
                </h3>
                <p className="text-emerald-200 text-xl drop-shadow">
                  Processing agricultural intelligence
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================== RESULT DISPLAY ====================== */}
        <AnimatePresence>
          {showPrediction && predictedCrop && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto"
            >
              {/* Main Result Card */}
              <motion.div
                initial={{ scale: 0.92, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-emerald-800/40"
              >
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Crop Image */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 rounded-3xl blur-2xl" />
                    <img
                      src={
                        cropImages[predictedCrop.toLowerCase().replace(/\s+/g, '')] ||
                        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800"
                      }
                      alt={predictedCrop}
                      className="relative w-72 h-72 md:w-80 md:h-80 object-cover rounded-3xl shadow-2xl border-4 border-emerald-500/30"
                    />
                  </motion.div>

                  {/* Result Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <Badge className="mb-6 bg-emerald-700/80 text-white px-6 py-2.5 text-lg rounded-full border border-emerald-600/50">
                      Recommended Crop
                    </Badge>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-6 drop-shadow-lg capitalize">
                      {predictedCrop.replace(/([A-Z])/g, ' $1').trim()}
                    </h2>

                    <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Based on your soil composition and environmental conditions, this crop is predicted to yield optimal results for your farmland.
                    </p>

                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 140 }}           // starts quite low
                animate={{ opacity: 1, y: -30 }}           // ends clearly higher (upward movement)
                transition={{
                  delay: 0.5,
                  duration: 1.1,
                  type: "spring",
                  stiffness: 80,
                  damping: 14
                }}
                className="flex justify-center items-center pt-16 pb-20"  // breathing room above & below
              >
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="
      min-w-[340px]          /* wider overall */
      px-16 py-9             /* significantly larger padding → bigger button */
      text-2xl               /* much bigger text */
      font-bold
      rounded-full
      border-2 border-emerald-500
      text-emerald-200
      bg-black/30
      backdrop-blur-sm
      hover:bg-emerald-950/60
      hover:text-white
      hover:shadow-xl hover:shadow-emerald-700/50
      hover:-translate-y-2   /* small lift on hover */
      transition-all duration-300
      active:scale-95
    "
                >
                  Run New Analysis
                </Button>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

        {/* Error */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-red-900/40 border border-red-700/50 rounded-2xl p-8 text-center backdrop-blur-sm"
          >
            <p className="text-red-200 font-medium text-lg">{apiError}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}