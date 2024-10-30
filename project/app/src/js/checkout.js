import React from 'react';
import '../css/checkout.css';

function Checkout() {
  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Complete Your Order</h2>
        <form>
          <div className="form-row two-columns">
            <input type="text" placeholder="First Name" className="form-input name" />
            <input type="text" placeholder="Last Name" className="form-input name" />
          </div>
          <div className="form-row">
            <input type="tel" placeholder="Phone Number" className="form-input phone-input" />
          </div>
          <div className="form-row">
            <textarea placeholder="Address" className="form-input textarea"></textarea>
          </div>
          <div className="form-buttons">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="submit-button">Complete Purchase</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;