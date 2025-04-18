import { useParams } from "react-router-dom";

function List() {
  const { name } = useParams();

  return (
    <div>
      <h1>This is the list page.</h1>
    </div>
  );
};

export default List;