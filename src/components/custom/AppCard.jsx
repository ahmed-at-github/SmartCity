import { COLORS, RADIUS } from "../../utils/COLORS";
import { TEXT } from "../../utils/TEXT";

export const AppCard = ({onClick, titleEn, titleBn, children, className = '' }) => (
  <div
    className={`bg-white p-4 shadow-lg ${RADIUS} transition-transform duration-300 hover:shadow-xl ${className}`}
    style={{ borderLeft: `6px solid ${COLORS.primary}`, minHeight: '120px' }}
    onClick={onClick}
  >
    <h3 className="text-sm font-semibold text-gray-500 uppercase leading-tight">
      {titleEn}
    </h3>
    <h2 className={`text-lg font-bold mb-3 text-[${COLORS.text}] leading-tight`} style={{ fontFamily: 'SolaimanLipi, Inter, sans-serif' }}>
      {titleBn}
    </h2>
    {children}
  </div>
);