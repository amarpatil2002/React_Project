import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPages from "./pages/LandingPages";
import ManageInventry from "./pages/ManageInventry";
import BookDetails from "./pages/BookDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPages />,
    },
    {
      path: "/inventry",
      element: <ManageInventry />,
    },
    {
      path: "/book-detail",
      element: <BookDetails />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
