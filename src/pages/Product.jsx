import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../style/product.css";
import "react-toastify/dist/ReactToastify.css";
import ProductBar from "../components/ProductBar";

function Product() {
  const { id } = useParams();
  const { storeData, setCartData } = useOutletContext();

  const productData = storeData.find((manga) => manga.id === id);

  if (!id || !productData) {
    return (
      <div className="product-none">
        {!id ? "🤔Please select a product!" : "🤷‍♀️Product not found!"}
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const {
    title,
    credits,
    series,
    volume,
    genre,
    description,
    price,
    coverImage,
  } = productData;

  const getRelatedProducts = (genre) => {
    return storeData.filter(
      (product) =>
        product.id !== id && product.genre.some((g) => genre.includes(g)),
    );
  };
  const relatedProducts = useMemo(
    () => getRelatedProducts(genre),
    [id, genre, storeData],
  );

  const getProductSeries = (series) => {
    return storeData
      .filter((product) => product.id !== id && product.series === series)
      .sort((a, b) => a.volume - b.volume);
  };
  const productSeries = useMemo(
    () => getProductSeries(series),
    [id, series, storeData],
  );

  // Rotating Product Series
  const rotatedProductSeries = useMemo(() => {
    const laterVolumes = productSeries.filter((p) => p.volume > volume);
    const earlierVolumes = productSeries.filter((p) => p.volume <= volume);
    return [...laterVolumes, ...earlierVolumes];
  }, [productSeries, volume]);

  // Cart Logic
  const addToCart = (newItem) => {
    toast.success(`${title} added to cart!`);
    setCartData((prev) => {
      const exists = prev.find((item) => item.id === newItem.id);

      if (exists) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      } else {
        return [...prev, newItem];
      }
    });
  };

  return (
    <div className="product">
      <div className="product-main">
        <div className="product-image">
          <img src={coverImage} alt={title} />
        </div>

        <div className="product-information">
          <div className="product-title">{title}</div>
          <div className="product-credits">by {credits.join(", ")}</div>

          {volume > 0 && (
            <Link
              to={`/search?series=${encodeURIComponent(series)}`}
              className="product-volume"
            >
              Volume {volume} of "{series}"
            </Link>
          )}

          <hr />

          <div className="product-description">
            {description.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>

          <hr />

          <div className="product-genres">
            <div className="product-genre-list">
              {genre.map((g) => (
                <Link
                  to={`/search?genres=${encodeURIComponent(g)}`}
                  key={g}
                  className="product-genre"
                >
                  {g}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="product-purchase">
          <div className="product-purchase-container">
            <div className="product-price">${price}</div>
            <div className="product-quantity">
              <span>Quantity:</span>
              <input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="#"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div
              className="product-add-to-cart product-button"
              onClick={() => {
                addToCart({ id, quantity: Number(quantity) });
              }}
            >
              Add to Cart
            </div>
            <Link
              to="/cart"
              className="product-buy product-button"
              onClick={() => addToCart({ id, quantity: Number(quantity) })}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {productSeries.length > 0 && (
        <div className="product-series">
          <ProductBar
            storeData={rotatedProductSeries}
            title={`📚More Volumes of "${series}"`}
            link={`/search?series=${encodeURIComponent(series)}`}
            shuffle={false}
            uniqueSeries={false}
          />
        </div>
      )}

      <div className="product-recommend">
        <ProductBar
          storeData={relatedProducts}
          title="😍More Titles You'll Love"
          link="/search"
          showViewMore={false}
        />
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default Product;
