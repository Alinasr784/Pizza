import React, { useEffect, useState, useRef } from 'react';
import { db } from './firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// استدعاء CSS بناءً على عرض الشاشة
if (window.innerWidth > 599) {
  import('../css/menu-tablet.css');
} else {
  import('../css/menu-phone.css');
}


function CartBtn({ cartCount, onCartClick , isCartVisible, cart}) { // إضافة onCartClick كـ prop
  const cartRef = useRef(null);
  const pressTimer = useRef(null);

  useEffect(() => {
    const cart = cartRef.current;
    let offsetX, offsetY;

    const startDrag = (e) => {
      e.preventDefault();
      offsetX = e.clientX ? e.clientX - cart.getBoundingClientRect().left : e.touches[0].clientX - cart.getBoundingClientRect().left;
      offsetY = e.clientY ? e.clientY - cart.getBoundingClientRect().top : e.touches[0].clientY - cart.getBoundingClientRect().top;

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', stopDrag);
    };

    const onDrag = (e) => {
      const x = (e.clientX ? e.clientX : e.touches[0].clientX) - offsetX;
      const y = (e.clientY ? e.clientY : e.touches[0].clientY) - offsetY;

      cart.style.left = `${x}px`;
      cart.style.top = `${y}px`;
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', stopDrag);
    };

    const longPressHandler = (e) => {
      e.preventDefault();
      pressTimer.current = setTimeout(() => {
        startDrag(e);
      }, 800);
    };

    const clearLongPress = () => {
      clearTimeout(pressTimer.current);
    };

    cart.addEventListener('touchstart', longPressHandler, { passive: false });
    cart.addEventListener('touchend', clearLongPress);
    cart.addEventListener('mousedown', longPressHandler);
    cart.addEventListener('mouseup', clearLongPress);
    cart.addEventListener('click', onCartClick); // إضافة حدث click هنا

    return () => {
      cart.removeEventListener('touchstart', longPressHandler);
      cart.removeEventListener('touchend', clearLongPress);
      cart.removeEventListener('mousedown', longPressHandler);
      cart.removeEventListener('mouseup', clearLongPress);
      cart.removeEventListener('click', onCartClick); // تنظيف حدث click
    };
  }, [onCartClick]); // إضافة onCartClick كـ dependency

  return (
    <div className="cart" ref={cartRef} onClick={onCartClick}>
      <div>
        <img src="/cart.svg" alt="Cart Icon" />
        <span className="cart-item-count">{cartCount}</span>
      </div>
      {isCartVisible && (
        <div className="cart-popup">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index}>
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
                <span>Price: {item.price}</span>
                <span>Quantity: {item.quantity}</span>
              </div>
            ))
          ) : (
            <div>Your cart is empty!</div>
          )}
        </div>
      )}
    </div>
  );
}

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="search-input"
        required
      />
    </div>
  );
};

function Product({ img, name, price, onOrderOnline, onAddToCart, product }) {
  return (
    <div className="product-card">
      <div className="product-card-img">
        <img src={img} alt={name} />
      </div>
      <div className="product-card-info">
        <div className="product-card-name">{name}</div>
        <div className="product-card-price">{price ? price : "$0.00"}</div>
      </div>
      <div className="product-card-buttons">
        <div className="product-card-order" onClick={() => onOrderOnline(product)}>Order Online</div>
        <div className="product-card-add" onClick={() => onAddToCart(product)}>Add to Cart</div>
      </div>
    </div>
  );
}

function SingleRowProductDisplay({ products, onOrderOnline, onAddToCart }) {
  return (
    <div className="single-row-container">
      {products.map((product, index) => (
        <Product
          key={index}
          img={product.img}
          name={product.name}
          price={product.price}
          onOrderOnline={onOrderOnline}
          onAddToCart={onAddToCart}
          product={product}
        />
      ))}
    </div>
  );
}



function Store() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [products, setProducts] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productCollection = collection(db, "products");
      const productSnapshot = await getDocs(productCollection);
      const productData = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);

      const uniqueTypes = [...new Set(productData.flatMap(product => product.types))];
      setUniqueTypes(uniqueTypes);
    };

    fetchProduct();
  }, []);

  const handleCartClick = () => {
    console.log("Cart button clicked" , cart);
    setCartVisible(!isCartVisible);
  };

  useEffect(() => {
    const filteredProducts = products.filter(product => {
      const priceValue = parseFloat(product.price);
      const isInPriceRange = priceValue >= priceRange[0] && priceValue <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.types.includes(selectedCategory);

      return isInPriceRange && matchesSearch && matchesCategory;
    });

    setFiltered(filteredProducts);
  }, [products, searchTerm, priceRange, selectedCategory]);

  const handleOrderOnline = (product) => {
    if (product && product.img && product.name) {
      navigate('/checkout', { state: { img: product.img, name: product.name, price: product.price } });
    } else {
      console.error("Product data is missing:", product);
    }
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleHeight = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="shop">
      <CartBtn 
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)} 
        onCartClick={handleCartClick} 
        isCartVisible={isCartVisible} 
        cart={cart} // أضف cart هنا
      />
      <SearchBar onSearch={setSearchTerm} />
      <div className="shop-section-title">Our Menu</div>
      <SingleRowProductDisplay 
        products={filtered}
        onOrderOnline={handleOrderOnline}
        onAddToCart={handleAddToCart}
      />
      <div className={`filter-container ${isMinimized ? 'collapsed' : 'expanded'}`}>
        <button className="height-toggle-button" onClick={toggleHeight}>
          <i className={`fas ${isMinimized ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
        </button>
        <label>
          <div className="filter-icon"><i className="fas fa-filter"></i></div>
          Types :
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          <div className="filter-icon"><i className="fas fa-dollar-sign"></i></div>
          <strong>Price :</strong>
          <label>From</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
            placeholder='From'
          />
          <label>To</label>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
            placeholder='To'
          />
        </label>
      </div>
    </div>
  );
}


export default Store;