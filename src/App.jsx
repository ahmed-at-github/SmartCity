import "./App.css";
// import Home from "./pages/Home";
import { COLORS } from "./utils/COLORS";
import { TEXT } from "./utils/TEXT";
import { SplashScreen } from "./pages/SplashScreen";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { DownBar } from "./components/DownBar";
import { TrafficPage } from "./pages/TrafficPage";
import { Outlet, useLocation } from "react-router";

function App() {
  const location = useLocation();

  console.log(location.pathname)
  return (
    <div>
      <Outlet />

      {location.pathname === "/traffic" || location.pathname === "/login" ? null :
      <DownBar/>}
    </div>
  );
}

export default App;
