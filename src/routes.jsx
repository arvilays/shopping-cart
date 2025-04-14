import App from "./components/App";
import Page from "./components/Page";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "page/:name",
    element: <Page />,
  },
];

export default routes;
