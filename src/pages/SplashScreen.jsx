import { useEffect } from "react";
import { COLORS } from "../utils/COLORS";
import { TEXT } from "../utils/TEXT";

// export const SplashScreen = ({ onFinish }) => {
//     useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish('login');
//     }, 2000); // Wait 2 seconds then go to login
//     return () => clearTimeout(timer);
//   }, [onFinish]);

export const SplashScreen = () => {
    useEffect(() => {
    const timer = setTimeout(() => {
    
    }, 2000); // Wait 2 seconds then go to login
    return () => clearTimeout(timer);
  }, );

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full p-8 transition-opacity duration-1000"
      style={{
        backgroundColor: COLORS.primary,
        fontFamily: "Poppins, Inter, sans-serif",
      }}
    >
      <div className="text-white text-5xl font-extrabold mb-2 tracking-wide animate-pulse">
        {TEXT.en.appName}
      </div>
      <div
        className="text-white text-2xl font-light"
        style={{ fontFamily: "SolaimanLipi, Inter, sans-serif" }}
      >
        {TEXT.bn.appName}
      </div>
      {/* Minimalist City Silhouette Placeholder (using SVG or simple box) */}
      <div className="absolute bottom-0 w-full h-1/4">
        <div
          className="h-full bg-cover opacity-30"
          style={{
            backgroundImage: `url(https://placehold.co/800x200/${COLORS.accent.substring(1
            )}/FFFFFF?text=Chittagong+Skyline)`,
            backgroundPosition: "bottom",
            filter: "grayscale(100%)",
          }}
        ></div>
      </div>
    </div>
  );
};
