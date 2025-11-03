import { useState } from "react";

const PricingScreen = () => {
  const [product, setProduct] = useState('CNG Auto Fare');
  const [priceData, setPriceData] = useState({
    avg: 80,
    lowest: 50,
    highest: 120,
    visual: 0.6, // 0.0 to 1.0 for dial fill
  });
  const [advisoryText, setAdvisoryText] = useState('');
  const [isGeneratingAdvisory, setIsGeneratingAdvisory] = useState(false);
  const [showAdvisory, setShowAdvisory] = useState(false);

  const handleSearch = (newProduct) => {
    setProduct(newProduct);
    // Simulate fetching new price data
    let newData;
    if (newProduct === 'CNG Auto Fare') {
      newData = { avg: 80, lowest: 50, highest: 120, visual: 0.6 };
    } else if (newProduct === 'Rice (Basmati)') {
      newData = { avg: 110, lowest: 95, highest: 140, visual: 0.4 };
    } else {
      newData = { avg: 60, lowest: 50, highest: 75, visual: 0.8 };
    }
    setPriceData(newData);
    // Clear previous advisory when product changes
    setAdvisoryText('');
    setShowAdvisory(false);
  };

  const generateAdvisory = async () => {
    setShowAdvisory(true);
    if (advisoryText && !isGeneratingAdvisory) {
        setShowAdvisory(!showAdvisory);
        return;
    }

    setIsGeneratingAdvisory(true);
    setAdvisoryText('');

    const systemPrompt = "You are a friendly, pragmatic consumer rights advocate in Chittagong, Bangladesh. Provide practical, polite advice in Bengali and English to a citizen about negotiating the best price for a service or product, based on provided market data. Start with a short Bengali summary, followed by a formal, polite negotiation script suitable for use in local markets or with CNG drivers. Ensure the response is well-formatted and easy to read.";

    const userQuery = `Product: ${product}. Market Data: Average Price: ৳${priceData.avg}, Lowest Price: ৳${priceData.lowest}, Highest Price: ৳${priceData.highest}. Generate a consumer advisory and a sample negotiation script.`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
        const url = `${API_URL_BASE}${MODEL}:generateContent?key=${apiKey}`;
        const response = await callGeminiApi(url, payload);
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate advisory.";
        setAdvisoryText(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        setAdvisoryText("Failed to load advisory. Please try again.");
    } finally {
        setIsGeneratingAdvisory(false);
    }
  };


  const DialGraph = ({ percent }) => {
    // A simple visual dial using CSS and arbitrary values
    const progress = Math.min(100, Math.max(0, percent * 100));
    return (
      <div className="relative w-24 h-24 mx-auto my-4">
        <div className="w-full h-full rounded-full bg-gray-200 absolute"></div>
        <div
          className="w-full h-full rounded-full absolute"
          style={{
            background: `conic-gradient(${COLORS.primary} 0% ${progress}%, ${COLORS.secondary} ${progress}% 100%)`,
            transform: 'rotate(135deg)',
            clipPath: 'circle(48% at 50% 50%)',
          }}
        ></div>
        <div className={`absolute inset-3 rounded-full bg-[${COLORS.background}] flex items-center justify-center`}>
          <span className={`text-xl font-bold text-[${COLORS.primary}]`} style={{ transform: 'rotate(-135deg)' }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col bg-[${COLORS.background}] p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-[${COLORS.text}]">
        {TEXT.en.pricingTitle} / {TEXT.bn.pricingTitle}
      </h1>

      {/* Search Bar */}
      <div className={`flex items-center p-3 bg-white ${RADIUS} shadow-md mb-6 border-2 border-gray-100`}>
        <Search size={20} className={`text-[${COLORS.primary}] mr-2`} />
        <input
          placeholder={`${TEXT.en.searchProduct} / ${TEXT.bn.searchProduct}`}
          className="flex-1 focus:outline-none text-[${COLORS.text}]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(e.target.value || 'CNG Auto Fare');
          }}
          defaultValue={product}
        />
      </div>

      {/* Results Card */}
      <div className={`bg-white p-6 ${RADIUS} shadow-xl mb-6`}>
        <h2 className={`text-xl font-extrabold text-center mb-2 text-[${COLORS.text}]`}>{product}</h2>

        <div className="grid grid-cols-3 gap-2 text-center border-b pb-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">{TEXT.en.lowest}</p>
            <p className={`text-xl font-bold text-green-600`}>৳{priceData.lowest}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">{TEXT.en.highest}</p>
            <p className={`text-xl font-bold text-red-600`}>৳{priceData.highest}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">{TEXT.en.avgPrice}</p>
            <p className={`text-2xl font-extrabold text-[${COLORS.primary}]`}>৳{priceData.avg}</p>
          </div>
        </div>

        {/* Visual Clarity - Dial */}
        <div className="flex flex-col items-center">
          <DialGraph percent={priceData.visual} />
          <p className="text-sm text-gray-600 mt-2">Price Consistency Index: {Math.round(priceData.visual * 100)}%</p>
        </div>
      </div>

      {/* LLM Feature: Negotiation Advisory */}
      <button
        onClick={generateAdvisory}
        className={`w-full py-3 mb-6 text-white font-semibold ${RADIUS} transition-all duration-300 flex items-center justify-center space-x-2`}
        style={{ backgroundColor: COLORS.accent, boxShadow: `0 4px 10px -3px ${COLORS.accent}80` }}
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

      {/* LLM Output Card */}
      {showAdvisory && (
        <div className={`bg-white p-4 mb-4 shadow-md ${RADIUS} border-l-4 border-gray-400`}>
          <h3 className="font-bold text-md mb-2 text-[${COLORS.text}]">Advisory for {product}:</h3>
          {isGeneratingAdvisory ? (
            <p className="text-gray-500">Generating script and advice...</p>
          ) : (
            <div className="whitespace-pre-wrap text-sm" style={{ fontFamily: 'SolaimanLipi, Inter, sans-serif' }}>
              {advisoryText}
            </div>
          )}
        </div>
      )}


      {/* Quick Search Tags */}
      <p className="text-sm font-semibold mb-2 mt-auto">Popular Searches (জনপ্রিয় অনুসন্ধান)</p>
      <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
        <PillButton onClick={() => handleSearch('CNG Auto Fare')} isActive={product === 'CNG Auto Fare'}>CNG Auto Fare</PillButton>
        <PillButton onClick={() => handleSearch('Rice (Basmati)')} isActive={product === 'Rice (Basmati)'}>Rice (Basmati)</PillButton>
        <PillButton onClick={() => handleSearch('Potato (Aloo)')} isActive={product === 'Potato (Aloo)'}>Potato (Aloo)</PillButton>
      </div>
    </div>
  );
};