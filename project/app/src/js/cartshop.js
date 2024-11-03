import React, { useEffect, useState } from 'react';
import { db } from './firebaseconfig';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';

const CartShop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    notes: '',
    quantity: 1
  });
  const [showForm, setShowForm] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  // Load cart items from local storage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) setCartItems(storedCartItems);
  }, []);

  const handleQuantityChange = (change, index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstname, lastname, phone, address } = formData;
    if (!firstname || !lastname || !phone || !address) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowSummary(true);
      setShowForm(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "orders"), {
        ...formData,
        products: cartItems.map(({ name, img, price, quantity }) => ({
          name,
          img,
          price,
          quantity
        })),
        deliveryFee: 5,
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 5), // Add $5 delivery
        orderDate: new Date().toISOString(),
      });
      Swal.fire({
        title: "Success",
        text: "Order placed successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/menu";
      });
    } catch (error) {
      Swal.fire("Error", "Error placing order. Please try again.", "error");
    }
  };

  return (
    <div className="formbold-main-wrapper-cart">
      <div className="formbold-form-wrapper-cart">
        {showForm && (
          <>
            <div className="formbold-input-flex-cart">
              <div className="formbold-mb-3-cart">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="formbold-form-input-cart"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formbold-mb-3-cart">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="formbold-form-input-cart"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="formbold-mb-3-cart">
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                className="formbold-form-input-cart"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength="11"
              />
            </div>
            <div className="formbold-mb-3-cart">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="formbold-form-input-cart"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="formbold-mb-3-cart">
              <textarea
                rows="3"
                name="notes"
                placeholder="Additional notes"
                className="formbold-form-input-cart"
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
            {cartItems.map((item, index) => (
              <div key={index} className="product-container-cart">
                <img src={item.img} alt="Product" className="product-image-cart" />
                <div className="product-details-cart">
                  <span className="product-name-cart">{item.name}</span>
                  <div className="quantity-controls-cart">
                    <button onClick={() => handleQuantityChange(-1, index)}>-</button>
                    <span className="quantity-cart">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(1, index)}>+</button>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="formbold-btn-cart" onClick={handleSubmit}>
              Continue
            </button>
          </>
        )}

        {showSummary && (
          <div className="order-summary-cart">
            <h2>Order Summary</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="summary-product-cart">
                <img src={item.img} alt="Product" />
                <p><strong>Product:</strong> {item.name}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>
            ))}
            <p><strong>Delivery Cost:</strong> $5.00</p>
            <p><strong>Total Price:</strong> ${(cartItems.reduce((total, item) => total + item.price * item.quantity, 5)).toFixed(2)}</p>
            <button className="order-now-btn" onClick={handleSubmitOrder}>Order Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartShop;