import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home/>
      </>
    ),
  },
  {
    path: "/test",
    element: <>Test</>,
  },
]);
