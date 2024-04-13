import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Control from "./pages/Control.tsx";
import Screen from "./pages/Screen.tsx";
import Editor from "./pages/Editor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/control",
    element: <Control />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/screen",
    element: <Screen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
