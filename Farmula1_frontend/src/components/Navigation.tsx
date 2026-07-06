import { motion } from 'motion/react';
import { Home, LayoutDashboard, MessageCircle, Scan, Brain, Menu, X, Newspaper, Video, ShoppingCart, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import logo from "../assets/logo.png";
interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'farmer-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chatbot', label: 'AI Chat', icon: MessageCircle },
    { id: 'disease-detection', label: 'Disease Scan', icon: Scan },
    { id: 'crop-predictor', label: 'Predictor', icon: Brain },
    { id: 'agri-news', label: 'News', icon: Newspaper },
    { id: 'organic-reels', label: 'Reels', icon: Video },
    { id: 'ecommerce', label: 'Shop', icon: ShoppingCart },
    { id: 'policy', label: 'Schemes', icon: FileText },
    { id: 'explore', label: 'Explore', icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:block fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow">
                <img
                  src={logo}
                  alt="Farmula 1 Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-green-900">Farmula 1</span>
            </div>

            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onNavigate(item.id)}
                    className={`gap-2 rounded-full ${
                      isActive 
                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                        : 'hover:bg-green-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2" onClick={() => onNavigate('landing')}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🌾</span>
              </div>
              <span className="text-green-900">Farmula 1</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 pt-16"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 h-12 rounded-xl ${
                      isActive 
                        ? 'bg-gradient-to-r from-green-600 to-green-700' 
                        : 'hover:bg-green-50'
                    }`}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
}