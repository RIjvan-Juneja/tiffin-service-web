import { createBrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import { RouterProvider } from "react-router";
import "./assets/css/index.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Routes />,
    },
  ]);

  return (
    // <AuthProvider>
      <RouterProvider router={router} />
    // </AuthProvider>
  );
}

export default App;
