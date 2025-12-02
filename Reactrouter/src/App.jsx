import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import PublicRoutes from "./Components/PublicRoutes";
import ProtectedRoute from "./Components/ProtectedRoute";
import GithubData from "./Pages/GithubData";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <PublicRoutes />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
              path: "about",
              element: <About />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
          ],
        },
        {
          element:<ProtectedRoute />,
          children:[
            {
              path:'dashboard/:userid',
              element:<Dashboard />
            },
            {
              path:'/github',
              element:<GithubData />
            }
          ]
        },
        {
          path:"*",
          element:<PageNotFound />
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
