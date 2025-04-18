import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import List from "./pages/List";
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
        element: <Home />
      },
      {
        path: "list",
        element: <List />
      },
      {
        path: "product",
        element: <Product />
      },
      {
        path: "cart",
        element: <Cart />
      },
    ]
  },
];

export default routes;