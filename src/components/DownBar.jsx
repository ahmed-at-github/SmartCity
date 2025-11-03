import { useState } from "react";
import { COLORS } from "../utils/COLORS";
import { TEXT } from "../utils/TEXT";
import {
  Home,
  ShieldAlert,
  Car,
  Tag,
  ListChecks,
  User,
  Search,
  MapPin,
  MapPinOff,
  AlertTriangle,
  Send,
  Upload,
  ArrowRight,
  Loader,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { IconButton } from "./custom/IconButton";
export function DownBar() {
  const [currentPage, setCurrentPage] = useState("home"); // splash, login, home, traffic, safety, pricing, reports

  // const renderScreen = () => {
  //   switch (currentPage) {
  //     case "splash":
  //       return <SplashScreen onFinish={setCurrentPage} />;
  //     case "login":
  //       return <LoginScreen onLogin={setCurrentPage} />;
  //     case "home":
  //       return <HomeScreen navigate={setCurrentPage} />;
  //     case "traffic":
  //       return <TrafficScreen />;
  //     case "safety":
  //       return <SafetyScreen />;
  //     case "pricing":
  //       return <PricingScreen />;
  //     case "reports":
  //       return <ReportScreen />;
  //     default:
  //       return <HomeScreen navigate={setCurrentPage} />;
  //   }
  // };

  const showNavbar = currentPage !== "splash" && currentPage !== "login";

  return (
    <div
      className="max-w-md mx-auto h-screen w-full shadow-2xl flex flex-col"
      style={{
        backgroundColor: COLORS.background,
        fontFamily: "Inter, Poppins, sans-serif",
      }}
    >
      {/* <div className="flex-1 overflow-hidden">{renderScreen()}</div> */}

      {/* Bottom Navigation Bar */}
      {showNavbar && (
        <div
          className={`h-20 bg-white shadow-t-xl flex justify-around items-center px-4 border-t-2 border-[${COLORS.secondary}]`}
        >
          <IconButton
            icon={Home}
            labelEn={TEXT.en.home}
            labelBn={TEXT.bn.home}
            onClick={() => setCurrentPage("home")}
            isActive={currentPage === "home"}
          />
          <IconButton
            icon={ListChecks}
            labelEn={TEXT.en.reports}
            labelBn={TEXT.bn.reports}
            onClick={() => setCurrentPage("reports")}
            isActive={currentPage === "reports"}
          />
          {/* Main Action Icon - Safety/SOS */}
          <div className="transform -translate-y-4">
            <button
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300
                bg-[${COLORS.primary}] hover:bg-opacity-90 active:scale-[0.95]`}
              onClick={() => setCurrentPage("safety")}
              style={{
                boxShadow: `0 8px 20px -5px ${COLORS.primary}80`,
              }}
            >
              <ShieldAlert size={30} color="red" strokeWidth={2.5} />
            </button>
          </div>
          <IconButton
            icon={Tag}
            labelEn={TEXT.en.fairPrice}
            labelBn={TEXT.bn.fairPrice}
            onClick={() => setCurrentPage("pricing")}
            isActive={currentPage === "pricing"}
          />

          <IconButton
            icon={User}
            labelEn={TEXT.en.profile}
            labelBn={TEXT.bn.profile}
            onClick={() => setCurrentPage("profile")}
            isActive={currentPage === "profile"}
          />
        </div>
      )}
    </div>
  );
}
