import { createBrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Verification from "@/pages/Verification";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Dispute from "@/pages/Dispute";
import Awards from "@/pages/Awards";
import FlashLoan from "@/pages/FlashLoan";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/disputes",
    element: (
      <Layout>
        <Dispute />
      </Layout>
    ),
  },
  {
    path: "/awards",
    element: (
      <Layout>
        <Awards />
      </Layout>
    ),
  },
  {
    path: "/verification",
    element: (
      <Layout>
        <Verification />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/test",
    element: <>Test</>,
  },
  {
    path: "/flash-loan",
    element: (
      <Layout>
        <Navbar />
        <FlashLoan />
      </Layout>
    ),
  },
]);
