import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "product",
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: ":name",
            element: <Product />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
