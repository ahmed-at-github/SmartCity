import { useState, useCallback, useMemo } from "react";
import { COLORS, RADIUS } from "../utils/COLORS";
import { TEXT } from "../utils/TEXT";
import { PillButton } from "../components/custom/PillButton";
import { PrimaryButton } from "../components/custom/PrimaryButton";

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
  Locate, // Added for current location
  Minimize2,
  ArrowDownUp,
  CircleX,
  Undo2Icon,
  Undo2,
  SquareArrowLeft, // Added for clearing input
} from "lucide-react";
import MapView from "../components/MapView";
import { Outlet, useNavigate } from "react-router";

// Mock data structure for a route
const MOCK_ROUTES = [
  {
    id: "route1",
    name: TEXT.en.route1,
    time: "20 min",
    delay: "5 min",
    status: "green",
    incident: "! incident reported near Kazir Dewri",
  },
  {
    id: "route2",
    name: TEXT.en.route2,
    time: "30 min",
    delay: "10 min",
    status: "red",
    incident: "1 Accident reported near EPZ",
  },
  {
    id: "route3",
    name: TEXT.en.route3,
    time: "55 min",
    delay: "15 min",
    status: "yellow",
    incident: "N/A",
  },
];

export const TrafficPage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  // const [trafficStatus, setTrafficStatus] = useState("yellow"); // green, yellow, red
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState("route1");
  const [isLocationFetching, setIsLocationFetching] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // New state for showing extra details

  const navigate = useNavigate();

  // Memoize the selected route data
  const selectedRoute = useMemo(() => {
    return MOCK_ROUTES.find((r) => r.id === selectedRouteId) || MOCK_ROUTES[0];
  }, [selectedRouteId]);

  // Handler to clear a specific input
  const clearInput = useCallback(
    (setter) => () => {
      setter("");
    },
    []
  );

  // Handler to swap source and destination
  const swapLocations = useCallback(() => {
    setSource(destination);
    setDestination(source);
  }, [source, destination]);

  const handleSearch = () => {
    if (!source || !destination) return;
    setIsLoading(true);
    // Simulate API call and traffic calculation
    setTimeout(() => {
      setIsLoading(false);
      // Simulate setting the status based on the selected route
      // setTrafficStatus(selectedRoute.status);
    }, 1500);
  };

  const fetchUserLocation = () => {
    setIsLocationFetching(true);
    // Simulate fetching user's current location
    setTimeout(() => {
      setIsLocationFetching(false);
      // Assume a location is found
      setSource("Your Current Location");
    }, 1000);
  };

  const getStatusColor = (status) => {
    if (status === "green") return "bg-green-500";
    if (status === "yellow") return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusText = (status) => {
    if (status === "green") return "Clear";
    if (status === "yellow") return "Moderate";
    return "Heavy";
  };

  return (
    <div>
      <div className="h-full w-full flex flex-col bg-[${COLORS.background}] p-6">
        <div className="flex gap-4">
          <SquareArrowLeft className="cursor-pointer" size={50} onClick={() => navigate("/home")}  />
          <h1 className="text-xl font-bold mb-4 text-[${COLORS.text}]">
            {TEXT.en.trafficTitle} / {TEXT.bn.trafficTitle}
          </h1>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mb-4">
          {/* Source Input */}
          <div
            className={`flex items-center p-3 bg-white ${RADIUS} shadow-sm border border-[${COLORS.secondary}]`}
          >
            {isLocationFetching ? (
              <Loader size={20} className="text-blue-500 mr-2 animate-spin" />
            ) : (
              <Locate
                size={20}
                className="text-blue-500 mr-2 cursor-pointer hover:text-blue-700 transition"
                onClick={fetchUserLocation}
                title="Use current location"
              />
            )}
            <input
              placeholder={`${TEXT.en.source} / ${TEXT.bn.source}`}
              className="flex-1 focus:outline-none text-[${COLORS.text}]"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            {source && (
              <CircleX
                size={16}
                className="text-gray-400 ml-2 cursor-pointer hover:text-red-500"
                onClick={clearInput(setSource)}
              />
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2">
            <button
              onClick={swapLocations}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-[${COLORS.accent}] transition"
              title="Swap Source and Destination"
            >
              {/* <ChevronDown size={18} />
            <ChevronUp size={18} className="-mt-3" /> */}
              <ArrowDownUp size={18} />
            </button>
          </div>

          {/* Destination Input */}
          <div
            className={`flex items-center p-3 bg-white ${RADIUS} shadow-sm border border-[${COLORS.secondary}]`}
          >
            <MapPin size={20} className={`text-[${COLORS.accent}] mr-2`} />
            <input
              placeholder={`${TEXT.en.destination} / ${TEXT.bn.destination}`}
              className="flex-1 focus:outline-none text-[${COLORS.text}]"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {destination && (
              <CircleX
                size={16}
                className="text-gray-400 ml-2 cursor-pointer hover:text-red-500"
                onClick={clearInput(setDestination)}
              />
            )}
          </div>
        </div>

        <PrimaryButton
          onClick={handleSearch}
          className="mb-4"
          disabled={isLoading || !source || !destination}
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            <>Search Route / রুট খুঁজুন</>
          )}
        </PrimaryButton>

        {/* Real-time Map and Status */}
        <div
          className={`flex-1 bg-white ${RADIUS} shadow-xl overflow-hidden mb-4 border-2 border-gray-100`}
        >
          <div className="h-2/3 flex items-center justify-center bg-gray-200">
            <MapView />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-lg text-[${COLORS.text}]">
                Route Status (রুটের অবস্থা)
              </p>
              <div
                className={`px-3 py-1 text-sm font-bold text-white ${getStatusColor(
                  selectedRoute.status
                )} ${RADIUS}`}
              >
                {getStatusText(selectedRoute.status)}
              </div>
            </div>
            <p className="text-gray-600 mb-2">
              Estimated Time:{" "}
              <span className="font-bold">{selectedRoute.time}</span> (Normal:{" "}
              <span className="font-bold">
                {parseInt(selectedRoute.time) - parseInt(selectedRoute.delay)}{" "}
                min
              </span>
              )
            </p>

            {/* Collapsible Details */}
            <div className="border-t pt-2 mt-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex justify-between items-center text-sm text-[${COLORS.accent}] font-medium"
              >
                {showDetails ? "Hide Details" : "Show Details"}
                {showDetails ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {showDetails && (
                <div className="mt-2 text-sm text-gray-500 space-y-1">
                  <p>Traffic Delay: {selectedRoute.delay}</p>
                  <p>Incidents: {selectedRoute.incident}.</p>
                  <p>
                    Tolls: <span className="font-bold"> BDT 50</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alternative Routes */}
        <div className="mt-auto">
          <p className="text-sm font-semibold mb-2">
            {TEXT.en.routeOptions} / {TEXT.bn.routeOptions}
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
            {MOCK_ROUTES.map((route) => (
              <PillButton
                key={route.id}
                isActive={route.id === selectedRouteId}
                onClick={() => setSelectedRouteId(route.id)}
              >
                {route.name} ({route.time})
              </PillButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
