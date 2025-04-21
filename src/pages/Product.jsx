import { useParams } from "react-router-dom";

function Product() {
  const { name } = useParams();

  return (
    <div>
      {name ? (
        <h1>This is the product page for {name}.</h1>
      ) : (
        <h1>Please select a product.</h1>
      )}
    </div>
  );
}

export default Product;
