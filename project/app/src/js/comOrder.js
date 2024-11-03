import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import '../css/comOrders.css';

const SimpleForm = () => {
  const location = useLocation();
  const { img, name, price } = location.state || {};

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    notes: '',
    quantity: 1,
  });

  const [showSummary, setShowSummary] = useState(false);
  const [showForm, setShowForm] = useState(true);

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

  const validateForm = () => {
    const { firstname, lastname, phone, address } = formData;
    if (!firstname || !lastname || !phone || !address) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowSummary(true);
    setShowForm(false);
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, "orders"), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        quantity: formData.quantity,
        deliveryFee: 10,
        totalPrice: (formData.quantity * price) + 10,
        product: {
          name: name,
          img: img,
          price: price,
        },
        orderDate: new Date().toISOString(),
      });
      Swal.fire({
        title: "Success",
        text: "Order placed successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-ok-button"
        }
      }).then(() => {
        window.location.href = "/menu"; 
      })
    } catch (error) {
      Swal.fire("Error", "Error placing order. Please try again.", "error");
    }
  };

  const unitPrice = price;
  const deliveryFee = 5;
  const totalPrice = (unitPrice * formData.quantity) + deliveryFee;

  return (
    <div className="formbold-main-wrapper-checkout">
      <div className="formbold-form-wrapper-checkout">
        {showForm && (
          <>
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
                type="number"
                name="phone"
                placeholder="Your phone number - start with 01"
                className="formbold-form-input-checkout"
                value={formData.phone}
                onChange={handleChange}
                onInput={(e) => {
                  if (e.target.value.length > 11) {
                    e.target.value = e.target.value.slice(0, 11);
                  }
                }}
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
              Continue
            </button>
          </>
        )}

{showSummary && (
          <div className="order-summary">
            <img src={img} alt="Product" />
            <h2>Order Summary</h2>
            <div className="text-container">
              <p><strong>Product:</strong> {name}</p>
              <p><strong>Quantity:</strong> {formData.quantity}</p>
              <p><strong>Price:</strong> {price}</p>
              <p><strong>Delivery Cost:</strong> $5.00</p>
              <p><strong>Total Price:</strong> ${(formData.quantity * price + 5).toFixed(2)}</p>
            </div>
            <button className="order-now-btn" onClick={handleSubmitOrder}>Order Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleForm;