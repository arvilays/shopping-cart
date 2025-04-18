import { useParams } from "react-router-dom";

function Product() {
  const { name } = useParams();

  return (
    <div>
      <h1>This is the product page.</h1>
    </div>
  );
};

export default Product;