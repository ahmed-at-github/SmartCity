import { COLORS, RADIUS } from "../../utils/COLORS";


export const PillButton = ({ children, isActive = false, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm font-medium ${RADIUS} shadow-md transition-all duration-300 ${className}
      ${isActive
        ? `bg-blue-200 text-blue-500 ]`
        : `bg-[${COLORS.secondary}] text-[${COLORS.text}] hover:bg-blue-100`
      }` }
    style={{ minWidth: '100px' }}
  >
    {children}
  </button>
);