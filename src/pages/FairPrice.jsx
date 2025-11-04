import { useState } from "react";
import { TEXT } from "../utils/TEXT";
import { COLORS, RADIUS } from "../utils/COLORS";
import { Search, Loader, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { PillButton } from "../components/custom/PillButton";

export const FairPrice = () => {
  const [product, setProduct] = useState("CNG Fare");
  const [priceData, setPriceData] = useState({
    avg: 80,
    lowest: 50,
    highest: 120,
    visual: 0.6,
  });
  const [advisoryText, setAdvisoryText] = useState("");
  const [isGeneratingAdvisory, setIsGeneratingAdvisory] = useState(false);
  const [showAdvisory, setShowAdvisory] = useState(false);

  // Handle product search
  const handleSearch = (newProduct) => {
    setProduct(newProduct);

    let newData;
    if (newProduct === "CNG Fare") {
      newData = { avg: 80, lowest: 50, highest: 120, visual: 0.6 };
    } else if (newProduct === "Local Bus Fare") {
      newData = { avg: 15, lowest: 10, highest: 20, visual: 0.7 };
    } else {
      newData = { avg: 200, lowest: 150, highest: 350, visual: 0.8 };
    }
    setPriceData(newData);
    setAdvisoryText("");
    setShowAdvisory(false);
  };

  // Simple dial graph
  const DialGraph = ({ percent }) => {
    const progress = Math.min(100, Math.max(0, percent * 100));
    return (
      <div className="relative w-24 h-24 mx-auto my-4">
        <div className="w-full h-full rounded-full bg-gray-200 absolute"></div>
        <div
          className="w-full h-full rounded-full absolute"
          style={{
            background: `conic-gradient(${COLORS.primary} 0% ${progress}%, ${COLORS.secondary} ${progress}% 100%)`,
            transform: "rotate(135deg)",
            clipPath: "circle(48% at 50% 50%)",
          }}
        ></div>
        <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
          <span className="text-xl font-bold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 p-6 overflow-y-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {TEXT.en.pricingTitle} / {TEXT.bn.pricingTitle}
      </h1>

      {/* Search Bar */}
      <div
        className={`flex items-center p-3 bg-white ${RADIUS} shadow-md mb-6 border-2 border-gray-100`}
      >
        <Search size={20} className="text-blue-500 mr-2" />
        <input
          placeholder={`${TEXT.en.searchProduct} / ${TEXT.bn.searchProduct}`}
          className="flex-1 focus:outline-none text-gray-700"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSearch(e.target.value || "CNG Auto Fare");
          }}
          defaultValue={product}
        />
      </div>

      {/* Results Card */}
      <div className={`bg-white p-6 ${RADIUS} shadow-xl mb-6`}>
        <h2 className="text-xl font-extrabold text-center mb-2 text-gray-800">
          {product}
        </h2>

        <div className="grid grid-cols-3 gap-2 text-center border-b pb-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Lowest</p>
            <p className="text-xl font-bold text-green-600">
              ৳{priceData.lowest}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Highest</p>
            <p className="text-xl font-bold text-red-600">
              ৳{priceData.highest}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Average</p>
            <p className="text-2xl font-extrabold text-blue-600">
              ৳{priceData.avg}
            </p>
          </div>
        </div>

        {/* Visual Dial */}
        <div className="flex flex-col items-center">
          <DialGraph percent={priceData.visual} />
          <p className="text-sm text-gray-600 mt-2">
            Price Consistency Index: {Math.round(priceData.visual * 100)}%
          </p>
        </div>
      </div>

      {/* Negotiation Advisory Button */}
      <button
        onClick={() => setShowAdvisory(!showAdvisory)}
        className="w-full py-3 mb-4 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02]"
        style={{
          backgroundColor: "#5C7AEA",
          boxShadow: "0 4px 12px -2px rgba(92,122,234,0.6)",
        }}
      >
        {isGeneratingAdvisory ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          <>
            <Sparkles size={20} />
            <span>Negotiation Advisory / দর কষাকষির পরামর্শ</span>
            {showAdvisory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </>
        )}
      </button>

      {/* Advisory Info Section */}
      {showAdvisory && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-base-200 shadow-md border-l-4 border-accent">
            <h3 className="font-bold text-blue-600 mb-1">
              💬 দর কষাকষি শুরুর আগে:
            </h3>
            <p className="text-sm text-gray-700">
              এলাকাটি নিরাপদ কিনা নিশ্চিত হও। প্রয়োজনে বন্ধুকে সঙ্গে নাও এবং সময়
              নির্ধারণ করে বের হও।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-base-200 shadow-md border-l-4 border-primary">
            <h3 className="font-bold text-primary mb-1">💡 দর কষাকষির টিপস:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>শান্তভাবে কথা বলো, রাগ বা চাপ দেখিও না।</li>
              <li>প্রথমে বিক্রেতার প্রস্তাব শুনে পরে তোমার দাম বলো।</li>
              <li>তুলনামূলক দাম জেনে নাও অন্য দোকান বা অনলাইন থেকে।</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-base-200 shadow-md border-l-4 border-secondary">
            <h3 className="font-bold text-secondary mb-1">⚠️ সতর্কতা:</h3>
            <p className="text-sm text-gray-700">
              কোনো অনিরাপদ এলাকা বা অজানা ব্যক্তির সাথে লেনদেন করলে আগে লোকেশন
              যাচাই করো। প্রয়োজনে পুলিশের হেল্পলাইন ব্যবহার করো।
            </p>
          </div>
        </div>
      )}

      {/* LLM Output Card */}
      {showAdvisory && advisoryText && (
        <div
          className={`bg-white p-4 mb-4 shadow-md ${RADIUS} border-l-4 border-gray-400`}
        >
          <h3 className="font-bold text-md mb-2 text-gray-800">
            Advisory for {product}:
          </h3>
          {isGeneratingAdvisory ? (
            <p className="text-gray-500">Generating script and advice...</p>
          ) : (
            <div
              className="whitespace-pre-wrap text-sm"
              style={{ fontFamily: "SolaimanLipi, Inter, sans-serif" }}
            >
              {advisoryText}
            </div>
          )}
        </div>
      )}

      {/* Quick Search */}
      <p className="text-sm font-semibold mb-2 mt-6 ">
        Popular Transport (জনপ্রিয় পরিবহন)
      </p>
      <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
        <PillButton
          onClick={() => handleSearch("CNG Fare")}
          isActive={product === "CNG Fare"}
        >
          CNG Fare
        </PillButton>
        <PillButton
          onClick={() => handleSearch("Local Bus Fare")}
          isActive={product === "Local Bus Fare"}
        >
          Local Bus Fare
        </PillButton>
        <PillButton
          onClick={() => handleSearch("Private Car")}
          isActive={product === "Private Car"}
        >
         Private Car
        </PillButton>
      </div>
    </div>
  );
};
