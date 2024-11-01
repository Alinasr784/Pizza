import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import '../css/comOrders.css';

const SimpleForm = () => {
  const location = useLocation();
  const { img, name } = location.state || {};

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    notes: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuantityChange = (change) => {
    setFormData((prevState) => ({
      ...prevState,
      quantity: Math.max(1, prevState.quantity + change),
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        quantity: formData.quantity,
        product: {
          name: name,
          img: img,
        },
        orderDate: new Date().toISOString(), // تاريخ الطلب
      });
      console.log("Order added successfully!");
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="formbold-main-wrapper-checkout">
      <div className="formbold-form-wrapper-checkout">
        <div className="formbold-input-flex-checkout">
          <div className="firstName">
            <label className="formbold-form-label-checkout">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Your first name"
              className="formbold-form-input-checkout"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="formbold-form-label-checkout">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Your last name"
              className="formbold-form-input-checkout"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="formbold-mb-3-checkout">
          <label className="formbold-form-label-checkout">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Your phone number"
            className="formbold-form-input-checkout"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="formbold-mb-3-checkout">
          <label className="formbold-form-label-checkout">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Street address"
            className="formbold-form-input-checkout"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="formbold-mb-3-checkout">
          <label className="formbold-form-label-checkout">Notes</label>
          <textarea
            rows="6"
            name="notes"
            className="formbold-form-input-checkout"
            placeholder="Additional notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="product-container">
          <img src={img} alt="Product" className="product-image" />
          <div className="product-details">
            <span className="product-name">{name}</span>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span className="quantity">{formData.quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
        </div>
        <button type="button" className="formbold-btn-checkout" onClick={handleSubmit}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default SimpleForm;