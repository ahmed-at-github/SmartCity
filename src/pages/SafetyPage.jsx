import { useState } from "react";
import { TEXT } from "../utils/TEXT";
import { COLORS, RADIUS } from "../utils/COLORS";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader,
  MapPinOff,
  Send,
} from "lucide-react";
import { PrimaryButton } from "../components/custom/PrimaryButton";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const SafetyPage = () => {
  const [isPanicking, setIsPanicking] = useState(false);
  const [safetyTip, setSafetyTip] = useState("");
  const [showTip, setShowTip] = useState(false);

  // For Report Modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Panic Button Logic
  const handlePanic = () => {
    setIsPanicking(true);
    setTimeout(() => {
      setIsPanicking(false);
    }, 3000);
  };

  // Static Safety Tips
  const generateSafetyTip = () => {
    setShowTip(!showTip);
    if (!showTip) {
      setSafetyTip(`• Be vigilant on crowded public transport (like tempo or bus) for pickpockets, and keep valuables secure (ভিড় গণপরিবহনে পকেটমারদের থেকে সতর্ক থাকুন)।

• Avoid walking alone on poorly lit side streets after dark, and use well-populated main roads (সন্ধ্যার পর নির্জন রাস্তা এড়িয়ে চলুন)।

• During heavy rain, avoid walking through flooded streets as open manholes or submerged ditches pose a hidden danger (ভারী বৃষ্টির সময় জলমগ্ন রাস্তা এড়িয়ে চলুন)।`);
    }
  };

  // Report Submit Logic
  const handleReportSubmit = async () => {
    if (!locationName || !description)
      return alert("Please fill in all fields.");

    setIsSubmitting(true);
    // You can later send this to your backend API here
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setShowReportModal(false);
        setSubmitted(false);
        setLocationName("");
        setDescription("");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {TEXT.en.safetyTitle} / {TEXT.bn.safetyTitle}
      </h1>

      {/* Map Interface Placeholder */}
      {/* <div
        className={`flex-1 bg-white ${RADIUS} shadow-xl overflow-hidden mb-6 border-2 border-gray-100`}
      >
        <div className="h-full flex flex-col items-center justify-center bg-gray-200 p-4">
          <span className="text-gray-500 mb-2">City Map Placeholder</span>
          <div className="flex space-x-4 text-xs font-semibold">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>{" "}
              {TEXT.en.safeZone}
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>{" "}
              {TEXT.en.unsafeZone}
            </div>
          </div>
        </div>
      </div> */}
{/* 
      <div className={`flex-1 bg-white ${RADIUS} shadow-xl overflow-hidden mb-6 border-2 border-gray-100`}>
  <div className="relative h-64 bg-gray-100 flex items-center justify-center">
    <div className="absolute w-32 h-32 bg-green-400 opacity-30 rounded-full animate-ping"></div>
    <div className="absolute w-24 h-24 bg-yellow-400 opacity-30 rounded-full animate-pulse delay-150"></div>
    <div className="absolute w-16 h-16 bg-red-400 opacity-40 rounded-full animate-pulse delay-300"></div>
    <div className="relative z-10 text-center">
      <h2 className="text-lg font-bold text-gray-700">Chittagong Safety Radar</h2>
      <p className="text-gray-500 text-sm">Scanning nearby zones...</p>
    </div>
  </div>
</div> */}

<div className={`flex-1 ${RADIUS} overflow-hidden mb-6 border-2 border-gray-100 shadow-xl`}>
  <MapContainer
    center={[22.3569, 91.7832]} // Chittagong coordinates
    zoom={12}
    scrollWheelZoom={false}
    className="h-80 w-full rounded-2xl"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[22.3569, 91.7832]}>
      <Popup>Chittagong City Center</Popup>
    </Marker>
  </MapContainer>
</div>


      {/* Smart Safety Advisory */}
      <button
        onClick={generateSafetyTip}
        className={`w-full py-3 mb-4 text-white font-semibold ${RADIUS} transition-all duration-300 flex items-center justify-center space-x-2`}
        style={{ backgroundColor: COLORS.primary }}
      >
        <Sparkles size={20} />
        <span>Smart Safety Advisory / স্মার্ট নিরাপত্তা পরামর্শ</span>
        {showTip ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Tips Card */}
      {showTip && (
        <div
          className={`bg-white p-4 mb-4 shadow-md ${RADIUS} border-l-4 border-gray-400`}
        >
          <h3 className="font-bold text-md mb-2 text-gray-800">
            Current Advisory (বর্তমান পরামর্শ):
          </h3>
          <div
            className="whitespace-pre-wrap text-sm"
            style={{ fontFamily: "SolaimanLipi, Inter, sans-serif" }}
          >
            {safetyTip}
          </div>
        </div>
      )}

      {/* Panic Button */}
      <PrimaryButton
        onClick={handlePanic}
        className={`!py-6 mb-4 ${
          isPanicking ? "bg-red-700 animate-pulse" : "bg-red-600"
        }`}
        style={{
          boxShadow: `0 8px 15px -5px rgba(220, 38, 38, 0.8)`,
        }}
      >
        {isPanicking
          ? "ACTIVATED (সক্রিয়)"
          : `${TEXT.en.panicBtn} / ${TEXT.bn.panicBtn}`}
      </PrimaryButton>

      {/* Report Unsafe Button */}
      <button
        onClick={() => setShowReportModal(true)}
        className={`w-full py-3 bg-orange-500 text-white font-semibold ${RADIUS} transition-all duration-300 hover:bg-orange-600 flex items-center justify-center space-x-2`}
        style={{ boxShadow: `0 4px 10px -3px ${COLORS.accent}80` }}
      >
        <MapPinOff size={20} />
        <span>Report Unsafe Area / অনিরাপদ এলাকা রিপোর্ট করুন</span>
      </button>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-accent bg-opacity-1000 flex items-center justify-center z-50">
          <div className="bg-white mt-35 rounded-2xl shadow-2xl p-6 w-96 animate-fadeIn">
            <h2 className="text-lg font-bold mb-3 text-gray-800 flex items-center space-x-2">
              <MapPinOff size={20} className="text-orange-500" />
              <span>Report Unsafe Area</span>
            </h2>

            {!submitted ? (
              <>
                <input
                  type="text"
                  placeholder="Location name or landmark"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="input input-bordered bg-gray-300 w-full mb-3"
                />
                <textarea
                  placeholder="Briefly describe the issue (e.g., poor lighting, harassment, flooding)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea textarea-bordered bg-gray-300 w-full mb-4"
                  rows="3"
                ></textarea>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center space-x-2 hover:bg-blue-800"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <Send size={18} />
                    )}
                    <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-green-600 font-bold text-lg">
                  ✅ Report Submitted!
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Thank you for keeping the city safe.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


// import { useState } from "react";
// import { TEXT } from "../utils/TEXT";
// import { COLORS, RADIUS } from "../utils/COLORS";
// import { Sparkles, ChevronDown, ChevronUp, Loader, MapPinOff } from "lucide-react";
// import { PrimaryButton } from "../components/custom/PrimaryButton";
// // import { callGeminiApi, MODEL, API_URL_BASE, apiKey } from "../utils/geminiApi";

// export const SafetyPage = () => {
//   const [isPanicking, setIsPanicking] = useState(false);
//   const [safetyTip, setSafetyTip] = useState('');
//   const [isGeneratingTip, setIsGeneratingTip] = useState(false);
//   const [showTip, setShowTip] = useState(false);

//   const handlePanic = () => {
//     // NOTE: This uses alert() as specified in the previous requirement for this high-priority action.
//     //alert('SOS ACTIVATED: Location and identity shared with emergency contacts and local authorities.');
//     setIsPanicking(true);
//     setTimeout(() => {
//       setIsPanicking(false);
//     }, 3000);
//   };

//   const generateSafetyTip = () => {
//   setShowTip(!showTip);
//   if (!showTip) {
//     setSafetyTip(`• Be vigilant on crowded public transport (like tempo or bus) for pickpockets, and keep valuables secure (ভিড় গণপরিবহনে পকেটমারদের থেকে সতর্ক থাকুন)।

// • Avoid walking alone on poorly lit side streets after dark, and use well-populated main roads (সন্ধ্যার পর নির্জন রাস্তা এড়িয়ে চলুন)।

// • During heavy rain, avoid walking through flooded streets as open manholes or submerged ditches pose a hidden danger (ভারী বৃষ্টির সময় জলমগ্ন রাস্তা এড়িয়ে চলুন)।`);
//   }
// };

 


//   return (
//     <div className="h-full w-full flex flex-col bg-[${COLORS.background}] p-6">
//       <h1 className="text-2xl font-bold mb-4 text-[${COLORS.text}]">
//         {TEXT.en.safetyTitle} / {TEXT.bn.safetyTitle}
//       </h1>

//       {/* Map Interface with Zones */}
//       <div className={`flex-1 bg-white ${RADIUS} shadow-xl overflow-hidden mb-6 border-2 border-gray-100`}>
//         <div className="h-full flex flex-col items-center justify-center bg-gray-200 p-4">
//           <span className="text-gray-500 mb-2">City Map Placeholder</span>
//           <div className="flex space-x-4 text-xs font-semibold">
//             <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div> {TEXT.en.safeZone}</div>
//             <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div> {TEXT.en.unsafeZone}</div>
//           </div>
//         </div>
//       </div>

//       {/* LLM Feature: Smart Safety Advisory */}
//       <button
//         onClick={generateSafetyTip}
//         className={`w-full py-3 mb-4 text-white font-semibold ${RADIUS} transition-all duration-300 flex items-center justify-center space-x-2`}
//         style={{ backgroundColor: COLORS.primary }}
//       >
//         {isGeneratingTip ? (
//           <Loader className="animate-spin" size={20} />
//         ) : (
//           <>
//             <Sparkles size={20} />
//             <span>Smart Safety Advisory / স্মার্ট নিরাপত্তা পরামর্শ</span>
//             {showTip ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//           </>
//         )}
//       </button>

//       {/* LLM Output Card */}
//       {showTip && (
//         <div className={`bg-white p-4 mb-4 shadow-md ${RADIUS} border-l-4 border-gray-400`}>
//           <h3 className="font-bold text-md mb-2 text-[${COLORS.text}]">Current Advisory (বর্তমান পরামর্শ):</h3>
//           {isGeneratingTip ? (
//             <p className="text-gray-500">Fetching real-time tips...</p>
//           ) : (
//             <div className="whitespace-pre-wrap text-sm" style={{ fontFamily: 'SolaimanLipi, Inter, sans-serif' }}>
//               {safetyTip}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Panic Button */}
//       <PrimaryButton
//         onClick={handlePanic}
//         className={`!py-6 mb-4 ${isPanicking ? 'bg-red-700 animate-pulse' : 'bg-red-600'}`}
//         style={{ boxShadow: `0 8px 15px -5px rgba(220, 38, 38, 0.8)` }}
//       >
//         {isPanicking ? 'ACTIVATED (সক্রিয়)' : `${TEXT.en.panicBtn} / ${TEXT.bn.panicBtn}`}
//       </PrimaryButton>

//       {/* Report Unsafe Button */}
//       <button
//         className={`w-full py-3 bg-orange-500 text-white font-semibold ${RADIUS} transition-all duration-300 hover:bg-opacity-90 flex items-center justify-center space-x-2`}
//         style={{ boxShadow: `0 4px 10px -3px ${COLORS.accent}80` }}
//       >
//         <MapPinOff size={20} />
//         <span>{TEXT.en.reportUnsafe} / {TEXT.bn.reportUnsafe}</span>
//       </button>
//     </div>
//   );
// };