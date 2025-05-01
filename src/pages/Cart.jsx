import { Link, useOutletContext } from "react-router-dom";
import "../style/cart.css";
import deleteImage from "../assets/close-circle-outline.svg";

function Cart() {
  const { storeData, cartData, setCartData } = useOutletContext();

  const deleteItem = (id) => {
    setCartData((prev) => prev.filter((item) => item.id !== id));
  };

  function CartItem({ item }) {
    const itemData = storeData.find((product) => product.id === item.id);

    if (!itemData) return null;

    return (
      <div className="cart-item" key={item.id}>
        <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={itemData.coverImage}
            alt={itemData.title}
            className="cart-item-image"
          />
        </Link>
        <Link
          to={`/product/${item.id}`}
          className="cart-item-title"
          onClick={() => window.scrollTo(0, 0)}
        >
          {itemData.title}
        </Link>
        <div className="cart-item-price">${itemData.price}</div>
        <div className="cart-item-quantity">{item.quantity}</div>
        <img
          src={deleteImage}
          alt="delete"
          className="cart-item-delete"
          onClick={() => deleteItem(item.id)}
        />
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-main">
        <div className="cart-items">
          {cartData.map((item) => (
            <CartItem item={item} />
          ))}
        </div>

        <div className="cart-checkout">CHECKOUT</div>
      </div>
    </div>
  );
}

export default Cart;
