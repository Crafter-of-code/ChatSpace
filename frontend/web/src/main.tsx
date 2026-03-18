import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
const Welcome = lazy(() => import("./pages/Welcome.tsx"));
const Chat = lazy(() => import("./pages/Chat.tsx"));
const UserDetailPage = lazy(() => import("./pages/Details.tsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "detail",
        element: <UserDetailPage />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
