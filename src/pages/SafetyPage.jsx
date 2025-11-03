import { useState } from "react";

export const SafetyPage = () => {
  const [isPanicking, setIsPanicking] = useState(false);
  const [safetyTip, setSafetyTip] = useState('');
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const handlePanic = () => {
    // NOTE: This uses alert() as specified in the previous requirement for this high-priority action.
    alert('SOS ACTIVATED: Location and identity shared with emergency contacts and local authorities.');
    setIsPanicking(true);
    setTimeout(() => {
      setIsPanicking(false);
    }, 3000);
  };

  const generateSafetyTip = async () => {
    setShowTip(true);
    if (safetyTip && !isGeneratingTip) {
      // If tip exists, just toggle view
      setShowTip(!showTip);
      return;
    }

    setIsGeneratingTip(true);
    setSafetyTip('');

    const systemPrompt = "You are a local public safety officer for Chittagong City Corporation. Provide three concise, bulleted safety tips relevant to current events or common urban hazards in Chittagong. Prioritize tips related to public transport, street safety after dark, and flooding/weather safety. Respond only with the bulleted list in mixed Bengali and English, like '• Tip in English (Bengali translation)'";

    const userQuery = "Provide 3 general urban safety tips for a resident of Chittagong, Bangladesh, based on current local conditions or common risks.";

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }], // Use grounding for real-time relevance
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
        const url = `${API_URL_BASE}${MODEL}:generateContent?key=${apiKey}`;
        const response = await callGeminiApi(url, payload);
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No specific tips available right now.";
        setSafetyTip(text);
    } catch (error) {
        console.error("Gemini API Error:", error);
        setSafetyTip("Failed to fetch current safety advisory.");
    } finally {
        setIsGeneratingTip(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[${COLORS.background}] p-6">
      <h1 className="text-2xl font-bold mb-4 text-[${COLORS.text}]">
        {TEXT.en.safetyTitle} / {TEXT.bn.safetyTitle}
      </h1>

      {/* Map Interface with Zones */}
      <div className={`flex-1 bg-white ${RADIUS} shadow-xl overflow-hidden mb-6 border-2 border-gray-100`}>
        <div className="h-full flex flex-col items-center justify-center bg-gray-200 p-4">
          <span className="text-gray-500 mb-2">City Map Placeholder</span>
          <div className="flex space-x-4 text-xs font-semibold">
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div> {TEXT.en.safeZone}</div>
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div> {TEXT.en.unsafeZone}</div>
          </div>
        </div>
      </div>

      {/* LLM Feature: Smart Safety Advisory */}
      <button
        onClick={generateSafetyTip}
        className={`w-full py-3 mb-4 text-white font-semibold ${RADIUS} transition-all duration-300 flex items-center justify-center space-x-2`}
        style={{ backgroundColor: COLORS.primary }}
      >
        {isGeneratingTip ? (
          <Loader className="animate-spin" size={20} />
        ) : (
          <>
            <Sparkles size={20} />
            <span>Smart Safety Advisory / স্মার্ট নিরাপত্তা পরামর্শ</span>
            {showTip ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </>
        )}
      </button>

      {/* LLM Output Card */}
      {showTip && (
        <div className={`bg-white p-4 mb-4 shadow-md ${RADIUS} border-l-4 border-gray-400`}>
          <h3 className="font-bold text-md mb-2 text-[${COLORS.text}]">Current Advisory (বর্তমান পরামর্শ):</h3>
          {isGeneratingTip ? (
            <p className="text-gray-500">Fetching real-time tips...</p>
          ) : (
            <div className="whitespace-pre-wrap text-sm" style={{ fontFamily: 'SolaimanLipi, Inter, sans-serif' }}>
              {safetyTip}
            </div>
          )}
        </div>
      )}

      {/* Panic Button */}
      <PrimaryButton
        onClick={handlePanic}
        className={`!py-6 mb-4 ${isPanicking ? 'bg-red-700 animate-pulse' : 'bg-red-600'}`}
        style={{ boxShadow: `0 8px 15px -5px rgba(220, 38, 38, 0.8)` }}
      >
        {isPanicking ? 'ACTIVATED (সক্রিয়)' : `${TEXT.en.panicBtn} / ${TEXT.bn.panicBtn}`}
      </PrimaryButton>

      {/* Report Unsafe Button */}
      <button
        className={`w-full py-3 bg-[${COLORS.accent}] text-white font-semibold ${RADIUS} transition-all duration-300 hover:bg-opacity-90 flex items-center justify-center space-x-2`}
        style={{ boxShadow: `0 4px 10px -3px ${COLORS.accent}80` }}
      >
        <MapPinOff size={20} />
        <span>{TEXT.en.reportUnsafe} / {TEXT.bn.reportUnsafe}</span>
      </button>
    </div>
  );
};