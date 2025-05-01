import { Link, useOutletContext } from "react-router-dom";
import "../style/cart.css";
import confetti from "canvas-confetti";
import deleteImage from "../assets/close-circle-outline.svg";

function Cart() {
  const { storeData, cartData, setCartData } = useOutletContext();

  const deleteItem = (id) => {
    setCartData((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCost = cartData.reduce((total, item) => {
    const itemData = storeData.find((product) => product.id === item.id);
    return itemData ? total + itemData.price * item.quantity : total;
  }, 0);

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
        <div className="cart-item-title">{itemData.title}</div>
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
          <div className="cart-title">Your Cart</div>
          <hr />
          {cartData.length > 0 ?
            cartData.map((item) => (
              <CartItem item={item} />
            )) :
            <div className="cart-empty">
              <div className="cart-empty-title">Your next favorite story is just a click away! 📚✨</div>
              <div className="cart-empty-subtitle">Start exploring and discover something epic.</div>
            </div>
          }
        </div>

        <div className="cart-checkout">
          {totalCost.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default Cart;
