import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Routers";
import { WalletProvider } from "./context/WalletContext";
import { RoleProvider } from "./context/RoleContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <RoleProvider>
      <RouterProvider router={router} />
    </RoleProvider>
  </WalletProvider>
);
