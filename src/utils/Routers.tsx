import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Index from "@/pages/Index";
import Verification from "@/pages/Verification";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile"; 
import Dispute from "@/pages/Dispute"; 
import Awards from "@/pages/Awards"; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Index />
      </>
    ),
  },
  {
    path: '/home',
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
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
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Profile />
      </>
    ),
  },
  {
    path: "/disputes",
    element: (
      <>
        <Navbar />
        <Dispute />
      </>
    ),
  },
  {
    path: "/awards",
    element: (
      <>
        <Navbar />
        <Awards />
      </>
    ),
  },
  {
    path: "/verification",
    element: (
      <>
        <Navbar />
        <Verification />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navbar />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/test",
    element: <>Test</>,
  },
]);
