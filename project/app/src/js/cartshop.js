import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CartShopEl(props) {
  // Handle quantity change for the specific product
  const handleQuantityChange = (num) => {
    const newQuantity = props.quantity + num;
    if (newQuantity >= 1) {
      props.onQuantityChange(props.id, newQuantity);
    }
  };

  return (
    <div className="product-container-cart">
      <img src={props.img} alt="Product" className="product-image-cart" />
      <div className="product-details-cart">
        <span className="product-name-cart">{props.name}</span>
        <div className="quantity-controls-cart">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span className="quantity-cart">{props.quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>
    </div>
  );
}

function CartShop() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const navigate = useNavigate();

  // Get products from local Storage and set initial quantity
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemsWithQuantity = cartItems.map((item) => ({
      ...item,
      quantity: item.quantity || 1  // Add quantity: 1 if it doesn't exist
    }));
    setData(itemsWithQuantity);
  }, []);

  // Calculate total price
  useEffect(() => {
    const total = data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(total);
  }, [data]);

  // Find unique products from data and count their occurrences
  useEffect(() => {
    const unique = data.reduce((acc, item) => {
      const existingItem = acc.find((obj) => obj.id === item.id);
      if (existingItem) {
        existingItem.count += item.quantity; // Adjust count based on quantity
      } else {
        acc.push({ ...item, count: item.quantity });
      }
      return acc;
    }, []);
    setUniqueProducts(unique);
  }, [data]);

  // Handle quantity change for a specific product
  const handleQuantityChange = (id, newQuantity) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity }; // تحديث الكمية فقط
      }
      return item; // إعادة الكائن كما هو إذا لم يكن هو العنصر المطلوب
    });

    setData(updatedData); // تحديث الحالة
    localStorage.setItem("cartItems", JSON.stringify(updatedData)); // تحديث البيانات في localStorage
  };

  return (
    <div className="formbold-main-wrapper-cart">
      <div className="formbold-form-wrapper-cart">
        {uniqueProducts.map((product) => (
          <CartShopEl
            key={product.id}
            id={product.id}
            name={product.name}
            img={product.img}
            quantity={product.count} // Use `count` for the quantity in unique products
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <h3>Total: ${total}</h3>
        <button 
          className="checkout-cart" 
          id="to-checkout"
          onClick={() => navigate("/checkout", { state: uniqueProducts })}
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
}

export default CartShop;