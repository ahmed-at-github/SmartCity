import { createBrowserRouter } from "react-router";

import { SplashScreen } from "./pages/SplashScreen";
import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { DownBar } from "./components/DownBar";
import { TrafficPage } from "./pages/TrafficPage";
import { ProfilePage } from "./pages/ProfilePage";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <App /> /* Acts as <Root/> */,
    // errorElement
    children: [
      { index: true, element: <SplashScreen /> },
      { path: "/login", element: <LoginPage /> },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/traffic",
        element: <TrafficPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
