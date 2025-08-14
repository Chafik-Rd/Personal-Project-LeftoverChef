import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./views/Home";
import { RecipeDetail } from "./views/RecipeDetail";
import { Login } from "./views/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div>
        <h1>404 - Page Not Found</h1>
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "recipes/:recipeId", element: <RecipeDetail /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
