import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Index from "@/pages/Index";
import Verification from "@/pages/Verification";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar/>
        <Index/>
      </>
    )
  },
  {
    path: "/disputes",
    element: (
      <>
        <Navbar />
        <Home/>
      </>
    ),
  },
  {
    path: "/verification",
    element: (
      <>
      <Navbar/>
      <Verification/>
      </>
    )
  },
  {
    path: "/dashboard",
    element: (
      <>
      <Navbar/>
      <Dashboard/>
      </>
    )
  },
  {
    path: "/test",
    element: <>Test</>,
  },
]);
