import React, { useEffect, useState } from 'react';
import { db } from './firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

if (window.innerWidth > 599) {
  import('../css/menu-tablet.css');
} else {
  import('../css/menu-phone.css');
}

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (event) => {
    console.log("Current Search Term:", event.target.value); // تحقق من قيمة المدخل
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

function Product({ img, name, price, onOrderOnline }) {
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
        <div className="product-card-order" onClick={onOrderOnline}>Order Online</div>
        <div className="product-card-add">Add to Cart</div>
      </div>
    </div>
  );
}

function SingleRowProductDisplay({ products, onOrderOnline }) {
  return (
    <div className="single-row-container">
      {products.map((product, index) => (
        <Product
          key={index}
          img={product.img}
          name={product.name}
          price={product.price}
          onOrderOnline={onOrderOnline}
        />
      ))}
    </div>
  );
}

function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [products, setProducts] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [filtered, setFiltered] = useState([]);

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

  useEffect(() => {
    const filteredProducts = products.filter(product => {
      const priceValue = product.price; // تأكد أن price هو عدد
      const isInPriceRange = priceValue >= priceRange[0] && priceValue <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.types.includes(selectedCategory);

      return isInPriceRange && matchesSearch && matchesCategory;
    });

    setFiltered(filteredProducts);
    console.log("Filtered Products:", filteredProducts); // تحقق من المنتجات المصفاة
  }, [products, searchTerm, priceRange, selectedCategory]);

  const handleOrderOnline = () => {
    window.location.href = '/checkout';
  };

  const toggleHeight = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="shop">
      <SearchBar onSearch={setSearchTerm} />
      <div className="shop-section-title">Our Menu</div>
      <SingleRowProductDisplay 
        products={filtered} // استخدم filtered هنا
        onOrderOnline={handleOrderOnline}
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
            />
          ))
        ) : (
          <div className="no-results">There are no results matching your search !</div>
        )}
      </div>
    </div>
  );
}

export default Store;