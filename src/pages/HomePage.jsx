import { COLORS, RADIUS } from "../utils/COLORS";
import { TEXT } from "../utils/TEXT";
import { AppCard } from "../components/custom/AppCard";

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
  ChevronUp,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={` w-full p-6 bg-[#FAFAFA] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1
              className={`text-xl font-bold text-[#333333]`}
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            >
              Hello, Chittagong!
            </h1>
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: "SolaimanLipi, Inter, sans-serif" }}
            >
              আজকের শহরের আপডেট
            </p>
          </div>
          <div
            className={`w-12 h-12 bg-[${COLORS.secondary}] ${RADIUS} flex items-center justify-center border-2 border-[#004E98]`}
          >
            <User size={24} color={COLORS.primary} onClick={ () => navigate("/profile")} />
          </div>
        </div>

        <div className="space-y-4">
          <AppCard
            titleEn={TEXT.en.traffic}
            titleBn={TEXT.bn.traffic}
            className="cursor-pointer"
            onClick={()  => navigate("/traffic")}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Car size={32} color={COLORS.primary} strokeWidth={2.5} />
                <div>
                  <p className="text-2xl font-extrabold text-green-600">LOW</p>
                  <p className="text-xs text-gray-500">Currently (এখন)</p>
                </div>
              </div>
              <ArrowRight size={24} color={COLORS.primary} />
            </div>
          </AppCard>

          <AppCard
            titleEn={TEXT.en.fairPrice}
            titleBn={TEXT.bn.fairPrice}
            className="cursor-pointer"
            // onClick={0} /fairprice
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Tag size={32} color={COLORS.accent} strokeWidth={2.5} />
                <div>
                  <p className={`text-2xl font-extrabold text-[#333333]`}>
                    CNG Fare
                  </p>
                  <p className="text-xs text-gray-500">Avg. ৳80.00</p>
                </div>
              </div>
              <ArrowRight size={24} color={COLORS.primary} />
            </div>
          </AppCard>

          <AppCard
            titleEn={TEXT.en.safety}
            titleBn={TEXT.bn.safety}
            className="cursor-pointer"
            // onClick={0} safety
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <ShieldAlert size={32} color="red" strokeWidth={2.5} />
                <div>
                  <p className="text-2xl font-extrabold text-red-600">1 Area</p>
                  <p className="text-xs text-gray-500">
                    Reported Unsafe (অনিরাপদ)
                  </p>
                </div>
              </div>
              <ArrowRight size={24} color={COLORS.primary} />
            </div>
          </AppCard>
        </div>

        <div className="mt-8">
          <h2 className={`text-lg font-semibold mb-3 text-[#333333]`}>
            Quick Actions (তাৎক্ষণিক পদক্ষেপ)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`p-4 bg-[#FF6B35] text-white ${RADIUS} text-center font-bold shadow-md active:scale-[0.98] transition-transform`}
              // onClick={0} /report
              style={{ boxShadow: `0 4px 10px -3px #FF6B3580` }}
            >
              <ListChecks size={24} className="mx-auto mb-1" />
              Report
            </div>
            <div
              className={`p-4 bg-red-600 text-white ${RADIUS} text-center font-bold shadow-md active:scale-[0.98] transition-transform`}
              onClick={() => alert("Simulating SOS/Panic Call...")} // Use alert() for this specific emergency simulation
              style={{ boxShadow: `0 4px 10px -3px rgba(220, 38, 38, 0.8)` }}
            >
              <AlertTriangle size={24} className="mx-auto mb-1" />
              SOS
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
