import { motion } from 'framer-motion'; // fixed typo: was 'motion/react' → should be 'framer-motion'
import { Sprout, Users, Shield, ArrowRight, Leaf, Sun, Droplets, Target, Eye, Heart, Rocket, Globe, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from "../assets/logo.png";
interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Sprout,
      title: 'Smart Farming',
      description: 'AI-powered insights for optimal crop management'
    },
    {
      icon: Droplets,
      title: 'IoT Monitoring',
      description: 'Real-time soil and weather tracking'
    },
    {
      icon: Sun,
      title: 'Sustainability',
      description: 'Eco-friendly farming practices and organic solutions'
    },
    {
      icon: Leaf,
      title: 'Expert Guidance',
      description: 'Multilingual AI chatbot and community support'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-green-300/20 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl"
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

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow">
                <img
                  src={logo}
                  alt="Farmula 1 Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl text-green-900">Farmula 1</h2>
                <p className="text-sm text-green-600">Smart Farming Companion</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="text-green-700 hover:bg-green-100"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About Us
              </Button>
              <Button
                variant="ghost"
                className="text-green-700 hover:bg-green-100"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </Button>
            </div>
          </motion.div>

          {/* Hero Content – unchanged */}
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full"
              >
                <Sprout className="w-5 h-5 text-green-700" />
                <span className="text-green-800">Revolutionizing Agriculture</span>
              </motion.div>

              <div>
                <h1 className="text-5xl md:text-6xl mb-6 text-green-900 leading-tight">
                  Where Soil, Science & Simplicity Meet
                </h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="border-l-4 border-green-600 pl-6 py-4 bg-white/50 backdrop-blur-sm rounded-r-xl"
                >
                  <p className="text-xl text-green-800 italic leading-relaxed">
                    "The farmer is the only man in our economy who buys everything at retail, 
                    sells everything at wholesale, and pays the freight both ways."
                  </p>
                  <p className="text-sm text-green-600 mt-2">— John F. Kennedy</p>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-green-700/80 leading-relaxed"
              >
                Empowering farmers with AI-driven insights, IoT monitoring, and sustainable practices 
                for a greener, more profitable future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30 rounded-full group"
                  onClick={() => onNavigate('farmer-login')}
                >
                  <Users className="mr-2 w-5 h-5" />
                  Farmer Login
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-full group"
                  onClick={() => onNavigate('farmer-signup')}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-6 text-sm pt-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-700">1200+ Active Farms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-green-700">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-green-700">24/7 Support</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                  alt="Modern Farmer with Technology"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent" />
                
                <motion.div
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-3xl text-green-600 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="text-3xl text-emerald-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">IoT Monitoring</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-6 text-center"
              >
                <Button
                  variant="ghost"
                  className="text-amber-700 hover:bg-amber-50 rounded-full group"
                  onClick={() => onNavigate('admin-login')}
                >
                  <Shield className="mr-2 w-4 h-4" />
                  Admin Portal
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

       {/* ──────────────────────────────────────────────── */}
      {/*          P O L I S H E D   &   P I T C H - R E A D Y   A B O U T   U S         */}
      {/* ──────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Minimal subtle accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 tracking-tight mt-6 mb-6">
              About Farmula 1
            </h2>
            <p className="text-xl md:text-2xl text-green-800/90 max-w-4xl mx-auto leading-relaxed font-light">
              Farmula 1 was founded on a clear conviction: <span className="font-semibold text-emerald-700">technology must empower — never replace — the hands that feed the world</span>.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To democratize advanced agritech — delivering AI-driven insights, real-time IoT monitoring, and precision tools to farmers of every scale, enabling higher productivity with fewer resources."
              },
              {
                icon: Eye,
                title: "Our Vision",
                description: "A future of regenerative agriculture where farms produce abundantly, communities prosper, soils regenerate, and food systems become resilient in the face of climate change."
              },
              {
                icon: Heart,
                title: "Our Principles",
                description: "Farmer-centric innovation • Simplicity in complexity • Sustainability as a core metric • Integration of traditional wisdom with scientific precision • Transparency and trust in every decision."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="h-full p-8 bg-white/80 backdrop-blur-sm border border-emerald-100/60 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center mb-6 text-white shadow-md">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold text-green-900 mb-4">{item.title}</h3>
                  <p className="text-green-800/85 leading-relaxed text-[1.05rem]">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Strong closing pitch statement */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="inline-block max-w-4xl px-10 py-8 bg-emerald-50/40 border border-emerald-100 rounded-3xl">
              <p className="text-xl md:text-2xl font-medium text-green-900 leading-relaxed italic">
                Farmula 1 exists to bridge today’s agricultural reality with tomorrow’s sustainable promise — equipping farmers to grow more, waste less, and secure a thriving future for agriculture and the planet.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section – unchanged */}
      <div id="features" className="py-20 bg-gradient-to-b from-white to-green-50">
        {/* ... unchanged features code ... */}
      </div>

      {/* CTA Section – unchanged */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 py-20">
        {/* ... unchanged CTA code ... */}
      </div>

      {/* Floating Animation – unchanged */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500/10 text-6xl"
            initial={{ x: Math.random() * window.innerWidth, y: -100, rotate: 0 }}
            animate={{ y: window.innerHeight + 100, rotate: 360, x: Math.random() * window.innerWidth }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
          >
            🌾
          </motion.div>
        ))}
      </div>
    </div>
  );
}
