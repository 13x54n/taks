import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Profile from "@/pages/Profile";
import Home from "@/pages/Home";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Dispute from "@/pages/Dispute"; 
import Awards from "@/pages/Awards"; 
import JobCreationForm from "@/components/JobCreationForm";

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
    path: '/home',
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <Navbar />
        <Profile />
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
    path: "/create-job",
    element: (
      <>
        <Navbar />
        <JobCreationForm onJobCreated={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </>
    ),
  },
]);
