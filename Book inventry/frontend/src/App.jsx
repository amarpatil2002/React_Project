import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPages from "./pages/LandingPages";
import ManageInventry from "./pages/ManageInventry";
import BookDetails from "./pages/BookDetails";
import BookContextProvider from "./context/BookContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPages />,
    },
    {
      path: "/inventory",
      element: <ManageInventry />,
    },
    {
      path: "/books/:id",
      element: <BookDetails />,
    },
  ]);
  return (
    <BookContextProvider>
      <RouterProvider router={router} />
    </BookContextProvider>
  );
}

export default App;
