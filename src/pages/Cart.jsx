import { useParams } from "react-router-dom";

function Cart() {
  const { name } = useParams();

  return (
    <div>
      <h1>This is the cart page.</h1>
    </div>
  );
}

export default Cart;
