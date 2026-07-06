import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Sprout, Droplets, Package,
  Shield, Calendar, Image as ImageIcon, Lightbulb, X
} from 'lucide-react';
import { Button } from './ui/button';

const PlantationGuidePage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [theme, setTheme] = useState('light');
  const [farmerName] = useState('John Farmer');

  const guidanceCards = [
    {
      id: 1,
      title: "Soil Preparation",
      description: "Essential steps for optimal soil readiness",
      icon: Sprout,
      color: "from-stone-300 to-emerald-400",
      image: "https://www.malibugardenclub.org/wp-content/uploads/soil-prep.jpg",
      steps: [
        "Test soil pH levels (ideal range: 6.0-7.0) and nutrient content before starting preparation",
        "Remove weeds, rocks, and debris thoroughly from the planting area",
        "Till the soil to 8-12 inches depth to improve aeration and drainage",
        "Add organic compost or well-rotted manure (2-3 inches layer) and mix evenly",
        "Level the field and create proper drainage channels to prevent waterlogging"
      ]
    },
    {
      id: 2,
      title: "Planting Guide",
      description: "Master proper planting techniques",
      icon: Sprout,
      color: "from-stone-300 to-emerald-400",
      image: "https://tse1.mm.bing.net/th/id/OIP.Be1pJb0HpF4hEf1uDroLEQHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
      steps: [
        "Choose certified seeds or healthy seedlings from reliable sources",
        "Plant at the right depth (typically 2-3 times the seed size) for optimal germination",
        "Maintain proper spacing between plants to ensure adequate sunlight and airflow",
        "Water immediately after planting to settle soil around roots",
        "Mark rows clearly and maintain records of planting dates and varieties"
      ]
    },
    {
      id: 3,
      title: "Irrigation",
      description: "Smart watering for healthy crops",
      icon: Droplets,
      color: "from-stone-300 to-emerald-400",
      image: "https://th.bing.com/th/id/OIP.Oi4gxeXAekq_4Ilg1WCABgHaEJ?w=291&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
      steps: [
        "Water early morning (6-10 AM) or late evening to minimize evaporation",
        "Apply water at soil level to prevent leaf diseases and reduce water waste",
        "Monitor soil moisture regularly - water when top 2 inches feel dry",
        "Use drip irrigation or soaker hoses for efficient water delivery",
        "Adjust watering frequency based on weather, growth stage, and soil type"
      ]
    },
    {
      id: 4,
      title: "Fertilizer Management",
      description: "Optimize nutrition for maximum yield",
      icon: Package,
      color: "from-stone-300 to-emerald-400",
      image: "https://www.fertilizerseurope.com/wp-content/uploads/2019/08/iStock-606230424-e1565796075821.jpg",
      steps: [
        "Conduct soil tests to determine nutrient deficiencies before fertilization",
        "Apply organic fertilizers like compost, manure, or green manure when possible",
        "Follow recommended NPK ratios specific to your crop requirements",
        "Split fertilizer applications to match plant growth stages for better absorption",
        "Avoid over-fertilization which can harm plants and pollute groundwater"
      ]
    },
    {
      id: 5,
      title: "Pest Control",
      description: "Protect crops with integrated methods",
      icon: Shield,
      color: "from-stone-300 to-emerald-400",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
      steps: [
        "Regularly inspect plants for signs of pests or disease symptoms",
        "Use natural predators and beneficial insects for biological pest control",
        "Implement crop rotation to break pest life cycles",
        "Apply organic pesticides only when necessary and follow safety guidelines",
        "Maintain field hygiene by removing infected plants and debris promptly"
      ]
    },
    {
      id: 6,
      title: "Harvest & Storage",
      description: "Proper techniques for quality produce",
      icon: Calendar,
      color: "from-stone-300 to-emerald-400",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop",
      steps: [
        "Harvest at the right maturity stage for optimal flavor and nutrition",
        "Use clean, sharp tools to minimize crop damage during harvesting",
        "Handle produce gently to avoid bruising and quality deterioration",
        "Store in cool, dry, well-ventilated areas to extend shelf life",
        "Sort and grade produce properly before storage or transport to market"
      ]
    }
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setCurrentStep(0);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedCard?.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const scrollContainer = (direction) => {
    const container = document.getElementById('cards-container');
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`min-h-screen relative ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      {/* Beautiful farm background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=85&w=2000"
          alt="Farm background"
          className="w-full h-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
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
                  const newTheme = theme === 'dark' ? 'light' : 'dark';
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
                {theme === 'dark' ? 'Light' : 'Dark'}
              </Button>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Page Title - Centered with extra gap */}
          <div className="mb-28 text-center">
            <h2 className="text-5xl font-extrabold text-emerald-200 drop-shadow-2xl mb-4 tracking-wide animate-fade-in">
              Plantation Guidance
            </h2>


            <p className="text-white/90 text-xl drop-shadow-md max-w-2xl mx-auto">
              Explore step-by-step guides to grow healthier crops and unlock your farm's full potential
            </p>
          </div>

          {/* Cards Section */}
          <div className="relative">
            {/* Scroll Arrows */}
            <button
              onClick={() => scrollContainer('left')}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-green-600 hover:bg-green-50 transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => scrollContainer('right')}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-green-600 hover:bg-green-50 transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>

            {/* Cards Container - Changed to flex for horizontal scroll */}
            <div
              id="cards-container"
              className="flex flex-row overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
            >
              {guidanceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    onClick={() => openModal(card)}
                    className="cursor-pointer group min-w-[300px] flex-shrink-0"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(0,255,0,0.2)] transition-all duration-500 hover:-translate-y-4 hover:scale-105 border border-emerald-200/50 animate-slide-up">
                      {/* Icon Header with Image Overlay - Removed Icon */}
                      <div className="relative">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-40 object-cover opacity-70"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-70`} />
                      </div>

                      {/* Content */}
                      <div className="p-6 bg-white">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {card.description}
                        </p>
                        <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-800 transition-colors">
                          <span className="text-sm">Discover Secrets</span>
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reverted Modal - Show all steps in list */}
        {selectedCard && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedCard.title}
                </h3>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mb-4">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
              <div className="mb-4">
                <p className="text-gray-600 leading-relaxed">
                  {selectedCard.description}
                </p>
              </div>
              <div className="mb-4">
                <ol className="list-decimal pl-6">
                  {selectedCard.steps.map((step, index) => (
                    <li key={index} className="mb-2">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex justify-between">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={nextStep}
                  disabled={currentStep === selectedCard.steps.length - 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantationGuidePage;