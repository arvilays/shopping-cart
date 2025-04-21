import { useParams } from "react-router-dom";

function Search() {
  const { name } = useParams();

  return (
    <div>
      <h1>This is the search page.</h1>
    </div>
  );
}

export default Search;
