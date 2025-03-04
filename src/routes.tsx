
import { RouteObject } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Planner from "./pages/Planner";
import Itinerary from "./pages/Itinerary";
import Itineraries from "./pages/Itineraries";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "planner",
        element: <Planner />,
      },
      {
        path: "itinerary",
        element: <Itinerary />,
      },
      {
        path: "itineraries",
        element: <Itineraries />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
