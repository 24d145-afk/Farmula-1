import { motion } from 'motion/react';
import { Sprout, Cloud, Bot, Shield, Newspaper, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Sprout,
      title: 'Auto Fertilization',
      description: 'Smart soil monitoring and automated nutrient management',
      color: 'from-green-500 to-emerald-600',
      page: 'farmer-dashboard',
    },
    {
      icon: Bot,
      title: 'AI Chatbot',
      description: 'Multilingual voice assistant for instant farming guidance',
      color: 'from-blue-500 to-cyan-600',
      page: 'chatbot',
    },
    {
      icon: Cloud,
      title: 'Climate Prediction',
      description: 'Real-time weather forecasts and irrigation recommendations',
      color: 'from-sky-400 to-blue-500',
      page: 'crop-predictor',
    },
    {
      icon: Shield,
      title: 'Disease Detection',
      description: 'AI-powered crop disease identification and treatment',
      color: 'from-amber-500 to-orange-600',
      page: 'disease-detection',
    },
    {
      icon: Newspaper,
      title: 'Agri News Hub',
      description: 'Stay updated with latest trends, policies and market insights',
      color: 'from-purple-500 to-indigo-600',
      page: 'agri-news',
    },
    {
      icon: Video,
      title: 'Organic Reels',
      description: 'Short videos on organic farming tips and sustainable practices',
      color: 'from-pink-500 to-rose-600',
      page: 'organic-reels',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50/30 to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sprout className="w-5 h-5 text-green-700" />
                <span className="text-green-800">Smart Farming Revolution</span>
              </motion.div>

              <h1 className="mb-6 text-green-900">
                Farmula 1 – Smart Farming Companion
              </h1>
              
              <p className="text-xl text-green-800/80 mb-8 leading-relaxed">
                Farming reimagined — where soil, science, and simplicity meet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/30 rounded-full"
                  onClick={() => onNavigate('farmer-dashboard')}
                >
                  <Sprout className="mr-2 w-5 h-5" />
                  Farmer Login
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 rounded-full"
                  onClick={() => onNavigate('admin-dashboard')}
                >
                  <Shield className="mr-2 w-5 h-5" />
                  Admin Login
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-700">1200+ Active Farms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-green-700">AI-Powered Insights</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjExNDkzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern Farm Technology"
                  className="w-full h-[400px] object-cover"
                />
                
                {/* Floating IoT Sensors */}
                <motion.div
                  className="absolute top-20 right-10 bg-white p-3 rounded-full shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-10 bg-white p-3 rounded-full shadow-lg"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                </motion.div>
              </div>

              {/* Stats Card */}
              <motion.div
                className="absolute -bottom-6 left-6 right-6 bg-white p-4 rounded-2xl shadow-xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-green-600">98%</div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <div className="text-amber-600">24/7</div>
                    <div className="text-xs text-gray-600">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-600">IoT</div>
                    <div className="text-xs text-gray-600">Enabled</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-green-900">Revolutionary Features</h2>
          <p className="text-green-700/70 max-w-2xl mx-auto">
            Empowering farmers with cutting-edge technology for sustainable and profitable farming
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="p-6 hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm h-full cursor-pointer group"
                onClick={() => onNavigate(feature.page)}
              >
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="mb-2 text-green-900">{feature.title}</h3>
                <p className="text-sm text-green-700/70">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Leaves Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/20 text-4xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 360,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>
    </div>
  );
}