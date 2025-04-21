import { useParams } from "react-router-dom";

function Home() {
  const { name } = useParams();

  return (
    <div>
      <h1>This is the homepage.</h1>
    </div>
  );
}

export default Home;

/*
  {name === "pageone" ? (
    <PageOne />
  ) : name === "pagetwo" ? (
    <PageTwo />
  ) : (
    <DefaultPage />
  )}
*/
