import { useState } from "react";
import { TEXT } from "../utils/TEXT";
import { COLORS, RADIUS } from "../utils/COLORS";
import { PrimaryButton } from "../components/custom/PrimaryButton";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const handleLogin = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div
      className={`flex flex-col items-center h-screen w-full p-8 bg-[${COLORS.background}]`}
    >
      <div className="flex-1 flex flex-col justify-center gap-4">
        <h1
          className={`text-4xl font-bold mb-2 text-[${COLORS.text}]`}
          style={{ fontFamily: "Poppins, Inter, sans-serif" }}
        >
          {TEXT.en.loginTitle}
        </h1>
        <p
          className="text-lg text-gray-600 mb-8"
          style={{ fontFamily: "SolaimanLipi, Inter, sans-serif" }}
        >
          {TEXT.bn.loginSubtitle}
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder={`${TEXT.en.email} / ${TEXT.bn.email}`}
            className={`w-full p-4 border-2 border-[${COLORS.secondary}] ${RADIUS} focus:border-[${COLORS.primary}] focus:outline-none transition-colors`}
            style={{ fontSize: "16px" }}
          />
          <input
            type="password"
            placeholder={`${TEXT.en.password} / ${TEXT.bn.password}`}
            className={`w-full p-4 border-2 border-[${COLORS.secondary}] ${RADIUS} focus:border-[${COLORS.primary}] focus:outline-none transition-colors`}
            style={{ fontSize: "16px" }}
          />
        </div>
        <PrimaryButton onClick={handleLogin} className="mb-4">
          {TEXT.en.loginBtn} / {TEXT.bn.loginBtn}
        </PrimaryButton>
      </div>

      {showToast && (
        <div
          className={`fixed bottom-0 flex justify-center w-[150px] p-4 text-center bg-green-500 text-white transition-opacity ${RADIUS} mb-4 mx-4 shadow-xl`}
        >
          Logging In...
        </div>
      )}
    </div>
  );
};
