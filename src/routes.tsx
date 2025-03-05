
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Planner from "./pages/Planner";
import Itinerary from "./pages/Itinerary";
import Itineraries from "./pages/Itineraries";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
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
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
