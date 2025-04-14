import { useParams } from "react-router-dom";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import DefaultPage from "./DefaultPage";

const Page = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Page List</h1>
      {name === "pageone" ? (
        <PageOne />
      ) : name === "pagetwo" ? (
        <PageTwo />
      ) : (
        <DefaultPage />
      )}
    </div>
  );
};

export default Page;
