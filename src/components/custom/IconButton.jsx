import { COLORS } from "../../utils/COLORS";
import { Icon } from "lucide-react";

export const IconButton = ({ icon: Icon, labelEn, labelBn, onClick, isActive = false, className }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer flex flex-col items-center justify-center p-1 transition-colors duration-200
      ${isActive ? `text-[${COLORS.accent}]` : `text-gray-400 hover:text-[${COLORS.accent}]`}`}
  >
    <Icon size={24} strokeWidth={2} />
    <span className="text-xs mt-0.5 font-medium leading-none" style={{ fontFamily: 'Hind Siliguri, Inter, sans-serif' }}>
      {labelEn}
    </span>
    <span className="text-[10px] leading-none" style={{ fontFamily: 'SolaimanLipi, Inter, sans-serif' }}>
      {labelBn}
    </span>
  </button>
);