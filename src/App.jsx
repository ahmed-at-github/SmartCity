import "./App.css";
// import Home from "./pages/Home";
import { COLORS } from "./utils/COLORS";
import { TEXT } from "./utils/TEXT";
import { SplashScreen } from "./pages/SplashScreen";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { DownBar } from "./components/DownBar";
import { TrafficPage } from "./pages/TrafficPage";
import { FairPrice } from "./pages/FairPrice";
import { ReportPage } from "./pages/ReportPage";
import { SafetyPage } from "./pages/SafetyPage";




function App(){
  
  return (
    // <SplashScreen/>
    // <LoginPage/>
    //<HomePage/>
    // <DownBar/>
    //<TrafficPage/>
    <FairPrice></FairPrice>
    //<ReportPage></ReportPage>
    //<SafetyPage></SafetyPage>
  )
}

export default App;
