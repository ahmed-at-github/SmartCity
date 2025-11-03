import { COLORS, RADIUS } from "../../utils/COLORS";

export const PrimaryButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full py-4 text-white font-bold text-lg ${RADIUS} transition-all duration-300 shadow-lg
      bg-[${COLORS.primary}] hover:bg-opacity-90 active:scale-[0.98] ${className}`}
    style={{ boxShadow: `0 8px 15px -5px ${COLORS.primary} 80` }}
  >
    {children}
  </button>
);
