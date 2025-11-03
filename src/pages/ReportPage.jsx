const ReportScreen = () => {
  const [reportType, setReportType] = useState('');
  const [details, setDetails] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    if (!reportType || details.length < 10) {
      // Replaced alert() with a console error or custom UI message
      console.error('Validation Error: Please select a report type and provide details (min 10 characters).');
      setShowToast(true); // Reusing toast for general feedback
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setShowToast(true);
    setReportType('');
    setDetails('');
    setTimeout(() => setShowToast(false), 3000);
  };

  const reportOptions = [
    { en: 'Traffic', bn: 'যানজট', icon: Car, color: COLORS.primary },
    { en: 'Safety', bn: 'নিরাপত্তা', icon: ShieldAlert, color: 'red' },
    { en: 'Price', bn: 'মূল্য', icon: Tag, color: COLORS.accent },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-[${COLORS.background}] p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-[${COLORS.text}]">
        {TEXT.en.reportTitle} / {TEXT.bn.reportTitle}
      </h1>

      <div className="flex-1 space-y-6">
        {/* Report Type Selection */}
        <label className="block text-lg font-semibold mb-2 text-[${COLORS.text}]">
          {TEXT.en.reportType}
        </label>
        <div className="flex justify-around space-x-3 mb-6">
          {reportOptions.map(option => (
            <button
              key={option.en}
              className={`flex flex-col items-center p-3 flex-1 border-2 transition-all ${RADIUS} shadow-sm`}
              style={{
                borderColor: reportType === option.en ? option.color : COLORS.secondary,
                backgroundColor: reportType === option.en ? `${option.color}15` : 'white'
              }}
              onClick={() => setReportType(option.en)}
            >
              <option.icon size={28} color={reportType === option.en ? option.color : COLORS.text} />
              <span className="text-sm font-semibold mt-1" style={{ color: reportType === option.en ? option.color : COLORS.text }}>
                {option.en}
              </span>
              <span className="text-xs" style={{ fontFamily: 'SolaimanLipi, Inter, sans-serif', color: reportType === option.en ? option.color : COLORS.text }}>
                {option.bn}
              </span>
            </button>
          ))}
        </div>

        {/* Details Text Area */}
        <label className="block text-lg font-semibold mb-2 text-[${COLORS.text}]">
          {TEXT.en.details}
        </label>
        <textarea
          placeholder={`${TEXT.en.details}...`}
          rows="5"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={`w-full p-4 border-2 border-[${COLORS.secondary}] ${RADIUS} focus:border-[${COLORS.primary}] focus:outline-none transition-colors`}
        />

        {/* Photo Upload */}
        <button
          className={`w-full py-3 bg-[${COLORS.secondary}] text-[${COLORS.text}] font-semibold ${RADIUS} transition-colors flex items-center justify-center space-x-2`}
        >
          <Upload size={20} />
          <span>{TEXT.en.uploadPhoto} / {TEXT.bn.uploadPhoto}</span>
        </button>
      </div>

      {/* Submit Button */}
      <PrimaryButton onClick={handleSubmit} className="mt-6 flex items-center justify-center space-x-2">
        <Send size={24} />
        <span>{TEXT.en.submit} / {TEXT.bn.submit}</span>
      </PrimaryButton>

      {/* Confirmation Toast */}
      {showToast && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 p-3 px-6 text-white font-semibold ${RADIUS} shadow-2xl transition-opacity duration-300 ${reportType ? 'bg-green-500' : 'bg-red-500'}`}>
          {reportType ? TEXT.en.reportSuccess : 'Submission Failed (জমা ব্যর্থ)!'}
        </div>
      )}
    </div>
  );
};