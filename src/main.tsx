import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/Routers";
import { RoleProvider } from "./context/RoleContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RoleProvider>
      <RouterProvider router={router} />
    </RoleProvider>
);
