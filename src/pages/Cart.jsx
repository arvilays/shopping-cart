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

    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value) || 1;

      setCartData((prev) =>
        prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: value } : cartItem,
        ),
      );
    };

    return (
      <div className="cart-item">
        <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            src={itemData.coverImage}
            alt={itemData.title}
            className="cart-item-image"
          />
        </Link>
        <div className="cart-item-title">{itemData.title}</div>
        <div className="cart-item-price-quantity">
          <div className="cart-item-price">${itemData.price}</div>
          <input
            className="cart-item-quantity"
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>
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
          {cartData.length > 0 ? (
            cartData.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <div className="cart-empty">
              <div className="cart-empty-title">
                Your next favorite story is just a click away! 📚✨
              </div>
              <div className="cart-empty-subtitle">
                Start exploring and discover something epic.
              </div>
            </div>
          )}
        </div>

        <div className="cart-checkout">
          <div className="cart-checkout-container">
            <div className="cart-checkout-title">TOTAL</div>
            <div className="cart-checkout-total">
              $
              {totalCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className="cart-checkout-button"
              onClick={() =>
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                })
              }
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
