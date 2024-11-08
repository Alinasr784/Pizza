import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "./firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "../css/comOrders.css";

const SimpleForm = () => {
  const location = useLocation();
  const data = location.state || []; // تأكد من وجود البيانات
  const [products, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const updatedProducts = data.map((product) => ({
      ...product,
      quantity: product.quantity || 1, // Default quantity to 1 if not already set
    }));
    setProduct(updatedProducts);
  }, [data]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    notes: "",
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

  /*const handleQuantityChange2 = (index, change) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = Math.max(1, newQuantities[index] + change);
      return newQuantities;
    });
  };*/

  // Calculate total price
  useEffect(() => {
    const total = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotal(total);
  }, [products]);
  const handleQuantityChange = (id, change) => {
    const updatedData = products.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change); // تأكد أن الكمية لا تقل عن 1
        return { ...item, quantity: newQuantity };
      }
      return item; // أبقِ العناصر الأخرى كما هي
    });
    setProduct(updatedData); // تحديث الحالة بالمصفوفة المعدلة
    console.log("Updated products:", updatedData); // طباعة المنتجات المعدلة في وحدة التحكم للتحقق
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

    const orders = data.map((product) => ({
      product: {
        id: product.id,
        name: product.name,
        img: product.img,
        price: product.price,
        quantity: product.quantity,
      },
      totalPrice: product.quantity * product.price,
    }));

    try {
      await addDoc(collection(db, "orders"), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        orders: orders,
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
  useEffect(() => {
    setQuantity(products.quantity);
  }, [products]);
  useEffect(() => {
    console.log(quantity);
  }, [quantity]);

  return (
    <div className="formbold-main-wrapper-checkout">
      <div className="formbold-form-wrapper-checkout">
        {showForm && (
          <>
            <div className="formbold-input-flex-checkout">
              <div className="firstName">
                <label className="formbold-form-label-checkout">
                  First Name
                </label>
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
                <label className="formbold-form-label-checkout">
                  Last Name
                </label>
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
              <label className="formbold-form-label-checkout">
                Phone Number
              </label>
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

            {products.map((product) => (
              <div key={product.id} className="product-container">
                <img
                  src={product.img}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <span className="product-name">{product.name}</span>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      -
                    </button>
                    <span className="quantity-cart">{product.quantity}</span>
                    <button onClick={() => handleQuantityChange(product.id, 1)}>
                      +
                    </button>
                  </div>
                  <span className="product-price">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="formbold-btn-checkout"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </>
        )}

        {showSummary && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            {products.map((product, index) => (
              <>
                <div key={index} className="summary-item">
                  <img src={product.img} alt={product.name} />
                  <p>
                    <strong>Product:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> ${product.price.toFixed(2)}
                  </p>
                  <p>
                    <strong>Total product price:</strong> $
                    {(product.quantity * product.price).toFixed(2)}
                  </p>
                </div>
                <hr></hr>
              </>
            ))}
            <h3 className="totalPrice">Total price : {total}</h3>
            <button className="order-now-btn" onClick={handleSubmitOrder}>
              Order Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleForm;
