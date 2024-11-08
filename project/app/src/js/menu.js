import React, { useEffect, useState } from 'react';
import { db } from './firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import CartBtn from './cartbtn';

// استدعاء CSS بناءً على عرض الشاشة
if (window.innerWidth > 599) {
  import('../css/menu-tablet.css');
} else {
  import('../css/menu-phone.css');
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
  const [cart, setCart] = useState([]); // حالة cart لتخزين المنتجات

  useEffect(() => {
    const fetchProduct = async () => {
      const productCollection = collection(db, "products");
      const productSnapshot = await getDocs(productCollection);
      const productData = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);

      // احصل على الأنواع الفريدة
      const uniqueTypes = [...new Set(productData.flatMap(product => product.types))];
      setUniqueTypes(uniqueTypes);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(product => {
      const priceValue = parseFloat(product.price); // تأكد أن price هو عدد
      const isInPriceRange = priceValue >= priceRange[0] && priceValue <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.types.includes(selectedCategory);

      return isInPriceRange && matchesSearch && matchesCategory;
    });

    setFiltered(filteredProducts);
  }, [products, searchTerm, priceRange, selectedCategory]);

  const handleOrderOnline = (product) => {
    if (product && product.img && product.name) {
      navigate('/checkout', {
        state: [{
          img: product.img,
          name: product.name,
          price: product.price,
          quantity: product.quantity || 1, // تأكد من وجود الكمية
          id: product.id,
        }]
      });
    } else {
      console.error("Product data is missing:", product);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      color:'#ff7c37',
      background: "#333",
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Added Successfully"
    });
  };

  useEffect(() => {
    // جمع العناصر الفريدة وإضافة خاصية quantity
    const uniqueItems = cart.reduce((acc, item) => {
      const existingItem = acc.find((obj) => obj.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1; // زيادة الكمية بمقدار 1
      } else {
        acc.push({ ...item, quantity: 1 }); // إضافة العنصر الجديد مع quantity 1
      }
      return acc;
    }, []);

    // تخزين البيانات المحدثة في localStorage
    localStorage.setItem("cartItems", JSON.stringify(uniqueItems));
  }, [cart]);

  const toggleHeight = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="shop">
      <CartBtn/>
      <SearchBar onSearch={setSearchTerm} />
      <div className="shop-section-title">Our Menu</div>
      <SingleRowProductDisplay 
        products={filtered} // استخدم filtered هنا
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
      <div className="shop-section-content">
        {filtered.length > 0 ? (
          filtered.map((product, index) => (
            <Product
              key={index}
              img={product.img}
              name={product.name}
              price={product.price}
              onOrderOnline={handleOrderOnline}
              onAddToCart={handleAddToCart}
              product={product}
            />
          ))
        ) : (
          <div className="no-results">There are no results matching your search!</div>
        )}
      </div>
    </div>
  );
}

export default Store;