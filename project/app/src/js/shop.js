import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductShop({ img, name, price, onOrderOnline }) {
  return (
    <div className="product-card-shop">
      <div className="product-card-img-shop">
        <img src={img} alt={name} />
      </div>
      <div className="product-card-info-shop">
        <div className="product-card-name-shop">{name}</div>
        <div className="product-card-price-shop">{price ? price : "$0.00"}</div>
      </div>
      <div className="product-card-buttons-shop">
        <div className="product-card-order-shop" onClick={onOrderOnline}>Order Online</div>
        <div className="product-card-add-shop">Add to Cart</div>
      </div>
    </div>
  );
}

function Shop() {
  const navigate = useNavigate();

  const handleOrderOnline = (img, name, price) => {
    if (img && name) {
      navigate('/checkout', { state: [{ img, name , price}] });
    } else {
      console.error("Product data is missing:", { img, name });
    }
  };

  // Load the appropriate CSS file based on window width
  React.useEffect(() => {
    const loadCSS = () => {
      if (window.innerWidth > 599) {
        import('../css/shop-tablet.css');
      } else {
        import('../css/shop-phone.css');
      }
    };

    loadCSS();
  }, []);

  return (
    <div className="shop-shop">
      <div className="shop-section-title-shop">Our Delicious Dishes</div>
      <div className="shop-section-content-shop">
        {Array(13).fill().map((_, index) => (
          <ProductShop
            key={index}
            img={"/small.png"}
            name={`Pizza test ${index + 1}`}
            price={"$10.00"}
            onOrderOnline={() => handleOrderOnline("/small.png", `Pizza test ${index + 1}`, "10.00")}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;