import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { FarmerLoginPage } from "./components/FarmerLoginPage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { FarmerSignupPage } from "./components/FarmerSignupPage";
import { LandingPage } from "./components/LandingPage";
import { FarmerDashboard } from "./components/FarmerDashboard";
import ChatbotPage  from "./components/ChatbotPage";
import { DiseaseDetectionPage } from "./components/DiseaseDetectionPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { EcommercePage } from "./components/EcommercePage";
import { PolicyPage } from "./components/PolicyPage";
import { CropPredictorPage } from "./components/CropPredictorPage";
import { AgriNewsPage } from "./components/AgriNewsPage";
import { OrganicReelsPage } from "./components/OrganicReelsPage";
import { AuthGuard } from "./components/AuthGuard";
import  {ExplorePage}  from "./components/ExplorePage";
import { LoanGuidePage } from "./components/LoanGuidePage";
import { OrganicGuidePage } from "./components/OrganicGuidePage";
import { WeatherForumPage } from "./components/WeatherForumPage";
import { MarketplacePage } from "./components/MarketplacePage";
import  PlantationGuidePage  from "./components/PlantationGuidePage";
import  FarmerForumPage from "./components/FarmerForumPage";
import CropPricePage from "./components/CropPricePage";
import { FarmingCalendarPage } from "./components/FarmingCalendarPage";
export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
  const token = localStorage.getItem("access_token");
  const lastPage = localStorage.getItem("lastProtectedPage");

  if (token && lastPage) {
    return lastPage;
  }

  return "home";
});


  const navigate = (page: string) => {
  const token = localStorage.getItem("access_token");

  // store only protected pages
  if (token && page !== "home" && !page.includes("login")) {
    localStorage.setItem("lastProtectedPage", page);
  }

  setCurrentPage(page);
};



  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "farmer-login":
        return <FarmerLoginPage onNavigate={navigate} />;
      case "admin-login":
        return <AdminLoginPage onNavigate={navigate} />;
      case "farmer-signup":
        return <FarmerSignupPage onNavigate={navigate} />;
      case "landing":
        return <LandingPage onNavigate={navigate} />;
      case "farmer-dashboard":
        return (
          <AuthGuard onNavigate={navigate}>
            <FarmerDashboard onNavigate={navigate} />
          </AuthGuard>
        );
      case "chatbot":
        return <ChatbotPage />;
      case "disease-detection":
        return <DiseaseDetectionPage />;
      case "admin-dashboard":
        return <AdminDashboard />;
      case "ecommerce":
        return <EcommercePage />;
      case "policy":
        return <PolicyPage />;
      case "crop-predictor":
        return <CropPredictorPage />;
      case "agri-news":
        return <AgriNewsPage />;
      case "organic-reels":
        return <OrganicReelsPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
      case "explore":
        return <ExplorePage onNavigate={navigate} />;
      case "loan-guide":
        return <LoanGuidePage />;

      case "organic-guide":
        return <OrganicGuidePage />;

      case "weather-forum":
        return <WeatherForumPage />;

      case "marketplace":
        return <MarketplacePage />;

      case "plantation-guide":
        return <PlantationGuidePage />;

      case "farmer-forum":
        return <FarmerForumPage />;

      case "crop-price":
        return <CropPricePage />;

      case "farming-calendar":
        return <FarmingCalendarPage />;
      case "farming-calendar":
        return <FarmingCalendarPage />;

    }
  };

  const showNavigation = 
    currentPage !== "home" && 
    currentPage !== "farmer-login" && 
    currentPage !== "admin-login" && 
    currentPage !== "farmer-signup" &&
    currentPage !== "organic-reels";

  return (
    <div className="min-h-screen">
      {showNavigation && (
        <Navigation
          currentPage={currentPage}
          onNavigate={navigate}
        />
      )}
      {renderPage()}
    </div>
  );
}