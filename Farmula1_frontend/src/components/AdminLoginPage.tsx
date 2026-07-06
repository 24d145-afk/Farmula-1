import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, EyeOff, ArrowLeft, Mail, KeyRound } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdminLoginPageProps {
  onNavigate: (page: string) => void;
}

export function AdminLoginPage({ onNavigate }: AdminLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate admin credentials
    if (formData.email && formData.password) {
      onNavigate('admin-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl"
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

      {/* Back Button */}
      <motion.div
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button
          variant="ghost"
          className="text-amber-700 hover:bg-amber-100 rounded-full"
          onClick={() => onNavigate('home')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </motion.div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-amber-100">
              <div className="text-center mb-8">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Shield className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl text-amber-900 mb-2">Admin Portal</h2>
                <p className="text-amber-600">Government & Regional Administrator Access</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-amber-900">
                    Official Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@agriculture.gov.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-amber-900">
                    Secure Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your secure password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, rememberMe: checked as boolean })
                      }
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Keep me logged in
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="text-amber-600 hover:text-amber-700 p-0"
                  >
                    Reset Password
                  </Button>
                </div>

                {/* Security Notice */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-900 mb-1">
                        <strong>Secure Admin Access</strong>
                      </p>
                      <p className="text-xs text-amber-700">
                        This portal is restricted to authorized government officials and regional administrators only. 
                        All login attempts are monitored and logged for security purposes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl shadow-lg shadow-amber-500/30 text-lg"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Access Admin Dashboard
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">SECURE OPTIONS</span>
                  </div>
                </div>

                {/* 2FA Login */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300 rounded-xl"
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  Login with 2FA Token
                </Button>

                {/* Support Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600 text-sm">
                    Need assistance?{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="text-amber-600 hover:text-amber-700 p-0"
                    >
                      Contact IT Support
                    </Button>
                  </p>
                </div>
              </form>

              {/* Demo Credentials */}
              <motion.div
                className="mt-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-amber-800 mb-2">
                  <strong>Demo Admin Access:</strong>
                </p>
                <p className="text-xs text-amber-700">
                  Email: <code className="bg-white px-2 py-1 rounded">admin@demo.gov.in</code>
                </p>
                <p className="text-xs text-amber-700">
                  Password: <code className="bg-white px-2 py-1 rounded">admin@2024</code>
                </p>
              </motion.div>
            </Card>
          </motion.div>

          {/* Right Side - Information */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl text-amber-900">Regional Control</h1>
                  <p className="text-amber-600">Administrative Dashboard</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl text-amber-900 leading-tight">
                  Monitor & Manage Agricultural Networks
                </h2>
                <p className="text-lg text-amber-700/80 leading-relaxed">
                  Oversee multiple farms, track compliance, manage subsidies, 
                  and ensure sustainable agricultural practices across your region.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Admin Dashboard"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl text-amber-900">Admin Features:</h3>
                <div className="space-y-2">
                  {[
                    'Regional Farm Network Overview',
                    'Compliance & Certification Tracking',
                    'Subsidy & Scheme Management',
                    'Resource Allocation & Planning',
                    'Policy Implementation Monitoring',
                    'Data Analytics & Reporting'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-xl"
                    >
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <span className="text-amber-800">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Animation */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Shield className="w-8 h-8 text-white" />
      </motion.div>
    </div>
  );
}
