import { Link, useParams, useOutletContext } from "react-router-dom";
import "../style/product.css";
import ProductBar from "../components/ProductBar";

function Product() {
  const { id } = useParams();
  const { storeData } = useOutletContext();

  if (!id) {
    return <div className="product-none">🤔Please select a product!</div>;
  }

  const productData = storeData.find((manga) => manga.id === id);

  if (!productData) {
    return <div className="product-none">🤷‍♀️Product not found!</div>;
  }

  const relatedProducts = storeData.filter(
    (product) =>
      product.id !== productData.id && // Exclude the current product itself
      product.genre.some((genre) => productData.genre.includes(genre)), // Match genres
  );

  const currentVolume = productData.volume;

  const productSeries = storeData
    .filter(
      (product) =>
        product.id !== productData.id && product.series === productData.series,
    )
    .sort((a, b) => a.volume - b.volume);

  const laterVolumes = productSeries.filter(
    (product) => product.volume > currentVolume,
  );
  const earlierVolumes = productSeries.filter(
    (product) => product.volume <= currentVolume,
  );

  const rotatedProductSeries = [...laterVolumes, ...earlierVolumes];

  return (
    <div className="product">
      <div className="product-main">
        <div className="product-image">
          <img src={productData.coverImage} alt={productData.title} />
        </div>
        <div className="product-information">
          <div className="product-title">{productData.title}</div>
          <div className="product-credits">
            by {productData.credits.join(", ")}
          </div>
          {productData.volume > 0 && (
            <Link
              to={`/search?series=${encodeURIComponent(productData.series)}`}
              className="product-volume"
            >
              Volume {productData.volume} of "{productData.series}"
            </Link>
          )}

          <div className="product-description">
            {productData.description.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </div>
        <div className="product-purchase">
          <div className="product-price">${productData.price}</div>
          <div className="product-add-to-cart">Add to Cart</div>
          <div className="product-buy">Buy Now</div>
        </div>
      </div>

      {productSeries.length > 0 && (
        <div className="product-series">
          <ProductBar
            storeData={rotatedProductSeries}
            title={`📚More ${productData.series} Volumes`}
            link={`/search?series=${encodeURIComponent(productData.series)}`}
            shuffle={false}
            uniqueSeries={false}
          />
        </div>
      )}

      <div className="product-recommend">
        <ProductBar
          storeData={relatedProducts}
          title="😍Readers Also Like"
          link="/search"
          showViewMore={false}
        />
      </div>
    </div>
  );
}

export default Product;
