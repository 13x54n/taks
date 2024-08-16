import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Routers";
import { WalletProvider } from "./context/WalletContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <RouterProvider router={router} />
  </WalletProvider>
);
