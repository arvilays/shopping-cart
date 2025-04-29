import { Link, useParams, useOutletContext } from "react-router-dom";
import "../style/product.css";
import ProductBar from "../components/ProductBar";

function Product() {
  const { id } = useParams();
  const { storeData } = useOutletContext();

  const productData = storeData.find((manga) => manga.id === id);

  if (!id || !productData) {
    return (
      <div className="product-none">
        {!id ? "🤔Please select a product!" : "🤷‍♀️Product not found!"}
      </div>
    );
  }

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

  // Find related products by matching genres of the current product
  const relatedProducts = storeData.filter(
    (product) =>
      product.id !== id && product.genre.some((g) => genre.includes(g)),
  );

  const productSeries = storeData
    .filter((product) => product.id !== id && product.series === series)
    .sort((a, b) => a.volume - b.volume);

  const laterVolumes = productSeries.filter((p) => p.volume > volume);
  const earlierVolumes = productSeries.filter((p) => p.volume <= volume);
  const rotatedProductSeries = [...laterVolumes, ...earlierVolumes];

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
                defaultValue={1}
              />
            </div>
            <div className="product-add-to-cart product-button">
              Add to Cart
            </div>
            <div className="product-buy product-button">Buy Now</div>
          </div>
        </div>
      </div>

      {productSeries.length > 0 && (
        <div className="product-series">
          <ProductBar
            storeData={rotatedProductSeries}
            title={`📚More ${series} Volumes`}
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
    </div>
  );
}

export default Product;
